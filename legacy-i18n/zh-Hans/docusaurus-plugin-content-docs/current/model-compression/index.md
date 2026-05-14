---
title: 模型压缩
description: 减小模型大小和计算量以用于部署。
keywords: [model compression, pruning, quantization, distillation]
---

# 模型压缩

## 定义

模型压缩减少模型的大小、延迟或内存 so they can run on edge or with limited compute. Methods include [pruning](/docs/pruning), [quantization](/docs/quantization), and [knowledge distillation](/docs/knowledge-distillation).

当…时使用 the full model is too large for deployment (例如 [LLMs](/docs/llms) on edge, real-time serving). Trade off accuracy vs size/latency; often combine several methods. See [infrastructure](/docs/infrastructure) for how compressed models are served at scale.

## 工作原理

```mermaid
flowchart LR
  LargeModel[Large model] --> Compress["Prune/Quantize/Distill"]
  Compress --> SmallModel[Small model]
```

你从一个**大模型**开始，应用一个或多个**压缩**步骤。**剪枝**移除低重要性的权重或 structures (unstructured or channel-wise). **Quantization** stores weights (and optionally activations) in lower precision (例如 INT8). **Distillation** trains a smaller **small model** (student) to mimic the large one (teacher) via soft labels or representations. 结果是一个 smaller, faster model; accuracy is validated on a dev set. Methods are often combined (例如 prune then quantize, or distill then quantize) and may require fine-tuning to recover accuracy.

## 应用场景

Model compression is used when you need smaller or faster models for edge, mobile, or cost-sensitive production.

- Deploying large models on edge or mobile with limited memory
- Reducing inference latency and cost in production
- Combining pruning, quantization, and distillation for maximum compression

## 外部文档

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Model optimization](https://www.tensorflow.org/model_optimization)

## 另请参阅

- [Quantization](/docs/quantization)
- [Pruning](/docs/pruning)
- [Knowledge distillation](/docs/knowledge-distillation)
