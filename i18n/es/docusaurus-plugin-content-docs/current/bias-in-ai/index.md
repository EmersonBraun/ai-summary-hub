---
title: Sesgo en la IA
description: Fuentes y mitigación del sesgo en sistemas de ML.
keywords: [sesgo, equidad, discriminación]
---

# Sesgo en la IA

## Definición

El sesgo en IA se refiere a errores sistemáticos o resultados injustos (por ej. across demographics) arising from data, model diseño, or deployment. Mitigation includes data audits, fairness metrics, and debiasing methods.

Es a core concern in [AI ethics](/docs/ai-ethics) and [AI safety](/docs/ai-safety). [Evaluation metrics](/docs/evaluation-metrics) for fairness (por ej. demographic parity, equalized odds) are used in audits and before deploying in regulated domains. [Explainable AI](/docs/xai) can help identify when and why bias appears.

## Cómo funciona

Bias can **enter** a través de datos de entrenamiento sesgados (underrepresentation, label bias), proxy variables (por ej. zip code for race), or feedback loops (model outputs influence future data). **Detection** uses fairness metrics (por ej. demographic parity, equalized odds, calibration by group) on [evaluation](/docs/evaluation-metrics) sets stratified by protected attributes. **Mitigation** includes: data (reweighting, resampling, collecting more representative data); training (fairness constraints, adversarial debiasing); and post-processing (thresholds or rules per group). Trade-offs exist between fairness metrics and accuracy; legal and domain norms define which metrics and thresholds to use. Audits should be run before deployment and monitored in production.

## Casos de uso

Bias work applies when model decisións affect people in regulated or sensitive domains (hiring, lending, scoring, content).

- Auditing hiring, lending, or scoring systems for discriminatory impact
- Fairness checks before deploying models in regulated domains
- Explainability and remediation when bias is detected

## Documentación externa

- [Google – Responsible AI – Fairness](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Free book

## Ver también

- [AI ethics](/docs/ai-ethics)
- [AI safety](/docs/ai-safety)
- [Evaluation metrics](/docs/evaluation-metrics)
