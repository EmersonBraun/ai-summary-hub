---
title: 少样本学习
description: Learning from very few examples.
keywords: [few-shot, meta-learning, MAML]
---

# 少样本学习

## 定义

Few-shot learning aims to adapt quickly from a small number of labeled examples (例如 1–5 每类). Meta-learning (例如 MAML) trains models to be good at few-shot adaptation.

它位于之间 [transfer learning](/docs/transfer-learning) (more target data) and [zero-shot](/docs/zero-shot-learning) (no target examples). [LLMs](/docs/llms) do few-shot implicitly via in-context examples in the prompt; classical few-shot uses episodic meta-training (例如 MAML) so the model learns to adapt from a support set.

## 工作原理

```mermaid
flowchart LR
  Support[Support set] --> Adapt[Adapt]
  Adapt --> Query[Query set]
  Query --> Predict[Predict]
```

Each task has a **support set** (少量标注示例, 例如 1–5 每类) and a **query set** (examples to predict). **Adapt**: the model uses the support set to adapt (例如 compute prototypes, or take a few gradient steps in MAML). **Predict**: the adapted model predicts labels for the query set. **Episodic training**: sample many few-shot tasks from a meta-train set; for each, adapt on the task support set and optimize so that predictions on the query set improve. At test time, the model gets a new task’s support set and predicts on its query set. For LLMs, "adapt" is just conditioning on the support examples in the prompt (in-context few-shot).

## 应用场景

Few-shot learning applies when you have only a handful of examples 每类 or task (including in-context LLM prompts).

- Classifying rare classes with only a 少量标注示例
- LLM in-context learning (例如 1–5 examples in the prompt)
- Rapid adaptation in robotics or personalization with minimal data

## 外部文档

- [Model-Agnostic Meta-Learning (MAML) (Finn et al.)](https://arxiv.org/abs/1703.03400)
- [Hugging Face – Few-shot learning](https://huggingface.co/docs/transformers/tasks/summarization#few-shot-summarization)

## 另请参阅

- [Zero-shot learning](/docs/zero-shot-learning)
- [LLMs](/docs/llms)
- [Transfer learning](/docs/transfer-learning)
