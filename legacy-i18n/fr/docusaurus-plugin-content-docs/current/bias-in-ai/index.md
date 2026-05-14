---
title: Biais dans l'IA
description: Sources et atténuation des biais dans les systèmes de ML.
keywords: [biais, équité, discrimination]
tags: [intermediate]
authors: [EmersonBraun]
---

# Biais dans l'IA

## Définition

Le biais en IA désigne des erreurs systématiques ou des résultats injustes (par exemple entre groupes démographiques) provenant des données, de la conception du modèle ou du déploiement. L'atténuation comprend les audits de données, les métriques d'équité et les méthodes de débiaisage.

C'est une préoccupation centrale dans l'[éthique de l'IA](/docs/ai-ethics) et la [sécurité de l'IA](/docs/ai-safety). Les [métriques d'évaluation](/docs/evaluation-metrics) d'équité (comme la parité démographique, les chances égalisées) sont utilisées dans les audits et avant le déploiement dans les domaines réglementés. L'[IA explicable](/docs/xai) peut aider à identifier quand et pourquoi le biais apparaît.

## Comment ça fonctionne

Le biais peut **entrer** via des données d'entraînement biaisées (sous-représentation, biais d'étiquettes), des variables proxy (comme le code postal pour l'ethnie) ou des boucles de rétroaction (les sorties du modèle influencent les données futures). La **détection** utilise des métriques d'équité (comme la parité démographique, les chances égalisées, la calibration par groupe) sur des ensembles d'[évaluation](/docs/evaluation-metrics) stratifiés par attributs protégés. L'**atténuation** comprend : les données (repesage, rééchantillonnage, collecte de données plus représentatives) ; l'entraînement (contraintes d'équité, débiaisage adversarial) ; et le post-traitement (seuils ou règles par groupe). Des compromis existent entre les métriques d'équité et l'exactitude ; les normes légales et du domaine définissent quelles métriques et seuils utiliser. Les audits doivent être effectués avant le déploiement et surveillés en production.

## Cas d'utilisation

Le travail sur les biais s'applique lorsque les décisions du modèle affectent les personnes dans des domaines réglementés ou sensibles (recrutement, prêts, notation, contenu).

- Auditer les systèmes de recrutement, de prêts ou de notation pour l'impact discriminatoire
- Vérifications d'équité avant de déployer des modèles dans des domaines réglementés
- Explicabilité et remédiation lorsque le biais est détecté

## Ressources pratiques

- [Google – IA responsable – Équité](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Livre gratuit

## Voir aussi

- [Éthique de l'IA](/docs/ai-ethics)
- [Sécurité de l'IA](/docs/ai-safety)
- [Métriques d'évaluation](/docs/evaluation-metrics)
