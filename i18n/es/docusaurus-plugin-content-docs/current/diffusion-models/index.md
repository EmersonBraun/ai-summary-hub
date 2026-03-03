---
title: Modelos de difusión
description: Modelos generativos que generan mediante eliminación gradual de ruido.
keywords: [diffusion, eliminación de ruido, DALL-E, Stable Diffusion]
---

# Modelos de difusión

## Definición

Los modelos de difusión generan datos aprendiendo a invertir un proceso gradual de adición de ruido. They have become the dominant approach for image generation (por ej. DALL·E 2, Stable Diffusion).

A diferencia de [GANs](/docs/gans), el entrenamiento es estable (sin juego min-max); a diferencia de [VAEs](/docs/vaes), las muestras son nítidas y diversas. El costo es many eliminación de ruido steps at inference (though distillation and fewer-step schedulers reduce this). Used for text-to-image, inpainting, and video; see [case study: DALL-E](/docs/case-studies/dall-e).

## Cómo funciona

**Proceso directo:** Partiendo de datos **x0** y añadiendo ruido Gaussiano a lo largo de T pasos para obtener **x1**, …, **xT** (aproximadamente pure noise). **Reverse process:** Learn a network that predicts the noise (or x0) at each step so you can go from **xT** to **x0** by iteratively eliminación de ruido. Training: take a real sample, add noise to a random step t, train the network to predict the added noise. **Sampling:** Start from random **xT**, run the learned reverse process paso a paso to get **x0**. The diagram summarizes forward (data → noise) and reverse (noise → data).

## Casos de uso

Diffusion models are la opción preferida para generación y edición de imágenes, audio y video de alta calidad a partir de ruido.

- Image generation (por ej. DALL·E 2, Stable Diffusion, Midjourney)
- Image editing, inpainting, and super-resolution
- Audio and video generation

## Documentación externa

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Diffusion models](https://huggingface.co/docs/diffusers/)

## Ver también

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Case study: DALL-E](/docs/case-studies/dall-e)
