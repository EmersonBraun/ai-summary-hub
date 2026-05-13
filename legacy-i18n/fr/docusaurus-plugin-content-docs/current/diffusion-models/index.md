---
title: Modèles de diffusion
description: Modèles génératifs qui génèrent par élimination progressive du bruit.
keywords: [diffusion, élimination du bruit, DALL-E, Stable Diffusion]
tags: [advanced]
authors: [EmersonBraun]
---

# Modèles de diffusion

## Définition

Les modèles de diffusion génèrent des données en apprenant à inverser un processus graduel d'ajout de bruit. Ils sont devenus l'approche dominante pour la génération d'images (comme DALL·E 2, Stable Diffusion).

Contrairement aux [GANs](/docs/gans), l'entraînement est stable (pas de jeu min-max) ; contrairement aux [VAEs](/docs/vaes), les échantillons sont nets et diversifiés. Le coût est de nombreuses étapes d'élimination du bruit lors de l'inférence (bien que la distillation et les planificateurs avec moins d'étapes réduisent cela). Utilisés pour le texte vers image, l'inpainting et la vidéo.

## Comment ça fonctionne

**Processus direct :** En partant des données **x0** et en ajoutant du bruit gaussien sur T étapes pour obtenir **x1**, ..., **xT** (approximativement du bruit pur). **Processus inverse :** Apprendre un réseau qui prédit le bruit (ou x0) à chaque étape pour pouvoir aller de **xT** à **x0** en éliminant le bruit de manière itérative. Entraînement : prendre un échantillon réel, ajouter du bruit à une étape aléatoire t, entraîner le réseau à prédire le bruit ajouté. **Échantillonnage :** Commencer depuis un **xT** aléatoire, exécuter le processus inverse appris étape par étape pour obtenir **x0**. Le diagramme résume le processus direct (données → bruit) et inverse (bruit → données).

## Cas d'utilisation

Les modèles de diffusion sont le choix privilégié pour la génération et l'édition d'images, d'audio et de vidéo de haute qualité à partir du bruit.

- Génération d'images (comme DALL·E 2, Stable Diffusion, Midjourney)
- Édition d'images, inpainting et super-résolution
- Génération audio et vidéo

## Ressources pratiques

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Modèles de diffusion](https://huggingface.co/docs/diffusers/)

## Voir aussi

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Étude de cas : DALL-E](/docs/case-studies/dall-e)
