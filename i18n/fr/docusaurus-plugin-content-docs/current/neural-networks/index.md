---
title: Réseaux de neurones
description: Introduction aux réseaux de neurones artificiels et leurs composants.
keywords: [réseaux de neurones, RNA, couches, activation]
---

# Réseaux de neurones

## Définition

Les réseaux de neurones sont des approximateurs de fonctions construits à partir de couches d'unités (neurones) avec des poids apprenables et des activations non linéaires. Ils peuvent approximer des correspondances complexes des entrées vers les sorties lorsqu'ils sont entraînés sur des données.

Ils sont les briques de base de l'[apprentissage profond](/docs/fundamentals/deep-learning). Des variantes comme les [CNN](/docs/neural-networks/cnn) et les [RNN](/docs/neural-networks/rnn) ajoutent des biais inductifs (p. ex. localité, récurrence) pour des types de données spécifiques ; le même mécanisme d'entraînement (rétropropagation, descente de gradient) s'applique.

## Comment ça marche

```mermaid
flowchart LR
  Input[Entrée] --> Layer1[Couche1]
  Layer1 --> Layer2[Couche2]
  Layer2 --> Output[Sortie]
```

L'**entrée** est transmise à la première couche. Chaque **couche** calcule une combinaison linéaire de ses entrées (poids) puis une activation non linéaire (p. ex. ReLU, sigmoïde). La sortie d'une couche devient l'entrée de la suivante ; empiler des couches permet au réseau d'apprendre des caractéristiques hiérarchiques. La couche de **sortie** finale projette typiquement vers des prédictions (p. ex. scores de classes ou un scalaire). L'entraînement minimise une perte par **rétropropagation** (calcul des gradients via la règle de la chaîne) et **descente de gradient** (mise à jour des poids). La profondeur et la largeur déterminent la capacité ; la régularisation et la taille des données contrôlent le surapprentissage.

## Cas d'utilisation

Les réseaux de neurones sont utilisés partout où une approximation de fonction flexible et pilotée par les données est nécessaire.

- Régression et classification (p. ex. prédiction de ventes, étiquetage d'images)
- Apprentissage de caractéristiques pour des tâches en aval (embeddings, transfer learning)
- Approximation de fonctions non linéaires complexes en contrôle ou simulation

## Documentation externe

- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com/) — Livre en ligne gratuit
- [3Blue1Brown – Réseaux de neurones](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) — Introduction visuelle

## Voir aussi

- [CNN](/docs/neural-networks/cnn)
- [RNN](/docs/neural-networks/rnn)
- [Apprentissage profond](/docs/fundamentals/deep-learning)
