---
title: Evaluation metrics
description: Measuring model performance across tasks.
keywords: [evaluation, metrics, accuracy, F1]
tags: [intermediate]
authors: [EmersonBraun]
---

# Evaluation metrics

## Definition

Evaluation metrics quantify how well models perform: accuracy, F1, BLEU, ROUGE, perplexity, human preference, etc. Choice depends on task (classification, generation, retrieval) and goals (fairness, robustness).

They are used in [benchmarks](/docs/benchmarks), development, and production (A/B tests, monitoring). No single metric captures everything; combine automated metrics with human evaluation for [LLMs](/docs/llms) and subjective tasks. See [bias in AI](/docs/bias-in-ai) for fairness-related metrics.

## How it works

```mermaid
flowchart LR
  Predictions[Predictions] --> Metric[Metric]
  References[References] --> Metric
  Metric --> Score[Score]
```

**Predictions** (model outputs) and **references** (ground truth or human answers) are fed into a **metric** that computes a **score**. Classification: accuracy, F1, AUC. Generation: BLEU, ROUGE, BERTScore, or learned metrics. Retrieval: recall@k, MRR. For LLMs, [benchmarks](/docs/benchmarks) (MMLU, HumanEval) run fixed prompts and aggregate metrics; human eval (preference, correctness) is often needed for open-ended quality. Metrics should align with the product goal and be reported on held-out or standard splits.

## Use cases

Evaluation metrics are needed whenever you train or ship a model: to compare runs, track quality, and audit fairness or safety.

- Comparing models on classification (accuracy, F1), generation (BLEU, ROUGE), or retrieval
- Tracking progress in development and A/B tests
- Auditing for fairness, robustness, or safety

## External documentation

- [Hugging Face – Evaluate](https://huggingface.co/docs/evaluate/)
- [Papers with Code – Metrics](https://paperswithcode.com/task/image-classification)

## See also

- [Benchmarks](/docs/benchmarks)
- [Bias in AI](/docs/bias-in-ai)
