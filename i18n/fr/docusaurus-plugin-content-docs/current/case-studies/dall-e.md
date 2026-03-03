---
title: Case study — DALL·E
description: Génération d'images à partir de texte avec diffusion et langage.
keywords: [DALL-E, text-to-image, diffusion]
---

# Case study: DALL·E

## Définition

DALL·E (and DALL·E 2) are modèles texte-vers-image d'OpenAI. They generate images from text prompts using [diffusion models](/docs/diffusion-models) and language–image alignment.

Ils sont a leading example of [multimodal](/docs/multimodal-ai) generation: text in, image out. The same [diffusion](/docs/diffusion-models) and conditioning ideas appear in Stable Diffusion and other open models. Use case: creative and product imagery from natural language; safety and content policies apply.

## Comment ça fonctionne

**Text** is encoded with a language or [multimodal](/docs/multimodal-ai) encoder (par ex. CLIP text encoder, T5) into a **text embedding**. A **diffusion** model (par ex. UNet) is **conditioned** on this embedding: the denoising process is guided so the generated image matches the text. Training uses large datasets of captioned images; the model learns to associate text and image content. **Sampling**: start from noise, run the reverse diffusion process with the text embedding as condition, and decode to an image. **Safety filters** (par ex. classifier, policy) limit harmful or restricted outputs before delivery. Variants (inpainting, editing) condition on both text and an existing image or mask.

## Cas d'utilisation

Text-to-image models like DALL·E are used wherever you need images generated or edited from natural language (creative, product, UI).

- Creative and marketing asset generation from text prompts
- Concept art, illustration, and conception exploration
- Product and UI mockups from natural language descriptions

## Documentation externe

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Voir aussi

- [Diffusion models](/docs/diffusion-models)
- [Multimodal AI](/docs/multimodal-ai)
