---
title: Diffusion models
description: Generative models based on denoising diffusion.
keywords: [diffusion, denoising, DALL-E, Stable Diffusion]
tags: [advanced]
---

# Diffusion models

## Definition

Diffusion models generate data by learning to reverse a gradual noising process. They have become the dominant approach for image generation (e.g. DALL·E 2, Stable Diffusion).

Unlike [GANs](/docs/gans), training is stable (no min-max game); unlike [VAEs](/docs/vaes), samples are sharp and diverse. The cost is many denoising steps at inference (though distillation and fewer-step schedulers reduce this). Used for text-to-image, inpainting, and video; see [case study: DALL-E](/docs/case-studies/dall-e).

## How it works

**Forward process:** Start from data **x0** and add Gaussian noise over T steps to get **x1**, …, **xT** (approximately pure noise). **Reverse process:** Learn a network that predicts the noise (or x0) at each step so you can go from **xT** to **x0** by iteratively denoising. Training: take a real sample, add noise to a random step t, train the network to predict the added noise. **Sampling:** Start from random **xT**, run the learned reverse process step by step to get **x0**. The diagram summarizes forward (data → noise) and reverse (noise → data).

## Use cases

Diffusion models are the go-to for high-quality image, audio, and video generation and editing from noise.

- Image generation (e.g. DALL·E 2, Stable Diffusion, Midjourney)
- Image editing, inpainting, and super-resolution
- Audio and video generation

## External documentation

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Diffusion models](https://huggingface.co/docs/diffusers/)

## See also

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Case study: DALL-E](/docs/case-studies/dall-e)
