---
title: Modellkompression
description: Reduzierung von Modellgröße und Rechenaufwand für den Einsatz.
keywords: [model compression, pruning, quantization, distillation]
---

# Modellkompression

## Definition

Modellkomprimierung reduziert die Größe, Latenz oder den Speicherverbrauch von Modellen sodass sie can run on edge or mit begrenztem compute. Methods include [pruning](/docs/pruning), [quantization](/docs/quantization), and [knowledge distillation](/docs/knowledge-distillation).

Verwenden Sie es, wenn die vollständige model is too large for deployment (z. B. [LLMs](/docs/llms) on edge, real-time serving). Trade off accuracy vs size/latency; often combine several methods. See [infrastructure](/docs/infrastructure) for how compressed models are served at scale.

## Funktionsweise

```mermaid
flowchart LR
  LargeModel[Large model] --> Compress["Prune/Quantize/Distill"]
  Compress --> SmallModel[Small model]
```

You start from a **großes Modell** and apply one or more **compress** steps. **Pruning** removes low-importance weights or structures (unstructured or channel-wise). **Quantization** stores weights (und optional activations) in lower precision (z. B. INT8). **Distillation** trains a smaller **small model** (student) to mimic the large one (teacher) via soft labels or representations. Das Ergebnis ist ein smaller, faster model; accuracy is validated on a dev set. Methods werden oft combined (z. B. prune then quantize, or distill then quantize) and may require Feinabstimmung to recover accuracy.

## Anwendungsfälle

Model compression is used wenn Sie need smaller or faster models for edge, mobile, or cost-sensitive production.

- Deploying großes Modells on edge or mobile mit begrenztem memory
- Reducing inference latency and cost in production
- Combining pruning, quantization, and distillation for maximum compression

## Externe Dokumentation

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Model optimization](https://www.tensorflow.org/model_optimization)

## Siehe auch

- [Quantization](/docs/quantization)
- [Pruning](/docs/pruning)
- [Knowledge distillation](/docs/knowledge-distillation)
