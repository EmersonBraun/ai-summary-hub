---
title: Convolutional neural networks (CNN)
description: CNNs for spatial and image data.
keywords: [CNN, convolution, computer vision]
---

# Convolutional neural networks (CNN)

## Definition

CNNs use convolutional layers to capture local patterns (edges, textures) and build hierarchical features. They are the standard backbone for image classification, detection, and segmentation.

Unlike dense [neural networks](/docs/neural-networks), convolutions share weights across space, so they are translation-equivariant and efficient for images and other grid-like data. They form the backbone of most [computer vision](/docs/cv) systems and are also used in [transformers](/docs/transformers) for patch embedding.

## How it works

```mermaid
flowchart LR
  Image[Image] --> Conv[Conv]
  Conv --> Pool[Pool]
  Pool --> Conv2[Conv]
  Conv2 --> Class[Class]
```

The **image** (or feature map) is fed into **convolutional** layers: each filter slides over the input and computes dot products, producing activation maps that highlight local patterns (edges, textures). **Pooling** (e.g. max pooling) downsamples spatially, reducing size and adding slight invariance. Deeper **conv** layers see larger receptive fields and capture more abstract features (parts, objects). The final **class** (or detection/segmentation) head is usually one or more dense layers on top of the flattened or pooled features. Training uses the same backprop and gradient descent as other [deep learning](/docs/fundamentals/deep-learning) models.

## Use cases

CNNs are the standard for any task where spatial structure (images, video, or 2D/3D signals) matters.

- Image classification (e.g. object recognition, medical image analysis)
- Object detection and instance segmentation
- Video analysis and action recognition

## External documentation

- [CS231n – CNNs for Visual Recognition](https://cs231n.github.io/convolutional-networks/)
- [PyTorch – Convolutional neural networks](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets)

## See also

- [Computer vision](/docs/cv)
- [Neural networks](/docs/neural-networks)
