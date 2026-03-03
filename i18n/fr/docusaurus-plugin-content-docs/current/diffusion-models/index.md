---
title: Modèles de diffusion
description: Modèles génératifs qui génèrent par débruitage progressif.
keywords: [diffusion, denoising, DALL-E, Stable Diffusion]
---

# Modèles de diffusion

## Définition

Les modèles de diffusion génèrent des données en apprenant à inverser un processus graduel de bruitage. They have become the dominant approach for image generation (par ex. DALL·E 2, Stable Diffusion).

Contrairement à [GANs](/docs/gans), l'entraînement est stable (pas de jeu min-max); contrairement à [VAEs](/docs/vaes), les échantillons sont nets et diversifiés. Le coût est many denoising steps at inference (though distillation and fewer-step schedulers reduce this). Used for text-to-image, inpainting, and video; see [case study: DALL-E](/docs/case-studies/dall-e).

## Comment ça fonctionne

**Processus direct :** Partant des données **x0** et ajoutant du bruit Gaussien sur T étapes pour obtenir **x1**, …, **xT** (approximativement pure noise). **Reverse process:** Learn a network that predicts the noise (or x0) at each step so you can go from **xT** to **x0** by iteratively denoising. Training: take a real sample, add noise to a random step t, train the network to predict the added noise. **Sampling:** Start from random **xT**, run the learned reverse process étape par étape to get **x0**. The diagram summarizes forward (data → noise) and reverse (noise → data).

## Cas d'utilisation

Diffusion models are le choix privilégié pour la génération et l'édition d'images, audio et vidéo de haute qualité à partir de bruit.

- Image generation (par ex. DALL·E 2, Stable Diffusion, Midjourney)
- Image editing, inpainting, and super-resolution
- Audio and video generation

## Documentation externe

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Diffusion models](https://huggingface.co/docs/diffusers/)

## Voir aussi

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Case study: DALL-E](/docs/case-studies/dall-e)
