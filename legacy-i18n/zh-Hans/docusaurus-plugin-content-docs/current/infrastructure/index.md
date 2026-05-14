---
title: Infrastructure
description: 用于训练和部署 AI 的硬件和系统：GPU、TPU、集群。
keywords: [infrastructure, GPU, TPU, training]
---

# Infrastructure

## 定义

AI infrastructure covers hardware (GPUs, TPUs, custom accelerators) and software (distributed training, serving, orchestration) for training and deploying large models.

规模由 [LLMs](/docs/llms) 和大型视觉模型驱动；训练可能使用数千个 GPU；服务使用[模型压缩ompression](/docs/model-compression) (例如 [quantization](/docs/quantization)) and batching to meet latency and cost. [Frameworks](/docs/frameworks/pytorch) (PyTorch, JAX, TensorFlow) provide the programming model; clouds and on-prem clusters provide the hardware and orchestration.

## 工作原理

```mermaid
flowchart LR
  Data[Data] --> Train[Train distributed]
  Config[Config] --> Train
  Train --> Model[Model]
  Model --> Serve[Serve]
```

**数据**和**配置**（模型、超参数）输入**训练**：分布式训练在多个设备上运行，使用g data parallelism (replicate model, split data) and/or model parallelism (split model across devices). Frameworks (PyTorch, JAX) and orchestrators (SLURM, Kubernetes, cloud jobs) manage scheduling and communication. The trained **model** is then **served**: loaded on inference hardware, optionally [quantized](/docs/quantization), and exposed via an API. Serving uses batching, replication, and load balancing to meet throughput and latency; monitoring and versioning are part of the pipeline.

## 应用场景

ML infrastructure covers training at scale and serving with the right latency, throughput, and reliability.

- Distributed training of large models across GPU/TPU clusters
- Serving models at scale with batching and replication
- End-to-end ML pipelines from data to deployment

## 外部文档

- [PyTorch – Distributed training](https://pytorch.org/tutorials/beginner/distributed_overview.html)
- [Google Cloud – GPU and TPU](https://cloud.google.com/ai-platform/docs/get-started-with-tpu)

## 另请参阅

- [Local inference](/docs/local-inference)
- [Edge 推理](/docs/edge-reasoning)
- [Model compression](/docs/model-compression)
- [Quantization](/docs/quantization)
- [Frameworks](/docs/frameworks/pytorch)
