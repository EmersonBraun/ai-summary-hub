---
title: Erklärbare KI (XAI)
description: Making AI Entscheidungs interpretable and explainable.
keywords: [explainable AI, XAI, interpretability]
---

# Erklärbare KI (XAI)

## Definition

Erklärbare KI zielt darauf ab, das Modellverhalten verständlich zu machen: which inputs or features drove a Entscheidung, or what tdas Modell in menschlichen Begriffen "denkt". This supports trust, debugging, and compliance.

Es unterstützt [AI safety](/docs/ai-safety) (auditing) and [bias in AI](/docs/bias-in-ai) (understanding unfair outcomes). Required or recommended in regulated domains (z. B. credit, hiring, healthcare). Trade-off: post-hoc explanations (SHAP, LIME) are flexible but can be approximate; inherently interpretable models are limited in expressiveness.

## Funktionsweise

**Feature attribution** (z. B. SHAP, LIME) weist Eingabemerkmalen Wichtigkeitswerte für eine gegebene Vorhersage zu. **Attention visualization** shows which tokens or regions the model attended to. **Natural language explanations** (z. B. from an LLM or a dedicated module) describe the Entscheidung in words. **Inherently interpretable** models (z. B. linear models, Entscheidung trees, rule lists) are interpretable by Entwurf. Die Wahl hängt ab vauf dem model type and use case: post-hoc methods work with black boxes but may not reflect the true mechanism; interpretable models are more faithful but less flexible. Evaluate explanations for fidelity (do they nachzuahmen the model?) and usefulness (do they help users or auditors?). Integrate with [evaluation](/docs/evaluation-metrics) and [bias](/docs/bias-in-ai) audits where needed.

## Anwendungsfälle

Explainability ist wichtig, wenn users or regulators need to understand why a model made a given Entscheidung (compliance, trust, debugging).

- Explaining credit, hiring, or medical Entscheidungs for compliance and users
- Debugging and improving model behavior via attributions
- Building trust and transparency in high-stakes applications

## Externe Dokumentation

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Free online book
- [SHAP documentation](https://shap.readthedocs.io/)

## Siehe auch

- [AI safety](/docs/ai-safety)
- [Bias in AI](/docs/bias-in-ai)
