---
title: PyTorch
description: 具有动态计算图的深度学习框架。
keywords: [PyTorch, 深度学习, 动态图, 张量]
tags: [intermediate]
authors: [EmersonBraun]
---

# PyTorch

## 定义

PyTorch 是由 Facebook AI Research（FAIR）开发的开源深度学习框架。它使用动态计算图（定义即运行），意味着图在运行时构建，使调试更直观，并允许在模型内部使用循环和条件等动态控制流。

PyTorch 是研究领域的主流选择，也被广泛用于生产环境。其 `torch.nn` API 提供可组合的神经网络层，`torch.optim` 包含常用优化器，`torch.utils.data` 提供数据加载工具。自动微分（`autograd`）追踪张量上的操作，并自动计算反向传播的梯度。PyTorch 只需少量代码改动即可支持 CPU 和 GPU（CUDA）执行。

PyTorch 生态系统包括 TorchVision（计算机视觉模型和数据变换）、TorchText（NLP 工具）、TorchAudio 和用于分布式训练的分布式库。`torch.compile`（PyTorch 2.0+）可以一行代码编译模型以提高推理吞吐量。

## 工作原理

```mermaid
flowchart LR
  Data["数据\n（Dataset + DataLoader）"] -->|"批次"| Model["模型 nn.Module"]
  Model -->|"前向传播"| Loss["损失函数"]
  Loss -->|"backward()"| Autograd["Autograd 引擎\n（计算梯度）"]
  Autograd -->|"step()"| Optimizer["优化器\n（SGD、Adam 等）"]
  Optimizer -->|"更新权重"| Model
```

### 张量与 autograd

**张量**是基本数据类型——可以存在于 CPU 或 GPU 上的 n 维数组。在张量上设置 `requires_grad=True`，PyTorch 就会追踪其上的所有操作。在标量输出上调用 `.backward()`，梯度就会填充到参数的 `.grad` 字段中。

### nn.Module

**`nn.Module`** 是所有模型的基类。你在 `__init__` 中定义（将层注册为属性），在 `forward` 中描述前向传播。模块可以嵌套——`Sequential` 就是一个包含其他模块的模块。

### DataLoader

**`DataLoader`** 封装 `Dataset` 并提供打乱后的批次，可选地使用多个工作进程并行加载。你在 `Dataset` 中实现 `__len__` 和 `__getitem__`；`DataLoader` 处理其余部分。

## 何时使用 / 何时不使用

| 场景 | 使用 PyTorch | 不使用 PyTorch |
|------|------------|--------------|
| 需要自定义模型的深度学习研究 | 是——动态图使实验更容易 | |
| 微调 LLM 和 Transformer 模型 | 是——大多数 HuggingFace 模型基于 PyTorch | |
| 灵活训练循环的快速原型 | 是——Python 惯用代码，易于调试 | |
| 在 Google Cloud 上的大规模生产部署 | | TensorFlow/Keras 与 TFX 和 Google 服务集成更好 |
| Google 移动设备的 TFLite 模型 | | TensorFlow 对 TFLite 有更好的原生支持 |

## 对比

| 功能 | PyTorch | TensorFlow / Keras |
|------|---------|-------------------|
| 计算图 | 动态（定义即运行） | 静态（通过 tf.function 定义后运行） |
| 调试便利性 | 高——标准 Python 行为 | 中等——tf.function 创建编译图 |
| 研究领域流行度 | 主导地位 | 2019 年以来有所下降 |
| 生产部署 | TorchServe、ONNX、torch.compile | TFServing、TFLite、TFX |
| 预训练模型生态 | 庞大（HuggingFace、torchvision） | 较小（TF Hub） |
| 移动 / 边缘 | ExecuTorch（开发中） | TFLite |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 直观的 Python 式 API 和命令式风格 | 自定义训练循环比 Keras 需要更多样板代码 |
| 动态图便于调试和动态模型 | 生产推理历史上不如 TensorFlow 成熟 |
| 主导的研究生态系统 | 不够谨慎时 GPU 内存消耗可能更高 |
| 出色支持 HuggingFace Transformers | torch.compile 对边缘案例仍在成熟 |

## 代码示例

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# Define a simple feedforward network
class SimpleNet(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int, output_dim: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, output_dim),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

# Synthetic binary classification data
X = torch.randn(200, 10)
y = (X[:, 0] > 0).long()

dataset    = TensorDataset(X, y)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

model     = SimpleNet(10, 32, 2)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3)

for epoch in range(5):
    for xb, yb in dataloader:
        optimizer.zero_grad()
        loss = criterion(model(xb), yb)
        loss.backward()
        optimizer.step()
    print(f"轮次 {epoch+1}，损失: {loss.item():.4f}")
```

## 实用资源

- [PyTorch 文档](https://pytorch.org/docs/) — 完整 API 参考和教程
- [PyTorch 教程](https://pytorch.org/tutorials/) — 从入门到高级的逐步指南
- [PyTorch 在 HuggingFace](https://huggingface.co/docs/transformers/index) — Transformers 在底层如何使用 PyTorch

## 另请参阅

- [TensorFlow](/docs/frameworks/tensorflow)
- [神经网络](/docs/neural-networks)
- [深度学习](/docs/fundamentals/deep-learning)
