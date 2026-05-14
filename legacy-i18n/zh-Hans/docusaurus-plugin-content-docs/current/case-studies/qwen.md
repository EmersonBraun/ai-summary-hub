---
title: Case study — Qwen
description: 阿里巴巴的大语言模型家族；多语言、编程和长上下文支持。
keywords: [Qwen, Alibaba, multilingual, coding, long context]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: Qwen

## 定义

Qwen 是阿里巴巴的 [LLMs](/docs/llms) 系列。这些模型专为**多语言**使用（包括中文和英文）、**编程**（Qwen-Coder）和**长上下文**而构建，以开放权重和 API 形式提供。

与 [DeepSeek](/docs/case-studies/deepseek) 和 [Claude](/docs/case-studies/claude) 一样，Qwen 使用预训练、指令调优和对齐；差异化包括强大的多语言和编程变体以及长上下文支持。使用场景：聊天、代码辅助、长文档上的 [RAG](/docs/rag) 以及针对特定领域应用的[微调](/docs/llms/fine-tuning)。

## 工作原理

**基础模型**在大型多语言和代码语料库上预训练。**指令调优**和**对齐**（例如 DPO、RLHF 风格）生成聊天和工具使用变体。**专用版本**：Qwen-Coder 用于代码，Qwen-VL 用于视觉语言。**长上下文**通过扩展上下文窗口和可选的 [RAG](/docs/rag) 来支持。权重发布用于[本地推理](/docs/local-inference)和[微调](/docs/llms/fine-tuning)；也提供 API 访问。[提示词工程](/docs/prompt-engineering)和[智能体](/docs/agents)将系统扩展到应用程序。

## 应用场景

Qwen 适合多语言和编程应用，以及具有开放或 API 访问的长上下文工作流。

- 多语言聊天、翻译和内容生成
- 代码生成和以代码为中心的[智能体](/docs/agents)
- 长文档问答和大上下文窗口上的 [RAG](/docs/rag)

## 外部文档

- [Qwen – Official site](https://qwenlm.github.io/) — 模型和文档
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — 权重和模型卡

## 另请参阅

- [LLMs](/docs/llms)
- [微调](/docs/llms/fine-tuning)
- [本地推理](/docs/local-inference)
