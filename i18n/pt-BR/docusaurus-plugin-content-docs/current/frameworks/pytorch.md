---
title: PyTorch
description: Deep learning framework with dynamic computation graphs.
keywords: [PyTorch, aprendizado profundo, research]
---

# PyTorch

## Definição

PyTorch é um framework popular de [aprendizado profundo](/docs/fundamentals/deep-learning) com estilo imperativo e pythônico. É widely used in research and industry and is the base for many libraries ([Hugging Face](/docs/tools/huggingface), torchvision, etc.).

It competes with [TensorFlow](/docs/frameworks/tensorflow); PyTorch is often preferred for research and rapid iteration due to eager execution and clear debugging. Used for [LLMs](/docs/llms), [vision](/docs/cv), [NLP](/docs/nlp), and [RL](/docs/drl); production deployment uses TorchScript, ONNX, or dedicated runtimes.

## Como funciona

Você **define modelos** como classes Python (nn.Module); o **passo forward** executa imediatamente (modo eager), e **autograd** records operations for **backprop**. Optimizers (por ex. Adam) update parameters from computed gradients. Training loops are explicit (for epoch, for batch, loss.backward(), optimizer.step()), which makes experimentation and debugging straightforward. For **deployment**, export to TorchScript (Python-free), ONNX (cross-framework), or PyTorch Mobile. Distributed training uses torch.distributed or higher-level APIs (por ex. Hugging Face Accelerate). The same code can run on CPU, GPU, or multiple GPUs with minimal changes.

## Casos de uso

PyTorch is a natural fit for research, prototyping, and production when you want flexibility and a Python-first workflow.

- Research and prototyping (por ex. new architectures, experiments)
- Training and fine-tuning models (vision, NLP, RL)
- Production deployment via TorchScript, ONNX, or mobile

## Documentação externa

- [PyTorch – Get started](https://pytorch.org/get-started/locally/)
- [PyTorch tutorials](https://pytorch.org/tutorials/)

## Veja também

- [TensorFlow](/docs/frameworks/tensorflow)
- [Hugging Face](/docs/tools/huggingface)
- [Deep learning](/docs/fundamentals/deep-learning)
