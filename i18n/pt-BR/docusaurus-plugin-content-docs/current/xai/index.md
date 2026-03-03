---
title: IA explicável (XAI)
description: Making AI decisãos interpretable and explainable.
keywords: [explainable AI, XAI, interpretability]
---

# IA explicável (XAI)

## Definição

A IA explicável visa tornar o comportamento do modelo compreensível: quais entradas ou características motivaram a decisão, ou o que o modelo "pensa" em termos humanos. This supports trust, debugging, and compliance.

Ele suporta [segurança de IA](/docs/ai-safety) (auditoria) e [viés em IA](/docs/bias-in-ai) (compreensão de resultados injustos). Required or recommended in regulated domains (por ex. credit, hiring, healthcare). Trade-off: post-hoc explanations (SHAP, LIME) are flexible but can be approximate; inherently interpretable models are limited in expressiveness.

## Como funciona

**Atribuição de características** (por ex. SHAP, LIME) atribui pontuações de importância às características de entrada para uma previsão dada. **Visualtion visualization** shows which tokens or regions the model attended to. **Natural language explanations** (por ex. from an LLM or a dedicated module) describe the decisão in words. **Inherently interpretable** models (por ex. linear models, decisão trees, rule lists) are interpretable by projeto. Choice depends on the model type and use case: post-hoc methods work with black boxes but may not reflect the true mechanism; interpretable models are more faithful but less flexible. Evaluate explanations for fidelity (do they match the model?) and usefulness (do they help users or auditors?). Integrate with [evaluation](/docs/evaluation-metrics) and [bias](/docs/bias-in-ai) audits where needed.

## Casos de uso

Explainability matters when users or regulators need to understand why a model made a given decisão (compliance, trust, debugging).

- Explaining credit, hiring, or medical decisãos for compliance and users
- Debugging and improving model behavior via attributions
- Building trust and transparency in high-stakes applications

## Documentação externa

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Free online book
- [SHAP documentation](https://shap.readthedocs.io/)

## Veja também

- [AI safety](/docs/ai-safety)
- [Bias in AI](/docs/bias-in-ai)
