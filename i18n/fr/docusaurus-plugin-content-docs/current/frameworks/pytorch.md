---
title: PyTorch
description: Deep learning framework with dynamic computation graphs.
keywords: [PyTorch, apprentissage profond, research]
---

# PyTorch

## Définition

PyTorch is a popular [deep learning](/docs/fundamentals/deep-learning) framework with an imperative, Pythonic style. C'est widely used in research and industry and is the base for many libraries ([Hugging Face](/docs/tools/huggingface), torchvision, etc.).

It competes with [TensorFlow](/docs/frameworks/tensorflow); PyTorch is often preferred for research and rapid iteration due to eager execution and clear debugging. Used for [LLMs](/docs/llms), [vision](/docs/cv), [NLP](/docs/nlp), and [RL](/docs/drl); production deployment uses TorchScript, ONNX, or dedicated runtimes.

## Comment ça fonctionne

On **définit les modèles** comme des classes Python (nn.Module) ; le **passage forward** s'exécute immédiatement (mode eager), et **autograd** records operations for **backprop**. Optimizers (par ex. Adam) update parameters from computed gradients. Training loops are explicit (for epoch, for batch, loss.backward(), optimizer.step()), which makes experimentation and debugging straightforward. For **deployment**, export to TorchScript (Python-free), ONNX (cross-framework), or PyTorch Mobile. Distributed training uses torch.distributed or higher-level APIs (par ex. Hugging Face Accelerate). The same code can run on CPU, GPU, or multiple GPUs with minimal changes.

## Cas d'utilisation

PyTorch is a natural fit for research, prototyping, and production when you want flexibility and a Python-first workflow.

- Research and prototyping (par ex. new architectures, experiments)
- Training and fine-tuning models (vision, NLP, RL)
- Production deployment via TorchScript, ONNX, or mobile

## Documentation externe

- [PyTorch – Get started](https://pytorch.org/get-started/locally/)
- [PyTorch tutorials](https://pytorch.org/tutorials/)

## Voir aussi

- [TensorFlow](/docs/frameworks/tensorflow)
- [Hugging Face](/docs/tools/huggingface)
- [Deep learning](/docs/fundamentals/deep-learning)
