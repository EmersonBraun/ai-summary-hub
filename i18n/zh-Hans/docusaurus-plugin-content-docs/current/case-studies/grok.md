---
title: Case study — Grok
description: xAI 的大语言模型，具有实时知识和推理能力。
keywords: [Grok, xAI, real-time, 推理]
---

# Case study: Grok

## 定义

Grok is a 家族 [LLMs](/docs/llms) from xAI. 它是 positioned around real-time or up-to-date knowledge (例如 access to X/Twitter data) and strong 推理, offered via API and in X’s product experience.

Like [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), Grok uses a pretrained base, 指令调优, and alignment; differentiation includes real-time [RAG](/docs/rag)-style grounding and integration with X’s platform. Use case: chat, research, and applications that benefit from current information and 推理.

## 工作原理

一个**基础模型**（仅解码器 [transformer](/docs/transformers)）在大规模文本（和可选的其他数据）上预训练。**指令调优** and **alignment** (例如 preference optimization) shape helpfulness and safety. **Real-time or live knowledge** is provided by retrieving and conditioning on fresh content (例如 from X) so answers can reflect recent events. The product exposes Grok via chat and API; [prompt engineering](/docs/prompt-engineering) and tool use extend it for [agents](/docs/agents) and custom workflows.

## 应用场景

Grok fits use cases where up-to-date information and 推理 matter more than a static training cutoff.

- Chat and research with awareness of recent news and events
- Applications that need real-time or search-augmented answers
- Integration in X and third-party products via API

## 外部文档

- [xAI – Grok](https://x.ai/) — Product and API
- [xAI – Blog](https://x.ai/blog) — Model and capability updates

## 另请参阅

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Prompt engineering](/docs/prompt-engineering)
