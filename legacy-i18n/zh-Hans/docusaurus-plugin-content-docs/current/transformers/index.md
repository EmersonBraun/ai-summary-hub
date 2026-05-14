---
title: Transformer
description: Transformer 架构和自注意力机制。
keywords: [Transformer, 注意力, 自注意力, BERT, GPT]
---

# Transformer

## 定义

Transformer 是基于**自注意力**的神经架构：每个 token 关注所有其他 token 以计算上下文表示。它们避免了递归并实现了并行化，可扩展到非常长的序列和大型模型（BERT、GPT 等）。

它们支撑着现代 [LLM](/docs/llms)，并已扩展到[多模态](/docs/multimodal-ai)和[视觉](/docs/cv)模型。仅编码器（[BERT](/docs/transformers/bert)）和仅解码器（[GPT](/docs/transformers/gpt)）变体如今最为常见；编码器-解码器布局仍用于序列到序列任务。

## 工作原理

- **注意力：**从输入计算 Query、Key、Value；注意力权重组合 Value。
- **多头注意力：**多个注意力头捕获不同的关系。
- **编码器-解码器或仅解码器：**编码器（如 BERT）看到完整序列；解码器（如 GPT）使用因果掩码进行自回归生成。

下图展示了一个块：输入经过多头注意力（带 add 和 norm），然后是前馈网络（FFN），再次 add 和 norm。编码器栈使用双向注意力；解码器栈使用因果（掩码）注意力，每个位置只能看到过去的 token。残差连接和层归一化稳定训练。堆叠许多这样的块并扩展宽度和深度，产生用于 [NLP](/docs/nlp) 及其他领域的大型模型。

```mermaid
flowchart LR
  A[输入] --> B[多头注意力]
  B --> C[Add & Norm]
  C --> D[FFN]
  D --> E[Add & Norm]
  E --> F[输出]
```

## 应用场景

Transformer 支撑着大多数现代 NLP 和多模态系统；仅编码器、仅解码器和编码器-解码器变体适用于不同任务。

- BERT 风格：命名实体识别、搜索相关性、问答
- GPT 风格：文本生成、代码补全、对话
- 多模态 Transformer 用于视觉-语言任务

## 优缺点

| 优点 | 缺点 |
|------|------|
| 可并行化、可扩展 | 高计算和内存需求 |
| 长距离依赖能力强 | 需要大量数据 |
| 统一架构适用于多种任务 | 可解释性挑战 |

## 外部文档

- [Attention Is All You Need (Vaswani 等人)](https://arxiv.org/abs/1706.03762) — 原始 Transformer 论文
- [Hugging Face – 模型总结](https://huggingface.co/docs/transformers/model_summary) — Transformer 模型家族
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — 架构的可视化解释

## 另请参阅

- [BERT](/docs/transformers/bert)
- [GPT](/docs/transformers/gpt)
- [LLM](/docs/llms)
