---
title: Evaluierungsmetriken
description: Measuring model performance across tasks.
keywords: [evaluation, metrics, accuracy, F1]
---

# Evaluierungsmetriken

## Definition

Evaluationsmetriken quantifizieren, wie gut Modelle abschneiden: accuracy, F1, BLEU, ROUGE, perplexity, human preference, etc. Die Wahl hängt ab von task (classification, generation, Abruf) and goals (fairness, robustness).

Sie sind used in [benchmarks](/docs/benchmarks), development, and production (A/B tests, monitoring). No single metric captures everything; combine automated metrics with human evaluation for [LLMs](/docs/llms) and subjective tasks. See [bias in AI](/docs/bias-in-ai) for fairness-related metrics.

## Funktionsweise

```mermaid
flowchart LR
  Predictions[Predictions] --> Metric[Metric]
  References[References] --> Metric
  Metric --> Score[Score]
```

**Vorhersagen** (Modellausgaben) und **Referenzen** (Ground Truth oder menschliche Antworten) werden in eine **Metrik** eingespeist, diees a **score**. Classification: accuracy, F1, AUC. Generation: BLEU, ROUGE, BERTScore, or learned metrics. Retrieval: recall@k, MRR. For LLMs, [benchmarks](/docs/benchmarks) (MMLU, HumanEval) run fixed prompts and aggregate metrics; human eval (preference, correctness) wird oft needed for open-ended quality. Metrics should align mit dem product goal and be reported on held-out or standard splits.

## Anwendungsfälle

Evaluation metrics are needed whenever you train or ship a model: to compare runs, track quality, and audit fairness or safety.

- Comparing models on classification (accuracy, F1), generation (BLEU, ROUGE), or Abruf
- Tracking progress in development and A/B tests
- Auditing for fairness, robustness, or safety

## Externe Dokumentation

- [Hugging Face – Evaluate](https://huggingface.co/docs/evaluate/)
- [Papers with Code – Metrics](https://paperswithcode.com/task/image-classification)

## Siehe auch

- [Benchmarks](/docs/benchmarks)
- [Bias in AI](/docs/bias-in-ai)
