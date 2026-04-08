---
title: Convolutional neural networks (CNN)
description: CNNs for spatial and image data.
keywords: [CNN, convolution, computer vision]
tags: [intermediate]
authors: [EmersonBraun]
---

# Konvolutionelle neuronale Netze (CNN)

## Definition

CNNs verwenden konvolutionelle Schichten, um lokale Muster (Kanten, Texturen) zu erfassen und hierarchische Merkmale aufzubauen. Sie sind das Standard-Backbone für Bildklassifikation, -detektion und -segmentierung.

Anders als dichte [neuronale Netze](/docs/neural-networks) teilen Konvolutionen Gewichte über den Raum, sodass sie translationsäquivariant und effizient für Bilder und andere gitterartige Daten sind. Sie bilden das Backbone der meisten [Computer-Vision](/docs/cv)-Systeme und werden auch in [Transformern](/docs/transformers) für Patch-Embedding verwendet.

Die Schlüsselerkenntnis hinter CNNs ist die **Gewichtsteilung**: Derselbe Filter wird an jeder räumlichen Position angewendet, was die Anzahl der Parameter im Vergleich zu vollständig verbundenen Schichten erheblich reduziert, während lokale Struktur erfasst wird. Frühe Schichten lernen Low-Level-Merkmale (Kanten, Farbkleckse); tiefere Schichten kombinieren diese zu progressiv höherstufigen Mustern (Texturen, Objektteile, ganze Objekte). Dieses hierarchische Merkmal-Lernen, kombiniert mit Pooling für räumliches Downsampling, macht CNNs extrem effektiv für alle Daten, bei denen nahe Werte semantische Bedeutung teilen — Bilder, Video, Audio-Spektrogramme und mehr.

## Funktionsweise

```mermaid
flowchart LR
  Image[Eingabebild] -->|Filter schieben| Conv1[Conv + ReLU]
  Conv1 -->|Downsampling| Pool1[Max Pool]
  Pool1 -->|tiefere Filter| Conv2[Conv + ReLU]
  Conv2 -->|Downsampling| Pool2[Max Pool]
  Pool2 -->|Flatten| FC[Vollständig verbunden]
  FC -->|Softmax| Class[Klassen-Scores]
```

### Konvolutionelle Schichten

Das **Bild** (oder die Feature Map) wird in **konvolutionelle** Schichten gespeist: Jeder Filter (Kernel) gleitet über die Eingabe und berechnet ein Skalarprodukt, was Aktivierungskarten erzeugt, die lokale Muster hervorheben. Mehrere Filter lernen parallel unterschiedliche Muster. Nach jeder Konvolution folgt eine Nichtlinearität (ReLU).

### Pooling

**Pooling** (z.B. Max Pooling) downsampled räumlich, reduziert die Größe und fügt leichte Translationsinvarianz hinzu. Strided Convolutions sind eine moderne Alternative, die ähnliches Downsampling erreicht, während mehr Informationen beibehalten werden.

### Klassifikations-Kopf

Tiefere **Conv**-Schichten sehen größere rezeptive Felder und erfassen abstraktere Merkmale (Teile, Objekte). Der finale **Klassen**- (oder Detektions-/Segmentierungs-) Kopf besteht typischerweise aus einer oder mehreren dichten Schichten, die auf die geflachten oder global-gepoolten Merkmale angewendet werden. Das Training verwendet Backprop und Gradientenabstieg wie bei anderen [Deep-Learning](/docs/fundamentals/deep-learning)-Modellen.

## Wann verwenden / Wann NICHT verwenden

| Szenario | CNN verwenden? | Hinweise |
|---|---|---|
| Bildklassifikation / -erkennung | Ja | CNNs sind der bewährte Standard |
| Objektdetektion und -segmentierung | Ja | Backbones wie ResNet treiben YOLO, Mask R-CNN an |
| Videoverständnis | Ja | 3D-Konvolutionen erweitern auf die zeitliche Dimension |
| Variable-Länge-Textsequenzen | Nein | Transformer verarbeiten das besser |
| Weitreichende Abhängigkeiten in Sequenzen | Nein | Attention-Mechanismen sind effektiver |
| Punkt-Cloud- oder Graph-Daten | Mit Vorsicht | Spezialisierte Graph-/3D-Varianten benötigt |

## Vergleiche

| Aspekt | CNN | RNN | Transformer |
|---|---|---|---|
| Primärer Anwendungsfall | Bilder, Raster | Sequenzen | Text, multimodal |
| Verarbeitung weitreichender Abhängigkeiten | Schlecht (begrenztes rezeptives Feld) | Moderat (mit LSTM/GRU) | Gut (globale Attention) |
| Parallelisierbares Training | Ja | Nein (sequenziell) | Ja |
| Räumliche Invarianz | Hoch (Gewichtsteilung) | N/A | Gelernt (positionelles Encoding) |
| Rechenkosten (Inferenz) | Niedrig bis moderat | Moderat | Hoch bei langem Kontext |

## Vor- und Nachteile

| Vorteile | Nachteile |
|---|---|
| Parametereffizient durch Gewichtsteilung | Begrenzt auf gitterstrukturierte Daten |
| Translationsäquivarianz eingebaut | Großes rezeptives Feld erfordert viele Schichten |
| Sehr reifes Ökosystem (ResNet, EfficientNet) | Weniger effektiv für sequenzielle/textuelle Aufgaben |
| Schnelle Inferenz, einfach zu quantisieren | Erfordert große beschriftete Datensätze |

## Codebeispiele

```python
# CNN für Bildklassifikation mit PyTorch (CIFAR-10-Stil)
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# Daten
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
])
train_data = datasets.CIFAR10('.', train=True, download=True, transform=transform)
train_loader = DataLoader(train_data, batch_size=64, shuffle=True)

# Modell
class SimpleCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1), nn.ReLU(),
            nn.AdaptiveAvgPool2d((4, 4)),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 256), nn.ReLU(), nn.Dropout(0.5),
            nn.Linear(256, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.classifier(self.features(x))

device = "cuda" if torch.cuda.is_available() else "cpu"
model  = SimpleCNN().to(device)
opt    = optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

# Eine Trainingsepoche
model.train()
for X, y in train_loader:
    X, y = X.to(device), y.to(device)
    opt.zero_grad()
    loss_fn(model(X), y).backward()
    opt.step()

print("Trainingsschritt abgeschlossen.")
```

## Praktische Ressourcen

- [CS231n – CNNs für visuelle Erkennung](https://cs231n.github.io/convolutional-networks/) — Stanford-Kursnotizen mit klaren visuellen Erklärungen
- [PyTorch – Konvolutionelle neuronale Netze](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets) — Offizielles praktisches Tutorial
- [Papers With Code – Bildklassifikation](https://paperswithcode.com/task/image-classification) — Benchmark-Ranglisten und reproduzierbarer Code

## Siehe auch

- [Computer Vision](/docs/cv)
- [Neuronale Netze](/docs/neural-networks)
- [RNN](/docs/neural-networks/rnn)
