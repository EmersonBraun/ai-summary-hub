---
title: Diffusionsmodelle
description: Generative Modelle, die durch schrittweises Entrauschen erzeugen.
keywords: [diffusion, Entrauschen, DALL-E, Stable Diffusion]
---

# Diffusionsmodelle

## Definition

Diffusionsmodelle generieren Daten, indem sie lernen, einen graduellen Verrauschungsprozess umzukehren. They have become the dominant approach for image generation (z. B. DALL·E 2, Stable Diffusion).

Im Gegensatz zu [GANs](/docs/gans), das Training ist stabil (kein Min-Max-Spiel); im Gegensatz zu [VAEs](/docs/vaes), die Proben sind scharf und vielfältig. Der Aufwand ist many Entrauschen steps at inference (though distillation and fewer-step schedulers reduce this). Used for text-to-image, inpainting, and video; see [case study: DALL-E](/docs/case-studies/dall-e).

## Funktionsweise

**Forward process:** Start aus Daten **x0** and Gaußsches Rauschen über T Schritte hinzufügen to get **x1**, …, **xT** (ungefähr reines Rauschen). **Umkehrprozess:** Learn a network that predicts the noise (or x0) bei jedem Schritt so you can go from **xT** to **x0** by iteratively Entrauschen. Training: take a real sample, add noise to a random step t, train the network to predict the added noise. **Sampling:** Start from random **xT**, run the learned reverse process Schritt für Schritt to get **x0**. Das Diagramm fasst zusammen forward (data → noise) and reverse (noise → data).

## Anwendungsfälle

Diffusion models are die bevorzugte Methode für hochwertige Bild-, Audio- und Videogenerierung und -bearbeitung aus Rauschen.

- Image generation (z. B. DALL·E 2, Stable Diffusion, Midjourney)
- Image editing, inpainting, and super-resolution
- Audio and video generation

## Externe Dokumentation

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Diffusion models](https://huggingface.co/docs/diffusers/)

## Siehe auch

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Case study: DALL-E](/docs/case-studies/dall-e)
