---
title: Réseaux de neurones convolutifs (CNN)
description: CNN pour les données spatiales et images.
keywords: [CNN, convolution, vision par ordinateur]
---

# Réseaux de neurones convolutifs (CNN)

## Définition

Les CNN utilisent des couches de convolution pour capturer des motifs locaux (bords, textures) et construire des caractéristiques hiérarchiques. Ils sont le backbone standard pour la classification, la détection et la segmentation d'images.

Contrairement aux [réseaux de neurones](/docs/neural-networks) denses, les convolutions partagent les poids dans l'espace, ce qui les rend équivariants par translation et efficaces pour les images et autres données de type grille. Ils forment le backbone de la plupart des systèmes de [vision par ordinateur](/docs/cv) et sont également utilisés dans les [transformers](/docs/transformers) pour l'embedding de patches.

## Comment ça marche

```mermaid
flowchart LR
  Image[Image] --> Conv[Conv]
  Conv --> Pool[Pool]
  Pool --> Conv2[Conv]
  Conv2 --> Class[Classe]
```

L'**image** (ou carte de caractéristiques) est envoyée dans des couches **convolutives** : chaque filtre glisse sur l'entrée et calcule des produits scalaires, produisant des cartes d'activation qui mettent en évidence les motifs locaux (bords, textures). Le **pooling** (p. ex. max pooling) sous-échantillonne spatialement, réduisant la taille et ajoutant une légère invariance. Les couches **conv** plus profondes voient des champs réceptifs plus larges et capturent des caractéristiques plus abstraites (parties, objets). La tête finale de **classe** (ou détection/segmentation) est généralement une ou plusieurs couches denses sur les caractéristiques aplaties ou poolées. L'entraînement utilise la même rétropropagation et descente de gradient que les autres modèles d'[apprentissage profond](/docs/fundamentals/deep-learning).

## Cas d'utilisation

Les CNN sont le standard pour toute tâche où la structure spatiale (images, vidéo ou signaux 2D/3D) compte.

- Classification d'images (p. ex. reconnaissance d'objets, analyse d'images médicales)
- Détection d'objets et segmentation d'instances
- Analyse vidéo et reconnaissance d'actions

## Documentation externe

- [CS231n – CNN pour la reconnaissance visuelle](https://cs231n.github.io/convolutional-networks/)
- [PyTorch – Réseaux de neurones convolutifs](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets)

## Voir aussi

- [Vision par ordinateur](/docs/cv)
- [Réseaux de neurones](/docs/neural-networks)
