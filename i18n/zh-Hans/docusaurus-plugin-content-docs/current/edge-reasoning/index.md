---
title: 边缘推理
description: 在边缘设备（设备、网关）上运行轻量级推理和推断。
keywords: [edge 推理, edge AI, on-device, small models]
---

# 边缘推理

## 定义

Edge 推理 运行 **轻量级推理或推断** 在边缘设备上—phones, IoT gateways, cameras, vehicles—而不是在云端. 目标是 **low latency**, **offline capability**, **privacy** (data stays on device), and **reduced bandwidth** by doing as much work locally as possible.

它结合了小型或蒸馏的 [LLMs](/docs/llms), [model compression](/docs/model-compression) ([quantization](/docs/quantization), [pruning](/docs/pruning)), and hardware-friendly runtimes (TFLite, ONNX Runtime, Core ML). Techniques like **speculative decoding**, **early exit**, and **mixture-of-experts** (with small experts) can reduce compute per token so [推理 patterns](/docs/reasoning-patterns) (例如 [chain-of-thought](/docs/reasoning-patterns/cot)) remain viable at the edge.

## 工作原理

```mermaid
flowchart LR
  Input[Input] --> Edge[Edge device]
  Edge --> SmallModel[Small / compressed model]
  SmallModel --> Reason[Reasoning step]
  Reason --> Output[Output]
```

**Edge device** (phone, gateway, embedded system) holds a **small or compressed model** (例如 distilled [transformer](/docs/transformers), quantized [LLM](/docs/llms)). **Input** (sensor data, text, or a prompt) is fed to the model; **推理** may be a short [chain-of-thought](/docs/reasoning-patterns/cot) or a single forward pass. **Early exit** skips later layers when the model is confident; **speculative decoding** uses a small draft model locally and optionally verifies with a larger model when online. Output is returned without a round-trip to the cloud (or with optional cloud fallback).

## 应用场景

Edge 推理 applies when you need low-latency or offline 推理 on devices with limited compute and memory.

- Smart assistants and wearables that answer or act without a constant cloud connection
- Vehicles and robotics where latency and offline operation are critical
- Privacy-first apps (health, home) that keep sensitive data on-device
- Cost and bandwidth reduction by moving simple 推理 from cloud to edge

## 优缺点

| Pros | Cons |
|------|------|
| Low latency, no round-trip to cloud | Smaller models; less capable than large cloud LLMs |
| Works offline and in poor connectivity | Hardware constraints (memory, power, thermal) |
| Data stays on device for privacy | Trade-off between model size and 推理 quality |
| Lower bandwidth and cloud cost | Requires [quantization](/docs/quantization) and [compression](/docs/model-compression) |

## 外部文档

- [TensorFlow Lite – On-device inference](https://www.tensorflow.org/lite/guide)
- [ONNX Runtime – Mobile and edge](https://onnxruntime.ai/docs/tutorials/mobile/)
- [Apple – Core ML and MLX](https://developer.apple.com/machine-learning/) — On-device ML on Apple Silicon
- [Google – Edge ML](https://developers.google.com/ml-kit) — ML Kit for mobile and edge

## 另请参阅

- [Local inference](/docs/local-inference)
- [Model compression](/docs/model-compression)
- [Quantization](/docs/quantization)
- [Reasoning patterns](/docs/reasoning-patterns)
