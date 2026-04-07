---
title: Model compression
description: Reducing model size and compute for deployment.
keywords: [model compression, pruning, quantization, distillation]
tags: [intermediate]
authors: [EmersonBraun]
---

# Model compression

## Definition

Model compression reduces the size, latency, or memory of models so they can run on edge or with limited compute. Methods include [pruning](/docs/pruning), [quantization](/docs/quantization), and [knowledge distillation](/docs/knowledge-distillation).

Use it when the full model is too large for deployment (e.g. [LLMs](/docs/llms) on edge, real-time serving). Trade off accuracy vs size/latency; often combine several methods. See [infrastructure](/docs/infrastructure) for how compressed models are served at scale.

## How it works

```mermaid
flowchart LR
  LargeModel[Large model] --> Compress["Prune/Quantize/Distill"]
  Compress --> SmallModel[Small model]
```

You start from a **large model** and apply one or more **compress** steps. **Pruning** removes low-importance weights or structures (unstructured or channel-wise). **Quantization** stores weights (and optionally activations) in lower precision (e.g. INT8). **Distillation** trains a smaller **small model** (student) to mimic the large one (teacher) via soft labels or representations. The result is a smaller, faster model; accuracy is validated on a dev set. Methods are often combined (e.g. prune then quantize, or distill then quantize) and may require fine-tuning to recover accuracy.

## Use cases

Model compression is used when you need smaller or faster models for edge, mobile, or cost-sensitive production.

- Deploying large models on edge or mobile with limited memory
- Reducing inference latency and cost in production
- Combining pruning, quantization, and distillation for maximum compression

## External documentation

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Model optimization](https://www.tensorflow.org/model_optimization)

## See also

- [Quantization](/docs/quantization)
- [Pruning](/docs/pruning)
- [Knowledge distillation](/docs/knowledge-distillation)
