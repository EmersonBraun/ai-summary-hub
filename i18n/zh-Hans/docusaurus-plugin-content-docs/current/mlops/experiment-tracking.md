---
title: Experiment tracking
description: How to systematically log, compare, and reproduce ML experiments using tracking tools.
keywords: [experiment tracking, MLflow, Weights and Biases, reproducibility, hyperparameters, artifacts, model versioning]
tags: [intermediate]
authors: [EmersonBraun]
---

# 实验追踪

## 定义

实验追踪是系统性地记录 ML 训练运行每个细节的实践，使得结果可以被复现、比较和审计。没有它，团队会丢失哪些超参数产生了哪些结果的记录，浪费算力重新发现配置，并且当模型影响高风险决策时无法证明合规性。

完整的实验记录捕获四类信息。**参数**是训练的输入：学习率、批大小、模型架构选择、特征集。**指标**是输出：损失曲线、准确率、F1、AUC、延迟。**工件**是产生的文件：训练好的模型权重、预处理的数据集、评估图表、混淆矩阵。**元数据**是上下文：代码版本（git commit）、环境（库版本、硬件）、数据集版本、挂钟时间以及运行者的姓名。

模型版本控制是自然的扩展：一旦追踪实验，就可以将最佳运行的工件提升到模型注册表，用语义版本标记，并将每次服务部署追溯到特定实验。这关闭了实验与生产之间的循环，使回滚变得简单，审计成为可能。

## 工作原理

### 插桩

训练脚本用几行 SDK 代码进行插桩，这些代码打开一个"运行"上下文，并在训练期间将数据记录到中央服务器。大多数框架（PyTorch Lightning、Hugging Face Trainer、Keras）都有原生集成，无需额外代码即可自动记录常见指标。

### 集中存储

记录的数据被持久化到后端存储——本地文件系统、托管的云数据库或 SaaS 平台。参数和指标以结构化记录的形式存储；工件被推送到对象存储（S3、GCS、Azure Blob）。后端由 UI 和 SDK 查询。

### 比较和分析

追踪 UI 允许在所有四个维度上过滤、排序和比较运行。可以在同一图表上绘制多次运行的指标曲线，按参数值分组，并将结果导出到数据帧进行自定义分析。这使得识别帕累托最优运行变得容易（例如，在给定延迟预算下的最佳准确率）。

### 模型提升

最佳运行的工件以版本号和过渡状态（Staging → Production → Archived）在模型注册表中注册。下游 CI/CD 系统查询注册表以了解部署哪个模型版本，在实验和服务之间创建清晰的交接。


```mermaid
flowchart LR
  Script[Training script] -->|"log params, metrics"| Tracker[Tracking server]
  Script -->|"upload weights, plots"| Artifacts[Artifact store]
  Tracker -->|"query runs"| UI[Comparison UI]
  Artifacts -->|"retrieve model"| UI
  UI -->|"promote best run"| Registry[Model registry]
  Registry -->|"version tag"| Deploy[CI/CD deployment]
```


## 何时使用 / 何时不使用

| 运行了多个实验，需要比较结果... | 执行的是单次、一次性训练，永远不会再回顾... |
|----------|------------|
| 运行了多个实验，需要比较结果 | 执行的是单次、一次性训练，永远不会再回顾 |
| 需要可复现性（受监管行业、研究发表） | 实验是微不足道的（例如，具有明显结果的两参数网格搜索） |
| 多名团队成员共享实验结果 | 团队独自工作，在个人电子表格中记录笔记就足够了 |
| 希望系统性地将模型版本提升到生产环境 | 模型从不被部署，结果不需要被审计 |

## 代码示例

```python
# generic_tracking.py
# Framework-agnostic experiment tracking pattern.
# Works with any ML library; swap out the model training code as needed.
# pip install mlflow scikit-learn pandas

import mlflow
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score
import numpy as np

# --- Configuration ---
EXPERIMENT_NAME = "binary-classification-demo"
PARAMS = {
    "C": 0.1,           # Regularization strength
    "max_iter": 1000,
    "solver": "lbfgs",
    "random_state": 42,
}

# --- Data preparation ---
X, y = make_classification(
    n_samples=2000, n_features=20, n_informative=10, random_state=42
)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

mlflow.set_experiment(EXPERIMENT_NAME)

with mlflow.start_run(run_name=f"logreg-C{PARAMS['C']}") as run:
    mlflow.log_params(PARAMS)

    model = LogisticRegression(**PARAMS)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_prob),
        "n_train": len(X_train),
        "n_test": len(X_test),
    }
    mlflow.log_metrics(metrics)

    mlflow.sklearn.log_model(model, artifact_path="model")

    import json, tempfile, os
    with tempfile.TemporaryDirectory() as tmp:
        meta_path = os.path.join(tmp, "run_metadata.json")
        with open(meta_path, "w") as f:
            json.dump({"git_commit": "abc1234", "dataset_version": "v1.3"}, f)
        mlflow.log_artifact(meta_path)

    print(f"Run ID : {run.info.run_id}")
    print(f"Accuracy: {metrics['accuracy']:.4f} | ROC-AUC: {metrics['roc_auc']:.4f}")
```


## 比较

| 标准 | MLflow | Weights & Biases (W&B) |
|-----------|--------|------------------------|
| 配置难易度 | 可使用 `mlflow ui` 自托管；仅需 pip install | 需要 SaaS 账户；CLI 安装；提供免费层 |
| UI 质量 | 功能性但简朴；适合表格比较 | 精致，交互式；非常适合媒体和曲线叠加 |
| 协作 | 需要共享服务器；OSS 中没有内置访问控制 | 内置团队工作区、基于角色的访问和共享 |
| 定价 | 免费开源；通过 Databricks 提供托管服务 | 个人免费；大型团队付费 |
| 集成 | 与 Databricks、Spark、sklearn、PyTorch 深度集成 | 广泛集成；在研究和学术界有优势 |

## 实用资源

- [MLflow Tracking Documentation](https://mlflow.org/docs/latest/tracking.html) — 涵盖追踪 API、后端、工件存储和自动日志记录的官方指南。
- [Weights & Biases – Experiment Tracking Quickstart](https://docs.wandb.ai/quickstart) — 在五分钟内记录您第一次 W&B 运行的分步指南。
- [Neptune.ai – Experiment Tracking Guide](https://neptune.ai/blog/ml-experiment-tracking) — 关于追踪什么、为什么以及如何比较工具的中立概述。
- [Made With ML – Experiment Tracking](https://madewithml.com/courses/mlops/experiment-tracking/) — 将 MLflow 集成到真实训练循环中的基于 notebook 的实践教程。

## 另请参阅

- [MLflow](/docs/mlops/mlflow)
- [Weights & Biases](/docs/mlops/wandb)
- [MLOps](/docs/mlops)
