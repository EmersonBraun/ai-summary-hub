---
title: 机器学习
description: 机器学习入门——监督学习、无监督学习和强化学习。
keywords: [机器学习, 监督学习, 无监督学习, 强化学习]
tags: [beginner]
authors: [EmersonBraun]
---

# 机器学习

## 定义

机器学习（ML）是人工智能的一个子领域，其中**系统从数据中学习执行任务**，而不是被显式地用规则编程。你提供示例而不是手工编写逻辑，系统推断出模式。

ML 可以根据学习方式分为三大范式：

- **监督学习** — 从（输入，标签）对中学习。目标：预测新输入的正确标签。
- **无监督学习** — 从未标注的输入中学习。目标：发现结构、聚类或表示。
- **强化学习** — 代理在环境中通过试错学习，最大化奖励。

大多数日常 ML 用例（垃圾邮件过滤、图像识别、推荐）是监督学习。无监督学习出现在主题发现、压缩和预训练数据中。强化学习驱动机器人和决策系统。

## 工作原理

```mermaid
flowchart LR
  Data["数据\n（标注或未标注的样本）"] -->|"输入"| Model["模型\n（学习到的参数）"]
  Model -->|"预测"| Prediction["预测 / 输出"]
  Prediction -->|"与标签比较"| Loss["损失 / 奖励信号"]
  Loss -->|"更新参数"| Model
```

### 监督学习

**分类** — 预测离散类别（垃圾邮件/非垃圾邮件、猫/狗）。**回归** — 预测连续值（价格、温度）。模型通过将标注的（X, y）对映射到输出来学习。泛化（在未见数据上的性能）通过单独的**验证/测试集**来衡量。

### 无监督学习

**聚类**（K-Means、DBSCAN）——对相似点进行分组。**降维**（PCA、UMAP）——压缩高维表示。**生成模型**——学习数据分布以生成新样本。

### 强化学习

**代理**与**环境**交互，为采取的行动接收**奖励**。目标是学习一个**策略**——从状态到行动的映射——随时间最大化累积奖励（Q-learning、PPO）。

## 基本概念

**过拟合** — 模型记住训练数据但无法泛化。解决方案：更多数据、正则化、简化模型。**欠拟合** — 模型太简单无法捕获底层模式。解决方案：更复杂的模型或更多特征。**偏差-方差权衡** — 高复杂度模型偏差低但方差高；简单模型偏差高但方差低。**交叉验证** — 在数据的多个折叠上评估模型，估计泛化性能。

## 何时使用 / 何时不使用

| 场景 | 使用 ML | 不使用 ML |
|------|---------|---------|
| 模式太复杂无法手工编码 | 是——ML 自动发现模式 | |
| 有大量可用数据 | 是——更多数据通常 → 更好的模型 | |
| 需要明确可审计的规则 | | 考虑专家系统或编程逻辑 |
| 数据非常稀少（\<100 个样本）| 谨慎 | 简单模型或启发式更好 |
| 高影响结果需要 100% 精度 | 谨慎 | ML 具有固有不确定性 |

## 对比

| 范式 | 监督学习 | 无监督学习 | 强化学习 |
|------|---------|----------|---------|
| 数据类型 | 标注（X, y） | 未标注（仅 X） | 状态、动作、奖励 |
| 目标 | 预测标签 | 发现结构 | 最大化奖励 |
| 示例 | 分类、回归 | 聚类、嵌入 | 机器人、游戏 |
| 所需数据 | 中等到大量 | 中等 | 大量（模拟） |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 学习手工编码不可能实现的复杂模式 | 需要高质量数据（垃圾进垃圾出） |
| 随更多数据可扩展 | 黑盒——难以调试 |
| 灵活适用于多种问题类型 | 训练数据中存在偏差的风险 |
| 随更多数据自动改进 | 计算成本可能很高 |

## 代码示例

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load a classic multi-class classification dataset
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a supervised model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate on held-out test set
predictions = model.predict(X_test)
print(f"准确率: {accuracy_score(y_test, predictions):.2%}")
```

## 实用资源

- [Scikit-learn: Python 机器学习](https://scikit-learn.org/stable/user_guide.html) — 经典 ML 算法完整文档
- [Google 机器学习速成课程](https://developers.google.com/machine-learning/crash-course) — 带 TensorFlow 的免费 ML 概念快速概览
- [Hands-On Machine Learning（Géron）](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/) — 覆盖 scikit-learn 和 TensorFlow 的广受推荐实用书

## 另请参阅

- [深度学习](/docs/fundamentals/deep-learning)
- [神经网络](/docs/neural-networks)
- [LLMs](/docs/llms)
