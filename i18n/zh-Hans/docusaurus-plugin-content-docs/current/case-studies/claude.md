---
title: Case study — Claude
description: Anthropic 的指令遵循大语言模型，支持长上下文和安全性。
keywords: [Claude, Anthropic, constitutional AI, long context]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Claude

## 定义

Claude 是 Anthropic 的一系列对话式 [LLMs](/docs/llms)。这些模型专为指令遵循、长上下文和安全性而构建，使用了宪法 AI 和 RLHF 风格对齐等技术。

它们与 [ChatGPT](/docs/case-studies/chatgpt) 共享相同的广泛技术栈：预训练基础、指令调优和基于偏好的对齐。Claude 强调长上下文窗口、对[提示词工程](/docs/prompt-engineering)友好的行为和安全约束。使用场景：聊天、长文档分析、编程，以及通过 API 和 [Claude Code](/docs/tools/claude-code) 等产品进行的类[智能体](/docs/agents)工作流。

## 工作原理

**基础模型**（仅解码器 [transformer](/docs/transformers)）在大型文本语料库上预训练。**指令调优**在（指令，响应）对上训练模型。**宪法 AI** 和 **RLHF**（奖励模型 + 策略优化）塑造有用性、诚实性和拒绝能力。结果是一个具有长上下文支持（例如 100K+ tokens）的模型，适合处理文档和扩展对话。**安全与防护**（内容策略、拒绝）在产品中应用。[RAG](/docs/rag) 和工具将 Claude 扩展到特定应用。

## 应用场景

Claude 适合需要长上下文、仔细遵循指令和强安全默认值的应用程序。

- 长文档问答、摘要和分析
- 代码辅助和大型代码库上下文中的代码生成
- 具有明确安全和拒绝行为的聊天和任务自动化

## 外部文档

- [Anthropic – Claude](https://www.anthropic.com/product) — 模型和产品
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API 和指南

## 另请参阅

- [LLMs](/docs/llms)
- [提示词工程](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
