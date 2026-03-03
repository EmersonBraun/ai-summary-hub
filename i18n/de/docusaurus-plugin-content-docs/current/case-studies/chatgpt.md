---
title: Case study — ChatGPT
description: Wie ChatGPT und konversationelle LLMs funktionieren.
keywords: [ChatGPT, OpenAI, conversational AI]
---

# Case study: ChatGPT

## Definition

ChatGPT ist eine Familie von konversationellen [LLMs](/docs/llms) von OpenAI. Sie sind trained with supervised [Feinabstimmung](/docs/llms/fine-tuning) und Reinforcement Learning aus menschlichem Feedback trainiert (RLHF) to follow instructions and converse safely.

They illustrate die vollständige [LLM](/docs/llms) Stack: vortrainiertes Basismodell, Instruktions-Tuning und [RL](/docs/rl)-basierte Ausrichtung (RLHF). Die gleichen Ideen (Instruktions-Tuning, Präferenzoptimierung) appear in open and other proprietary models. Use case: chat, [prompt](/docs/llms/prompt-engineering)-driven tasks, and [agent](/docs/agents)-like workflows with tools.

## Funktionsweise

Start from a **base model** (z. B. GPT-4): a [Decoder-only](/docs/transformers/gpt) [transformer](/docs/transformers) vortrainiert auf Next-Token-Vorhersage. **Instruction tuning**: fine-tune on (instruction, response) pairs sodass das model follows user intent. **RLHF**: train a **reward model** on human preference data (which of two responses is better); then optimize the **policy** (the LLM) with [reinforcement learning](/docs/rl) (z. B. PPO) to maximize the reward. Das Ergebnis ist ein model that is helpful, follows instructions, and is less likely to produce harmful or off-policy content. **Safety and guardrails** (content filters, refusals, monitoring) are applied in the product. [Prompt engineering](/docs/llms/prompt-engineering) and [RAG](/docs/rag) or [agents](/docs/agents) extend the system for specific use cases.

## Anwendungsfälle

ChatGPT-style systems fit chat, writing, code help, and task automation that benefit from instruction-following and tool use.

- Conversational assistants and customer support
- Writing, summarization, and brainstorming
- Code help, tutoring, and task automation via chat

## Externe Dokumentation

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF and Instruktions-Tuning

## Siehe auch

- [LLMs](/docs/llms)
- [Reinforcement learning](/docs/rl)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [Claude](/docs/case-studies/claude) — Comparable conversational LLM
- [Gemini](/docs/case-studies/gemini) — Multimodal LLM family
