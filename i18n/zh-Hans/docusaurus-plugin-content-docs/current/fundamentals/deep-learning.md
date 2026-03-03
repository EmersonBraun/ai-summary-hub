---
title: 深度学习
description: 深度神经网络与表示学习。
keywords: [深度学习, 神经网络, 表示学习]
---

# 深度学习

## 定义

深度学习使用多层神经网络从数据中学习层次化表示。通过扩展数据和计算，它推动了视觉、语言和其他领域的进步。

它扩展了[机器学习](/docs/fundamentals/machine-learning)，使用可微分的分层模型（参见[神经网络](/docs/neural-networks)），自动学习特征而非手工设计。深度使模型能够构建越来越抽象的表示（例如在视觉中：边缘 → 纹理 → 部件 → 物体）。

## 工作原理

```mermaid
flowchart LR
  Data[数据] --> Layers[层]
  Layers --> Representation[表示]
  Representation --> Output[输出]
```

**数据**被送入第一**层**；每层应用线性变换后接非线性激活（如 ReLU）。堆叠层产生**表示**（嵌入），在更深的层中变得更抽象。最后一层映射到**输出**（如类别分数或 token）。训练使用**反向传播**计算梯度和**梯度下降**更新权重。架构（CNN 用于图像、RNN 用于序列、[Transformer](/docs/transformers) 用于两者）根据数据和任务调整连接方式和操作。

## 应用场景

当数据丰富且任务复杂时，深度学习是感知和生成的默认选择。

- 图像识别、目标检测和分割（视觉）
- 语音识别、机器翻译和文本生成（语言）
- 游戏、机器人控制和仿真（强化学习）

## 外部文档

- [Deep Learning（Goodfellow 等人）](https://www.deeplearningbook.org/) — 免费在线书籍
- [PyTorch – 入门](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — 实践深度学习

## 另请参阅

- [神经网络](/docs/neural-networks)
- [Transformer](/docs/transformers)
- [框架（PyTorch、TensorFlow）](/docs/frameworks/pytorch)
