---
title: AI 中的偏见
description: 机器学习系统中偏见的来源和缓解措施。
keywords: [偏见, 公平性, 歧视]
---

# AI 中的偏见

## 定义

AI 中的偏差指的是系统性错误或不公平的结果 (例如 across demographics) arising from data, model 设计, or deployment. Mitigation includes data audits, fairness metrics, and debiasing methods.

它是 a core concern in [AI ethics](/docs/ai-ethics) and [AI safety](/docs/ai-safety). [Evaluation metrics](/docs/evaluation-metrics) for fairness (例如 demographic parity, equalized odds) are used in audits and before deploying in regulated domains. [Explainable AI](/docs/xai) can help identify when and why bias appears.

## 工作原理

Bias can **enter** 通过偏斜的训练数据 (underrepresentation, label bias), proxy variables (例如 zip code for race), or feedback loops (model outputs influence future data). **Detection** uses fairness metrics (例如 demographic parity, equalized odds, calibration by group) on [evaluation](/docs/evaluation-metrics) sets stratified by protected attributes. **Mitigation** includes: data (reweighting, resampling, collecting more representative data); training (fairness constraints, adversarial debiasing); and post-processing (thresholds or rules per group). Trade-offs exist between fairness metrics and accuracy; legal and domain norms define which metrics and thresholds to use. Audits should be run before deployment and monitored in production.

## 应用场景

Bias work applies when model 决策s affect people in regulated or sensitive domains (hiring, lending, scoring, content).

- Auditing hiring, lending, or scoring systems for discriminatory impact
- Fairness checks before deploying models in regulated domains
- Explainability and remediation when bias is detected

## 外部文档

- [Google – Responsible AI – Fairness](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Free book

## 另请参阅

- [AI ethics](/docs/ai-ethics)
- [AI safety](/docs/ai-safety)
- [Evaluation metrics](/docs/evaluation-metrics)
