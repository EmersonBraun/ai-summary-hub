---
title: 温度、Top-K、Top-P
description: 温度（temperature）、Top-K 和 Top-P 采样参数如何控制大型语言模型输出的随机性和创造性。
keywords: [温度, top-k, top-p, 核采样, 采样参数, 大型语言模型配置, 随机性, 创造性]
---

# 温度、Top-K、Top-P

## 定义

温度（temperature）、Top-K 和 Top-P 是控制大型语言模型在文本生成过程中如何选择下一个令牌的采样参数。在模型计算出整个词汇表的概率分布（通过对 logit 进行 softmax）后，这些参数决定哪些令牌成为候选，以及每个候选被选中的可能性。它们共同决定了确定性与多样性之间的权衡：低值使模型可预测且集中，高值使其富有创造性且多变。

**温度**在 softmax 步骤之前对原始 logit 进行重新缩放，有效地使概率分布趋于平坦或更尖峰。温度为 1.0 时分布不变。低于 1.0 的值使分布更尖峰——模型几乎总是选择概率最高的令牌。高于 1.0 的值使分布更平坦——更多令牌成为可能的候选，产生更令人惊讶和多样的输出。在温度为 0 时，生成变为确定性的（argmax 解码）。

**Top-K** 和 **Top-P** 是在温度缩放后应用的截断策略。Top-K 只保留概率最高的 K 个令牌，并在它们之间重新分配概率质量，丢弃所有其他令牌。Top-P（也称为核采样）动态选择累积概率质量达到阈值 P 的最小令牌集，然后从该集合中采样。Top-P 通常优于 Top-K，因为候选集的大小能适应分布的形状：当模型有把握时，核很小；当模型不确定时，核扩大以包含更多替代选项。

## 工作原理

```mermaid
flowchart LR
  L[Raw logits] -->|"divide by temperature T"| TS[Temperature-scaled logits]
  TS -->|softmax| SM[Full probability distribution]
  SM -->|"keep top-K tokens"| TK[Top-K filtered distribution]
  TK -->|"keep tokens until cumulative p ≥ P"| TP[Top-P nucleus]
  TP -->|"sample one token"| TOK[Next token]
```

这些参数按顺序应用：先温度缩放，然后 Top-K 截断，然后 Top-P 核选择，最后采样。实践中，大多数 API 只应用温度 + Top-P（OpenAI 默认）或温度 + Top-K（Anthropic 默认）；同时应用 Top-K 和 Top-P 是可能的，但不常见。

### 温度

温度 `T` 在 softmax 之前将每个原始 logit `z_i` 除以 T：`p_i = softmax(z / T)`。当 `T < 1` 时，logit 差异被放大——概率最高的令牌获得更大的概率质量份额。当 `T > 1` 时，logit 差异缩小——概率质量更均匀地分布。常用预设：`T = 0` 用于确定性提取任务，`T = 0.2-0.4` 用于事实问答，`T = 0.7-1.0` 用于创意写作，`T > 1.0` 用于最大多样性（尽管在极端值时质量会下降）。

### Top-K

Top-K 采样将候选池限制为温度缩放后概率最高的 K 个令牌。前 K 个之外的所有令牌在重新归一化之前被赋予零概率。关键限制是 K 是固定的，与分布形状无关：当模型非常有把握时，即使 K=50 也可能包含许多近零概率的令牌引入噪声；当模型不确定时，小 K 可能切断合理的替代选项。Anthropic 的 API 直接公开 `top_k` 参数；OpenAI 的 API 本机不支持它。

### Top-P（核采样）

Top-P 采样动态构建候选集。从最可能的令牌开始，向下遍历，将令牌添加到核中，直到其累积概率达到阈值 P。只有核中的令牌才被考虑采样。使用 `P = 0.9` 时，模型从共同占 90% 概率质量的令牌中采样。因为当模型有把握时核收缩（少数令牌占主导），而当它不确定时核扩大（概率质量分散），Top-P 自然适应模型的内部状态。Top-P 被 OpenAI（`top_p`）和 Anthropic（`top_p`）的 API 均支持。

## 何时使用 / 何时不适用

| 场景 | 推荐设置 | 避免 |
|------|---------|------|
| 事实问答、数据提取、分类 | `temperature=0-0.2`，`top_p=1.0` 用于近确定性输出 | 高温度；引入幻觉和格式错误 |
| 创意写作、头脑风暴、构思 | `temperature=0.8-1.0`，`top_p=0.95` 用于多样、新颖输出 | `temperature=0`；产生重复、可预测的文本 |
| 代码生成 | `temperature=0.2-0.4`，`top_p=0.95`；一些变体有助于避免局部最优 | `temperature > 0.8`；语法错误和逻辑漂移增加 |
| 自一致性（多条推理路径） | `temperature=0.6-1.0`；多样性是有意为之的 | `temperature=0`；所有路径都相同，违背目的 |
| 结构化输出提取（JSON、表格） | `temperature=0`，`top_p=1.0` 用于严格的模式遵从 | Top-P < 0.9 与高温度结合；模式违规激增 |
| 对话/聊天机器人 | `temperature=0.5-0.7`，`top_p=0.9`；在连贯性与自然性间取得平衡 | 任何方向的极端温度；过于机械或过于不连贯 |

## 代码示例

### OpenAI — 温度和 Top-P

```python
# OpenAI API call with temperature and top_p
# pip install openai

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def generate(prompt: str, temperature: float = 0.7, top_p: float = 0.95) -> str:
    """Generate text with configurable sampling parameters."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        top_p=top_p,
        max_tokens=512,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    # Deterministic factual extraction
    factual = generate(
        "List the three primary colors.",
        temperature=0.0,
        top_p=1.0,
    )
    print("Factual:", factual)

    # Creative brainstorming
    creative = generate(
        "Suggest five unusual names for a café that serves only breakfast.",
        temperature=0.9,
        top_p=0.95,
    )
    print("Creative:", creative)
```

### Anthropic — 温度和 Top-K

```python
# Anthropic API call with temperature and top_k
# pip install anthropic

import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def generate(prompt: str, temperature: float = 0.7, top_k: int = 50) -> str:
    """Generate text with configurable temperature and top-k sampling."""
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=512,
        temperature=temperature,
        top_k=top_k,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


if __name__ == "__main__":
    # Near-deterministic output for structured tasks
    deterministic = generate(
        "Translate 'hello world' into French, German, and Japanese.",
        temperature=0.0,
        top_k=1,
    )
    print("Deterministic:", deterministic)

    # Creative output with broader candidate pool
    creative = generate(
        "Write the opening sentence of a science fiction novel set on Europa.",
        temperature=1.0,
        top_k=250,
    )
    print("Creative:", creative)
```

## 实用资源

- [OpenAI — API 参考：温度和 top_p](https://platform.openai.com/docs/api-reference/chat/create) — 带有效范围和默认值的官方参数文档
- [Anthropic — API 参考：温度、top_k、top_p](https://docs.anthropic.com/en/api/messages) — Anthropic 的参数参考，包括 OpenAI 中不可用的 top_k
- [核采样论文（Holtzman 等人，2020）](https://arxiv.org/abs/1904.09751) — 引入 Top-P/核采样的原始论文，包含动机和实证结果
- [Hugging Face — 文本生成策略](https://huggingface.co/docs/transformers/generation_strategies) — 关于采样策略的综合指南，包括贪婪、束搜索、温度、Top-K 和 Top-P
- [Lilian Weng — 可控文本生成](https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/) — 在可控生成背景下深入探讨采样方法的博文

## 另请参阅

- [提示词工程](/docs/prompt-engineering)
- [最大令牌数与停止序列](/docs/prompt-engineering/max-tokens-stop-sequences)
- [结构化输出](/docs/prompt-engineering/structured-outputs)
- [自一致性](/docs/prompt-engineering/self-consistency)
- [思维链（Chain-of-thought）](/docs/reasoning-patterns/cot)
- [大型语言模型（LLMs）](/docs/llms)
