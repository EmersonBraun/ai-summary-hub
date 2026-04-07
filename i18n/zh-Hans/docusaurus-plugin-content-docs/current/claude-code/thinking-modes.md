---
title: 思考模式与努力级别
description: Claude Code 中的扩展思考——它是什么、努力级别如何影响推理深度与速度，以及如何为不同任务类型配置思考行为。
keywords: [扩展思考, 思考模式, 努力级别, Claude 推理, 预算 token, 思考 token, 深度推理, Claude Code]
---

# 思考模式与努力级别

## 定义

扩展思考是 Claude 模型的一项功能，使模型在产生最终响应之前，能够在专用的内部草稿空间中逐步推理问题。与可见输出不同，这个推理过程专为模型的内部审议而设计——它呈现中间结论、评估替代方案、发现自己的错误并朝向深思熟虑的答案发展。结果是在复杂任务上更准确、在模糊问题上有更好的推理，以及更不容易出现浅层模式匹配错误的响应。

在 Claude Code 中，扩展思考表现为一个**努力级别**设置，控制模型在回答之前执行多少计算工作。低努力响应快速，适合简单、明确的任务（格式化代码、解释短函数）。高努力响应投入更多推理预算，更适合复杂的架构决策、困难的调试会话，或错误代价高昂的任务。权衡始终是速度与深度：更多的思考需要更多时间并消耗更多 token。

区分扩展思考与思维链提示很重要。思维链要求模型在输出中展示其工作——推理是响应文本的一部分。扩展思考则相反，发生在模型内部处理的独立 `thinking` 块中。在 Claude Code 会话中，您有时可以在原始 API 输出中观察到 `<thinking>` 块，尽管 Claude Code 的 UI 通常只显示最终响应。内部思考不受与输出相同的约束，并针对推理质量而非可读性进行了优化。

## 工作原理

### 思考块和预算 token

启用扩展思考时，模型会接收一个额外参数：`budget_tokens`。这个整数指定模型在产生最终响应之前可以用于内部推理的最大 token 数。1,000 个 token 的预算允许简短的审议；10,000 个 token 的预算支持深入的多步骤分析。模型不会总是用完其全部预算——当达到满意的结论时就停止思考。将预算设置得比必要的高会增加延迟而没有相应的质量提升；合适的预算取决于任务复杂性。

### Claude Code 中的努力级别

Claude Code 将预算 token 的抽象概念转换为更易于理解的命名努力级别：

- **低努力（简单任务的默认值）**：最小思考预算，快速响应，适合代码格式化、简单解释、单文件编辑和查找操作。
- **中等努力**：适度的思考预算，大多数交互式编码会话的默认值；在典型开发任务中平衡速度和质量。
- **高努力/最大**：大型思考预算，保留用于复杂任务——调试难以重现的问题、设计系统、分析安全影响，或任何错误代价高昂的任务。

### 何时模型会思考

并非每个响应都会触发扩展思考。Claude Code 使用启发式方法根据任务复杂性信号确定何时需要额外推理：请求的长度和模糊性、涉及的文件数量、任务是否涉及不可逆更改，以及用户是否明确要求仔细分析。用户也可以通过在请求中添加"仔细思考这个"或"慢慢来"等短语来明确表示所需的努力——这些被模型识别为投入更多推理预算的信号。

### 流式传输和延迟

扩展思考以可预测的方式与流式传输交互：模型仅在完成内部推理后才开始流式传输其可见输出。这意味着高努力请求在输出开始之前有更长的初始暂停，但实际内容的第一个 token 完整到达，而不是增量地不确定。在 Claude Code 的 CLI 和 IDE 集成中，这显示为响应开始之前的简短"thinking..."指示符。对于交互式会话，这种延迟通常值得用于复杂任务；对于紧凑的反馈循环，保持低努力更好。

```mermaid
flowchart LR
  Request[User request] -->|complexity signals| Effort[Effort level selected]
  Effort -->|budget_tokens set| Think[Internal thinking block]
  Think -->|reasoning complete| Draft[Draft response]
  Draft -->|self-review| Final[Final response streamed]
  Final -->|delivered to| User[Developer]
```

## 何时使用 / 何时不使用

| 使用场景 | 避免场景 |
|---|---|
| 调试具有许多可能根本原因的复杂、难以重现的错误 | 请求简单的一行代码或快速的语法纠正——低努力更快且足够 |
| 设计或审查具有重大权衡的系统架构 | 每次轮次都是小步骤的交互式来回会话——延迟会积累 |
| 在合并之前分析代码更改的安全影响 | 生成遵循成熟模式的样板或脚手架 |
| 错误答案需要大量返工来修复的任务 | 在确定性和速度比推理深度更重要的 CI 管道中运行 |
| 您会交给"先思考后编码"的高级工程师的任何任务 | 在严格的 token 预算约束下工作——思考 token 计入您的使用量 |

## 优缺点

| | 优点 | 缺点 |
|---|---|---|
| **高努力** | 在复杂任务上有更好的准确性；发现边缘案例；产生有据可查的解释 | 更高的延迟；消耗更多 token；第一输出 token 前有更长暂停 |
| **低努力** | 快速响应；适合紧凑的交互式循环；更低的 token 成本 | 在复杂任务上可能遗漏边缘案例；可能对模糊问题产生浅层分析 |
| **自动努力** | 无需配置；模型根据任务复杂性校准 | 行为较难预测；对看似简单的真正困难任务可能投入不足 |

## 代码示例

```bash
# Claude Code CLI — signaling desired effort level through natural language

# Low effort (fast): simple, well-defined tasks
> Format this function to match our Prettier config

# Medium effort (default): typical coding tasks
> Refactor the UserService class to use dependency injection

# High effort: complex tasks — add "think carefully", "take your time", or "analyze deeply"
> Think carefully: this WebSocket handler occasionally drops messages under high load.
  Analyze all the possible race conditions and ordering issues in src/ws/handler.ts
  before suggesting a fix.

# High effort: architectural decisions
> Take your time to analyze the trade-offs between using Redis Pub/Sub versus
  a message queue like RabbitMQ for our notification service. Consider our
  current scale (10k concurrent users) and the team's operational experience.

# High effort: security review
> Analyze src/auth/jwt.ts carefully for security vulnerabilities. Think through
  all the attack vectors — token forgery, replay attacks, expiry bypass —
  before giving me your assessment.
```

```json
// Claude Code settings.json — configuring default thinking behavior
// Located at: ~/.claude/settings.json or .claude/settings.json in project root
{
  "thinking": {
    "defaultEffort": "medium",
    "maxBudgetTokens": 8000,
    "enableForComplexTasks": true
  }
}
```

```python
# Using extended thinking directly via the Anthropic API (for custom integrations)
import anthropic

client = anthropic.Anthropic()

# High-effort request: complex architectural question
response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=16000,
    # thinking block enables extended reasoning; budget_tokens controls depth
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # allow up to 10k tokens of internal reasoning
    },
    messages=[{
        "role": "user",
        "content": (
            "Analyze the following database schema for potential performance issues "
            "at 1M+ rows. Consider indexing strategies, query patterns, and normalization "
            "trade-offs. Schema: [paste schema here]"
        )
    }]
)

# The response content may include both thinking blocks and text blocks
for block in response.content:
    if block.type == "thinking":
        # Internal reasoning — useful for debugging model behavior
        print(f"[THINKING]: {block.thinking[:200]}...")
    elif block.type == "text":
        # Final response — the part to show the user
        print(f"[RESPONSE]: {block.text}")

# Low-effort request: simple, fast task (thinking disabled or minimal budget)
quick_response = client.messages.create(
    model="claude-haiku-4-5",  # Haiku for fast, simple tasks
    max_tokens=1024,
    # No thinking block for simple requests — faster and cheaper
    messages=[{
        "role": "user",
        "content": "Convert this array of objects to a Map keyed by id: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]"
    }]
)
print(quick_response.content[0].text)
```

## 实用资源

- [扩展思考文档——Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) — 关于思考块、预算 token、流式传输行为和 API 参数的完整参考。
- [扩展思考 Cookbook](https://github.com/anthropics/anthropic-cookbook/tree/main/extended_thinking) — 演示复杂推理任务扩展思考的实用笔记本。
- [Claude 模型比较](https://docs.anthropic.com/en/docs/about-claude/models) — 模型卡详细信息，包括哪些模型支持扩展思考及其相对能力。
- [Claude Code 设置参考](https://docs.anthropic.com/en/docs/claude-code/settings) — 在 Claude Code 中配置默认努力级别和思考行为的位置。

## 另请参阅

- [Claude Code 概述](/docs/claude-code)
- [提示缓存](/docs/claude-code/prompt-caching)
- [上下文管理](/docs/claude-code/context-management)
