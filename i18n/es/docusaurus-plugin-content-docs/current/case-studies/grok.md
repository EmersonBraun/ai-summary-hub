---
title: Case study — Grok
description: LLM de xAI con conocimiento en tiempo real y razonamiento.
keywords: [Grok, xAI, real-time, razonamiento]
---

# Case study: Grok

## Definición

Grok es una familia de [LLMs](/docs/llms) from xAI. Es positioned around real-time or up-to-date knowledge (por ej. access to X/Twitter data) and strong razonamiento, offered via API and in X’s product experience.

Like [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), Grok usa un modelo base preentrenado, ajuste de instrucciones y alineamiento; differentiation includes real-time [RAG](/docs/rag)-style grounding and integration with X’s platform. Use case: chat, research, and applications that benefit from current information and razonamiento.

## Cómo funciona

Un **modelo base** ([transformer](/docs/transformers) solo decodificador) se preentrena en texto a gran escala (y opcionalmente otros datos). **Ajuste de instrucciones** and **alignment** (por ej. preference optimization) shape helpfulness and safety. **Real-time or live knowledge** is provided by retrieving and conditioning on fresh content (por ej. from X) so answers can reflect recent events. The product exposes Grok via chat and API; [prompt engineering](/docs/prompt-engineering) and tool use extend it for [agents](/docs/agents) and custom workflows.

## Casos de uso

Grok fits use cases where up-to-date information and razonamiento matter more than a static training cutoff.

- Chat and research with awareness of recent news and events
- Applications that need real-time or search-augmented answers
- Integration in X and third-party products via API

## Documentación externa

- [xAI – Grok](https://x.ai/) — Product and API
- [xAI – Blog](https://x.ai/blog) — Model and capability updates

## Ver también

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Prompt engineering](/docs/prompt-engineering)
