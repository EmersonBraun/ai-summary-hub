---
title: Case study — Claude
description: Anthropics anweisungsfolgendes LLM mit langem Kontext und Sicherheit.
keywords: [Claude, Anthropic, constitutional AI, long context]
---

# Case study: Claude

## Definition

Claude is Anthropic’s Familie konversationeller [LLMs](/docs/llms). Die Modelle sind gebaut für Instruktionsfolgen, langen Kontext und Sicherheit, unter Verwendung von Techhniques such as constitutional AI and RLHF-style alignment.

They share the same broad Stack as [ChatGPT](/docs/case-studies/chatgpt): pretrained base, Instruktions-Tuning, and preference-basierte Ausrichtung. Claude emphasizes long-context windows, [prompt engineering](/docs/prompt-engineering)-friendly behavior, and safety constraints. Use case: chat, long-document analysis, Programmierung, and [agent](/docs/agents)-style workflows via API and products like [Claude Code](/docs/tools/claude-code).

## Funktionsweise

A **base model** (Decoder-only [transformer](/docs/transformers)) is vortrainiert auf großen Textkorpora. **Instruction tuning** trains the model on (instruction, response) pairs. **Constitutional AI** and **RLHF** (reward model + policy optimization) shape helpfulness, honesty, and refusals. Das Ergebnis ist ein model with long context support (z. B. 100K+ tokens), suitable for documents and extended conversations. **Safety and guardrails** (content policy, refusals) are applied in the product. [RAG](/docs/rag) and tools extend Claude for specific applications.

## Anwendungsfälle

Claude fits applications that need long context, careful instruction-following, and strong safety defaults.

- Long-document Q&A, summarization, and analysis
- Coding assistance and code generation with large codebase context
- Chat and task automation with explicit safety and refusal behavior

## Externe Dokumentation

- [Anthropic – Claude](https://www.anthropic.com/product) — Models and product
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API and guides

## Siehe auch

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
