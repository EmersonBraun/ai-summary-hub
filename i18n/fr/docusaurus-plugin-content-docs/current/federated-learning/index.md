---
title: Apprentissage fédéré
description: Training across decentralized data without centralizing it.
keywords: [federated learning, confidentialité, distributed]
---

# Apprentissage fédéré

## Définition

Federated learning trains models across many devices or organizations while keeping raw data local. Only model updates (par ex. gradients) are shared, reducing confidentialité and regulatory risk.

Utilisez-le quand data cannot be centralized (par ex. hospitals, phones) but you still want a shared [machine learning](/docs/fundamentals/machine-learning) model. Privacy is improved compared to sending raw data; additional techniques (differential confidentialité, secure aggregation) can be layered. See [AI ethics](/docs/ai-ethics) for confidentialité and governance context.

## Comment ça fonctionne

Le **serveur** détient le modèle global et l'envoie aux **clients** (appareils ou organisations). Chaque client **s'entraîne localement** sur sests own data and sends **updates** (gradients or model diff) back. The server **aggregates** updates (par ex. FedAvg: average the client models or gradients) and produces a new global model, then broadcasts again. Rounds repeat until convergence. Challenges: **heterogeneity** (non-IID data, different compute), **communication cost** (limit round count or update size), and **confidentialité** (updates can leak information; DP or secure aggregation mitigate).

## Cas d'utilisation

Federated learning fits when data must stay on devices or silos and you still want a shared model.

- Training on sensitive data (par ex. healthcare, finance) without centralizing it
- Mobile and edge devices (par ex. keyboard suggestions, on-device ML)
- Cross-organization collaboration under confidentialité constraints

## Documentation externe

- [Communication-Efficient Learning (McMahan et al.) – FedAvg](https://arxiv.org/abs/1602.05629)
- [TensorFlow Federated](https://www.tensorflow.org/federated)

## Voir aussi

- [Machine learning](/docs/fundamentals/machine-learning)
- [Privacy and AI ethics](/docs/ai-ethics)
