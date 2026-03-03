---
title: Viés em IA
description: Fontes e mitigação de viés em sistemas de ML.
keywords: [viés, justiça, discriminação]
---

# Viés em IA

## Definição

Viés em IA refere-se a erros sistemáticos ou resultados injustos (por ex. across demographics) arising from data, model projeto, or deployment. Mitigation includes data audits, fairness metrics, and debiasing methods.

É a core concern in [AI ethics](/docs/ai-ethics) and [AI safety](/docs/ai-safety). [Evaluation metrics](/docs/evaluation-metrics) for fairness (por ex. demographic parity, equalized odds) are used in audits and before deploying in regulated domains. [Explainable AI](/docs/xai) can help identify when and why bias appears.

## Como funciona

O viés pode **entrar** por dados de treinamento enviesados (sub-representação, viés de rótulo), variáveis proxy (por ex. CEP para raça), ou loops de feedback (modelo outputs influence future data). **Detection** uses fairness metrics (por ex. demographic parity, equalized odds, calibration by group) on [evaluation](/docs/evaluation-metrics) sets stratified by protected attributes. **Mitigation** includes: data (reweighting, resampling, collecting more representative data); training (fairness constraints, adversarial debiasing); and post-processing (thresholds or rules per group). Trade-offs exist between fairness metrics and accuracy; legal and domain norms define which metrics and thresholds to use. Audits should be run before deployment and monitored in production.

## Casos de uso

Bias work applies when model decisãos affect people in regulated or sensitive domains (hiring, lending, scoring, content).

- Auditing hiring, lending, or scoring systems for discriminatory impact
- Fairness checks before deploying models in regulated domains
- Explainability and remediation when bias is detected

## Documentação externa

- [Google – Responsible AI – Fairness](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Free book

## Veja também

- [AI ethics](/docs/ai-ethics)
- [AI safety](/docs/ai-safety)
- [Evaluation metrics](/docs/evaluation-metrics)
