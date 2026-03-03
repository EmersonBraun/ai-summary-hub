---
title: Apprentissage profond
description: Réseaux de neurones profonds et apprentissage de représentations.
keywords: [apprentissage profond, réseaux de neurones, apprentissage de représentations]
---

# Apprentissage profond

## Définition

L'apprentissage profond utilise des réseaux de neurones avec de nombreuses couches pour apprendre des représentations hiérarchiques à partir de données. Il a stimulé les progrès en vision, langage et autres domaines en mettant à l'échelle données et calcul.

Il étend l'[apprentissage automatique](/docs/fundamentals/machine-learning) en utilisant des modèles différentiables en couches (voir [réseaux de neurones](/docs/neural-networks)) qui apprennent automatiquement les caractéristiques au lieu de les concevoir manuellement. La profondeur permet au modèle de construire des représentations de plus en plus abstraites (p. ex. bords → textures → parties → objets en vision).

## Comment ça marche

```mermaid
flowchart LR
  Data[Données] --> Layers[Couches]
  Layers --> Representation[Représentation]
  Representation --> Output[Sortie]
```

Les **données** sont envoyées dans la première **couche** ; chaque couche applique une transformation linéaire suivie d'une non-linéarité (p. ex. ReLU). L'empilement de couches produit une **représentation** (embedding) qui devient plus abstraite dans les couches profondes. La dernière couche projette vers la **sortie** (p. ex. scores de classes ou tokens). L'entraînement utilise la **rétropropagation** pour calculer les gradients et la **descente de gradient** pour mettre à jour les poids. Les architectures (CNN pour les images, RNN pour les séquences, [Transformers](/docs/transformers) pour les deux) adaptent la connectivité et les opérations aux données et à la tâche.

## Cas d'utilisation

L'apprentissage profond est le standard pour la perception et la génération quand les données sont abondantes et les tâches complexes.

- Reconnaissance d'images, détection d'objets et segmentation (vision)
- Reconnaissance vocale, traduction automatique et génération de texte (langage)
- Jeux, contrôle robotique et simulation (apprentissage par renforcement)

## Documentation externe

- [Deep Learning (Goodfellow et al.)](https://www.deeplearningbook.org/) — Livre en ligne gratuit
- [PyTorch – Introduction](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — Apprentissage profond pratique

## Voir aussi

- [Réseaux de neurones](/docs/neural-networks)
- [Transformers](/docs/transformers)
- [Frameworks (PyTorch, TensorFlow)](/docs/frameworks/pytorch)
