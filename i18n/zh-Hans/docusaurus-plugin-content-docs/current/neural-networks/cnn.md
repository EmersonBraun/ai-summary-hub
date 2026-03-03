---
title: 卷积神经网络（CNN）
description: 用于空间和图像数据的 CNN。
keywords: [CNN, 卷积, 计算机视觉]
---

# 卷积神经网络（CNN）

## 定义

CNN 使用卷积层来捕获局部模式（边缘、纹理）并构建层次化特征。它们是图像分类、检测和分割的标准骨干网络。

与密集[神经网络](/docs/neural-networks)不同，卷积在空间上共享权重，因此对于图像和其他网格状数据具有平移等变性和高效性。它们构成了大多数[计算机视觉](/docs/cv)系统的骨干，也用于 [Transformer](/docs/transformers) 中的 patch 嵌入。

## 工作原理

```mermaid
flowchart LR
  Image[图像] --> Conv[卷积]
  Conv --> Pool[池化]
  Pool --> Conv2[卷积]
  Conv2 --> Class[分类]
```

**图像**（或特征图）被送入**卷积**层：每个滤波器在输入上滑动并计算点积，产生突出局部模式（边缘、纹理）的激活图。**池化**（如最大池化）在空间上下采样，减小尺寸并添加轻微的不变性。更深的**卷积**层看到更大的感受野，捕获更抽象的特征（部件、物体）。最终的**分类**（或检测/分割）头通常是在展平或池化特征之上的一个或多个密集层。训练使用与其他[深度学习](/docs/fundamentals/deep-learning)模型相同的反向传播和梯度下降。

## 应用场景

CNN 是任何空间结构（图像、视频或 2D/3D 信号）重要的任务的标准选择。

- 图像分类（如物体识别、医学图像分析）
- 目标检测和实例分割
- 视频分析和动作识别

## 外部文档

- [CS231n – 用于视觉识别的 CNN](https://cs231n.github.io/convolutional-networks/)
- [PyTorch – 卷积神经网络](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets)

## 另请参阅

- [计算机视觉](/docs/cv)
- [神经网络](/docs/neural-networks)
