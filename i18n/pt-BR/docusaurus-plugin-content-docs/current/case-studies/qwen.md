---
title: Case study — Qwen
description: Alibaba's LLM family; multilingual, coding, and long-context support.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
---

# Case study: Qwen

## Definição

Qwen is Alibaba’s família de [LLMs](/docs/llms). Os modelos são construídos para **multilingual** use (including Chinese and English), **coding** (Qwen-Coder), and **long context**, and are available as open weights and via API.

Like [DeepSeek](/docs/case-studies/deepseek) and [Claude](/docs/case-studies/claude), Qwen uses pretraining, ajuste de instruções, and alignment; differentiation includes strong multilingual and coding variants and long-context support. Use case: chat, code assistance, [RAG](/docs/rag) over long documents, and [fine-tuning](/docs/llms/fine-tuning) for domain-specific applications.

## Como funciona

**Modelos base** são pré-treinados em grandes corpus multilíngues e de código. **Ajuste de instruções** e **alinhamento** (por ex. DPO, estilo RLHF) produzem modelos de chat and tool-use variants. **Specialized versions**: Qwen-Coder for code, Qwen-VL for vision-language. **Long context** is supported via extended context windows and optional [RAG](/docs/rag). Weights are published for [local inference](/docs/local-inference) and [fine-tuning](/docs/llms/fine-tuning); API access is also offered. [Prompt engineering](/docs/prompt-engineering) and [agents](/docs/agents) extend the system for applications.

## Casos de uso

Qwen fits multilingual and coding applications and long-context workflows with open or API access.

- Multilingual chat, translation, and content generation
- Code generation and code-focused [agents](/docs/agents)
- Long-document Q&A and [RAG](/docs/rag) with large context windows

## Documentação externa

- [Qwen – Official site](https://qwenlm.github.io/) — Models and docs
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Weights and model cards

## Veja também

- [LLMs](/docs/llms)
- [Fine-tuning](/docs/llms/fine-tuning)
- [Local inference](/docs/local-inference)
