---
title: Case study — DALL·E
description: Génération d'images à partir de texte avec diffusion et langage.
keywords: [DALL-E, text-to-image, diffusion]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: DALL·E

## Définition

DALL·E (et DALL·E 2) sont des modèles texte-vers-image d'OpenAI. Ils génèrent des images à partir de prompts textuels en utilisant des [modèles de diffusion](/docs/diffusion-models) et l'alignement langage-image.

Ils constituent un exemple phare de génération [multimodale](/docs/multimodal-ai) : texte en entrée, image en sortie. Les mêmes idées de [diffusion](/docs/diffusion-models) et de conditionnement apparaissent dans Stable Diffusion et d'autres modèles ouverts. Cas d'utilisation : images créatives et de produit à partir du langage naturel ; les politiques de sécurité et de contenu s'appliquent.

## Comment ça fonctionne

Le **texte** est encodé avec un encodeur de langage ou [multimodal](/docs/multimodal-ai) (p. ex., encodeur de texte CLIP, T5) en un **embedding de texte**. Un modèle de **diffusion** (p. ex., UNet) est **conditionné** sur cet embedding : le processus de débruitage est guidé pour que l'image générée corresponde au texte. L'entraînement utilise de grands ensembles de données d'images légendées ; le modèle apprend à associer le contenu textuel et visuel. **Échantillonnage** : partir du bruit, exécuter le processus de diffusion inverse avec l'embedding de texte comme condition, et décoder vers une image. Les **filtres de sécurité** (p. ex., classificateur, politique) limitent les sorties nuisibles ou restreintes avant la livraison. Les variantes (inpainting, édition) se conditionnent à la fois sur le texte et sur une image ou un masque existant.

## Cas d'utilisation

Les modèles texte-vers-image comme DALL·E sont utilisés partout où l'on a besoin d'images générées ou éditées à partir du langage naturel (créatif, produit, UI).

- Génération d'actifs créatifs et marketing à partir de prompts textuels
- Art conceptuel, illustration et exploration de conception
- Maquettes de produits et d'interfaces à partir de descriptions en langage naturel

## Documentation externe

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Voir aussi

- [Modèles de diffusion](/docs/diffusion-models)
- [IA multimodale](/docs/multimodal-ai)
