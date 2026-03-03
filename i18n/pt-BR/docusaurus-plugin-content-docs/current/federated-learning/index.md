---
title: Aprendizado federado
description: Training across decentralized data without centralizing it.
keywords: [federated learning, privacy, distributed]
---

# Aprendizado federado

## Definição

Federated learning trains models across many devices or organizations while keeping raw data local. Only model updates (por ex. gradients) are shared, reducing privacy and regulatory risk.

Use quando data cannot be centralized (por ex. hospitals, phones) but you still want a shared [machine learning](/docs/fundamentals/machine-learning) model. Privacy is improved compared to sending raw data; additional techniques (differential privacy, secure aggregation) can be layered. See [AI ethics](/docs/ai-ethics) for privacy and governance context.

## Como funciona

O **servidor** mantém o modelo global e o envia aos **clientes** (dispositivos ou organizações). Cada cliente **treina localmente** em seusts own data and sends **updates** (gradients or model diff) back. The server **aggregates** updates (por ex. FedAvg: average the client models or gradients) and produces a new global model, then broadcasts again. Rounds repeat until convergence. Challenges: **heterogeneity** (non-IID data, different compute), **communication cost** (limit round count or update size), and **privacy** (updates can leak information; DP or secure aggregation mitigate).

## Casos de uso

Federated learning fits when data must stay on devices or silos and you still want a shared model.

- Training on sensitive data (por ex. healthcare, finance) without centralizing it
- Mobile and edge devices (por ex. keyboard suggestions, on-device ML)
- Cross-organization collaboration under privacy constraints

## Documentação externa

- [Communication-Efficient Learning (McMahan et al.) – FedAvg](https://arxiv.org/abs/1602.05629)
- [TensorFlow Federated](https://www.tensorflow.org/federated)

## Veja também

- [Machine learning](/docs/fundamentals/machine-learning)
- [Privacy and AI ethics](/docs/ai-ethics)
