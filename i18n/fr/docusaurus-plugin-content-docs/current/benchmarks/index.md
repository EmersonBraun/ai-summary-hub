---
title: Benchmarks
description: "Benchmarks standards pour l'IA : GLUE, SuperGLUE, MMLU et plus."
keywords: [benchmarks, GLUE, SuperGLUE, MMLU]
---

# Benchmarks

## Définition

Les benchmarks sont des jeux de données standardisés et des protocoles d'évaluation (par ex. GLUE, SuperGLUE for NLP; MMLU for broad knowledge; HumanEval for code). They enable comparison across models and over time.

They reposent sur [evaluation metrics](/docs/evaluation-metrics) et des divisions fixes pour que les résultats soient comparables. Le surapprentissage aux benchmarks est un problème connu; supplement with out-of-distribution and human eval when deploying [LLMs](/docs/llms) or production systems.

## Comment ça fonctionne

```mermaid
flowchart LR
  Model[Model] --> Benchmark[Benchmark dataset]
  Benchmark --> Metric[Metric]
  Metric --> Leaderboard[Leaderboard]
```

A **model** is run on a **benchmark dataset** (prompts ou entrées fixes, division standard). **Metrics** (par ex. accuracy, pass@k) sont calculées par tâche and often averaged; results are reported on a **leaderboard** or in papers. Protocols define what inputs to use, how to parse outputs, and which [metrics](/docs/evaluation-metrics) to report. Reusing the same benchmark across time lets the community track progress. Care is needed: models can overfit to benchmark quirks, and benchmarks may not reflect real-world quality—use them as one signal among others.

## Cas d'utilisation

Benchmarks give a common yardstick to compare models and methods; use them together with task-specific and human evaluation.

- Comparing NLP models (par ex. GLUE, SuperGLUE, MMLU)
- Evaluating code generation (par ex. HumanEval) or raisonnement
- Tracking model and method progress over time

## Documentation externe

- [Papers with Code – Leaderboards](https://paperswithcode.com/)
- [MMLU (Hendrycks et al.)](https://arxiv.org/abs/2009.03300) — Broad knowledge benchmark
- [HumanEval](https://github.com/openai/human-eval) — Code generation benchmark

## Voir aussi

- [Evaluation metrics](/docs/evaluation-metrics)
- [LLMs](/docs/llms)
