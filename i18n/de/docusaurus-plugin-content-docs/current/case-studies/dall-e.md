---
title: Case study — DALL·E
description: Text-zu-Bild-Generierung mit Diffusion und Sprache.
keywords: [DALL-E, text-to-image, diffusion]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: DALL·E

## Definition

DALL·E (und DALL·E 2) sind Text-zu-Bild-Modelle von OpenAI. Sie generieren Bilder aus Textprompts mithilfe von [Diffusionsmodellen](/docs/diffusion-models) und Sprach-Bild-Ausrichtung.

Sie sind ein führendes Beispiel für [multimodale](/docs/multimodal-ai) Generierung: Text rein, Bild raus. Dieselben [Diffusions](/docs/diffusion-models)- und Konditionierungsideen finden sich in Stable Diffusion und anderen offenen Modellen. Anwendungsfall: kreative und produktbezogene Bildgebung aus natürlicher Sprache; Sicherheits- und Inhaltsrichtlinien gelten.

## Funktionsweise

**Text** wird mit einem Sprach- oder [multimodalen](/docs/multimodal-ai) Encoder (z. B. CLIP-Text-Encoder, T5) in ein **Text-Embedding** kodiert. Ein **Diffusions**modell (z. B. UNet) wird auf dieses Embedding **konditioniert**: der Entrauschungsprozess wird so gelenkt, dass das generierte Bild dem Text entspricht. Das Training verwendet große Datensätze mit beschrifteten Bildern; das Modell lernt, Text- und Bildinhalte zu verknüpfen. **Sampling**: Start vom Rauschen, Ausführung des inversen Diffusionsprozesses mit dem Text-Embedding als Bedingung und Dekodierung zu einem Bild. **Sicherheitsfilter** (z. B. Klassifikator, Richtlinie) begrenzen schädliche oder eingeschränkte Ausgaben vor der Auslieferung. Varianten (Inpainting, Bearbeitung) konditionieren sowohl auf Text als auch auf ein vorhandenes Bild oder eine Maske.

## Anwendungsfälle

Text-zu-Bild-Modelle wie DALL·E werden überall dort eingesetzt, wo Bilder aus natürlicher Sprache generiert oder bearbeitet werden müssen (kreativ, Produkt, UI).

- Kreative und Marketing-Asset-Generierung aus Textprompts
- Konzeptkunst, Illustration und Design-Exploration
- Produkt- und UI-Mockups aus Beschreibungen in natürlicher Sprache

## Externe Dokumentation

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Siehe auch

- [Diffusionsmodelle](/docs/diffusion-models)
- [Multimodale KI](/docs/multimodal-ai)
