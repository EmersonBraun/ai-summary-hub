---
title: Case study — Claude
description: Anthropics anweisungsfolgendes LLM mit langem Kontext und Sicherheit.
keywords: [Claude, Anthropic, constitutional AI, long context]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Claude

## Definition

Claude ist Anthropics Familie konversationeller [LLMs](/docs/llms). Die Modelle sind für Instruktionsbefolgung, langen Kontext und Sicherheit konzipiert, unter Verwendung von Techniken wie Constitutional AI und RLHF-basierter Ausrichtung.

Sie teilen denselben breiten Stack wie [ChatGPT](/docs/case-studies/chatgpt): vortrainiertes Basismodell, Instruktions-Tuning und präferenzbasierte Ausrichtung. Claude betont lange Kontextfenster, [Prompt-Engineering](/docs/prompt-engineering)-freundliches Verhalten und Sicherheitsbeschränkungen. Anwendungsfall: Chat, Langdokument-Analyse, Programmierung und [agenten](/docs/agents)-artige Workflows über API und Produkte wie [Claude Code](/docs/tools/claude-code).

## Funktionsweise

Ein **Basismodell** (nur-Decoder [Transformer](/docs/transformers)) wird auf großen Textkorpora vortrainiert. **Instruktions-Tuning** trainiert das Modell auf (Anweisung, Antwort)-Paaren. **Constitutional AI** und **RLHF** (Belohnungsmodell + Policy-Optimierung) formen Hilfsbereitschaft, Ehrlichkeit und Ablehnungen. Das Ergebnis ist ein Modell mit Langkontext-Unterstützung (z. B. 100K+ Tokens), das für Dokumente und ausgedehnte Konversationen geeignet ist. **Sicherheit und Schutzmaßnahmen** (Inhaltsrichtlinien, Ablehnungen) werden im Produkt angewendet. [RAG](/docs/rag) und Werkzeuge erweitern Claude für spezifische Anwendungen.

## Anwendungsfälle

Claude eignet sich für Anwendungen, die langen Kontext, sorgfältige Instruktionsbefolgung und starke Sicherheitsvorgaben benötigen.

- Langdokument-Q&A, Zusammenfassung und Analyse
- Code-Unterstützung und Codegenerierung mit großem Codebase-Kontext
- Chat und Aufgabenautomatisierung mit explizitem Sicherheits- und Ablehnungsverhalten

## Externe Dokumentation

- [Anthropic – Claude](https://www.anthropic.com/product) — Modelle und Produkt
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API und Anleitungen

## Siehe auch

- [LLMs](/docs/llms)
- [Prompt Engineering](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
