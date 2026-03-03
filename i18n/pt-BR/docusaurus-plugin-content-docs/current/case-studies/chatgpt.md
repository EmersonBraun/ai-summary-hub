---
title: Case study — ChatGPT
description: Como funcionam o ChatGPT e os LLMs conversacionais.
keywords: [ChatGPT, OpenAI, conversational AI]
---

# Case study: ChatGPT

## Definição

ChatGPT é uma família de modelos conversacionais [LLMs](/docs/llms) da OpenAI. Eles são treinados com [fine-tuning](/docs/llms/fine-tuning) and reinforcement learning from human feedback (RLHF) to follow instructions and converse safely.

Eles ilustram o stack completo de [LLM](/docs/llms) stack: pretrained base model, ajuste de instruções, and [RL](/docs/rl)-based alignment (RLHF). The same ideas (ajuste de instruções, preference optimization) appear in open and other proprietary models. Use case: chat, [prompt](/docs/llms/prompt-engineering)-driven tasks, and [agent](/docs/agents)-like workflows with tools.

## Como funciona

Parte de um **modelo base** (por ex. GPT-4): um [transformer](/docs/transformers) [apenas decodificador](/docs/transformers/gpt) pré-treinado em previsão do próximo tokenction. **Instruction tuning**: fine-tune on (instruction, response) pairs so the model follows user intent. **RLHF**: train a **reward model** on human preference data (which of two responses is better); then optimize the **policy** (the LLM) with [reinforcement learning](/docs/rl) (por ex. PPO) to maximize the reward. O resultado é um model that is helpful, follows instructions, and is less likely to produce harmful or off-policy content. **Safety and guardrails** (content filters, refusals, monitoring) are applied in the product. [Prompt engineering](/docs/llms/prompt-engineering) and [RAG](/docs/rag) or [agents](/docs/agents) extend the system for specific use cases.

## Casos de uso

ChatGPT-style systems fit chat, writing, code help, and task automation that benefit from instruction-following and tool use.

- Conversational assistants and customer support
- Writing, summarization, and brainstorming
- Code help, tutoring, and task automation via chat

## Documentação externa

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF and ajuste de instruções

## Veja também

- [LLMs](/docs/llms)
- [Reinforcement learning](/docs/rl)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [Claude](/docs/case-studies/claude) — Comparable conversational LLM
- [Gemini](/docs/case-studies/gemini) — Multimodal LLM family
