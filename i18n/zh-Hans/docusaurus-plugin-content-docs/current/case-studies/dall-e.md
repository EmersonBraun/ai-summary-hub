---
title: Case study — DALL·E
description: 基于扩散和语言的文本到图像生成。
keywords: [DALL-E, text-to-image, diffusion]
---

# Case study: DALL·E

## 定义

DALL·E (and DALL·E 2) are 来自 OpenAI 的文本到图像模型. They generate images from text prompts using [diffusion models](/docs/diffusion-models) and language–image alignment.

它们是 a leading example of [multimodal](/docs/multimodal-ai) generation: text in, image out. The same [diffusion](/docs/diffusion-models) and conditioning ideas appear in Stable Diffusion and other open models. Use case: creative and product imagery from natural language; safety and content policies apply.

## 工作原理

**Text** is encoded with a language or [multimodal](/docs/multimodal-ai) encoder (例如 CLIP text encoder, T5) into a **text embedding**. A **diffusion** model (例如 UNet) is **conditioned** on this embedding: the denoising process is guided so the generated image matches the text. Training uses large datasets of captioned images; the model learns to associate text and image content. **Sampling**: start from noise, run the reverse diffusion process with the text embedding as condition, and decode to an image. **Safety filters** (例如 classifier, policy) limit harmful or restricted outputs before delivery. Variants (inpainting, editing) condition on both text and an existing image or mask.

## 应用场景

Text-to-image models like DALL·E are used wherever you need images generated or edited from natural language (creative, product, UI).

- Creative and marketing asset generation from text prompts
- Concept art, illustration, and 设计 exploration
- Product and UI mockups from natural language descriptions

## 外部文档

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## 另请参阅

- [Diffusion models](/docs/diffusion-models)
- [Multimodal AI](/docs/multimodal-ai)
