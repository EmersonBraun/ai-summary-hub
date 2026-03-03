---
title: Biais dans l'IA
description: Sources et atténuation des biais dans les systèmes de ML.
keywords: [biais, équité, discrimination]
---

# Biais dans l'IA

## Définition

Le biais en IA fait référence à des erreurs systématiques ou des résultats injustes (par ex. across demographics) arising from data, model conception, or deployment. Mitigation includes data audits, fairness metrics, and debiasing methods.

C'est a core concern in [AI ethics](/docs/ai-ethics) and [AI safety](/docs/ai-safety). [Evaluation metrics](/docs/evaluation-metrics) for fairness (par ex. demographic parity, equalized odds) are used in audits and before deploying in regulated domains. [Explainable AI](/docs/xai) can help identify when and why bias appears.

## Comment ça fonctionne

Bias can **enter** via des données d'entraînement biaisées (underrepresentation, label bias), proxy variables (par ex. zip code for race), or feedback loops (model outputs influence future data). **Detection** uses fairness metrics (par ex. demographic parity, equalized odds, calibration by group) on [evaluation](/docs/evaluation-metrics) sets stratified by protected attributes. **Mitigation** includes: data (reweighting, resampling, collecting more representative data); training (fairness constraints, adversarial debiasing); and post-processing (thresholds or rules per group). Trade-offs exist between fairness metrics and accuracy; legal and domain norms define which metrics and thresholds to use. Audits should be run before deployment and monitored in production.

## Cas d'utilisation

Bias work applies when model décisions affect people in regulated or sensitive domains (hiring, lending, scoring, content).

- Auditing hiring, lending, or scoring systems for discriminatory impact
- Fairness checks before deploying models in regulated domains
- Explainability and remediation when bias is detected

## Documentation externe

- [Google – Responsible AI – Fairness](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Free book

## Voir aussi

- [AI ethics](/docs/ai-ethics)
- [AI safety](/docs/ai-safety)
- [Evaluation metrics](/docs/evaluation-metrics)
