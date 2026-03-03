---
title: Benchmarks
description: "Benchmarks estándar para IA: GLUE, SuperGLUE, MMLU y más."
keywords: [benchmarks, GLUE, SuperGLUE, MMLU]
---

# Benchmarks

## Definición

Los benchmarks son conjuntos de datos estandarizados y protocolos de evaluación (por ej. GLUE, SuperGLUE for NLP; MMLU for broad knowledge; HumanEval for code). They enable comparison across models and over time.

They dependen de [evaluation metrics](/docs/evaluation-metrics) y divisiones fijas para que los resultados sean comparables. El sobreajuste a benchmarks es un problema conocido; supplement with out-of-distribution and human eval when deploying [LLMs](/docs/llms) or production systems.

## Cómo funciona

```mermaid
flowchart LR
  Model[Model] --> Benchmark[Benchmark dataset]
  Benchmark --> Metric[Metric]
  Metric --> Leaderboard[Leaderboard]
```

A **model** is run on a **benchmark dataset** (prompts o entradas fijos, división estándar). **Metrics** (por ej. accuracy, pass@k) se calculan por tarea and often averaged; results are reported on a **leaderboard** or in papers. Protocols define what inputs to use, how to parse outputs, and which [metrics](/docs/evaluation-metrics) to report. Reusing the same benchmark across time lets the community track progress. Care is needed: models can overfit to benchmark quirks, and benchmarks may not reflect real-world quality—use them as one signal among others.

## Casos de uso

Benchmarks give a common yardstick to compare models and methods; use them together with task-specific and human evaluation.

- Comparing NLP models (por ej. GLUE, SuperGLUE, MMLU)
- Evaluating code generation (por ej. HumanEval) or razonamiento
- Tracking model and method progress over time

## Documentación externa

- [Papers with Code – Leaderboards](https://paperswithcode.com/)
- [MMLU (Hendrycks et al.)](https://arxiv.org/abs/2009.03300) — Broad knowledge benchmark
- [HumanEval](https://github.com/openai/human-eval) — Code generation benchmark

## Ver también

- [Evaluation metrics](/docs/evaluation-metrics)
- [LLMs](/docs/llms)
