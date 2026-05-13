---
title: Case study — Qwen
description: Alibabas LLM-Familie; mehrsprachig, Programmierung und Langkontext-Unterstützung.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: Qwen

## Definition

Qwen ist Alibabas Familie von [LLMs](/docs/llms). Die Modelle sind für **mehrsprachigen** Einsatz (einschließlich Chinesisch und Englisch), **Programmierung** (Qwen-Coder) und **langen Kontext** konzipiert und als offene Gewichte sowie über API verfügbar.

Wie [DeepSeek](/docs/case-studies/deepseek) und [Claude](/docs/case-studies/claude) nutzt Qwen Vortraining, Instruktions-Tuning und Ausrichtung; Differenzierungsmerkmale umfassen starke mehrsprachige und Programmiervarianten sowie Langkontext-Unterstützung. Anwendungsfall: Chat, Code-Unterstützung, [RAG](/docs/rag) über lange Dokumente und [Feinabstimmung](/docs/llms/fine-tuning) für domänenspezifische Anwendungen.

## Funktionsweise

**Basismodelle** werden auf großen mehrsprachigen und Code-Korpora vortrainiert. **Instruktions-Tuning** und **Ausrichtung** (z. B. DPO, RLHF-artig) erzeugen Chat- und Werkzeugnutzungsvarianten. **Spezialisierte Versionen**: Qwen-Coder für Code, Qwen-VL für Vision-Sprache. **Langer Kontext** wird über erweiterte Kontextfenster und optionales [RAG](/docs/rag) unterstützt. Gewichte werden für [lokale Inferenz](/docs/local-inference) und [Feinabstimmung](/docs/llms/fine-tuning) veröffentlicht; API-Zugang wird ebenfalls angeboten. [Prompt Engineering](/docs/prompt-engineering) und [Agenten](/docs/agents) erweitern das System für Anwendungen.

## Anwendungsfälle

Qwen eignet sich für mehrsprachige und Programmieranwendungen sowie Langkontext-Workflows mit offenem oder API-Zugang.

- Mehrsprachiger Chat, Übersetzung und Inhaltsgenerierung
- Codegenerierung und codeorientierte [Agenten](/docs/agents)
- Langdokument-Q&A und [RAG](/docs/rag) mit großen Kontextfenstern

## Externe Dokumentation

- [Qwen – Official site](https://qwenlm.github.io/) — Modelle und Dokumentation
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Gewichte und Modellkarten

## Siehe auch

- [LLMs](/docs/llms)
- [Feinabstimmung](/docs/llms/fine-tuning)
- [Lokale Inferenz](/docs/local-inference)
