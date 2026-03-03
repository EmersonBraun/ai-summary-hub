---
title: Case study — Qwen
description: Alibaba's LLM family; multilingual, Programmierung, and long-context support.
keywords: [Qwen, Alibaba, multilingual, Programmierung, long context]
---

# Case study: Qwen

## Definition

Qwen is Alibaba’s Familie von [LLMs](/docs/llms). Die Modelle sind gebaut für **multilingual** use (einschließlich Chinesisch und Englisch), **Programmierung** (Qwen-Coder), and **long context**, and are available as open weights and via API.

Like [DeepSeek](/docs/case-studies/deepseek) and [Claude](/docs/case-studies/claude), Qwen uses pretraining, Instruktions-Tuning, and alignment; differentiation includes strong multilingual and Programmierung variants and long-context support. Use case: chat, code assistance, [RAG](/docs/rag) over long documents, and [Feinabstimmung](/docs/llms/fine-tuning) for domain-specific applications.

## Funktionsweise

**Base models** are vortrainiert auf großen mehrsprachigen und Code-Korpora. **Instruction tuning** and **alignment** (z. B. DPO, RLHF-style) produce chat and tool-use variants. **Specialized versions**: Qwen-Coder for code, Qwen-VL for vision-language. **Long context** is supported via extended context windows and optional [RAG](/docs/rag). Weights are published for [local inference](/docs/local-inference) and [Feinabstimmung](/docs/llms/fine-tuning); API access is also offered. [Prompt engineering](/docs/llms/prompt-engineering) and [agents](/docs/agents) extend the system for applications.

## Anwendungsfälle

Qwen fits multilingual and Programmierung applications and long-context workflows with open or API access.

- Multilingual chat, translation, and content generation
- Code generation and code-focused [agents](/docs/agents)
- Long-document Q&A and [RAG](/docs/rag) with large context windows

## Externe Dokumentation

- [Qwen – Official site](https://qwenlm.github.io/) — Models and docs
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Weights and model cards

## Siehe auch

- [LLMs](/docs/llms)
- [Fine-tuning](/docs/llms/fine-tuning)
- [Local inference](/docs/local-inference)
