---
title: Case study — ChatGPT
description: Wie ChatGPT und konversationelle LLMs funktionieren.
keywords: [ChatGPT, OpenAI, conversational AI]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: ChatGPT

## Definition

ChatGPT ist eine Familie konversationeller [LLMs](/docs/llms) von OpenAI. Sie werden mit überwachtem [Fine-Tuning](/docs/llms/fine-tuning) und Reinforcement Learning aus menschlichem Feedback (RLHF) trainiert, um Anweisungen zu befolgen und sicher zu konversieren.

Sie veranschaulichen den vollständigen [LLM](/docs/llms)-Stack: vortrainiertes Basismodell, Instruktions-Tuning und [RL](/docs/rl)-basierte Ausrichtung (RLHF). Dieselben Ideen (Instruktions-Tuning, Präferenzoptimierung) finden sich in offenen und anderen proprietären Modellen wieder. Anwendungsfall: Chat, [Prompt](/docs/prompt-engineering)-gesteuerte Aufgaben und [agenten](/docs/agents)-ähnliche Workflows mit Werkzeugen.

## Funktionsweise

Ausgangspunkt ist ein **Basismodell** (z. B. GPT-4): ein [nur-Decoder](/docs/transformers/gpt) [Transformer](/docs/transformers), der auf Next-Token-Vorhersage vortrainiert wurde. **Instruktions-Tuning**: Feinabstimmung auf (Anweisung, Antwort)-Paaren, damit das Modell die Benutzerabsicht befolgt. **RLHF**: Ein **Belohnungsmodell** wird auf menschlichen Präferenzdaten trainiert (welche von zwei Antworten ist besser); dann wird die **Policy** (das LLM) mit [Reinforcement Learning](/docs/rl) (z. B. PPO) optimiert, um die Belohnung zu maximieren. Das Ergebnis ist ein Modell, das hilfreich ist, Anweisungen befolgt und weniger wahrscheinlich schädliche oder richtlinienwidrige Inhalte produziert. **Sicherheit und Schutzmaßnahmen** (Inhaltsfilter, Ablehnungen, Überwachung) werden im Produkt angewendet. [Prompt Engineering](/docs/prompt-engineering) und [RAG](/docs/rag) oder [Agenten](/docs/agents) erweitern das System für spezifische Anwendungsfälle.

## Anwendungsfälle

ChatGPT-artige Systeme eignen sich für Chat, Schreiben, Code-Hilfe und Aufgabenautomatisierung, die von Instruktionsbefolgung und Werkzeugnutzung profitieren.

- Konversationelle Assistenten und Kundensupport
- Schreiben, Zusammenfassung und Brainstorming
- Code-Hilfe, Nachhilfe und Aufgabenautomatisierung per Chat

## Externe Dokumentation

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF und Instruktions-Tuning

## Siehe auch

- [LLMs](/docs/llms)
- [Reinforcement Learning](/docs/rl)
- [Prompt Engineering](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — Vergleichbares konversationelles LLM
- [Gemini](/docs/case-studies/gemini) — Multimodale LLM-Familie
