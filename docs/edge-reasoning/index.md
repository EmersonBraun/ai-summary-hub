---
title: Edge reasoning
description: Running lightweight reasoning and inference at the edge (devices, gateways).
keywords: [edge reasoning, edge AI, on-device, small models]
tags: [advanced]
authors: [EmersonBraun]
---

# Edge reasoning

## Definition

Edge reasoning is running **lightweight reasoning or inference** on edge devices—phones, IoT gateways, cameras, vehicles—instead of in the cloud. The goal is **low latency**, **offline capability**, **privacy** (data stays on device), and **reduced bandwidth** by doing as much work locally as possible.

It combines small or distilled [LLMs](/docs/llms), [model compression](/docs/model-compression) ([quantization](/docs/quantization), [pruning](/docs/pruning)), and hardware-friendly runtimes (TFLite, ONNX Runtime, Core ML). Techniques like **speculative decoding**, **early exit**, and **mixture-of-experts** (with small experts) can reduce compute per token so [reasoning patterns](/docs/reasoning-patterns) (e.g. [chain-of-thought](/docs/reasoning-patterns/cot)) remain viable at the edge.

## How it works

```mermaid
flowchart LR
  Input[Input] --> Edge[Edge device]
  Edge --> SmallModel[Small / compressed model]
  SmallModel --> Reason[Reasoning step]
  Reason --> Output[Output]
```

**Edge device** (phone, gateway, embedded system) holds a **small or compressed model** (e.g. distilled [transformer](/docs/transformers), quantized [LLM](/docs/llms)). **Input** (sensor data, text, or a prompt) is fed to the model; **reasoning** may be a short [chain-of-thought](/docs/reasoning-patterns/cot) or a single forward pass. **Early exit** skips later layers when the model is confident; **speculative decoding** uses a small draft model locally and optionally verifies with a larger model when online. Output is returned without a round-trip to the cloud (or with optional cloud fallback).

## Use cases

Edge reasoning applies when you need low-latency or offline reasoning on devices with limited compute and memory.

- Smart assistants and wearables that answer or act without a constant cloud connection
- Vehicles and robotics where latency and offline operation are critical
- Privacy-first apps (health, home) that keep sensitive data on-device
- Cost and bandwidth reduction by moving simple reasoning from cloud to edge

## Pros and cons

| Pros | Cons |
|------|------|
| Low latency, no round-trip to cloud | Smaller models; less capable than large cloud LLMs |
| Works offline and in poor connectivity | Hardware constraints (memory, power, thermal) |
| Data stays on device for privacy | Trade-off between model size and reasoning quality |
| Lower bandwidth and cloud cost | Requires [quantization](/docs/quantization) and [compression](/docs/model-compression) |

## External documentation

- [TensorFlow Lite – On-device inference](https://www.tensorflow.org/lite/guide)
- [ONNX Runtime – Mobile and edge](https://onnxruntime.ai/docs/tutorials/mobile/)
- [Apple – Core ML and MLX](https://developer.apple.com/machine-learning/) — On-device ML on Apple Silicon
- [Google – Edge ML](https://developers.google.com/ml-kit) — ML Kit for mobile and edge

## See also

- [Local inference](/docs/local-inference)
- [Model compression](/docs/model-compression)
- [Quantization](/docs/quantization)
- [Reasoning patterns](/docs/reasoning-patterns)
