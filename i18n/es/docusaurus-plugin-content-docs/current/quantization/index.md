---
title: Cuantización
description: Uso de menor precisión (p. ej. int8) para pesos y activaciones.
keywords: [quantization, int8, precision]
---

# Cuantización

## Definición

La cuantización representa pesos y opcionalmente activaciones en menor precisión (por ej. 8-bit instead of 32-bit float) to reduce memory and speed up inference with minimal accuracy loss.

Es one of the main [model compression](/docs/model-compression) levers for [LLMs](/docs/llms) and vision models. INT8 is common; INT4 and lower are used for aggressive compression. Deploy on [infrastructure](/docs/infrastructure) that supports quantized ops (por ej. GPU tensor cores, dedicated inference chips).

## Cómo funciona

```mermaid
flowchart LR
  FP32[FP32 weights] --> Calibrate[Calibrate]
  Calibrate --> Quantize[Quantize]
  Quantize --> INT8[INT8]
```

**FP32 weights** (and optionally activations) are mapped to a discrete range (por ej. INT8). **Calibrate**: run a representative dataset to collect activation statistics and choose **scales and zero-points** so the quantized values approximate the original range. **Quantize**: convert weights (and optionally activations at runtime) to INT8. **Post-training quantization (PTQ)** does this sin reentrenar; **quantization-aware training (QAT)** fine-tunes with simulated quantization so the model adapts. The **INT8** model is then run on hardware that supports low-precision ops for faster inference and lower memory.

## Casos de uso

Quantization es la palanca principal para reducir memoria y acelerar la inferencia con pérdida de precisión limitada (borde, nube, costo).

- Running LLMs and vision models on consumer GPUs or edge devices
- Reducing memory and speeding inference with minimal accuracy loss
- INT8 or lower precision for production serving

## Documentación externa

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow Lite – Quantization](https://www.tensorflow.org/lite/performance/quantization)

## Ver también

- [Model compression](/docs/model-compression)
- [Infrastructure](/docs/infrastructure)
