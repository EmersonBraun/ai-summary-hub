---
title: Case study — ChatGPT
description: Comment fonctionnent ChatGPT et les LLM conversationnels.
keywords: [ChatGPT, OpenAI, conversational AI]
---

# Case study: ChatGPT

## Définition

ChatGPT is a famille de modèles conversationnels [LLMs](/docs/llms) d'OpenAI. Ils sont trained with supervised [fine-tuning](/docs/llms/fine-tuning) and reinforcement learning from human feedback (RLHF) to follow instructions and converse safely.

Ils illustrent le stack complet de [LLM](/docs/llms) stack: pretrained base model, ajustement d'instructions, and [RL](/docs/rl)-based alignment (RLHF). The same ideas (ajustement d'instructions, preference optimization) appear in open and other proprietary models. Use case: chat, [prompt](/docs/prompt-engineering)-driven tasks, and [agent](/docs/agents)-like workflows with tools.

## Comment ça fonctionne

Start from a **base model** (par ex. GPT-4): a [decoder-only](/docs/transformers/gpt) [transformer](/docs/transformers) pré-entraîné sur prédiction du prochain token. **Instruction tuning**: fine-tune on (instruction, response) pairs so the model follows user intent. **RLHF**: train a **reward model** on human preference data (which of two responses is better); then optimize the **policy** (the LLM) with [reinforcement learning](/docs/rl) (par ex. PPO) to maximize the reward. Le résultat est un model that is helpful, follows instructions, and is less likely to produce harmful or off-policy content. **Safety and guardrails** (content filters, refusals, monitoring) are applied in the product. [Prompt engineering](/docs/prompt-engineering) and [RAG](/docs/rag) or [agents](/docs/agents) extend the system for specific use cases.

## Cas d'utilisation

ChatGPT-style systems fit chat, writing, code help, and task automation that benefit from instruction-following and tool use.

- Conversational assistants and customer support
- Writing, summarization, and brainstorming
- Code help, tutoring, and task automation via chat

## Documentation externe

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF and ajustement d'instructions

## Voir aussi

- [LLMs](/docs/llms)
- [Reinforcement learning](/docs/rl)
- [Prompt engineering](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — Comparable conversational LLM
- [Gemini](/docs/case-studies/gemini) — Multimodal LLM family
