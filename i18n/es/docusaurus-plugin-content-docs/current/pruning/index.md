---
title: Poda (Pruning)
description: Removing weights or structures to shrink models.
keywords: [pruning, sparsity, structured pruning]
---

# Poda (Pruning)

## Definición

La poda elimina pesos redundantes o de bajo impacto (or neurons/heads) from a model. Unstructured pruning drops individual weights; structured pruning removes entire channels or layers for efficient execution.

Es part of [model compression](/docs/model-compression); often used with [quantization](/docs/quantization) or [knowledge distillation](/docs/knowledge-distillation) for smaller, faster models. Unstructured pruning saves parameters but may not speed up much on standard hardware; structured pruning (por ej. channels) yields real speedups.

## Cómo funciona

```mermaid
flowchart LR
  Model[Model] --> Score[Score weights]
  Score --> Prune[Prune]
  Prune --> FineTune[Fine-tune]
```

Start from a trained **model**. **Score** weights (or channels/heads) by importance (por ej. magnitude, gradient, or learned mask). **Prune**: zero out or remove the lowest-scoring parameters (unstructured) or entire channels/layers (structured). **Fine-tune** the pruned model to recover accuracy. Pruning can be one-shot (after training) or iterative (train → prune → fine-tune, repeat). Sparsity is often enforced with L1 or other regularizers during training so the model adapts to pruning. The final model has fewer non-zero weights and, with structured pruning, faster inference.

## Casos de uso

Pruning helps when you want a smaller or faster model by removing low-importance weights or structures.

- Shrinking models for edge or mobile deployment
- Reducing compute and memory with structured pruning (por ej. channels)
- Combining with quantization for smaller, faster models

## Documentación externa

- [TensorFlow – Pruning](https://www.tensorflow.org/model_optimization/guide/pruning)
- [PyTorch – Pruning tutorial](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)

## Ver también

- [Model compression](/docs/model-compression)
- [Knowledge distillation](/docs/knowledge-distillation)
