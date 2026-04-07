---
title: Case study — Grok
description: LLM de xAI avec connaissances en temps réel et raisonnement.
keywords: [Grok, xAI, real-time, raisonnement]
---

# Case study: Grok

## Définition

Grok is a famille de [LLMs](/docs/llms) from xAI. C'est positioned around real-time or up-to-date knowledge (par ex. access to X/Twitter data) and strong raisonnement, offered via API and in X’s product experience.

Comme [ChatGPT](/docs/case-studies/chatgpt) et [Claude](/docs/case-studies/claude), Grok utilise un modèle de base pré-entraîné, un ajustement d'ajustement d'instructions, and alignment; differentiation includes real-time [RAG](/docs/rag)-style grounding and integration with X’s platform. Use case: chat, research, and applications that benefit from current information and raisonnement.

## Comment ça fonctionne

Un **modèle de base** ([transformer](/docs/transformers) décodeur seul) est pré-entraîné sur du texte à grande échelle (et optionnellement d'autres données). **L'ajustement d'instructions** and **alignment** (par ex. preference optimization) shape helpfulness and safety. **Real-time or live knowledge** is provided by retrieving and conditioning on fresh content (par ex. from X) so answers can reflect recent events. The product exposes Grok via chat and API; [prompt engineering](/docs/prompt-engineering) and tool use extend it for [agents](/docs/agents) and custom workflows.

## Cas d'utilisation

Grok fits use cases where up-to-date information and raisonnement matter more than a static training cutoff.

- Chat and research with awareness of recent news and events
- Applications that need real-time or search-augmented answers
- Integration in X and third-party products via API

## Documentation externe

- [xAI – Grok](https://x.ai/) — Product and API
- [xAI – Blog](https://x.ai/blog) — Model and capability updates

## Voir aussi

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Prompt engineering](/docs/prompt-engineering)
