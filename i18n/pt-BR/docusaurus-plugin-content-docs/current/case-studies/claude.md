---
title: Case study — Claude
description: LLM da Anthropic que segue instruções com contexto longo e segurança.
keywords: [Claude, Anthropic, constitutional AI, long context]
---

# Case study: Claude

## Definição

Claude is Anthropic’s família de modelos conversacionais [LLMs](/docs/llms). Os modelos são construídos para instruction-following, long context, and safety, using techniques such as constitutional AI and RLHF-style alignment.

They share the same broad stack as [ChatGPT](/docs/case-studies/chatgpt): pretrained base, ajuste de instruções, and preference-based alignment. Claude emphasizes long-context windows, [prompt engineering](/docs/llms/prompt-engineering)-friendly behavior, and safety constraints. Use case: chat, long-document analysis, coding, and [agent](/docs/agents)-style workflows via API and products like [Claude Code](/docs/tools/claude-code).

## Como funciona

Um **modelo base** ([transformer](/docs/transformers) apenas decodificador) é pré-treinado em grandes corpus de texto. **Ajuste de instruções**ing** trains the model on (instruction, response) pairs. **Constitutional AI** and **RLHF** (reward model + policy optimization) shape helpfulness, honesty, and refusals. O resultado é um model with long context support (por ex. 100K+ tokens), suitable for documents and extended conversations. **Safety and guardrails** (content policy, refusals) are applied in the product. [RAG](/docs/rag) and tools extend Claude for specific applications.

## Casos de uso

Claude fits applications that need long context, careful instruction-following, and strong safety defaults.

- Long-document Q&A, summarization, and analysis
- Coding assistance and code generation with large codebase context
- Chat and task automation with explicit safety and refusal behavior

## Documentação externa

- [Anthropic – Claude](https://www.anthropic.com/product) — Models and product
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API and guides

## Veja também

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
