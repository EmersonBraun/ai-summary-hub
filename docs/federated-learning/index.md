---
title: Federated learning
description: Training across decentralized data without centralizing it.
keywords: [federated learning, privacy, distributed]
tags: [advanced]
---

# Federated learning

## Definition

Federated learning trains models across many devices or organizations while keeping raw data local. Only model updates (e.g. gradients) are shared, reducing privacy and regulatory risk.

Use it when data cannot be centralized (e.g. hospitals, phones) but you still want a shared [machine learning](/docs/fundamentals/machine-learning) model. Privacy is improved compared to sending raw data; additional techniques (differential privacy, secure aggregation) can be layered. See [AI ethics](/docs/ai-ethics) for privacy and governance context.

## How it works

The **server** holds the global model and sends it to **clients** (devices or orgs). Each client **trains locally** on its own data and sends **updates** (gradients or model diff) back. The server **aggregates** updates (e.g. FedAvg: average the client models or gradients) and produces a new global model, then broadcasts again. Rounds repeat until convergence. Challenges: **heterogeneity** (non-IID data, different compute), **communication cost** (limit round count or update size), and **privacy** (updates can leak information; DP or secure aggregation mitigate).

## Use cases

Federated learning fits when data must stay on devices or silos and you still want a shared model.

- Training on sensitive data (e.g. healthcare, finance) without centralizing it
- Mobile and edge devices (e.g. keyboard suggestions, on-device ML)
- Cross-organization collaboration under privacy constraints

## External documentation

- [Communication-Efficient Learning (McMahan et al.) – FedAvg](https://arxiv.org/abs/1602.05629)
- [TensorFlow Federated](https://www.tensorflow.org/federated)

## See also

- [Machine learning](/docs/fundamentals/machine-learning)
- [Privacy and AI ethics](/docs/ai-ethics)
