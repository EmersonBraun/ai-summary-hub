---
title: 评估指标
description: Measuring model performance across tasks.
keywords: [evaluation, metrics, accuracy, F1]
---

# 评估指标

## 定义

评估指标量化模型的性能: accuracy, F1, BLEU, ROUGE, perplexity, human preference, etc. Choice depends on task (classification, generation, 检索) and goals (fairness, robustness).

它们是 used in [benchmarks](/docs/benchmarks), development, and production (A/B tests, monitoring). No single metric captures everything; combine automated metrics with human evaluation for [LLMs](/docs/llms) and subjective tasks. See [bias in AI](/docs/bias-in-ai) for fairness-related metrics.

## 工作原理

```mermaid
flowchart LR
  Predictions[Predictions] --> Metric[Metric]
  References[References] --> Metric
  Metric --> Score[Score]
```

**预测**（模型输出）和**参考**（真实值或人类回答）输入到一个**指标**中计算es a **score**. Classification: accuracy, F1, AUC. Generation: BLEU, ROUGE, BERTScore, or learned metrics. Retrieval: recall@k, MRR. For LLMs, [benchmarks](/docs/benchmarks) (MMLU, HumanEval) run fixed prompts and aggregate metrics; human eval (preference, correctness) is often needed for open-ended quality. Metrics should align with the product goal and be reported on held-out or standard splits.

## 应用场景

Evaluation metrics are needed whenever you train or ship a model: to compare runs, track quality, and audit fairness or safety.

- Comparing models on classification (accuracy, F1), generation (BLEU, ROUGE), or 检索
- Tracking progress in development and A/B tests
- Auditing for fairness, robustness, or safety

## 外部文档

- [Hugging Face – Evaluate](https://huggingface.co/docs/evaluate/)
- [Papers with Code – Metrics](https://paperswithcode.com/task/image-classification)

## 另请参阅

- [Benchmarks](/docs/benchmarks)
- [Bias in AI](/docs/bias-in-ai)
