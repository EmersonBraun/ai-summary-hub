---
title: Case study — Qwen
description: Alibaba's LLM family; multilingual, codificación, and long-context support.
keywords: [Qwen, Alibaba, multilingual, codificación, long context]
---

# Case study: Qwen

## Definición

Qwen is Alibaba’s familia de [LLMs](/docs/llms). Los modelos están construidos para **multilingual** use (incluyendo chino e inglés), **codificación** (Qwen-Coder), and **long context**, and are available as open weights and via API.

Like [DeepSeek](/docs/case-studies/deepseek) and [Claude](/docs/case-studies/claude), Qwen uses pretraining, ajuste de instrucciones, and alignment; differentiation includes strong multilingual and codificación variants and long-context support. Use case: chat, code assistance, [RAG](/docs/rag) over long documents, and [fine-tuning](/docs/llms/fine-tuning) for domain-specific applications.

## Cómo funciona

**Base models** se preentrenan en large multilingual and code corpora. **Instruction tuning** and **alignment** (por ej. DPO, RLHF-style) produce chat and tool-use variants. **Specialized versions**: Qwen-Coder for code, Qwen-VL for vision-language. **Long context** is supported via extended context windows and optional [RAG](/docs/rag). Weights are published for [local inference](/docs/local-inference) and [fine-tuning](/docs/llms/fine-tuning); API access is also offered. [Prompt engineering](/docs/llms/prompt-engineering) and [agents](/docs/agents) extend the system for applications.

## Casos de uso

Qwen fits multilingual and codificación applications and long-context workflows with open or API access.

- Multilingual chat, translation, and content generation
- Code generation and code-focused [agents](/docs/agents)
- Long-document Q&A and [RAG](/docs/rag) with large context windows

## Documentación externa

- [Qwen – Official site](https://qwenlm.github.io/) — Models and docs
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Weights and model cards

## Ver también

- [LLMs](/docs/llms)
- [Fine-tuning](/docs/llms/fine-tuning)
- [Local inference](/docs/local-inference)
