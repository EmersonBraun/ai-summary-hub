---
title: Case study — Grok
description: xAIs LLM mit Echtzeit-Wissen und Reasoning.
keywords: [Grok, xAI, real-time, Schlussfolgern]
---

# Case study: Grok

## Definition

Grok ist eine Familie von [LLMs](/docs/llms) from xAI. Es ist positioned around real-time or up-to-date knowledge (z. B. access to X/Twitter data) and strong Schlussfolgern, offered via API and in X’s product experience.

Like [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), Grok uses ein vortrainiertes base, Instruktions-Tuning, and alignment; differentiation includes real-time [RAG](/docs/rag)-style grounding and integration with X’s platform. Use case: chat, research, and applications that benefit from current information and Schlussfolgern.

## Funktionsweise

A **base model** (Decoder-only [transformer](/docs/transformers)) is vortrainiert auf großem Textkorpus (und optional other data). **Instruction tuning** and **alignment** (z. B. Präferenzoptimierung) shape helpfulness and safety. **Real-time or live knowledge** is provided by retrieving and conditioning on fresh content (z. B. from X) so answers can reflect recent events. The product exposes Grok via chat and API; [prompt engineering](/docs/prompt-engineering) and tool use extend it for [agents](/docs/agents) and custom workflows.

## Anwendungsfälle

Grok fits use cases where up-to-date information and Schlussfolgern matter more than a static training cutoff.

- Chat and research with awareness of recent news and events
- Applications that need real-time or search-augmented answers
- Integration in X and third-party products via API

## Externe Dokumentation

- [xAI – Grok](https://x.ai/) — Product and API
- [xAI – Blog](https://x.ai/blog) — Model and capability updates

## Siehe auch

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Prompt engineering](/docs/prompt-engineering)
