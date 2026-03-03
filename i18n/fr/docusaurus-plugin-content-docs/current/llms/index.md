---
title: Grands modèles de langage (LLM)
description: "Grands modèles de langage : architecture, entraînement et capacités."
keywords: [LLM, large language model, foundation model]
---

# Grands modèles de langage (LLM)

## Définition

Les grands modèles de langage sont des modèles basés sur les transformers entraînés sur des données textuelles massives (et parfois multimodales). They exhibit emergent abilities: few-shot learning, raisonnement, and tool use when scaled and aligned (par ex. via RLHF).

Un modèle mental utile : le **pré-entraînement** apprend la prédiction du prochain token sur d'énormes corpus et donne au modèle une large connaissance and language ability. **Instruction tuning** (and similar) trains the model to follow user instructions and formats. **Alignment** (par ex. RLHF, DPO) shapes behavior to be helpful, honest, and safe. At inference time you can use the model zero-shot, few-shot, or augment it with récupération (RAG) or tools (agents).

## Comment ça fonctionne

**Pretraining** learns prédiction du prochain token on large corpora and produces a base model. **Optional fine-tuning** (par ex. [fine-tuning](/docs/llms/fine-tuning)) adapts it to tasks or instruction formats; **alignment** (par ex. RLHF, DPO) optimizes human preference and safety. The **deployed model** is then used at **inference** time. You can call it zero-shot (no examples), few-shot (with [prompt engineering](/docs/llms/prompt-engineering)), or augment it with [RAG](/docs/rag) (récupération as context) or [agents](/docs/agents) (tools and loops). The diagram summarizes the training pipeline and the two main inference augmentations.

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

## Cas d'utilisation

LLMs are used wherever you need flexible language understanding or generation, from chat to code to analysis.

- Chat, summarization, and translation
- Code assistance and generation
- Question answering and research assistance (often with RAG or tools)

## Avantages et inconvénients

| Pros | Cons |
|------|------|
| Flexible, one model for many tasks | Cost and latency |
| Strong few-shot performance | Hallucination, bias |
| Enables agents and tool use | Requires careful evaluation |

## Documentation externe

- [OpenAI – Models overview](https://platform.openai.com/docs/models) — GPT and capabilities
- [Google AI for Developers](https://ai.google.dev/) — Gemini and APIs
- [Anthropic – Models](https://www.anthropic.com/product) — Claude and documentation
- [Hugging Face – NLP course](https://huggingface.co/learn/nlp-course/) — From transformers to LLMs

## Voir aussi

- [Fine-tuning](/docs/llms/fine-tuning)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [RAG](/docs/rag)
- [Agents](/docs/agents)
