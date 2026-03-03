---
title: Compresión de modelos
description: Reducción del tamaño del modelo y el cómputo para despliegue.
keywords: [model compression, pruning, quantization, distillation]
---

# Compresión de modelos

## Definición

La compresión de modelos reduce el tamaño, latencia o memoria de los modelos so they can run on edge or with limited compute. Methods include [pruning](/docs/pruning), [quantization](/docs/quantization), and [knowledge distillation](/docs/knowledge-distillation).

Úselo cuando the full model is too large for deployment (por ej. [LLMs](/docs/llms) on edge, real-time serving). Trade off accuracy vs size/latency; often combine several methods. See [infrastructure](/docs/infrastructure) for how compressed models are served at scale.

## Cómo funciona

```mermaid
flowchart LR
  LargeModel[Large model] --> Compress["Prune/Quantize/Distill"]
  Compress --> SmallModel[Small model]
```

You start from a **modelo grande** and apply one or more **compress** steps. **Pruning** removes low-importance weights or structures (unstructured or channel-wise). **Quantization** stores weights (and optionally activations) in lower precision (por ej. INT8). **Distillation** trains a smaller **small model** (student) to mimic the large one (teacher) via soft labels or representations. El resultado es un smaller, faster model; accuracy is validated on a dev set. Methods are often combined (por ej. prune then quantize, or distill then quantize) and may require fine-tuning to recover accuracy.

## Casos de uso

Model compression is used when you need smaller or faster models for edge, mobile, or cost-sensitive production.

- Deploying modelo grandes on edge or mobile with limited memory
- Reducing inference latency and cost in production
- Combining pruning, quantization, and distillation for maximum compression

## Documentación externa

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Model optimization](https://www.tensorflow.org/model_optimization)

## Ver también

- [Quantization](/docs/quantization)
- [Pruning](/docs/pruning)
- [Knowledge distillation](/docs/knowledge-distillation)
