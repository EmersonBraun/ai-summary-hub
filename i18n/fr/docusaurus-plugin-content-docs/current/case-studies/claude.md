---
title: Case study — Claude
description: LLM d'Anthropic suivant les instructions avec contexte long et sécurité.
keywords: [Claude, Anthropic, constitutional AI, long context]
---

# Case study: Claude

## Définition

Claude is Anthropic’s famille de modèles conversationnels [LLMs](/docs/llms). Les modèles sont conçus pour instruction-following, long context, and safety, using techniques such as constitutional AI and RLHF-style alignment.

They share the same broad stack as [ChatGPT](/docs/case-studies/chatgpt): pretrained base, ajustement d'instructions, and preference-based alignment. Claude emphasizes long-context windows, [prompt engineering](/docs/prompt-engineering)-friendly behavior, and safety constraints. Use case: chat, long-document analysis, coding, and [agent](/docs/agents)-style workflows via API and products like [Claude Code](/docs/tools/claude-code).

## Comment ça fonctionne

Un **modèle de base** ([transformer](/docs/transformers) décodeur seul) est pré-entraîné sur de grands corpus de texte. **L'ajustement d'instructions**ing** trains the model on (instruction, response) pairs. **Constitutional AI** and **RLHF** (reward model + policy optimization) shape helpfulness, honesty, and refusals. Le résultat est un model with long context support (par ex. 100K+ tokens), suitable for documents and extended conversations. **Safety and guardrails** (content policy, refusals) are applied in the product. [RAG](/docs/rag) and tools extend Claude for specific applications.

## Cas d'utilisation

Claude fits applications that need long context, careful instruction-following, and strong safety defaults.

- Long-document Q&A, summarization, and analysis
- Coding assistance and code generation with large codebase context
- Chat and task automation with explicit safety and refusal behavior

## Documentation externe

- [Anthropic – Claude](https://www.anthropic.com/product) — Models and product
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API and guides

## Voir aussi

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
