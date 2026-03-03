---
title: Deep Learning
description: Tiefe neuronale Netze und Repräsentationslernen.
keywords: [Deep Learning, neuronale Netze, Repräsentationslernen]
---

# Deep Learning

## Definition

Deep Learning verwendet neuronale Netze mit vielen Schichten, um hierarchische Repräsentationen aus Daten zu lernen. Es hat Fortschritte in Bild-, Sprach- und anderen Bereichen vorangetrieben, indem Daten und Rechenleistung skaliert wurden.

Es erweitert [maschinelles Lernen](/docs/fundamentals/machine-learning) durch die Verwendung differenzierbarer, geschichteter Modelle (siehe [neuronale Netze](/docs/neural-networks)), die Merkmale automatisch lernen statt handgefertigter. Tiefe ermöglicht dem Modell, zunehmend abstrakte Repräsentationen aufzubauen (z. B. Kanten → Texturen → Teile → Objekte in der Bildverarbeitung).

## Funktionsweise

```mermaid
flowchart LR
  Data[Daten] --> Layers[Schichten]
  Layers --> Representation[Repräsentation]
  Representation --> Output[Ausgabe]
```

**Daten** werden in die erste **Schicht** eingespeist; jede Schicht wendet eine lineare Transformation gefolgt von einer Nichtlinearität (z. B. ReLU) an. Das Stapeln von Schichten erzeugt eine **Repräsentation** (Einbettung), die in tieferen Schichten abstrakter wird. Die letzte Schicht bildet auf die **Ausgabe** ab (z. B. Klassenwerte oder Token). Das Training verwendet **Backpropagation** zur Berechnung von Gradienten und **Gradientenabstieg** zur Aktualisierung der Gewichte. Architekturen (CNNs für Bilder, RNNs für Sequenzen, [Transformer](/docs/transformers) für beides) passen die Konnektivität und Operationen an die Daten und Aufgabe an.

## Anwendungsfälle

Deep Learning ist der Standard für Wahrnehmung und Generierung, wenn Daten reichlich und Aufgaben komplex sind.

- Bilderkennung, Objekterkennung und Segmentierung (Vision)
- Spracherkennung, maschinelle Übersetzung und Textgenerierung (Sprache)
- Spielen, Robotersteuerung und Simulation (bestärkendes Lernen)

## Externe Dokumentation

- [Deep Learning (Goodfellow et al.)](https://www.deeplearningbook.org/) — Kostenloses Online-Buch
- [PyTorch – Einführung](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — Praktisches Deep Learning

## Siehe auch

- [Neuronale Netze](/docs/neural-networks)
- [Transformer](/docs/transformers)
- [Frameworks (PyTorch, TensorFlow)](/docs/frameworks/pytorch)
