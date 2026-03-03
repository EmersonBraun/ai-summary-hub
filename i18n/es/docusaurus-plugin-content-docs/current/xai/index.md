---
title: IA explicable (XAI)
description: Making AI decisións interpretable and explainable.
keywords: [explainable AI, XAI, interpretability]
---

# IA explicable (XAI)

## Definición

La IA explicable busca hacer comprensible el comportamiento del modelo: qué entradas o características motivaron una decisión, o quéhe model "thinks" in human terms. This supports trust, debugging, and compliance.

Soporta [seguridad de IA](/docs/ai-safety) (auditoría) y [sesgo en IA](/docs/bias-in-ai) (comprensión de resultados injustos). Required or recommended in regulated domains (por ej. credit, hiring, healthcare). Trade-off: post-hoc explanations (SHAP, LIME) are flexible but can be approximate; inherently interpretable models are limited in expressiveness.

## Cómo funciona

**Feature attribution** (por ej. SHAP, LIME) asigna puntuaciones de importancia a las características de entrada para una predicción dada. **Attention visualization** shows which tokens or regions the model attended to. **Natural language explanations** (por ej. from an LLM or a dedicated module) describe the decisión in words. **Inherently interpretable** models (por ej. linear models, decisión trees, rule lists) are interpretable by diseño. Choice depends on the model type and use case: post-hoc methods work with black boxes but may not reflect the true mechanism; interpretable models are more faithful but less flexible. Evaluate explanations for fidelity (do they igualar the model?) and usefulness (do they help users or auditors?). Integrate with [evaluation](/docs/evaluation-metrics) and [bias](/docs/bias-in-ai) audits where needed.

## Casos de uso

Explainability matters when users or regulators need to understand why a model made a given decisión (compliance, trust, debugging).

- Explaining credit, hiring, or medical decisións for compliance and users
- Debugging and improving model behavior via attributions
- Building trust and transparency in high-stakes applications

## Documentación externa

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Free online book
- [SHAP documentation](https://shap.readthedocs.io/)

## Ver también

- [AI safety](/docs/ai-safety)
- [Bias in AI](/docs/bias-in-ai)
