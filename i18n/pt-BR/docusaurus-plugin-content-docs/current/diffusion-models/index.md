---
title: Modelos de difusão
description: Modelos generativos que geram por remoção gradual de ruído.
keywords: [diffusion, denoising, DALL-E, Stable Diffusion]
---

# Modelos de difusão

## Definição

Modelos de difusão geram dados aprendendo a inverter um processo gradual de adição de ruído. They have become the dominant approach for image generation (por ex. DALL·E 2, Stable Diffusion).

Diferente de [GANs](/docs/gans), o treinamento é estável (sem jogo min-max); diferente de [VAEs](/docs/vaes), as amostras são nítidas e diversas. O custo é many denoising steps at inference (though distillation and fewer-step schedulers reduce this). Used for text-to-image, inpainting, and video; see [case study: DALL-E](/docs/case-studies/dall-e).

## Como funciona

**Processo direto:** Partindo dos dados **x0**, adiciona-se ruído Gaussiano ao longo de T etapas para obter **x1**, …, **xT** (aproximadamente pure noise). **Reverse process:** Learn a network that predicts the noise (or x0) at each step so you can go from **xT** to **x0** by iteratively denoising. Training: take a real sample, add noise to a random step t, train the network to predict the added noise. **Sampling:** Start from random **xT**, run the learned reverse process passo a passo to get **x0**. The diagram summarizes forward (data → noise) and reverse (noise → data).

## Casos de uso

Diffusion models are a opção preferida para geração e edição de imagens, áudio e vídeo de alta qualidade a partir de ruído.

- Image generation (por ex. DALL·E 2, Stable Diffusion, Midjourney)
- Image editing, inpainting, and super-resolution
- Audio and video generation

## Documentação externa

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Diffusion models](https://huggingface.co/docs/diffusers/)

## Veja também

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Case study: DALL-E](/docs/case-studies/dall-e)
