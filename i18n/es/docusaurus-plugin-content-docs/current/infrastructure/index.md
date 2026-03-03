---
title: Infrastructure
description: "Hardware y sistemas para entrenar y servir IA: GPUs, TPUs, clústeres."
keywords: [infrastructure, GPU, TPU, training]
---

# Infrastructure

## Definición

La infraestructura de IA abarca hardware (GPUs, TPUs, aceleradores personalizados) y software (distributed training, serving, orchestration) for training and deploying modelo grandes.

La escala es impulsada por [LLMs](/docs/llms) y grandes modelos de visión; el entrenamiento puede usar miles de GPUs; el servicio usa [compresión de modeloompression](/docs/model-compression) (por ej. [quantization](/docs/quantization)) and batching to meet latency and cost. [Frameworks](/docs/frameworks/pytorch) (PyTorch, JAX, TensorFlow) provide the programming model; clouds and on-prem clusters provide the hardware and orchestration.

## Cómo funciona

```mermaid
flowchart LR
  Data[Data] --> Train[Train distributed]
  Config[Config] --> Train
  Train --> Model[Model]
  Model --> Serve[Serve]
```

**Datos** y **configuración** (modelo, hiperparámetros) alimentan el **entrenamiento**: el entrenamiento distribuido se ejecuta en muchos dispositivos usandog data parallelism (replicate model, split data) and/or model parallelism (split model across devices). Frameworks (PyTorch, JAX) and orchestrators (SLURM, Kubernetes, cloud jobs) manage scheduling and communication. The trained **model** is then **served**: loaded on inference hardware, optionally [quantized](/docs/quantization), and exposed via an API. Serving uses batching, replication, and load balancing to meet throughput and latency; monitoring and versioning are part of the pipeline.

## Casos de uso

ML infrastructure covers training at scale and serving with the right latency, throughput, and reliability.

- Distributed training of modelo grandes across GPU/TPU clusters
- Serving models at scale with batching and replication
- End-to-end ML pipelines from data to deployment

## Documentación externa

- [PyTorch – Distributed training](https://pytorch.org/tutorials/beginner/distributed_overview.html)
- [Google Cloud – GPU and TPU](https://cloud.google.com/ai-platform/docs/get-started-with-tpu)

## Ver también

- [Local inference](/docs/local-inference)
- [Edge razonamiento](/docs/edge-reasoning)
- [Model compression](/docs/model-compression)
- [Quantization](/docs/quantization)
- [Frameworks](/docs/frameworks/pytorch)
