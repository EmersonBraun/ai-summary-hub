---
title: Infrastructure
description: "Hardware und Systeme für Training und Bereitstellung von KI: GPUs, TPUs, Cluster."
keywords: [infrastructure, GPU, TPU, training]
---

# Infrastructure

## Definition

KI-Infrastruktur umfasst Hardware (GPUs, TPUs, benutzerdefinierte Beschleuniger) und Software (distributed training, serving, orchestration) for training and deploying großes Modells.

Die Skalierung wird von [LLMs](/docs/llms) und großen Visionsmodellen vorangetrieben; Training kann Tausende von GPUs nutzen; Bereitstellung nutzt [Modellkompressompression](/docs/model-compression) (z. B. [quantization](/docs/quantization)) and batching to meet latency and cost. [Frameworks](/docs/frameworks/pytorch) (PyTorch, JAX, TensorFlow) provide the programming model; clouds and on-prem clusters provide the hardware and orchestration.

## Funktionsweise

```mermaid
flowchart LR
  Data[Data] --> Train[Train distributed]
  Config[Config] --> Train
  Train --> Model[Model]
  Model --> Serve[Serve]
```

**Daten** und **Konfiguration** (Modell, Hyperparameter) fließen in das **Training** ein: verteiltes Training läuft über viele Geräte mitg Datenparallelismus (replicate model, split data) and/or model parallelism (split model across devices). Frameworks (PyTorch, JAX) and orchestrators (SLURM, Kubernetes, cloud jobs) manage scheduling and communication. The trained **model** is then **served**: loaded on inference hardware, optionally [quantized](/docs/quantization), and exposed via an API. Serving uses batching, replication, and load balancing to meet throughput and latency; monitoring and versioning are part of the pipeline.

## Anwendungsfälle

ML infrastructure covers training at scale and serving with das richtige latency, throughput, and reliability.

- Distributed training of großes Modells across GPU/TPU clusters
- Serving models at scale with batching and replication
- End-to-end ML pipelines aus Daten to deployment

## Externe Dokumentation

- [PyTorch – Distributed training](https://pytorch.org/tutorials/beginner/distributed_overview.html)
- [Google Cloud – GPU and TPU](https://cloud.google.com/ai-platform/docs/get-started-with-tpu)

## Siehe auch

- [Local inference](/docs/local-inference)
- [Edge Schlussfolgern](/docs/edge-reasoning)
- [Model compression](/docs/model-compression)
- [Quantization](/docs/quantization)
- [Frameworks](/docs/frameworks/pytorch)
