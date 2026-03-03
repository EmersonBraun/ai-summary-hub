---
title: 神经网络
description: 人工神经网络及其基本组件介绍。
keywords: [神经网络, ANN, 层, 激活函数]
---

# 神经网络

## 定义

神经网络是由具有可学习权重和非线性激活的单元（神经元）层构建的函数逼近器。在数据上训练后，它们可以逼近从输入到输出的复杂映射。

它们是[深度学习](/docs/fundamentals/deep-learning)的基础构件。[CNN](/docs/neural-networks/cnn) 和 [RNN](/docs/neural-networks/rnn) 等变体为特定数据类型添加了归纳偏置（如局部性、递归性）；相同的训练机制（反向传播、梯度下降）适用。

## 工作原理

```mermaid
flowchart LR
  Input[输入] --> Layer1[层1]
  Layer1 --> Layer2[层2]
  Layer2 --> Output[输出]
```

**输入**被传递给第一层。每一**层**计算其输入的线性组合（权重），然后进行非线性激活（如 ReLU、Sigmoid）。一层的输出成为下一层的输入；堆叠层使网络能够学习层次化特征。最后的**输出**层通常映射到预测（如类别分数或标量）。训练通过**反向传播**（通过链式法则计算梯度）和**梯度下降**（更新权重）来最小化损失。深度和宽度决定了容量；正则化和数据量控制过拟合。

## 应用场景

神经网络用于任何需要灵活的、数据驱动的函数逼近的场景。

- 回归和分类（如销售预测、图像分类）
- 下游任务的特征学习（嵌入、迁移学习）
- 控制或仿真中复杂非线性函数的逼近

## 外部文档

- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com/) — 免费在线书籍
- [3Blue1Brown – 神经网络](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) — 可视化入门

## 另请参阅

- [CNN](/docs/neural-networks/cnn)
- [RNN](/docs/neural-networks/rnn)
- [深度学习](/docs/fundamentals/deep-learning)
