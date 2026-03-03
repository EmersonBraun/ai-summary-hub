---
title: Aprendizaje federado
description: Training across decentralized data without centralizing it.
keywords: [federated learning, privacidad, distributed]
---

# Aprendizaje federado

## Definición

El aprendizaje federado entrena modelos a través de muchos dispositivos u organizaciones while keeping raw data local. Only model updates (por ej. gradients) are shared, reducing privacidad and regulatory risk.

Úselo cuando data cannot be centralized (por ej. hospitals, phones) but you still want a shared [machine learning](/docs/fundamentals/machine-learning) model. Privacy is improved compared to sending raw data; additional techniques (differential privacidad, secure aggregation) can be layered. See [AI ethics](/docs/ai-ethics) for privacidad and governance context.

## Cómo funciona

El **servidor** mantiene el modelo global y lo envía a los **clientes** (dispositivos u organizaciones). Cada cliente **entrena localmente** en susts own data and sends **updates** (gradients or model diff) back. The server **aggregates** updates (por ej. FedAvg: average the client models or gradients) and produce a new global model, then broadcasts again. Rounds repeat until convergence. Challenges: **heterogeneity** (non-IID data, different compute), **communication cost** (limit round count or update size), and **privacidad** (updates can leak information; DP or secure aggregation mitigate).

## Casos de uso

Federated learning fits when data must stay on devices or silos and you still want a shared model.

- Training on sensitive data (por ej. healthcare, finance) without centralizing it
- Mobile and edge devices (por ej. keyboard suggestions, on-device ML)
- Cross-organization collaboration under privacidad constraints

## Documentación externa

- [Communication-Efficient Learning (McMahan et al.) – FedAvg](https://arxiv.org/abs/1602.05629)
- [TensorFlow Federated](https://www.tensorflow.org/federated)

## Ver también

- [Machine learning](/docs/fundamentals/machine-learning)
- [Privacy and AI ethics](/docs/ai-ethics)
