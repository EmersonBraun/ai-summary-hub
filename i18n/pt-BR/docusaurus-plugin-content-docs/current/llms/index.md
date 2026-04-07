---
title: Modelos de linguagem grandes (LLMs)
description: "Modelos de linguagem grandes: arquitetura, treinamento e capacidades."
keywords: [LLM, large language model, foundation model]
---

# Modelos de linguagem grandes (LLMs)

## Definição

Grandes modelos de linguagem são modelos baseados em transformers treinados em dados textuais massivos (e às vezes multimodais). They exhibit emergent abilities: few-shot learning, raciocínio, and tool use when scaled and aligned (por ex. via RLHF).

Um modelo mental útil: **pré-treinamento** aprende previsão do próximo token em enormes corpus e dá ao modelo amplo conhecimento and language ability. **Instruction tuning** (and similar) trains the model to follow user instructions and formats. **Alignment** (por ex. RLHF, DPO) shapes behavior to be helpful, honest, and safe. At inference time you can use the model zero-shot, few-shot, or augment it with recuperação (RAG) or tools (agents).

## Como funciona

**Pré-treinamento** aprende previsão do próximo token em grandes corpus e produz um modelo base. **Fine-tuning opcional** (por ex. [fine-tuning](/docs/llms/fine-tuning)) adapts it to tasks or instruction formats; **alignment** (por ex. RLHF, DPO) optimizes human preference and safety. The **deployed model** is then used at **inference** time. You can call it zero-shot (no examples), few-shot (with [prompt engineering](/docs/prompt-engineering)), or augment it with [RAG](/docs/rag) (recuperação as context) or [agents](/docs/agents) (tools and loops). The diagram summarizes the training pipeline and the two main inference augmentations.

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

## Vantagens e desvantagens

| Pros | Cons |
|------|------|
| Flexible, one model for many tasks | Cost and latency |
| Strong few-shot performance | Hallucination, bias |
| Enables agents and tool use | Requires careful evaluation |

## Documentação externa

- [OpenAI – Models overview](https://platform.openai.com/docs/models) — GPT and capabilities
- [Google AI for Developers](https://ai.google.dev/) — Gemini and APIs
- [Anthropic – Models](https://www.anthropic.com/product) — Claude and documentation
- [Hugging Face – NLP course](https://huggingface.co/learn/nlp-course/) — From transformers to LLMs

## Veja também

- [Fine-tuning](/docs/llms/fine-tuning)
- [Prompt engineering](/docs/prompt-engineering)
- [RAG](/docs/rag)
- [Agents](/docs/agents)
