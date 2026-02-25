---
title: Bias in AI
description: Sources and mitigation of bias in ML systems.
keywords: [bias, fairness, discrimination]
---

# Bias in AI

## Definition

Bias in AI refers to systematic errors or unfair outcomes (e.g. across demographics) arising from data, model design, or deployment. Mitigation includes data audits, fairness metrics, and debiasing methods.

It is a core concern in [AI ethics](/docs/ai-ethics) and [AI safety](/docs/ai-safety). [Evaluation metrics](/docs/evaluation-metrics) for fairness (e.g. demographic parity, equalized odds) are used in audits and before deploying in regulated domains. [Explainable AI](/docs/xai) can help identify when and why bias appears.

## How it works

Bias can **enter** via skewed training data (underrepresentation, label bias), proxy variables (e.g. zip code for race), or feedback loops (model outputs influence future data). **Detection** uses fairness metrics (e.g. demographic parity, equalized odds, calibration by group) on [evaluation](/docs/evaluation-metrics) sets stratified by protected attributes. **Mitigation** includes: data (reweighting, resampling, collecting more representative data); training (fairness constraints, adversarial debiasing); and post-processing (thresholds or rules per group). Trade-offs exist between fairness metrics and accuracy; legal and domain norms define which metrics and thresholds to use. Audits should be run before deployment and monitored in production.

## Use cases

Bias work applies when model decisions affect people in regulated or sensitive domains (hiring, lending, scoring, content).

- Auditing hiring, lending, or scoring systems for discriminatory impact
- Fairness checks before deploying models in regulated domains
- Explainability and remediation when bias is detected

## External documentation

- [Google – Responsible AI – Fairness](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Free book

## See also

- [AI ethics](/docs/ai-ethics)
- [AI safety](/docs/ai-safety)
- [Evaluation metrics](/docs/evaluation-metrics)
