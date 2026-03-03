---
title: Case study — Qwen
description: Alibaba's LLM family; multilingual, coding, and long-context support.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
---

# Case study: Qwen

## Définition

Qwen is Alibaba’s famille de [LLMs](/docs/llms). Les modèles sont conçus pour **multilingual** use (including Chinese and English), **coding** (Qwen-Coder), and **long context**, and are available as open weights and via API.

Like [DeepSeek](/docs/case-studies/deepseek) and [Claude](/docs/case-studies/claude), Qwen uses pretraining, ajustement d'instructions, and alignment; differentiation includes strong multilingual and coding variants and long-context support. Use case: chat, code assistance, [RAG](/docs/rag) over long documents, and [fine-tuning](/docs/llms/fine-tuning) for domain-specific applications.

## Comment ça fonctionne

**Base models** sont pré-entraînés sur large multilingual and code corpora. **Instruction tuning** and **alignment** (par ex. DPO, RLHF-style) produce chat and tool-use variants. **Specialized versions**: Qwen-Coder for code, Qwen-VL for vision-language. **Long context** is supported via extended context windows and optional [RAG](/docs/rag). Weights are published for [local inference](/docs/local-inference) and [fine-tuning](/docs/llms/fine-tuning); API access is also offered. [Prompt engineering](/docs/llms/prompt-engineering) and [agents](/docs/agents) extend the system for applications.

## Cas d'utilisation

Qwen fits multilingual and coding applications and long-context workflows with open or API access.

- Multilingual chat, translation, and content generation
- Code generation and code-focused [agents](/docs/agents)
- Long-document Q&A and [RAG](/docs/rag) with large context windows

## Documentation externe

- [Qwen – Official site](https://qwenlm.github.io/) — Models and docs
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Weights and model cards

## Voir aussi

- [LLMs](/docs/llms)
- [Fine-tuning](/docs/llms/fine-tuning)
- [Local inference](/docs/local-inference)
