---
title: Multimodale KI
description: Modelle, die Text, Bild, Audio und andere Modalitäten kombinieren.
keywords: [multimodal, vision-language, CLIP]
---

# Multimodale KI

## Definition

Multimodale KI verarbeitet mehrere Eingabe- (und manchmal Ausgabe-) Modalitäten in einem System: z. B. vision-language models (VLMs) for image QA, captioning, or embodied agents that use vision und Sprache.

Es erweitert [NLP](/docs/nlp) and [computer vision](/docs/cv) by aligning or fusing modalities (text, image, audio, video). CLIP-style models learn a shared embedding space for Abruf and zero-shot classification; generative VLMs (z. B. LLaVA, GPT-4V) do captioning, QA, and Schlussfolgern over images. Used in [agents](/docs/agents), [RAG](/docs/rag) with images, and accessibility tools.

## Funktionsweise

```mermaid
flowchart LR
  Text[Text] --> Encoders[Encoders]
  Image[Image] --> Encoders
  Encoders --> Fusion[Fusion]
  Fusion --> Output[Output]
```

Each modality (**text**, **image**, und optional others) wird durch geleitet **encoders** (separate or shared). **Fusion** can be a shared embedding space (z. B. CLIP: contrastive loss so nachzuahmening text-image pairs are close) or a unified [transformer](/docs/transformers) that attends over all modalities. **Output** can be a classification, caption, answer, or next token. Alignment is learned via contrastive (CLIP) or generative (captioning, VLM) objectives on paired data. Inference: embed or encode all inputs, then run the fusion model to get the output.

## Anwendungsfälle

Multimodal models fit wenn die task combines two or more modalities (z. B. text and image) in input or output.

- Image captioning, visual QA, and document understanding (text + image)
- Cross-modal Abruf (z. B. search images by text, or vice versa)
- Embodied agents and robots that use vision und Sprache

## Externe Dokumentation

- [CLIP (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [Hugging Face – Multimodal](https://huggingface.co/docs/transformers/main_classes/processing_automatic)

## Siehe auch

- [LLMs](/docs/llms)
- [Computer vision](/docs/cv)
- [NLP](/docs/nlp)
- [Local inference](/docs/local-inference) — Running multimodal models on-device
- [Edge Schlussfolgern](/docs/edge-reasoning) — Multimodal at the edge
