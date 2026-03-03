---
title: IA explicable (XAI)
description: Making AI décisions interpretable and explainable.
keywords: [explainable AI, XAI, interpretability]
---

# IA explicable (XAI)

## Définition

L'IA explicable vise à rendre le comportement des modèles compréhensible: which inputs or features drove a décision, or what the model "thinks" in human terms. This supports trust, debugging, and compliance.

Il supporte [AI safety](/docs/ai-safety) (auditing) and [bias in AI](/docs/bias-in-ai) (understanding unfair outcomes). Required or recommended in regulated domains (par ex. credit, hiring, healthcare). Trade-off: post-hoc explanations (SHAP, LIME) are flexible but can be approximate; inherently interpretable models are limited in expressiveness.

## Comment ça fonctionne

**Feature attribution** (par ex. SHAP, LIME) attribue des scores d'importance aux caractéristiques d'entrée pour une prédiction donnée. **Attention visualization** shows which tokens or regions the model attended to. **Natural language explanations** (par ex. from an LLM or a dedicated module) describe the décision in words. **Inherently interpretable** models (par ex. linear models, décision trees, rule lists) are interpretable by conception. Choice depends on the model type and use case: post-hoc methods work with black boxes but may not reflect the true mechanism; interpretable models are more faithful but less flexible. Evaluate explanations for fidelity (do they match the model?) and usefulness (do they help users or auditors?). Integrate with [evaluation](/docs/evaluation-metrics) and [bias](/docs/bias-in-ai) audits where needed.

## Cas d'utilisation

Explainability matters when users or regulators need to understand why a model made a given décision (compliance, trust, debugging).

- Explaining credit, hiring, or medical décisions for compliance and users
- Debugging and improving model behavior via attributions
- Building trust and transparency in high-stakes applications

## Documentation externe

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Free online book
- [SHAP documentation](https://shap.readthedocs.io/)

## Voir aussi

- [AI safety](/docs/ai-safety)
- [Bias in AI](/docs/bias-in-ai)
