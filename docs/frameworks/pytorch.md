---
title: PyTorch
description: Deep learning framework with dynamic computation graphs.
keywords: [PyTorch, deep learning, research]
tags: [beginner]
---

# PyTorch

## Definition

PyTorch is a popular [deep learning](/docs/fundamentals/deep-learning) framework with an imperative, Pythonic style. It is widely used in research and industry and is the base for many libraries ([Hugging Face](/docs/tools/huggingface), torchvision, etc.).

It competes with [TensorFlow](/docs/frameworks/tensorflow); PyTorch is often preferred for research and rapid iteration due to eager execution and clear debugging. Used for [LLMs](/docs/llms), [vision](/docs/cv), [NLP](/docs/nlp), and [RL](/docs/drl); production deployment uses TorchScript, ONNX, or dedicated runtimes.

## How it works

You **define models** as Python classes (nn.Module); the **forward pass** runs immediately (eager mode), and **autograd** records operations for **backprop**. Optimizers (e.g. Adam) update parameters from computed gradients. Training loops are explicit (for epoch, for batch, loss.backward(), optimizer.step()), which makes experimentation and debugging straightforward. For **deployment**, export to TorchScript (Python-free), ONNX (cross-framework), or PyTorch Mobile. Distributed training uses torch.distributed or higher-level APIs (e.g. Hugging Face Accelerate). The same code can run on CPU, GPU, or multiple GPUs with minimal changes.

## Use cases

PyTorch is a natural fit for research, prototyping, and production when you want flexibility and a Python-first workflow.

- Research and prototyping (e.g. new architectures, experiments)
- Training and fine-tuning models (vision, NLP, RL)
- Production deployment via TorchScript, ONNX, or mobile

## External documentation

- [PyTorch – Get started](https://pytorch.org/get-started/locally/)
- [PyTorch tutorials](https://pytorch.org/tutorials/)

## See also

- [TensorFlow](/docs/frameworks/tensorflow)
- [Hugging Face](/docs/tools/huggingface)
- [Deep learning](/docs/fundamentals/deep-learning)
