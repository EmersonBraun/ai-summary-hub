---
title: PyTorch
description: Deep learning framework with dynamic computation graphs.
keywords: [PyTorch, aprendizaje profundo, research]
---

# PyTorch

## Definición

PyTorch is a popular [deep learning](/docs/fundamentals/deep-learning) framework con un estilo imperativo y pythónico. Es widely used in research and industry and is the base for many libraries ([Hugging Face](/docs/tools/huggingface), torchvision, etc.).

It competes with [TensorFlow](/docs/frameworks/tensorflow); PyTorch is often preferred for research and rapid iteration due to eager execution and clear debugging. Used for [LLMs](/docs/llms), [vision](/docs/cv), [NLP](/docs/nlp), and [RL](/docs/drl); production deployment uses TorchScript, ONNX, or dedicated runtimes.

## Cómo funciona

Se **definen modelos** como clases Python (nn.Module); el **paso forward** se ejecuta inmediatamente (modo eager), y **autograd** records operations for **backprop**. Optimizers (por ej. Adam) update parameters from computed gradients. Training loops are explicit (for epoch, for batch, loss.backward(), optimizer.step()), which makes experimentation and debugging straightforward. For **deployment**, export to TorchScript (Python-free), ONNX (cross-framework), or PyTorch Mobile. Distributed training uses torch.distributed or higher-level APIs (por ej. Hugging Face Accelerate). The same code can run on CPU, GPU, or multiple GPUs with minimal changes.

## Casos de uso

PyTorch is a natural fit for research, prototyping, and production when you want flexibility and a Python-first workflow.

- Research and prototyping (por ej. new architectures, experiments)
- Training and fine-tuning models (vision, NLP, RL)
- Production deployment via TorchScript, ONNX, or mobile

## Documentación externa

- [PyTorch – Get started](https://pytorch.org/get-started/locally/)
- [PyTorch tutorials](https://pytorch.org/tutorials/)

## Ver también

- [TensorFlow](/docs/frameworks/tensorflow)
- [Hugging Face](/docs/tools/huggingface)
- [Deep learning](/docs/fundamentals/deep-learning)
