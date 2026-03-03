---
title: Case study — DALL·E
description: Generación de imágenes a partir de texto con difusión y lenguaje.
keywords: [DALL-E, text-to-image, diffusion]
---

# Case study: DALL·E

## Definición

DALL·E (y DALL·E 2) son modelos de texto a imagen de OpenAI. Generan imágenes a partir de prompts de texto usando [diffusion models](/docs/diffusion-models) y lenguaje–image alignment.

Son a leading example of [multimodal](/docs/multimodal-ai) generation: text in, image out. The same [diffusion](/docs/diffusion-models) and conditioning ideas appear in Stable Diffusion and other open models. Use case: creative and product imagery from natural language; safety and content policies apply.

## Cómo funciona

**Text** is encoded with a language or [multimodal](/docs/multimodal-ai) encoder (por ej. CLIP text encoder, T5) into a **text embedding**. A **diffusion** model (por ej. UNet) is **conditioned** on this embedding: the eliminación de ruido process is guided so the generated image igualares the text. Training uses large datasets of captioned images; the model learns to associate text and image content. **Sampling**: start from noise, run the reverse diffusion process with the text embedding as condition, and decode to an image. **Safety filters** (por ej. classifier, policy) limit harmful or restricted outputs before delivery. Variants (inpainting, editing) condition on both text and an existing image or mask.

## Casos de uso

Text-to-image models like DALL·E are used wherever you need images generated or edited from natural language (creative, product, UI).

- Creative and marketing asset generation from text prompts
- Concept art, illustration, and diseño exploration
- Product and UI mockups from natural language descriptions

## Documentación externa

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Ver también

- [Diffusion models](/docs/diffusion-models)
- [Multimodal AI](/docs/multimodal-ai)
