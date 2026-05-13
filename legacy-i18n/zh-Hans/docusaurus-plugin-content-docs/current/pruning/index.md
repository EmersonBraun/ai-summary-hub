---
title: 剪枝
description: Removing weights or structures to shrink models.
keywords: [pruning, sparsity, structured pruning]
---

# 剪枝

## 定义

Pruning removes redundant or low-impact weights (or neurons/heads) from a model. Unstructured pruning drops individual weights; structured pruning removes entire channels or layers for efficient execution.

它是 part of [model compression](/docs/model-compression); often used with [quantization](/docs/quantization) or [knowledge distillation](/docs/knowledge-distillation) for smaller, faster models. Unstructured pruning saves parameters but may not speed up much on standard hardware; structured pruning (例如 channels) yields real speedups.

## 工作原理

```mermaid
flowchart LR
  Model[Model] --> Score[Score weights]
  Score --> Prune[Prune]
  Prune --> FineTune[Fine-tune]
```

Start from a trained **model**. **Score** weights (or channels/heads) by importance (例如 magnitude, gradient, or learned mask). **Prune**: zero out or remove the lowest-scoring parameters (unstructured) or entire channels/layers (structured). **Fine-tune** the pruned model to recover accuracy. Pruning can be one-shot (after training) or iterative (train → prune → fine-tune, repeat). Sparsity is often enforced with L1 or other regularizers during training so the model adapts to pruning. The final model has fewer non-zero weights and, with structured pruning, faster inference.

## 应用场景

Pruning helps when you want a smaller or faster model by removing low-importance weights or structures.

- Shrinking models for edge or mobile deployment
- Reducing compute and memory with structured pruning (例如 channels)
- Combining with quantization for smaller, faster models

## 外部文档

- [TensorFlow – Pruning](https://www.tensorflow.org/model_optimization/guide/pruning)
- [PyTorch – Pruning tutorial](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)

## 另请参阅

- [Model compression](/docs/model-compression)
- [Knowledge distillation](/docs/knowledge-distillation)
