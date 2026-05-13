---
title: 卷积神经网络（CNN）
description: 用于空间和图像数据的 CNN。
keywords: [CNN, 卷积, 计算机视觉, 池化]
tags: [intermediate]
authors: [EmersonBraun]
---

# 卷积神经网络（CNN）

## 定义

卷积神经网络是一种专为具有空间结构的数据设计的神经网络——主要是图像，但也包括音频、文本和时间序列。CNN 不是将每个神经元连接到所有输入，而是使用共享的**卷积滤波器**在输入上滑动，不依赖于位置检测局部特征。

核心思想是**平移等变性**：训练用于检测垂直边缘的滤波器将在图像的任何区域都有效。叠加的卷积层构建特征层次：早期层检测边缘和纹理，中间层检测部件如眼睛或车轮，深层识别完整对象。**池化层**减少空间维度（下采样），使表示更紧凑，对小变化更鲁棒。

CNN 主导[计算机视觉](/docs/cv)任务：图像分类、目标检测、语义分割等。ResNet、EfficientNet 和 Vision Transformer 等架构建立在这些原则之上。尽管 [Transformer](/docs/transformers) 在许多视觉任务上已赶上 CNN，但 CNN 在部署时仍然高效实用。

## 工作原理

```mermaid
flowchart LR
  Input["输入图像\n（H × W × C）"] -->|"卷积 + ReLU"| Conv1["特征图\n卷积层 1"]
  Conv1 -->|"最大池化"| Pool1["降维特征"]
  Pool1 -->|"卷积 + ReLU + 池化"| ConvN["更深的卷积层"]
  ConvN -->|"展平"| Flat["特征向量"]
  Flat -->|"全连接层"| Output["输出\n（类别 / bbox / 掩码）"]
```

### 卷积层

**滤波器**（或卷积核）K×K 在输入特征图上做卷积。卷积核学习检测特定模式。多个并行滤波器产生多个特征图。**步幅**控制滤波器每步移动多少；**填充**保留空间维度。

### 池化层

**最大池化**选取每个窗口中的最大值，减少空间维度并增加平移不变性鲁棒性。**平均池化**类似但使用均值。**全局平均池化**（GAP）将每个特征图折叠为单个值——在现代架构中消除全连接层。

### 全连接层

卷积层之后，特征张量被展平并送入**全连接层**进行最终分类或回归。现代架构（ResNet、EfficientNet）使用 GAP + 单个线性层而非多个全连接层。

## 何时使用 / 何时不使用

| 场景 | 使用 CNN | 不使用 CNN |
|------|--------|----------|
| 图像分类 / 目标检测 | 是——仍然高效实用 | |
| 边缘 / 移动设备部署 | 是——MobileNet、EfficientNet 针对此优化 | |
| 时间序列或音频识别 | 是——1D CNN 捕获时间局部模式 | |
| 大规模数据的图像理解 | 谨慎 | 有足够数据时 Vision Transformer 可能超越 |
| NLP（文本） | 谨慎 | Transformer 今天主导 NLP |

## 对比

| 方面 | CNN | Vision Transformer（ViT） |
|------|-----|--------------------------|
| 局部性归纳偏置 | 内置（局部卷积核） | 通过注意力学习 |
| 平移不变性 | 通过池化 | 通过数据和增强 |
| 数据效率 | 高（较少数据时表现好） | 需要大数据 |
| 可扩展性 | 好 | 随规模增长优秀 |
| 最适合 | 移动、边缘、中等数据集 | 大数据集、视觉语言任务 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 权重共享大幅减少参数 | 全局上下文有限（有限感受野） |
| 平移等变性内置于架构 | 比 Transformer 对新领域适应性差 |
| 训练高效——硬件广泛支持 | 深层架构需要仔细调优 |
| 大量可用预训练模型 | 未经修改不适合关系或图数据 |

## 代码示例

```python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),   # 28x28 -> 28x28
            nn.ReLU(),
            nn.MaxPool2d(2),                               # 28x28 -> 14x14
            nn.Conv2d(32, 64, kernel_size=3, padding=1),  # 14x14 -> 14x14
            nn.ReLU(),
            nn.MaxPool2d(2),                               # 14x14 -> 7x7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.classifier(self.features(x))

model = SimpleCNN(num_classes=10)
x     = torch.randn(4, 1, 28, 28)   # batch of 4 MNIST images
print(model(x).shape)                # (4, 10)
```

## 实用资源

- [cs231n: 用于视觉识别的 CNN（斯坦福）](https://cs231n.github.io/) — 带详细可视化的经典课程笔记
- [PyTorch – 图像分类教程](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html) — CIFAR-10 端到端教程
- [Papers with Code – 图像分类](https://paperswithcode.com/task/image-classification) — 最新技术排行榜和实现

## 另请参阅

- [神经网络](/docs/neural-networks)
- [RNN](/docs/neural-networks/rnn)
- [Transformers](/docs/transformers)
- [深度学习](/docs/fundamentals/deep-learning)
