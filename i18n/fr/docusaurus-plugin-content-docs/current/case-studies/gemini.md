---
title: Case study — Gemini
description: Famille de LLM multimodaux de Google avec multimodalité native et niveaux de mise à l'échelle.
keywords: [Gemini, Google, multimodal, VLM]
---

# Case study: Gemini

## Définition

Gemini is Google’s famille de [LLMs](/docs/llms) with **native multimodal** support: text, image, audio, and video in one model. It succeeds earlier Google models (par ex. [BART](/docs/case-studies/bart) in the encoder-decoder line) and is offered in multiple scale tiers (Nano, Pro, Ultra) for different latency and capability trade-offs.

Gemini is trained and deployed across Google products (Search, Workspace, Vertex AI, Android). Use case: chat, [multimodal](/docs/multimodal-ai) understanding and generation, coding, and [agent](/docs/agents)-style tool use.

## Comment ça fonctionne

```mermaid
flowchart LR
  Text[Text] --> Fusion[Multimodal fusion]
  Image[Image] --> Fusion
  Audio[Audio] --> Fusion
  Fusion --> Decoder[Decoder]
  Decoder --> Output[Output]
```

**Les entrées multimodales** (texte, image, audio, vidéo) sont encodées et fusionnées dans un [transformer](/docs/transformers) unifiétack. The **decoder** generates text (or structured output) conditioned on all modalities. **Scale tiers**: smaller models (par ex. Nano) for [edge](/docs/edge-reasoning) and on-device; larger (Pro, Ultra) for maximum capability in the cloud. **Integration**: same models power Gemini in Search, Workspace, and Vertex AI APIs. [Prompt engineering](/docs/prompt-engineering) and [RAG](/docs/rag) or tools extend use in applications.

## Cas d'utilisation

Gemini fits when you need multimodal understanding or generation and optional integration with Google’s stack.

- Chat and assistants with image, document, or video understanding
- Multimodal search, summarization, and content generation
- Coding and raisonnement via API or Google products

## Documentation externe

- [Google AI – Gemini](https://ai.google.dev/gemini-api) — API and overview
- [Google – Gemini models](https://deepmind.google/technologies/gemini/) — Model tiers and capabilities

## Voir aussi

- [LLMs](/docs/llms)
- [Multimodal AI](/docs/multimodal-ai)
- [BART](/docs/case-studies/bart) — Predecessor in the encoder-decoder line
