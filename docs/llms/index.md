---
title: Large language models (LLMs)
description: What LLMs are, how they are trained and used.
keywords: [LLM, large language model, foundation model]
tags: [beginner]
authors: [EmersonBraun]
---

# Large language models (LLMs)

## Definition

Large language models are transformer-based models trained on massive text (and sometimes multimodal) data. They exhibit emergent abilities: few-shot learning, reasoning, and tool use when scaled and aligned (e.g. via RLHF).

A useful mental model: **pretraining** learns next-token prediction on huge corpora and gives the model broad knowledge and language ability. **Instruction tuning** (and similar) trains the model to follow user instructions and formats. **Alignment** (e.g. RLHF, DPO) shapes behavior to be helpful, honest, and safe. At inference time you can use the model zero-shot, few-shot, or augment it with retrieval (RAG) or tools (agents).

## How it works

**Pretraining** learns next-token prediction on large corpora and produces a base model. **Optional fine-tuning** (e.g. [fine-tuning](/docs/llms/fine-tuning)) adapts it to tasks or instruction formats; **alignment** (e.g. RLHF, DPO) optimizes human preference and safety. The **deployed model** is then used at **inference** time. You can call it zero-shot (no examples), few-shot (with [prompt engineering](/docs/llms/prompt-engineering)), or augment it with [RAG](/docs/rag) (retrieval as context) or [agents](/docs/agents) (tools and loops). The diagram summarizes the training pipeline and the two main inference augmentations.

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

## Use cases

LLMs are used wherever you need flexible language understanding or generation, from chat to code to analysis.

- Chat, summarization, and translation
- Code assistance and generation
- Question answering and research assistance (often with RAG or tools)

## Pros and cons

| Pros | Cons |
|------|------|
| Flexible, one model for many tasks | Cost and latency |
| Strong few-shot performance | Hallucination, bias |
| Enables agents and tool use | Requires careful evaluation |

## External documentation

- [OpenAI – Models overview](https://platform.openai.com/docs/models) — GPT and capabilities
- [Google AI for Developers](https://ai.google.dev/) — Gemini and APIs
- [Anthropic – Models](https://www.anthropic.com/product) — Claude and documentation
- [Hugging Face – NLP course](https://huggingface.co/learn/nlp-course/) — From transformers to LLMs

## See also

- [Fine-tuning](/docs/llms/fine-tuning)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [RAG](/docs/rag)
- [Agents](/docs/agents)
