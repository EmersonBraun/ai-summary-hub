---
title: Case study — Grok
description: LLM da xAI com conhecimento em tempo real e raciocínio.
keywords: [Grok, xAI, real-time, raciocínio]
---

# Case study: Grok

## Definição

Grok is a família de [LLMs](/docs/llms) from xAI. É positioned around real-time or up-to-date knowledge (por ex. access to X/Twitter data) and strong raciocínio, offered via API and in X’s product experience.

Assim como [ChatGPT](/docs/case-studies/chatgpt) e [Claude](/docs/case-studies/claude), o Grok usa um modelo base pré-treinado, ajuste de instruçõtion tuning, and alignment; differentiation includes real-time [RAG](/docs/rag)-style grounding and integration with X’s platform. Use case: chat, research, and applications that benefit from current information and raciocínio.

## Como funciona

Um **modelo base** ([transformer](/docs/transformers) apenas decodificador) é pré-treinado em texto em larga escala (e opcionalmente outros dados). **Ajuste de instruções** and **alignment** (por ex. preference optimization) shape helpfulness and safety. **Real-time or live knowledge** is provided by retrieving and conditioning on fresh content (por ex. from X) so answers can reflect recent events. The product exposes Grok via chat and API; [prompt engineering](/docs/llms/prompt-engineering) and tool use extend it for [agents](/docs/agents) and custom workflows.

## Casos de uso

Grok fits use cases where up-to-date information and raciocínio matter more than a static training cutoff.

- Chat and research with awareness of recent news and events
- Applications that need real-time or search-augmented answers
- Integration in X and third-party products via API

## Documentação externa

- [xAI – Grok](https://x.ai/) — Product and API
- [xAI – Blog](https://x.ai/blog) — Model and capability updates

## Veja também

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Prompt engineering](/docs/llms/prompt-engineering)
