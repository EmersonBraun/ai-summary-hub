---
title: Case study — DALL·E
description: Text-zu-Bild-Generierung mit Diffusion und Sprache.
keywords: [DALL-E, text-to-image, diffusion]
---

# Case study: DALL·E

## Definition

DALL·E (und DALL·E 2) sind Text-zu-Bild-Modelle von OpenAI. Sie generieren Bilder aus Textprompts mit [diffusion models](/docs/diffusion-models) und Sprache–image alignment.

Sie sind a leading example of [multimodal](/docs/multimodal-ai) generation: text in, image out. The same [diffusion](/docs/diffusion-models) and conditioning ideas appear in Stable Diffusion and other open models. Use case: creative and product imagery from natural language; safety and content policies apply.

## Funktionsweise

**Text** wird mit einem Sprach- oder kodiert [multimodal](/docs/multimodal-ai) encoder (z. B. CLIP text encoder, T5) into a **text embedding**. A **diffusion** model (z. B. UNet) is **conditioned** on this embedding: the Entrauschen process is guided sodass das generated image nachzuahmenes the text. Training uses large datasets of captioned images; the model learns to associate text and image content. **Sampling**: start from noise, run the reverse diffusion process mit dem text embedding as condition, and decode to an image. **Safety filters** (z. B. classifier, policy) limit harmful or restricted outputs before delivery. Variants (inpainting, editing) condition on both text and an existing image or mask.

## Anwendungsfälle

Text-to-image models like DALL·E are used wherever you need images generated or edited from natural language (creative, product, UI).

- Creative and marketing asset generation from text prompts
- Concept art, illustration, and Entwurf exploration
- Product and UI mockups from natural language descriptions

## Externe Dokumentation

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Siehe auch

- [Diffusion models](/docs/diffusion-models)
- [Multimodal AI](/docs/multimodal-ai)
