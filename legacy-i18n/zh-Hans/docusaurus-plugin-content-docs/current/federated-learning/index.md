---
title: 联邦学习
description: Training across decentralized data without centralizing it.
keywords: [federated learning, privacy, distributed]
---

# 联邦学习

## 定义

Federated learning trains models across many devices or organizations while keeping raw data local. Only model updates (例如 gradients) are shared, reducing privacy and regulatory risk.

当…时使用 data cannot be centralized (例如 hospitals, phones) but you still want a shared [machine learning](/docs/fundamentals/machine-learning) model. Privacy is improved compared to sending raw data; additional techniques (differential privacy, secure aggregation) can be layered. See [AI ethics](/docs/ai-ethics) for privacy and governance context.

## 工作原理

**服务器**持有全局模型并将其发送给**客户端**（设备或组织）。每个客户端在其ts own data and sends **updates** (gradients or model diff) back. The server **aggregates** updates (例如 FedAvg: average the client models or gradients) and produces a new global model, then broadcasts again. Rounds repeat until convergence. Challenges: **heterogeneity** (non-IID data, different compute), **communication cost** (limit round count or update size), and **privacy** (updates can leak information; DP or secure aggregation mitigate).

## 应用场景

Federated learning fits when data must stay on devices or silos and you still want a shared model.

- Training on sensitive data (例如 healthcare, finance) without centralizing it
- Mobile and edge devices (例如 keyboard suggestions, on-device ML)
- Cross-organization collaboration under privacy constraints

## 外部文档

- [Communication-Efficient Learning (McMahan et al.) – FedAvg](https://arxiv.org/abs/1602.05629)
- [TensorFlow Federated](https://www.tensorflow.org/federated)

## 另请参阅

- [Machine learning](/docs/fundamentals/machine-learning)
- [Privacy and AI ethics](/docs/ai-ethics)
