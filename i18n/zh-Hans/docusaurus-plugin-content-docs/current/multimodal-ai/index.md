---
title: 多模态 AI
description: 结合文本、图像、音频和其他模态的模型。
keywords: [multimodal, vision-language, CLIP]
---

# 多模态 AI

## 定义

多模态 AI 在一个系统中处理多种输入（有时是输出）模态: 例如 vision-language models (VLMs) for image QA, captioning, or embodied agents that use vision and language.

它扩展了 [NLP](/docs/nlp) and [computer vision](/docs/cv) by aligning or fusing modalities (text, image, audio, video). CLIP-style models learn a shared embedding space for 检索 and zero-shot classification; generative VLMs (例如 LLaVA, GPT-4V) do captioning, QA, and 推理 over images. Used in [agents](/docs/agents), [RAG](/docs/rag) with images, and accessibility tools.

## 工作原理

```mermaid
flowchart LR
  Text[Text] --> Encoders[Encoders]
  Image[Image] --> Encoders
  Encoders --> Fusion[Fusion]
  Fusion --> Output[Output]
```

每种模态（**文本**、**图像**，以及可选的其他模态）通过**编码器**（独立或共享的）。**融合** can be a shared embedding space (例如 CLIP: contrastive loss so matching text-image pairs are close) or a unified [transformer](/docs/transformers) that attends over all modalities. **Output** can be a classification, caption, answer, or next token. Alignment is learned via contrastive (CLIP) or generative (captioning, VLM) objectives on paired data. Inference: embed or encode all inputs, then run the fusion model to get the output.

## 应用场景

Multimodal models fit when the task combines two or more modalities (例如 text and image) in input or output.

- Image captioning, visual QA, and document understanding (text + image)
- Cross-modal 检索 (例如 search images by text, or vice versa)
- Embodied agents and robots that use vision and language

## 外部文档

- [CLIP (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [Hugging Face – Multimodal](https://huggingface.co/docs/transformers/main_classes/processing_automatic)

## 另请参阅

- [LLMs](/docs/llms)
- [Computer vision](/docs/cv)
- [NLP](/docs/nlp)
- [Local inference](/docs/local-inference) — Running multimodal models on-device
- [Edge 推理](/docs/edge-reasoning) — Multimodal at the edge
