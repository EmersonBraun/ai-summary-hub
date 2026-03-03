---
title: Modelos de lenguaje grandes (LLMs)
description: "Modelos de lenguaje grandes: arquitectura, entrenamiento y capacidades."
keywords: [LLM, large language model, foundation model]
---

# Modelos de lenguaje grandes (LLMs)

## Definición

Los grandes modelos de lenguaje son modelos basados en transformers entrenados con datos textuales masivos (y a veces multimodales). They exhibit emergent abilities: few-shot learning, razonamiento, and tool use when scaled and aligned (por ej. via RLHF).

Un modelo mental útil: **preentrenamiento** aprende predicción del siguiente token en enormes corpus y da al modelo amplio conocimiento y lenguaje ability. **Instruction tuning** (and similar) trains the model to follow user instructions and formats. **Alignment** (por ej. RLHF, DPO) shapes behavior to be helpful, honest, and safe. At inference time you can use the model zero-shot, few-shot, or augment it with recuperación (RAG) or tools (agents).

## Cómo funciona

**Pretraining** learns predicción del siguiente token on large corpora and produce a base model. **Optional fine-tuning** (por ej. [fine-tuning](/docs/llms/fine-tuning)) adapts it to tasks or instruction formats; **alignment** (por ej. RLHF, DPO) optimizes human preference and safety. The **deployed model** is then used at **inference** time. You can call it zero-shot (no examples), few-shot (with [prompt engineering](/docs/llms/prompt-engineering)), or augment it with [RAG](/docs/rag) (recuperación as context) or [agents](/docs/agents) (tools and loops). The diagram summarizes the training pipeline and the two main inference augmentations.

```mermaid
flowchart LR
  Data[Raw text] --> Pretrain[Pretraining]
  Pretrain --> Base[Base model]
  Base --> Tune[Optional fine-tuning]
  Tune --> Align[Optional alignment]
  Align --> Deploy[Deployed model]
  Deploy --> Infer[Inference]
  RAG[RAG] --> Infer
  Tools["Tools / Agents"] --> Infer
```

## Casos de uso

LLMs are used wherever you need flexible language understanding or generation, from chat to code to analysis.

- Chat, summarization, and translation
- Code assistance and generation
- Question answering and research assistance (often with RAG or tools)

## Ventajas y desventajas

| Pros | Cons |
|------|------|
| Flexible, one model for many tasks | Cost and latency |
| Strong few-shot performance | Hallucination, bias |
| Enables agents and tool use | Requires careful evaluation |

## Documentación externa

- [OpenAI – Models overview](https://platform.openai.com/docs/models) — GPT and capabilities
- [Google AI for Developers](https://ai.google.dev/) — Gemini and APIs
- [Anthropic – Models](https://www.anthropic.com/product) — Claude and documentation
- [Hugging Face – NLP course](https://huggingface.co/learn/nlp-course/) — From transformers to LLMs

## Ver también

- [Fine-tuning](/docs/llms/fine-tuning)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [RAG](/docs/rag)
- [Agents](/docs/agents)
