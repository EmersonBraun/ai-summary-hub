---
title: Explainable AI (XAI)
description: Making AI decisions interpretable and explainable.
keywords: [explainable AI, XAI, interpretability]
tags: [beginner]
---

# Explainable AI (XAI)

## Definition

Explainable AI aims to make model behavior understandable: which inputs or features drove a decision, or what the model "thinks" in human terms. This supports trust, debugging, and compliance.

It supports [AI safety](/docs/ai-safety) (auditing) and [bias in AI](/docs/bias-in-ai) (understanding unfair outcomes). Required or recommended in regulated domains (e.g. credit, hiring, healthcare). Trade-off: post-hoc explanations (SHAP, LIME) are flexible but can be approximate; inherently interpretable models are limited in expressiveness.

## How it works

**Feature attribution** (e.g. SHAP, LIME) assigns importance scores to input features for a given prediction. **Attention visualization** shows which tokens or regions the model attended to. **Natural language explanations** (e.g. from an LLM or a dedicated module) describe the decision in words. **Inherently interpretable** models (e.g. linear models, decision trees, rule lists) are interpretable by design. Choice depends on the model type and use case: post-hoc methods work with black boxes but may not reflect the true mechanism; interpretable models are more faithful but less flexible. Evaluate explanations for fidelity (do they match the model?) and usefulness (do they help users or auditors?). Integrate with [evaluation](/docs/evaluation-metrics) and [bias](/docs/bias-in-ai) audits where needed.

## Use cases

Explainability matters when users or regulators need to understand why a model made a given decision (compliance, trust, debugging).

- Explaining credit, hiring, or medical decisions for compliance and users
- Debugging and improving model behavior via attributions
- Building trust and transparency in high-stakes applications

## External documentation

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Free online book
- [SHAP documentation](https://shap.readthedocs.io/)

## See also

- [AI safety](/docs/ai-safety)
- [Bias in AI](/docs/bias-in-ai)
