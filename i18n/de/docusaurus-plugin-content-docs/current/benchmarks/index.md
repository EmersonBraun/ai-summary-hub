---
title: Benchmarks
description: "Standard-Benchmarks für KI: GLUE, SuperGLUE, MMLU und mehr."
keywords: [benchmarks, GLUE, SuperGLUE, MMLU]
---

# Benchmarks

## Definition

Benchmarks sind standardisierte Datensätze und Evaluationsprotokolle (z. B. GLUE, SuperGLUE for NLP; MMLU for broad knowledge; HumanEval for code). They enable comparison across models and over time.

They basieren auf [evaluation metrics](/docs/evaluation-metrics) und festen Aufteilungen, damit Ergebnisse vergleichbar sind. Überanpassung an Benchmarks ist ein bekanntes Problem; supplement with out-of-distribution and human eval when deploying [LLMs](/docs/llms) or production systems.

## Funktionsweise

```mermaid
flowchart LR
  Model[Model] --> Benchmark[Benchmark dataset]
  Benchmark --> Metric[Metric]
  Metric --> Leaderboard[Leaderboard]
```

A **model** is run on a **benchmark dataset** (feste Prompts oder Eingaben, Standardaufteilung). **Metrics** (z. B. accuracy, pass@k) werden berechnet pro Aufgabe and often averaged; results are reported on a **leaderboard** or in papers. Protocols define what inputs to use, how to parse outputs, and which [metrics](/docs/evaluation-metrics) to report. Reusing the same benchmark across time lets the community track progress. Care is needed: models can overfit to benchmark quirks, and benchmarks may not reflect real-world quality—use them as one signal among others.

## Anwendungsfälle

Benchmarks give a common yardstick to compare models and methods; use them together with task-specific and human evaluation.

- Comparing NLP models (z. B. GLUE, SuperGLUE, MMLU)
- Evaluating code generation (z. B. HumanEval) or Schlussfolgern
- Tracking model and method progress over time

## Externe Dokumentation

- [Papers with Code – Leaderboards](https://paperswithcode.com/)
- [MMLU (Hendrycks et al.)](https://arxiv.org/abs/2009.03300) — Broad knowledge benchmark
- [HumanEval](https://github.com/openai/human-eval) — Code generation benchmark

## Siehe auch

- [Evaluation metrics](/docs/evaluation-metrics)
- [LLMs](/docs/llms)
