---
title: Case study — DALL·E
description: Text-to-image generation with diffusion and language.
keywords: [DALL-E, text-to-image, diffusion]
tags: [beginner]
---

# Case study: DALL·E

## Definition

DALL·E (and DALL·E 2) are text-to-image models from OpenAI. They generate images from text prompts using [diffusion models](/docs/diffusion-models) and language–image alignment.

They are a leading example of [multimodal](/docs/multimodal-ai) generation: text in, image out. The same [diffusion](/docs/diffusion-models) and conditioning ideas appear in Stable Diffusion and other open models. Use case: creative and product imagery from natural language; safety and content policies apply.

## How it works

**Text** is encoded with a language or [multimodal](/docs/multimodal-ai) encoder (e.g. CLIP text encoder, T5) into a **text embedding**. A **diffusion** model (e.g. UNet) is **conditioned** on this embedding: the denoising process is guided so the generated image matches the text. Training uses large datasets of captioned images; the model learns to associate text and image content. **Sampling**: start from noise, run the reverse diffusion process with the text embedding as condition, and decode to an image. **Safety filters** (e.g. classifier, policy) limit harmful or restricted outputs before delivery. Variants (inpainting, editing) condition on both text and an existing image or mask.

## Use cases

Text-to-image models like DALL·E are used wherever you need images generated or edited from natural language (creative, product, UI).

- Creative and marketing asset generation from text prompts
- Concept art, illustration, and design exploration
- Product and UI mockups from natural language descriptions

## External documentation

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## See also

- [Diffusion models](/docs/diffusion-models)
- [Multimodal AI](/docs/multimodal-ai)
