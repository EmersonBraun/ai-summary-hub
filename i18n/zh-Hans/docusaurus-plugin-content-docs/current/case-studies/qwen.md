---
title: Case study — Qwen
description: Alibaba's LLM family; multilingual, coding, and long-context support.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
---

# Case study: Qwen

## 定义

Qwen is Alibaba’s 家族 [LLMs](/docs/llms). 这些模型专为以下目的构建 **multilingual** use (including Chinese and English), **coding** (Qwen-Coder), and **long context**, and are available as open weights and via API.

Like [DeepSeek](/docs/case-studies/deepseek) and [Claude](/docs/case-studies/claude), Qwen uses pretraining, 指令调优, and alignment; differentiation includes strong multilingual and coding variants and long-context support. Use case: chat, code assistance, [RAG](/docs/rag) over long documents, and [fine-tuning](/docs/llms/fine-tuning) for domain-specific applications.

## 工作原理

**Base models** 在...上预训练 large multilingual and code corpora. **Instruction tuning** and **alignment** (例如 DPO, RLHF-style) produce chat and tool-use variants. **Specialized versions**: Qwen-Coder for code, Qwen-VL for vision-language. **Long context** is supported via extended context windows and optional [RAG](/docs/rag). Weights are published for [local inference](/docs/local-inference) and [fine-tuning](/docs/llms/fine-tuning); API access is also offered. [Prompt engineering](/docs/prompt-engineering) and [agents](/docs/agents) extend the system for applications.

## 应用场景

Qwen fits multilingual and coding applications and long-context workflows with open or API access.

- Multilingual chat, translation, and content generation
- Code generation and code-focused [agents](/docs/agents)
- Long-document Q&A and [RAG](/docs/rag) with large context windows

## 外部文档

- [Qwen – Official site](https://qwenlm.github.io/) — Models and docs
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Weights and model cards

## 另请参阅

- [LLMs](/docs/llms)
- [Fine-tuning](/docs/llms/fine-tuning)
- [Local inference](/docs/local-inference)
