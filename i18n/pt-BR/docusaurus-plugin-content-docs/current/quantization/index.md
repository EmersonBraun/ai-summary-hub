---
title: Quantização
description: Uso de menor precisão (ex. int8) para pesos e ativações.
keywords: [quantization, int8, precision]
---

# Quantização

## Definição

A quantização representa pesos e opcionalmente ativações em menor precisão (por ex. 8-bit instead of 32-bit float) to reduce memory and speed up inference with minimal accuracy loss.

É one of the main [model compression](/docs/model-compression) levers for [LLMs](/docs/llms) and vision models. INT8 is common; INT4 and lower are used for aggressive compression. Deploy on [infrastructure](/docs/infrastructure) that supports quantized ops (por ex. GPU tensor cores, dedicated inference chips).

## Como funciona

```mermaid
flowchart LR
  FP32[FP32 weights] --> Calibrate[Calibrate]
  Calibrate --> Quantize[Quantize]
  Quantize --> INT8[INT8]
```

**Pesos FP32** (e opcionalmente ativações) são mapeados para um intervalo discreto (por ex. INT8). **Calibrar**: executar um conjuntentative dataset to collect activation statistics and choose **scales and zero-points** so the quantized values approximate the original range. **Quantize**: convert weights (and optionally activations at runtime) to INT8. **Post-training quantization (PTQ)** does this sem retreinar; **quantization-aware training (QAT)** fine-tunes with simulated quantization so the model adapts. The **INT8** model is then run on hardware that supports low-precision ops for faster inference and lower memory.

## Casos de uso

Quantization é a principal alavanca para reduzir memória e acelerar a inferência com perda de precisão limitada (edge, cloud, cost).

- Running LLMs and vision models on consumer GPUs or edge devices
- Reducing memory and speeding inference with minimal accuracy loss
- INT8 or lower precision for production serving

## Documentação externa

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow Lite – Quantization](https://www.tensorflow.org/lite/performance/quantization)

## Veja também

- [Model compression](/docs/model-compression)
- [Infrastructure](/docs/infrastructure)
