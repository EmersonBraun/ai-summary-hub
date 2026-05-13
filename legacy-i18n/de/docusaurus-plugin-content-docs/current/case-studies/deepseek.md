---
title: Case study — DeepSeek
description: DeepSeek AIs Open-Weight-LLMs mit starkem Reasoning und Code; MoE und effiziente Skalierung.
keywords: [DeepSeek, open weights, reasoning, code, MoE]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: DeepSeek

## Definition

DeepSeek ist eine Familie von [LLMs](/docs/llms) von DeepSeek AI. Die Modelle sind für ihre starke Reasoning- und Code-Leistung bekannt und werden als **offene Gewichte** veröffentlicht, sodass sie [lokal](/docs/local-inference) ausgeführt oder feinabgestimmt werden können. Varianten umfassen dichte und Mixture-of-Experts (MoE)-Architekturen für unterschiedliche Skalierungs- und Kosten-Trade-offs.

Sie veranschaulichen denselben Kernstack (Vortraining, Instruktions-Tuning, Ausrichtung) wie [ChatGPT](/docs/case-studies/chatgpt) und [Claude](/docs/case-studies/claude), mit einem Schwerpunkt auf offener Veröffentlichung und Effizienz. Anwendungsfall: Chat, Codegenerierung, Reasoning-Aufgaben und [RAG](/docs/rag) oder [Agenten](/docs/agents), wenn Selbsthosting oder Kostenkontrolle wichtig sind.

## Funktionsweise

**Basismodelle** werden auf großen Text- und Code-Korpora vortrainiert; **Instruktions-Tuning** und **Präferenzoptimierung** (z. B. DPO) richten sie für Chat und Werkzeugnutzung aus. **MoE**-Varianten aktivieren pro Token nur eine Teilmenge der Parameter, um die Kapazität zu skalieren, ohne den Rechenaufwand proportional zu erhöhen. Gewichte werden in Standardformaten veröffentlicht (z. B. SafeTensors); Teams betreiben sie mit [Quantisierung](/docs/quantization) auf Consumer-GPUs oder stellen sie über [lokale Inferenz](/docs/local-inference)-Laufzeiten bereit (vLLM, Ollama usw.). [Prompt Engineering](/docs/prompt-engineering) und [Feinabstimmung](/docs/llms/fine-tuning) erweitern den Einsatz für spezifische Domänen.

## Anwendungsfälle

DeepSeek eignet sich, wenn starke Reasoning- und Code-Fähigkeit mit offenen Gewichten und lokaler oder kosteneffektiver Bereitstellung gewünscht wird.

- Codegenerierung und codegestützte Workflows (IDE, Agenten)
- Reasoning und Mathematik mit offenen, selbst hostbaren Modellen
- Feinabstimmung und [lokale Inferenz](/docs/local-inference) für Datenschutz oder Kostenersparnis

## Externe Dokumentation

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Gewichte und Karten

## Siehe auch

- [LLMs](/docs/llms)
- [Lokale Inferenz](/docs/local-inference)
- [Feinabstimmung](/docs/llms/fine-tuning)
