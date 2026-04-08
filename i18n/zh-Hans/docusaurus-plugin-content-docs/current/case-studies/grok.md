---
title: Case study — Grok
description: xAI 的大语言模型，具有实时知识和推理能力。
keywords: [Grok, xAI, real-time, 推理]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Grok

## 定义

Grok 是 xAI 的一系列 [LLMs](/docs/llms)。它围绕实时或最新知识（例如访问 X/Twitter 数据）和强大推理能力进行定位，通过 API 和 X 的产品体验提供。

与 [ChatGPT](/docs/case-studies/chatgpt) 和 [Claude](/docs/case-studies/claude) 一样，Grok 使用预训练基础、指令调优和对齐；差异化包括实时 [RAG](/docs/rag) 风格的锚定和与 X 平台的集成。使用场景：受益于当前信息和推理的聊天、研究和应用程序。

## 工作原理

**基础模型**（仅解码器 [transformer](/docs/transformers)）在大规模文本（以及可选的其他数据）上预训练。**指令调优**和**对齐**（例如偏好优化）塑造有用性和安全性。**实时或动态知识**通过检索和以新鲜内容为条件（例如来自 X）来提供，使答案能够反映近期事件。该产品通过聊天和 API 暴露 Grok；[提示词工程](/docs/prompt-engineering)和工具使用将其扩展到[智能体](/docs/agents)和自定义工作流。

## 应用场景

Grok 适合最新信息和推理比静态训练截止日期更重要的用例。

- 具有近期新闻和事件意识的聊天和研究
- 需要实时或搜索增强答案的应用程序
- 通过 API 在 X 和第三方产品中集成

## 外部文档

- [xAI – Grok](https://x.ai/) — 产品和 API
- [xAI – Blog](https://x.ai/blog) — 模型和能力更新

## 另请参阅

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [提示词工程](/docs/prompt-engineering)
