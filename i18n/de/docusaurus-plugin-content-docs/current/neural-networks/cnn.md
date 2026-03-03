---
title: Faltungsneuronale Netze (CNN)
description: CNNs für räumliche und Bilddaten.
keywords: [CNN, Faltung, Computer Vision]
---

# Faltungsneuronale Netze (CNN)

## Definition

CNNs verwenden Faltungsschichten, um lokale Muster (Kanten, Texturen) zu erfassen und hierarchische Merkmale aufzubauen. Sie sind das Standard-Rückgrat für Bildklassifikation, -erkennung und -segmentierung.

Im Gegensatz zu dichten [neuronalen Netzen](/docs/neural-networks) teilen Faltungen Gewichte über den Raum, sodass sie translationsäquivariant und effizient für Bilder und andere gitterähnliche Daten sind. Sie bilden das Rückgrat der meisten [Computer-Vision](/docs/cv)-Systeme und werden auch in [Transformern](/docs/transformers) für Patch-Einbettungen verwendet.

## Funktionsweise

```mermaid
flowchart LR
  Image[Bild] --> Conv[Conv]
  Conv --> Pool[Pool]
  Pool --> Conv2[Conv]
  Conv2 --> Class[Klasse]
```

Das **Bild** (oder die Merkmalskarte) wird in **Faltungsschichten** eingespeist: jeder Filter gleitet über die Eingabe und berechnet Skalarprodukte, wobei Aktivierungskarten entstehen, die lokale Muster (Kanten, Texturen) hervorheben. **Pooling** (z. B. Max-Pooling) reduziert räumlich die Größe und fügt leichte Invarianz hinzu. Tiefere **Conv**-Schichten sehen größere rezeptive Felder und erfassen abstraktere Merkmale (Teile, Objekte). Der finale **Klassifikations-** (oder Erkennungs-/Segmentierungs-)Kopf besteht meist aus einer oder mehreren dichten Schichten auf den geflatteten oder gepoolten Merkmalen. Das Training verwendet die gleiche Backpropagation und den gleichen Gradientenabstieg wie andere [Deep-Learning](/docs/fundamentals/deep-learning)-Modelle.

## Anwendungsfälle

CNNs sind der Standard für jede Aufgabe, bei der räumliche Struktur (Bilder, Video oder 2D/3D-Signale) wichtig ist.

- Bildklassifikation (z. B. Objekterkennung, medizinische Bildanalyse)
- Objekterkennung und Instanzsegmentierung
- Videoanalyse und Aktionserkennung

## Externe Dokumentation

- [CS231n – CNNs für visuelle Erkennung](https://cs231n.github.io/convolutional-networks/)
- [PyTorch – Faltungsneuronale Netze](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets)

## Siehe auch

- [Computer Vision](/docs/cv)
- [Neuronale Netze](/docs/neural-networks)
