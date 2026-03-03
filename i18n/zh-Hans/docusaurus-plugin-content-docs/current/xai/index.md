---
title: 可解释 AI (XAI)
description: Making AI 决策s interpretable and explainable.
keywords: [explainable AI, XAI, interpretability]
---

# 可解释 AI (XAI)

## 定义

可解释 AI 旨在使模型行为可理解：哪些输入或特征驱动了决策，或者模型he model "thinks" in human terms. This supports trust, debugging, and compliance.

它支持 [AI 安全](/docs/ai-safety)（审计）和 [AI 中的偏见](/docs/bias-in-ai)（理解不公平结果）。 Required or recommended in regulated domains (例如 credit, hiring, healthcare). Trade-off: post-hoc explanations (SHAP, LIME) are flexible but can be approximate; inherently interpretable models are limited in expressiveness.

## 工作原理

**Feature attribution** (例如 SHAP, LIME) 为给定预测的输入特征分配重要性分数. **Attention visualization** shows which tokens or regions the model attended to. **Natural language explanations** (例如 from an LLM or a dedicated module) describe the 决策 in words. **Inherently interpretable** models (例如 linear models, 决策 trees, rule lists) are interpretable by 设计. Choice depends on the model type and use case: post-hoc methods work with black boxes but may not reflect the true mechanism; interpretable models are more faithful but less flexible. Evaluate explanations for fidelity (do they match the model?) and usefulness (do they help users or auditors?). Integrate with [evaluation](/docs/evaluation-metrics) and [bias](/docs/bias-in-ai) audits where needed.

## 应用场景

Explainability matters when users or regulators need to understand why a model made a given 决策 (compliance, trust, debugging).

- Explaining credit, hiring, or medical 决策s for compliance and users
- Debugging and improving model behavior via attributions
- Building trust and transparency in high-stakes applications

## 外部文档

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Free online book
- [SHAP documentation](https://shap.readthedocs.io/)

## 另请参阅

- [AI safety](/docs/ai-safety)
- [Bias in AI](/docs/bias-in-ai)
