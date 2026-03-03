---
title: Case study — Gemini
description: Familia de LLMs multimodales de Google con multimodalidad nativa y niveles de escala.
keywords: [Gemini, Google, multimodal, VLM]
---

# Case study: Gemini

## Definición

Gemini is Google’s familia de [LLMs](/docs/llms) with **native multimodal** support: texto, imagen, audio y video en un solo modelo. It succeeds earlier Google models (por ej. [BART](/docs/case-studies/bart) in the encoder-decoder line) and is offered in multiple scale tiers (Nano, Pro, Ultra) for different latency and capability trade-offs.

Gemini is trained and deployed across Google products (Search, Workspace, Vertex AI, Android). Use case: chat, [multimodal](/docs/multimodal-ai) understanding and generation, codificación, and [agent](/docs/agents)-style tool use.

## Cómo funciona

```mermaid
flowchart LR
  Text[Text] --> Fusion[Multimodal fusion]
  Image[Image] --> Fusion
  Audio[Audio] --> Fusion
  Fusion --> Decoder[Decoder]
  Decoder --> Output[Output]
```

**Las entradas multimodales** (texto, imagen, audio, video) se codifican y fusionan en un [transformer](/docs/transformers) unificadotack. The **decoder** generates text (or structured output) conditioned on all modalities. **Scale tiers**: modelo más pequeños (por ej. Nano) for [edge](/docs/edge-reasoning) and on-device; larger (Pro, Ultra) for maximum capability in the cloud. **Integration**: same models power Gemini in Search, Workspace, and Vertex AI APIs. [Prompt engineering](/docs/llms/prompt-engineering) and [RAG](/docs/rag) or tools extend use in applications.

## Casos de uso

Gemini fits when you need multimodal understanding or generation and optional integration with Google’s stack.

- Chat and assistants with image, document, or video understanding
- Multimodal search, summarization, and content generation
- Coding and razonamiento via API or Google products

## Documentación externa

- [Google AI – Gemini](https://ai.google.dev/gemini-api) — API and overview
- [Google – Gemini models](https://deepmind.google/technologies/gemini/) — Model tiers and capabilities

## Ver también

- [LLMs](/docs/llms)
- [Multimodal AI](/docs/multimodal-ai)
- [BART](/docs/case-studies/bart) — Predecessor in the encoder-decoder line
