---
title: AI 基础
description: 人工智能和机器学习的核心概念。
keywords: [AI, 基础, 基本概念]
---

# AI 基础

## 定义

AI 基础涵盖了人工智能背后的核心思想：我们所说的学习、表示和泛化。这包括监督学习和无监督学习、优化以及数据、模型和目标之间的关系。

这些思想支撑着经典的[机器学习](/docs/fundamentals/machine-learning)和[深度学习](/docs/fundamentals/deep-learning)。理解它们有助于选择正确的范式、解释结果和思考局限性（例如数据需求、偏差、鲁棒性）。

## 工作原理

```mermaid
flowchart LR
  Data[数据] --> Model[模型]
  Model --> Prediction[预测]
```

在实践中，**数据**被收集或标注；选择一个**模型**（例如函数或网络）；并优化一个目标（损失或奖励），使模型拟合数据。结果是对新输入的**预测**（或动作）。这个流程依赖数学基础——概率论、线性代数、优化——以及在保留数据上的评估，以确保泛化而非记忆。

## 应用场景

ML 核心思想适用于任何有数据和明确定义的预测或优化目标的场景。

- 从标注数据构建分类器（例如垃圾邮件检测、情感分析）
- 为推荐系统或搜索学习表示
- 将决策制定框架化为预测或优化（例如预测、控制）

## 外部文档

- [Google ML 速成课程](https://developers.google.com/machine-learning/crash-course) — ML 概念介绍
- [MIT 6.S191 – 深度学习入门](http://introtodeeplearning.com/) — 课程和材料

## 另请参阅

- [机器学习](/docs/fundamentals/machine-learning)
- [深度学习](/docs/fundamentals/deep-learning)
- [神经网络](/docs/neural-networks)
