---
title: Neuronale Netze
description: Einführung in künstliche neuronale Netze und ihre Bausteine.
keywords: [neuronale Netze, KNN, Schichten, Aktivierung]
---

# Neuronale Netze

## Definition

Neuronale Netze sind Funktionsapproximatoren, die aus Schichten von Einheiten (Neuronen) mit lernbaren Gewichten und nichtlinearen Aktivierungen aufgebaut sind. Sie können komplexe Abbildungen von Eingaben zu Ausgaben approximieren, wenn sie auf Daten trainiert werden.

Sie sind die Bausteine des [Deep Learning](/docs/fundamentals/deep-learning). Varianten wie [CNNs](/docs/neural-networks/cnn) und [RNNs](/docs/neural-networks/rnn) fügen induktive Biases hinzu (z. B. Lokalität, Rekurrenz) für bestimmte Datentypen; das gleiche Trainingsverfahren (Backpropagation, Gradientenabstieg) gilt.

## Funktionsweise

```mermaid
flowchart LR
  Input[Eingabe] --> Layer1[Schicht1]
  Layer1 --> Layer2[Schicht2]
  Layer2 --> Output[Ausgabe]
```

Die **Eingabe** wird an die erste Schicht übergeben. Jede **Schicht** berechnet eine Linearkombination ihrer Eingaben (Gewichte) und dann eine nichtlineare Aktivierung (z. B. ReLU, Sigmoid). Die Ausgabe einer Schicht wird zur Eingabe der nächsten; das Stapeln von Schichten ermöglicht dem Netzwerk, hierarchische Merkmale zu lernen. Die letzte **Ausgabeschicht** bildet typischerweise auf Vorhersagen ab (z. B. Klassenwerte oder einen Skalar). Das Training minimiert einen Verlust durch **Backpropagation** (Berechnung von Gradienten mittels Kettenregel) und **Gradientenabstieg** (Aktualisierung der Gewichte). Tiefe und Breite bestimmen die Kapazität; Regularisierung und Datenmenge kontrollieren Überanpassung.

## Anwendungsfälle

Neuronale Netze werden überall eingesetzt, wo flexible, datengetriebene Funktionsapproximation benötigt wird.

- Regression und Klassifikation (z. B. Umsatzvorhersage, Bildklassifikation)
- Merkmalslernen für nachgelagerte Aufgaben (Einbettungen, Transfer Learning)
- Approximation komplexer nichtlinearer Funktionen in Steuerung oder Simulation

## Externe Dokumentation

- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com/) — Kostenloses Online-Buch
- [3Blue1Brown – Neuronale Netze](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) — Visuelle Einführung

## Siehe auch

- [CNN](/docs/neural-networks/cnn)
- [RNN](/docs/neural-networks/rnn)
- [Deep Learning](/docs/fundamentals/deep-learning)
