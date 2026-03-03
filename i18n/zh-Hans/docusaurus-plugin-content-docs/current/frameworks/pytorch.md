---
title: PyTorch
description: Deep learning framework with dynamic computation graphs.
keywords: [PyTorch, 深度学习, research]
---

# PyTorch

## 定义

PyTorch is a popular [deep learning](/docs/fundamentals/deep-learning) framework with an imperative, Pythonic style. 它是 widely used in research and industry and is the base for many libraries ([Hugging Face](/docs/tools/huggingface), torchvision, etc.).

It competes with [TensorFlow](/docs/frameworks/tensorflow); PyTorch is often preferred for research and rapid iteration due to eager execution and clear debugging. Used for [LLMs](/docs/llms), [vision](/docs/cv), [NLP](/docs/nlp), and [RL](/docs/drl); production deployment uses TorchScript, ONNX, or dedicated runtimes.

## 工作原理

你将**模型定义**为 Python 类（nn.Module）；**前向传播**立即运行（eager 模式），**autograd** records operations for **backprop**. Optimizers (例如 Adam) update parameters from computed gradients. Training loops are explicit (for epoch, for batch, loss.backward(), optimizer.step()), which makes experimentation and debugging straightforward. For **deployment**, export to TorchScript (Python-free), ONNX (cross-framework), or PyTorch Mobile. Distributed training uses torch.distributed or higher-level APIs (例如 Hugging Face Accelerate). The same code can run on CPU, GPU, or multiple GPUs with minimal changes.

## 应用场景

PyTorch is a natural fit for research, prototyping, and production when you want flexibility and a Python-first workflow.

- Research and prototyping (例如 new architectures, experiments)
- Training and fine-tuning models (vision, NLP, RL)
- Production deployment via TorchScript, ONNX, or mobile

## 外部文档

- [PyTorch – Get started](https://pytorch.org/get-started/locally/)
- [PyTorch tutorials](https://pytorch.org/tutorials/)

## 另请参阅

- [TensorFlow](/docs/frameworks/tensorflow)
- [Hugging Face](/docs/tools/huggingface)
- [Deep learning](/docs/fundamentals/deep-learning)
