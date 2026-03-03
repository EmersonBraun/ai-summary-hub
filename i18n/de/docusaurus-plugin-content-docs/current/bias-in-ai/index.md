---
title: Bias in KI
description: Quellen und Minderung von Bias in ML-Systemen.
keywords: [Bias, Fairness, Diskriminierung]
---

# Bias in KI

## Definition

Bias in KI bezieht sich auf systematische Fehler oder unfaire Ergebnisse (z. B. across demographics) arising aus Daten, model Entwurf, or deployment. Mitigation includes data audits, fairness metrics, and debiasing methods.

Es ist ein core concern in [AI ethics](/docs/ai-ethics) and [AI safety](/docs/ai-safety). [Evaluation metrics](/docs/evaluation-metrics) for fairness (z. B. demographic parity, equalized odds) werden verwendet in audits and before deploying in regulated domains. [Explainable AI](/docs/xai) can help identify when and why bias appears.

## Funktionsweise

Bias can **enter** über verzerrte Trainingsdaten (Unterrepräsentation, Label-Bias), Proxy-Variablen (z. B. zip code for race), oder Feedback-Schleifen (model outputs influence future data). **Detection** uses fairness metrics (z. B. demographic parity, equalized odds, calibration by group) on [evaluation](/docs/evaluation-metrics) sets stratified by protected attributes. **Mitigation** includes: data (reweighting, resampling, collecting more representative data); training (fairness constraints, adversarisch debiasing); and post-processing (thresholds or rules per group). Trade-offs exist between fairness metrics and accuracy; legal and domain norms define which metrics and thresholds to use. Audits should be run before deployment and monitored in production.

## Anwendungsfälle

Bias-Arbeit kommt zum Einsatz, wenn Modellentscheidungen Menschen in regulierten oder sensiblen Bereichen betreffen (Einstellung, Kreditvergabe, Scoring, Inhalte).

- Auditing hiring, lending, or scoring systems for discriminatory impact
- Fairness checks before deploying models in regulated domains
- Explainability and remediation when bias is detected

## Externe Dokumentation

- [Google – Responsible AI – Fairness](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Kostenloses Buch

## Siehe auch

- [AI ethics](/docs/ai-ethics)
- [AI safety](/docs/ai-safety)
- [Evaluation metrics](/docs/evaluation-metrics)
