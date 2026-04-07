---
title: Multimodal AI
description: Models that combine text, image, audio, and other modalities.
keywords: [multimodal, vision-language, CLIP]
tags: [intermediate]
authors: [EmersonBraun]
---

# Multimodal AI

## Definition

Multimodal AI handles multiple input (and sometimes output) modalities in one system: e.g. vision-language models (VLMs) for image QA, captioning, or embodied agents that use vision and language.

It extends [NLP](/docs/nlp) and [computer vision](/docs/cv) by aligning or fusing modalities (text, image, audio, video). CLIP-style models learn a shared embedding space for retrieval and zero-shot classification; generative VLMs (e.g. LLaVA, GPT-4V) do captioning, QA, and reasoning over images. Used in [agents](/docs/agents), [RAG](/docs/rag) with images, and accessibility tools.

## How it works

```mermaid
flowchart LR
  Text[Text] --> Encoders[Encoders]
  Image[Image] --> Encoders
  Encoders --> Fusion[Fusion]
  Fusion --> Output[Output]
```

Each modality (**text**, **image**, and optionally others) is passed through **encoders** (separate or shared). **Fusion** can be a shared embedding space (e.g. CLIP: contrastive loss so matching text-image pairs are close) or a unified [transformer](/docs/transformers) that attends over all modalities. **Output** can be a classification, caption, answer, or next token. Alignment is learned via contrastive (CLIP) or generative (captioning, VLM) objectives on paired data. Inference: embed or encode all inputs, then run the fusion model to get the output.

## Use cases

Multimodal models fit when the task combines two or more modalities (e.g. text and image) in input or output.

- Image captioning, visual QA, and document understanding (text + image)
- Cross-modal retrieval (e.g. search images by text, or vice versa)
- Embodied agents and robots that use vision and language

## External documentation

- [CLIP (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [Hugging Face – Multimodal](https://huggingface.co/docs/transformers/main_classes/processing_automatic)

## See also

- [LLMs](/docs/llms)
- [Computer vision](/docs/cv)
- [NLP](/docs/nlp)
- [Local inference](/docs/local-inference) — Running multimodal models on-device
- [Edge reasoning](/docs/edge-reasoning) — Multimodal at the edge
