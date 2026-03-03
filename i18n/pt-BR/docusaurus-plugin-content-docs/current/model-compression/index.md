---
title: Compressão de modelos
description: Redução do tamanho do modelo e do cálculo para implantação.
keywords: [model compression, pruning, quantization, distillation]
---

# Compressão de modelos

## Definição

A compressão de modelos reduz o tamanho, latência ou memória dos modelos so they can run on edge or with limited compute. Methods include [pruning](/docs/pruning), [quantization](/docs/quantization), and [knowledge distillation](/docs/knowledge-distillation).

Use quando the full model is too large for deployment (por ex. [LLMs](/docs/llms) on edge, real-time serving). Trade off accuracy vs size/latency; often combine several methods. See [infrastructure](/docs/infrastructure) for how compressed models are served at scale.

## Como funciona

```mermaid
flowchart LR
  LargeModel[Large model] --> Compress["Prune/Quantize/Distill"]
  Compress --> SmallModel[Small model]
```

Você parte de um **modelo grande** e aplica uma ou mais etapas de **compressão**. **Poda** remove pesos de baixa importância ou structures (unstructured or channel-wise). **Quantization** stores weights (and optionally activations) in lower precision (por ex. INT8). **Distillation** trains a smaller **small model** (student) to mimic the large one (teacher) via soft labels or representations. O resultado é um smaller, faster model; accuracy is validated on a dev set. Methods are often combined (por ex. prune then quantize, or distill then quantize) and may require fine-tuning to recover accuracy.

## Casos de uso

Model compression is used when you need smaller or faster models for edge, mobile, or cost-sensitive production.

- Deploying large models on edge or mobile with limited memory
- Reducing inference latency and cost in production
- Combining pruning, quantization, and distillation for maximum compression

## Documentação externa

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Model optimization](https://www.tensorflow.org/model_optimization)

## Veja também

- [Quantization](/docs/quantization)
- [Pruning](/docs/pruning)
- [Knowledge distillation](/docs/knowledge-distillation)
