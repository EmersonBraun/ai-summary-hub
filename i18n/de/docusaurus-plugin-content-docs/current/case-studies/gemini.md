---
title: Case study — Gemini
description: Googles multimodale LLM-Familie mit nativer Multimodalität und Skalierungsstufen.
keywords: [Gemini, Google, multimodal, VLM]
---

# Case study: Gemini

## Definition

Gemini is Google’s Familie von [LLMs](/docs/llms) with **native multimodal** support: Text, Bild, Audio und Video in einem Modell. Es folgt auf frühere Google models (z. B. [BART](/docs/case-studies/bart) in the encoder-decoder line) and is offered in multiple scale tiers (Nano, Pro, Ultra) for different latency and capability trade-offs.

Gemini is trained and deployed across Google products (Search, Workspace, Vertex AI, Android). Use case: chat, [multimodal](/docs/multimodal-ai) understanding and generation, Programmierung, and [agent](/docs/agents)-style tool use.

## Funktionsweise

```mermaid
flowchart LR
  Text[Text] --> Fusion[Multimodal fusion]
  Image[Image] --> Fusion
  Audio[Audio] --> Fusion
  Fusion --> Decoder[Decoder]
  Decoder --> Output[Output]
```

**Multimodal inputs** (text, image, audio, video) werden kodiert und in einem einheitlichen verschmolzen [transformer](/docs/transformers) Stack. The **decoder** generates text (or structured output) conditioned on all modalities. **Scale tiers**: kleineres Modells (z. B. Nano) for [edge](/docs/edge-reasoning) and on-device; larger (Pro, Ultra) for maximum capability in the cloud. **Integration**: same models power Gemini in Search, Workspace, and Vertex AI APIs. [Prompt engineering](/docs/llms/prompt-engineering) and [RAG](/docs/rag) or tools extend use in applications.

## Anwendungsfälle

Gemini passt, wenn you need multimodal understanding or generation and optional integration with Google’s Stack.

- Chat and assistants with image, document, or video understanding
- Multimodal search, summarization, and content generation
- Coding and Schlussfolgern via API or Google products

## Externe Dokumentation

- [Google AI – Gemini](https://ai.google.dev/gemini-api) — API and overview
- [Google – Gemini models](https://deepmind.google/technologies/gemini/) — Model tiers and capabilities

## Siehe auch

- [LLMs](/docs/llms)
- [Multimodal AI](/docs/multimodal-ai)
- [BART](/docs/case-studies/bart) — Predecessor in the encoder-decoder line
