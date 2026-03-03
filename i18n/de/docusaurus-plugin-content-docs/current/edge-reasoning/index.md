---
title: Edge Reasoning
description: Ausführung von leichtgewichtigem Reasoning und Inferenz am Edge (Geräte, Gateways).
keywords: [edge Schlussfolgern, edge AI, on-device, small models]
---

# Edge Reasoning

## Definition

Edge-Reasoning führt **leichtgewichtiges Reasoning oder Inferenz** auf Edge-Geräten aus—Handys, IoT-Gateways, Kameras, Fahrzeuge—anstatt in the cloud. Das Ziel ist **niedrige Latenz**, **Offline-Fähigkeit**, **Datenschutz** (data stays on device), and **reduced bandwidth** by doing as much work locally as possible.

Es kombiniert small or distilled [LLMs](/docs/llms), [model compression](/docs/model-compression) ([quantization](/docs/quantization), [pruning](/docs/pruning)), and hardware-friendly runtimes (TFLite, ONNX Runtime, Core ML). Techniques like **speculative deProgrammierung**, **early exit**, and **mixture-of-experts** (with small experts) can reduce compute per token so [Schlussfolgern patterns](/docs/reasoning-patterns) (z. B. [chain-of-thought](/docs/reasoning-patterns/cot)) remain viable at the edge.

## Funktionsweise

```mermaid
flowchart LR
  Input[Input] --> Edge[Edge device]
  Edge --> SmallModel[Small / compressed model]
  SmallModel --> Reason[Reasoning step]
  Reason --> Output[Output]
```

**Edge device** (phone, gateway, embedded system) holds a **small or compressed model** (z. B. distilled [transformer](/docs/transformers), quantized [LLM](/docs/llms)). **Input** (sensor data, text, or a prompt) is fed to the model; **Schlussfolgern** may be a short [chain-of-thought](/docs/reasoning-patterns/cot) or ein einzelnes forward pass. **Early exit** skips later layers wenn die model is confident; **speculative deProgrammierung** uses a small draft model locally und optional verifies with a larger model when online. Output is returned without a round-trip to the cloud (or with optional cloud fallback).

## Anwendungsfälle

Edge Schlussfolgern gilt, wenn you need low-latency or offline Schlussfolgern on devices mit begrenztem compute and memory.

- Smart assistants and wearables that answer or act without a constant cloud connection
- Vehicles and robotics where latency and offline operation are critical
- Privacy-first apps (health, home) that keep sensitive data on-device
- Cost and bandwidth reduction by moving simple Schlussfolgern from cloud to edge

## Vor- und Nachteile

| Pros | Cons |
|------|------|
| Low latency, no round-trip to cloud | Smaller models; less capable than large cloud LLMs |
| Works offline and in poor connectivity | Hardware constraints (memory, power, thermal) |
| Data stays on device for Datenschutz | Trade-off between model size and Schlussfolgern quality |
| Lower bandwidth and cloud cost | Requires [quantization](/docs/quantization) and [compression](/docs/model-compression) |

## Externe Dokumentation

- [TensorFlow Lite – On-device inference](https://www.tensorflow.org/lite/guide)
- [ONNX Runtime – Mobile and edge](https://onnxruntime.ai/docs/tutorials/mobile/)
- [Apple – Core ML and MLX](https://developer.apple.com/machine-learning/) — On-device ML on Apple Silicon
- [Google – Edge ML](https://developers.google.com/ml-kit) — ML Kit for mobile and edge

## Siehe auch

- [Local inference](/docs/local-inference)
- [Model compression](/docs/model-compression)
- [Quantization](/docs/quantization)
- [Reasoning patterns](/docs/reasoning-patterns)
