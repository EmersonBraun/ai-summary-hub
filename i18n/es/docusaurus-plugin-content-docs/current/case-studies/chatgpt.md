---
title: Case study — ChatGPT
description: Cómo funcionan ChatGPT y los LLMs conversacionales.
keywords: [ChatGPT, OpenAI, conversational AI]
---

# Case study: ChatGPT

## Definición

ChatGPT es una familia de [LLMs](/docs/llms) de OpenAI. Son trained with supervised [fine-tuning](/docs/llms/fine-tuning) supervisado y aprendizaje por refuerzo a partir de retroalimentación humana (RLHF) to follow instructions and converse safely.

Ilustran el stack completo de [LLM](/docs/llms) stack: modelo base preentrenado, ajuste de instrucciones y [RL](/docs/rl)-alineamiento basado en (RLHF). Las mismas ideas (ajuste de instrucciones, preference optimization) appear in open and other proprietary models. Use case: chat, [prompt](/docs/prompt-engineering)-driven tasks, and [agent](/docs/agents)-like workflows with tools.

## Cómo funciona

Start from a **base model** (por ej. GPT-4): a [decoder-only](/docs/transformers/gpt) [transformer](/docs/transformers) preentrenado en predicción del siguiente token. **Instruction tuning**: fine-tune on (instruction, response) pairs so the model follows user intent. **RLHF**: train a **reward model** on human preference data (which of two responses is better); then optimize the **policy** (the LLM) with [reinforcement learning](/docs/rl) (por ej. PPO) to maximize the reward. El resultado es un model that is helpful, follows instructions, and is less likely to produce harmful or off-policy content. **Safety and guardrails** (content filters, refusals, monitoring) are applied in the product. [Prompt engineering](/docs/prompt-engineering) and [RAG](/docs/rag) or [agents](/docs/agents) extend the system for specific use cases.

## Casos de uso

ChatGPT-style systems fit chat, writing, code help, and task automation that benefit from instruction-following and tool use.

- Conversational assistants and customer support
- Writing, summarization, and brainstorming
- Code help, tutoring, and task automation via chat

## Documentación externa

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF and ajuste de instrucciones

## Ver también

- [LLMs](/docs/llms)
- [Reinforcement learning](/docs/rl)
- [Prompt engineering](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — Comparable conversational LLM
- [Gemini](/docs/case-studies/gemini) — Multimodal LLM family
