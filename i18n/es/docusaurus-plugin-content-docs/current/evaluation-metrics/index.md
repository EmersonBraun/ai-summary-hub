---
title: Métricas de evaluación
description: Measuring model performance across tasks.
keywords: [evaluation, metrics, accuracy, F1]
---

# Métricas de evaluación

## Definición

Las métricas de evaluación cuantifican qué tan bien funcionan los modelos: accuracy, F1, BLEU, ROUGE, perplexity, human preference, etc. Choice depends on task (classification, generation, recuperación) and goals (fairness, robustness).

Son used in [benchmarks](/docs/benchmarks), development, and production (A/B tests, monitoring). No single metric captures everything; combine automated metrics with human evaluation for [LLMs](/docs/llms) and subjective tasks. See [bias in AI](/docs/bias-in-ai) for fairness-related metrics.

## Cómo funciona

```mermaid
flowchart LR
  Predictions[Predictions] --> Metric[Metric]
  References[References] --> Metric
  Metric --> Score[Score]
```

**Predicciones** (salidas del modelo) y **referencias** (verdad de base o respuestas humanas) se alimentan en una **métrica** que calculaes a **score**. Classification: accuracy, F1, AUC. Generation: BLEU, ROUGE, BERTScore, or learned metrics. Retrieval: recall@k, MRR. For LLMs, [benchmarks](/docs/benchmarks) (MMLU, HumanEval) run fixed prompts and aggregate metrics; human eval (preference, correctness) is often needed for open-ended quality. Metrics should align with the product goal and be reported on held-out or standard splits.

## Casos de uso

Evaluation metrics are needed whenever you train or ship a model: to compare runs, track quality, and audit fairness or safety.

- Comparing models on classification (accuracy, F1), generation (BLEU, ROUGE), or recuperación
- Tracking progress in development and A/B tests
- Auditing for fairness, robustness, or safety

## Documentación externa

- [Hugging Face – Evaluate](https://huggingface.co/docs/evaluate/)
- [Papers with Code – Metrics](https://paperswithcode.com/task/image-classification)

## Ver también

- [Benchmarks](/docs/benchmarks)
- [Bias in AI](/docs/bias-in-ai)
