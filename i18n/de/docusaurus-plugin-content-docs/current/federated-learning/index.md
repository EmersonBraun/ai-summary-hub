---
title: Föderiertes Lernen
description: Training across decentralized data without centralizing it.
keywords: [federated learning, Datenschutz, distributed]
---

# Föderiertes Lernen

## Definition

Föderiertes Lernen trainiert Modelle über viele Geräte oder Organisationen wobei die Rohdaten lokal bleiben. Only model updates (z. B. gradients) are shared, reducing Datenschutz and regulatory risk.

Verwenden Sie es, wenn data cannot be centralized (z. B. hospitals, phones) but you still want a shared [machine learning](/docs/fundamentals/machine-learning) model. Privacy is improved compared to sending raw data; additional techniques (differential Datenschutz, secure aggregation) can be layered. See [AI ethics](/docs/ai-ethics) for Datenschutz and governance context.

## Funktionsweise

Der **Server** hält das globale Modell und sendet es an **Clients** (Geräte oder Organisationen). Jeder Client **trainiert lokal** auf seinents own data and sends **updates** (gradients or model diff) back. The server **aggregates** updates (z. B. FedAvg: average the client models or gradients) and erzeugt a new global model, then broadcasts again. Rounds repeat until convergence. Challenges: **heterogeneity** (non-IID data, different compute), **communication cost** (limit round count or update size), and **Datenschutz** (updates can leak information; DP or secure aggregation mitigate).

## Anwendungsfälle

Federated learning passt, wenn data must stay on devices or silos and you still want a shared model.

- Training on sensitive data (z. B. healthcare, finance) without centralizing it
- Mobile and edge devices (z. B. keyboard suggestions, on-device ML)
- Cross-organization collaboration under Datenschutz constraints

## Externe Dokumentation

- [Communication-Efficient Learning (McMahan et al.) – FedAvg](https://arxiv.org/abs/1602.05629)
- [TensorFlow Federated](https://www.tensorflow.org/federated)

## Siehe auch

- [Machine learning](/docs/fundamentals/machine-learning)
- [Privacy and AI ethics](/docs/ai-ethics)
