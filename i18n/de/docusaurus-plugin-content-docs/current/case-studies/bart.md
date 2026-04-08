---
title: Case study — BART
description: Encoder-Decoder-Vorgänger von Gemini; Denoising-Vortraining für Zusammenfassung und Generierung.
keywords: [BART, encoder-decoder, denoising, summarization]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: BART

## Definition

BART (Bidirectional and Auto-Regressive Transformers) ist ein [Transformer](/docs/transformers) **Encoder-Decoder**-Modell von Meta (Facebook AI). Es wird mit Denoising-Zielen vortrainiert (z. B. Token-Löschung, Maskierung, Satz-Permutation) und für Zusammenfassung, Übersetzung und bedingte Generierung feinabgestimmt.

BART repräsentiert eine frühere Generation großer Sequenz-zu-Sequenz-Modelle; Googles [Gemini](/docs/case-studies/gemini) und andere moderne [LLMs](/docs/llms) bauen auf anderen Architekturen auf (nur Decoder, multimodal), verfolgen aber dasselbe Ziel eines starken Textverstehens und der Textgenerierung. Anwendungsfall: Zusammenfassung, Frage-Antwort-Systeme und bedingte Textgenerierung, bei denen die Encoder-Decoder-Struktur vorteilhaft ist.

## Funktionsweise

**Encoder**: Ein [BERT](/docs/transformers/bert)-ähnlicher bidirektionaler Encoder verarbeitet die Quellsequenz. **Decoder**: Ein kausaler (autoregressiver) Decoder berücksichtigt die Encoder-Ausgabe und vorherige Decoder-Positionen, um das Ziel zu generieren. **Vortraining**: Die Eingabe wird korrumpiert (maskiert, gelöscht, permutiert) und das Modell wird trainiert, das Original zu rekonstruieren — dieses Denoising-Ziel erlernt robuste Repräsentationen. **Feinabstimmung**: Ein aufgabenspezifischer Kopf wird hinzugefügt oder die Sequenzausgabe wird für die Zusammenfassung (z. B. CNN/DailyMail), Übersetzung oder Frage-Antwort verwendet. Inferenz: Quelle kodieren, dann Token für Token dekodieren.

## Anwendungsfälle

BART-artige Encoder-Decoder-Modelle eignen sich für bedingte Generierungs- und Verständnisaufgaben mit einer klaren Quelle und einem klaren Ziel.

- Dokument- und Dialogzusammenfassung
- Bedingte Generierung (z. B. Satzvervollständigung, Daten-zu-Text)
- Feinabstimmung für domänenspezifisches NLU und Generierung

## Externe Dokumentation

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Siehe auch

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
