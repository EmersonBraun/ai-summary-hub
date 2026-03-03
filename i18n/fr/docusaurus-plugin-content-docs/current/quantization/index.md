---
title: Quantification
description: Utilisation d'une précision réduite (ex. int8) pour les poids et activations.
keywords: [quantization, int8, precision]
---

# Quantification

## Définition

La quantification représente les poids et optionnellement les activations en précision réduite (par ex. 8-bit instead of 32-bit float) to reduce memory and speed up inference with minimal accuracy loss.

C'est one of the main [model compression](/docs/model-compression) levers for [LLMs](/docs/llms) and vision models. INT8 is common; INT4 and lower are used for aggressive compression. Deploy on [infrastructure](/docs/infrastructure) that supports quantized ops (par ex. GPU tensor cores, dedicated inference chips).

## Comment ça fonctionne

```mermaid
flowchart LR
  FP32[FP32 weights] --> Calibrate[Calibrate]
  Calibrate --> Quantize[Quantize]
  Quantize --> INT8[INT8]
```

**FP32 weights** (and optionally activations) are mapped to a discrete range (par ex. INT8). **Calibrate**: run a representative dataset to collect activation statistics and choose **scales and zero-points** so the quantized values approximate the original range. **Quantize**: convert weights (and optionally activations at runtime) to INT8. **Post-training quantization (PTQ)** does this sans réentraînement; **quantization-aware training (QAT)** fine-tunes with simulated quantization so the model adapts. The **INT8** model is then run on hardware that supports low-precision ops for faster inference and lower memory.

## Cas d'utilisation

Quantization est le levier principal pour réduire la mémoire et accélérer l'inférence avec une perte de précision limitée (edge, cloud, cost).

- Running LLMs and vision models on consumer GPUs or edge devices
- Reducing memory and speeding inference with minimal accuracy loss
- INT8 or lower precision for production serving

## Documentation externe

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow Lite – Quantization](https://www.tensorflow.org/lite/performance/quantization)

## Voir aussi

- [Model compression](/docs/model-compression)
- [Infrastructure](/docs/infrastructure)
