---
title: Vision par ordinateur (CV)
description: Classification d'images, détection d'objets et segmentation.
keywords: [vision par ordinateur, image, vidéo, CNN]
tags: [intermediate]
authors: [EmersonBraun]
---

# Vision par ordinateur (CV)

## Définition

La vision par ordinateur permet aux machines d'interpréter des images et des vidéos : classification, détection, segmentation, suivi et tâches génératives. Les [CNNs](/docs/neural-networks/cnn) et les [transformers](/docs/transformers) de vision sont les blocs de construction centraux.

Elle chevauche le [multimodal](/docs/multimodal-ai) lors de la combinaison de vision et de langage (comme les VLMs). La CV générative utilise la [diffusion](/docs/diffusion-models) ou les [GANs](/docs/gans). La plupart des pipelines suivent un backbone (extraction de caractéristiques) plus une tête de tâche ; l'[apprentissage par transfert](/docs/transfer-learning) depuis ImageNet ou similaire est la norme.

## Comment ça fonctionne

```mermaid
flowchart LR
  Image[Image] --> Backbone[Backbone]
  Backbone --> Features[Caractéristiques]
  Features --> Head[Tête]
  Head --> Output["Détection/Seg/Classe"]
```

L'**image** (ou la trame vidéo) est introduite dans un **backbone** (comme ResNet, ViT) qui produit des **caractéristiques** (cartes de caractéristiques spatiales ou tokens de patches). Une **tête** (une ou plusieurs couches) mappe les caractéristiques vers la **sortie** : classification (logits par classe), détection (boîtes + classes), segmentation (masque par pixel) ou génération (comme la [diffusion](/docs/diffusion-models)). Les backbones sont généralement pré-entraînés sur de grands ensembles de données (comme ImageNet) puis ajustés avec la tête sur la tâche cible. L'augmentation des données, la normalisation et la conception de la perte (comme la perte focale, la tête de masque) sont spécifiques à la tâche.

## Cas d'utilisation

La vision par ordinateur est utilisée partout où il faut interpréter ou générer des images et des vidéos (détection, segmentation, reconnaissance).

- Détection d'objets, segmentation d'instances et suivi
- Classification et reconnaissance d'images (comme médical, satellitaire)
- Compréhension vidéo et reconnaissance d'actions

## Ressources pratiques

- [CS231n – CNNs pour la reconnaissance visuelle](https://cs231n.github.io/)
- [PyTorch – Tutoriels de vision](https://pytorch.org/vision/stable/index.html)

## Voir aussi

- [CNN](/docs/neural-networks/cnn)
- [IA multimodale](/docs/multimodal-ai)
- [Modèles de diffusion](/docs/diffusion-models)
