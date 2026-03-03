---
title: Métriques d'évaluation
description: Measuring model performance across tasks.
keywords: [evaluation, metrics, accuracy, F1]
---

# Métriques d'évaluation

## Définition

Les métriques d'évaluation quantifient les performances des modèles: accuracy, F1, BLEU, ROUGE, perplexity, human preference, etc. Choice depends on task (classification, generation, récupération) and goals (fairness, robustness).

Ils sont used in [benchmarks](/docs/benchmarks), development, and production (A/B tests, monitoring). No single metric captures everything; combine automated metrics with human evaluation for [LLMs](/docs/llms) and subjective tasks. See [bias in AI](/docs/bias-in-ai) for fairness-related metrics.

## Comment ça fonctionne

```mermaid
flowchart LR
  Predictions[Predictions] --> Metric[Metric]
  References[References] --> Metric
  Metric --> Score[Score]
```

**Les prédictions** (sorties du modèle) et les **références** (vérité terrain ou réponses humaines) sont alimentées dans une **métrique** qui calcules a **score**. Classification: accuracy, F1, AUC. Generation: BLEU, ROUGE, BERTScore, or learned metrics. Retrieval: recall@k, MRR. For LLMs, [benchmarks](/docs/benchmarks) (MMLU, HumanEval) run fixed prompts and aggregate metrics; human eval (preference, correctness) is often needed for open-ended quality. Metrics should align with the product goal and be reported on held-out or standard splits.

## Cas d'utilisation

Evaluation metrics are needed whenever you train or ship a model: to compare runs, track quality, and audit fairness or safety.

- Comparing models on classification (accuracy, F1), generation (BLEU, ROUGE), or récupération
- Tracking progress in development and A/B tests
- Auditing for fairness, robustness, or safety

## Documentation externe

- [Hugging Face – Evaluate](https://huggingface.co/docs/evaluate/)
- [Papers with Code – Metrics](https://paperswithcode.com/task/image-classification)

## Voir aussi

- [Benchmarks](/docs/benchmarks)
- [Bias in AI](/docs/bias-in-ai)
