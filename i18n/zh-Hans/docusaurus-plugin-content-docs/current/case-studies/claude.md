---
title: Case study — Claude
description: Anthropic 的指令遵循大语言模型，支持长上下文和安全性。
keywords: [Claude, Anthropic, constitutional AI, long context]
---

# Case study: Claude

## 定义

Claude is Anthropic’s 对话式模型家族 [LLMs](/docs/llms). 这些模型专为以下目的构建 instruction-following, long context, and safety, using techniques such as constitutional AI and RLHF-style alignment.

They share the same broad stack as [ChatGPT](/docs/case-studies/chatgpt): pretrained base, 指令调优, and preference-based alignment. Claude emphasizes long-context windows, [prompt engineering](/docs/llms/prompt-engineering)-friendly behavior, and safety constraints. Use case: chat, long-document analysis, coding, and [agent](/docs/agents)-style workflows via API and products like [Claude Code](/docs/tools/claude-code).

## 工作原理

一个**基础模型**（仅解码器 [transformer](/docs/transformers)）在大型文本语料库上预训练。**指令调优**ing** trains the model on (instruction, response) pairs. **Constitutional AI** and **RLHF** (reward model + policy optimization) shape helpfulness, honesty, and refusals. 结果是一个 model with long context support (例如 100K+ tokens), suitable for documents and extended conversations. **Safety and guardrails** (content policy, refusals) are applied in the product. [RAG](/docs/rag) and tools extend Claude for specific applications.

## 应用场景

Claude fits applications that need long context, careful instruction-following, and strong safety defaults.

- Long-document Q&A, summarization, and analysis
- Coding assistance and code generation with large codebase context
- Chat and task automation with explicit safety and refusal behavior

## 外部文档

- [Anthropic – Claude](https://www.anthropic.com/product) — Models and product
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API and guides

## 另请参阅

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
