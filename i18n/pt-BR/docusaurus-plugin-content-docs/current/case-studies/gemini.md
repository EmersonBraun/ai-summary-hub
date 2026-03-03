---
title: Case study — Gemini
description: Família de LLMs multimodais do Google com multimodalidade nativa e níveis de escala.
keywords: [Gemini, Google, multimodal, VLM]
---

# Case study: Gemini

## Definição

Gemini is Google’s família de [LLMs](/docs/llms) with **native multimodal** support: text, image, audio, and video in one model. It succeeds earlier Google models (por ex. [BART](/docs/case-studies/bart) in the encoder-decoder line) and is offered in multiple scale tiers (Nano, Pro, Ultra) for different latency and capability trade-offs.

Gemini is trained and deployed across Google products (Search, Workspace, Vertex AI, Android). Use case: chat, [multimodal](/docs/multimodal-ai) understanding and generation, coding, and [agent](/docs/agents)-style tool use.

## Como funciona

```mermaid
flowchart LR
  Text[Text] --> Fusion[Multimodal fusion]
  Image[Image] --> Fusion
  Audio[Audio] --> Fusion
  Fusion --> Decoder[Decoder]
  Decoder --> Output[Output]
```

**Entradas multimodais** (texto, imagem, áudio, vídeo) são codificadas e fundidas em um [transformer](/docs/transformers) unificadotack. The **decoder** generates text (or structured output) conditioned on all modalities. **Scale tiers**: smaller models (por ex. Nano) for [edge](/docs/edge-reasoning) and on-device; larger (Pro, Ultra) for maximum capability in the cloud. **Integration**: same models power Gemini in Search, Workspace, and Vertex AI APIs. [Prompt engineering](/docs/llms/prompt-engineering) and [RAG](/docs/rag) or tools extend use in applications.

## Casos de uso

Gemini fits when you need multimodal understanding or generation and optional integration with Google’s stack.

- Chat and assistants with image, document, or video understanding
- Multimodal search, summarization, and content generation
- Coding and raciocínio via API or Google products

## Documentação externa

- [Google AI – Gemini](https://ai.google.dev/gemini-api) — API and overview
- [Google – Gemini models](https://deepmind.google/technologies/gemini/) — Model tiers and capabilities

## Veja também

- [LLMs](/docs/llms)
- [Multimodal AI](/docs/multimodal-ai)
- [BART](/docs/case-studies/bart) — Predecessor in the encoder-decoder line
