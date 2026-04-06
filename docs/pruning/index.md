---
title: Pruning
description: Removing weights or structures to shrink models.
keywords: [pruning, sparsity, structured pruning]
tags: [advanced]
---

# Pruning

## Definition

Pruning removes redundant or low-impact weights (or neurons/heads) from a model. Unstructured pruning drops individual weights; structured pruning removes entire channels or layers for efficient execution.

It is part of [model compression](/docs/model-compression); often used with [quantization](/docs/quantization) or [knowledge distillation](/docs/knowledge-distillation) for smaller, faster models. Unstructured pruning saves parameters but may not speed up much on standard hardware; structured pruning (e.g. channels) yields real speedups.

## How it works

```mermaid
flowchart LR
  Model[Model] --> Score[Score weights]
  Score --> Prune[Prune]
  Prune --> FineTune[Fine-tune]
```

Start from a trained **model**. **Score** weights (or channels/heads) by importance (e.g. magnitude, gradient, or learned mask). **Prune**: zero out or remove the lowest-scoring parameters (unstructured) or entire channels/layers (structured). **Fine-tune** the pruned model to recover accuracy. Pruning can be one-shot (after training) or iterative (train → prune → fine-tune, repeat). Sparsity is often enforced with L1 or other regularizers during training so the model adapts to pruning. The final model has fewer non-zero weights and, with structured pruning, faster inference.

## Use cases

Pruning helps when you want a smaller or faster model by removing low-importance weights or structures.

- Shrinking models for edge or mobile deployment
- Reducing compute and memory with structured pruning (e.g. channels)
- Combining with quantization for smaller, faster models

## External documentation

- [TensorFlow – Pruning](https://www.tensorflow.org/model_optimization/guide/pruning)
- [PyTorch – Pruning tutorial](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)

## See also

- [Model compression](/docs/model-compression)
- [Knowledge distillation](/docs/knowledge-distillation)
