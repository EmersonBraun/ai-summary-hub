---
title: Apprentissage automatique
description: Introduction à l'apprentissage automatique — supervisé, non supervisé et par renforcement.
keywords: [apprentissage automatique, ML, supervisé, non supervisé]
---

# Apprentissage automatique

## Définition

L'apprentissage automatique (ML) est l'étude d'algorithmes qui s'améliorent avec l'expérience (les données). Les principaux paradigmes incluent l'**apprentissage supervisé** (apprendre à partir d'exemples étiquetés), l'**apprentissage non supervisé** (trouver des structures sans étiquettes) et l'**apprentissage par renforcement** (apprendre à partir de récompenses).

Le ML est préféré aux règles codées manuellement lorsque le problème est trop complexe pour être spécifié explicitement ou lorsque les données sont abondantes. Il se situe entre l'IA classique (règles symboliques) et l'[apprentissage profond](/docs/fundamentals/deep-learning) (grands réseaux de neurones) ; de nombreux systèmes réels combinent des modèles ML avec des pipelines et de la logique métier.

## Comment ça marche

```mermaid
flowchart LR
  Data[Données] --> Train[Entraînement]
  Train --> Model[Modèle]
  Model --> Predict[Prédiction]
```

**Entraînement :** Vous choisissez une représentation (p. ex. modèle linéaire, arbre ou réseau de neurones) et un objectif (perte pour supervisé/non supervisé, récompense pour RL). Un optimiseur (p. ex. descente de gradient) met à jour les paramètres du modèle pour minimiser la perte ou maximiser la récompense sur les données d'entraînement. **Modèle :** Le résultat est un modèle ajusté (poids, structure) qui capture les patterns dans les données. **Prédiction :** Au moment de l'inférence, de nouvelles entrées sont fournies au modèle pour obtenir des sorties (étiquettes, scores ou actions). L'évaluation utilise des splits entraînement/validation/test pour estimer la généralisation et éviter le surapprentissage.

## Cas d'utilisation

Le ML classique excelle avec des données structurées ou tabulaires et des étiquettes ou objectifs clairs.

- Classification de spam, détection de fraude et autres tâches de classification supervisée
- Systèmes de recommandation et filtrage collaboratif
- Prévisions et prédiction de séries temporelles

## Documentation externe

- [Cours accéléré ML de Google](https://developers.google.com/machine-learning/crash-course)
- [Scikit-learn – Guide utilisateur](https://scikit-learn.org/stable/user_guide.html) — ML classique en pratique

## Voir aussi

- [Apprentissage profond](/docs/fundamentals/deep-learning)
- [Apprentissage par renforcement](/docs/rl)
- [Métriques d'évaluation](/docs/evaluation-metrics)
