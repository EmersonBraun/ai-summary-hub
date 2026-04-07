---
title: Case study — Claude
description: LLM de Anthropic que sigue instrucciones con contexto largo y seguridad.
keywords: [Claude, Anthropic, constitutional AI, long context]
---

# Case study: Claude

## Definición

Claude is Anthropic’s familia de modelos conversacionales [LLMs](/docs/llms). Los modelos están construidos para seguimiento de instrucciones, contexto largo y seguridad, using techniques such as constitutional AI and RLHF-style alignment.

They share the same broad stack as [ChatGPT](/docs/case-studies/chatgpt): pretrained base, ajuste de instrucciones, and preference-alineamiento basado en. Claude emphasizes long-context windows, [prompt engineering](/docs/prompt-engineering)-friendly behavior, and safety constraints. Use case: chat, long-document analysis, codificación, and [agent](/docs/agents)-style workflows via API and products like [Claude Code](/docs/tools/claude-code).

## Cómo funciona

Un **modelo base** ([transformer](/docs/transformers) solo decodificador) se preentrena en grandes corpus de texto. **Ajuste de instrucciones**ing** trains the model on (instruction, response) pairs. **Constitutional AI** and **RLHF** (reward model + policy optimization) shape helpfulness, honesty, and refusals. El resultado es un model with long context support (por ej. 100K+ tokens), suitable for documents and extended conversations. **Safety and guardrails** (content policy, refusals) are applied in the product. [RAG](/docs/rag) and tools extend Claude for specific applications.

## Casos de uso

Claude fits applications that need long context, careful instruction-following, and strong safety defaults.

- Long-document Q&A, summarization, and analysis
- Coding assistance and code generation with large codebase context
- Chat and task automation with explicit safety and refusal behavior

## Documentación externa

- [Anthropic – Claude](https://www.anthropic.com/product) — Models and product
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API and guides

## Ver también

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
