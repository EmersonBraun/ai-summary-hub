---
title: Pruning
description: Entfernen von Gewichten oder Strukturen zur Modellverkleinerung.
keywords: [Pruning, Sparsität, strukturiertes Pruning]
tags: [advanced]
authors: [EmersonBraun]
---

# Pruning

## Definition

Pruning ist eine [Modellkomprimierungs](/docs/model-compression)-Technik, die redundante oder unwichtige Komponenten aus einem trainierten neuronalen Netz entfernt, um dessen Größe, Speicherbedarf und Rechenkosten zu reduzieren. Der Kerngedanke ist, dass die meisten neuronalen Netze überparameterisiert sind: Viele Gewichte tragen vernachlässigbar zu den Vorhersagen des Modells bei und können auf null gesetzt oder entfernt werden, ohne die Genauigkeit wesentlich zu beeinträchtigen. Durch das Identifizieren und Eliminieren dieser redundanten Parameter entstehen kleinere, günstigere Modelle, die für Edge- oder Produktionsbereitstellung geeignet sind.

Es gibt zwei grundlegend unterschiedliche Ansätze. **Unstrukturiertes Pruning** entfernt individuelle Gewichtsverbindungen unabhängig von ihrer Position in der Gewichtsmatrix, was sparse Tensoren ergibt. Obwohl sparse Gewichte die Parameteranzahl und den Speicher reduzieren, beschleunigt Standard-Dense-Hardware (GPU-Matrixmultiplikationseinheiten) nicht automatisch — Sparse-Beschleunigung erfordert spezialisierte Sparse-Kernel oder dedizierte Hardware. **Strukturiertes Pruning** hingegen entfernt ganze reguläre Blöcke: einzelne Neuronen, Convolutional-Output-Kanäle, Attention-Heads oder Transformer-Schichten. Da das resultierende Modell eine kleinere Dense-Architektur hat, erzielt es echte Wall-Clock-Speedups auf Commodity-Hardware ohne eine Sparsitätsbewusste Laufzeit.

Pruning ist am effektivsten in Kombination mit anderen [Modellkomprimierungs](/docs/model-compression)-Techniken. Eine übliche Pipeline ist: Vollständiges Modell trainieren → in einen kleineren Schüler destillieren (siehe [Wissensdestillation](/docs/knowledge-distillation)) → strukturiertes Pruning anwenden → Fine-Tuning → Quantisieren. Der mehrstufige Ansatz nutzt die komplementären Stärken jeder Technik und erzeugt Modelle, die deutlich kleiner und schneller sind als jede einzelne Methode erreicht.

## Funktionsweise

### Iterative Pruning-Pipeline

```mermaid
flowchart LR
  Trained["Vollständig trainiertes Modell"] -->|"Wichtigkeit messen"| Score["Wichtigkeitsbewertung\n(Magnitude / Gradient / L1)"]
  Score -->|"Parameter ranken"| Rank["Gewichte oder Kanäle ranken"]
  Rank -->|"unterste N% entfernen"| Prune["Prunen (null setzen oder entfernen)"]
  Prune -->|"Genauigkeit wiederherstellen"| FineTune["Fine-Tuning auf Trainingsdaten"]
  FineTune -->|"Sparsitätsziel prüfen"| Check{Ziel erreicht?}
  Check -->|"Nein — Sparsität erhöhen"| Score
  Check -->|"Ja"| Compressed["Komprimiertes Modell"]
```

### Unstrukturiert vs. Strukturiert

```mermaid
flowchart LR
  Model["Gewichtsmatrix W\n(dense, alle Verbindungen)"] -->|"unstrukturiert: individuelle Gewichte nullen"| Sparse["Sparse W\n(gleiche Form, viele Nullen)"]
  Model -->|"strukturiert: Kanal / Head entfernen"| Dense["Kleinere dense W\n(weniger Zeilen oder Spalten)"]
  Sparse -->|"erfordert Sparse-Kernel"| SpeedupSparse["Speichereinsparungen, begrenzte Beschleunigung"]
  Dense -->|"Standard MatMul"| SpeedupDense["Echter Wall-Clock-Speedup"]
```

### Wichtigkeitsbewertungsmethoden

| Methode | Score-Definition | Vorteile | Nachteile |
|--------|-----------------|------|------|
| Magnitude | Absoluter Gewichtswert | Schnell, keine Daten nötig | Kann wichtige kleine Gewichte entfernen |
| Gradient-basiert | Gewicht × Gradient | Datengesteuert, genauer | Erfordert einen Backward Pass |
| Taylor-Expansion | Erstordnungsverlust-Sensitivität | Guter Genauigkeits-Sparsitäts-Kompromiss | Rechenaufwendiger |
| Gelernde Maske | Binäre Maske mit L0/L1 trainiert | Modelladaptiv | Erfordert Regularisierung zur Trainingszeit |

## Wann verwenden / Wann NICHT verwenden

| Szenario | Pruning verwenden | Pruning NICHT verwenden |
|----------|------------|-------------------|
| Echter Wall-Clock-Speedup auf Commodity-Hardware benötigt | Ja — strukturiertes Pruning erreicht das | |
| Großer Transformer mit vielen redundanten Attention-Heads | Ja — Head-Pruning mit minimalem Genauigkeitsverlust | |
| Kombination mit Quantisierung für maximale Komprimierung | Ja — zuerst prunen, dann quantisieren | |
| Speicherreduzierung ohne Hardware-Speedup | Ja — unstrukturiertes Pruning reduziert Modelldateigröße | |
| Sehr kleine Modelle, bei denen jeder Parameter wichtig ist | | Komprimierungsbudget rechtfertigt möglicherweise den Aufwand nicht |
| Modelle ohne Zugang zu Trainingsdaten für Fine-Tuning | | One-Shot-Pruning ohne Fine-Tuning verschlechtert die Genauigkeit erheblich |

## Vor- und Nachteile

| Vorteile | Nachteile |
|------|------|
| Strukturiertes Pruning erzielt echte Hardware-Speedups | Unstrukturiertes Pruning bietet ohne Sparse-Hardware begrenzte Beschleunigung |
| Kann spezifische Engpässe ansprechen (Heads, Kanäle, Schichten) | Fine-Tuning nach dem Pruning erfordert Trainingsdaten und Rechenleistung |
| Reduziert Modelldateigröße für Speicher und Transfer | Iterative Pruning + Fine-Tune-Zyklen sind zeitaufwendig |
| Komplementär zu Quantisierung und Destillation | Das Entfernen zu vieler Parameter kann zu nicht wiederherstellbarem Genauigkeitsverlust führen |

## Code-Beispiele

```python
# Structured channel pruning with PyTorch
import torch
import torch.nn.utils.prune as prune

model = MyCNNModel()
model.load_state_dict(torch.load("model.pt"))

# Unstructured L1 pruning: remove 30% of weights in a Conv2d layer by magnitude
prune.l1_unstructured(model.conv1, name="weight", amount=0.3)

# Check sparsity
sparsity = float(torch.sum(model.conv1.weight == 0)) / model.conv1.weight.numel()
print(f"Sparsity in conv1: {sparsity:.1%}")

# Make pruning permanent (remove the mask, keep zeroed weights)
prune.remove(model.conv1, "weight")

# Global unstructured pruning across all Conv2d layers
parameters_to_prune = [
    (module, "weight")
    for module in model.modules()
    if isinstance(module, torch.nn.Conv2d)
]
prune.global_unstructured(
    parameters_to_prune,
    pruning_method=prune.L1Unstructured,
    amount=0.4,  # remove 40% of weights globally
)

# After pruning: fine-tune for 1–3 epochs to recover accuracy
optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)
# ... standard training loop
```

## Praktische Ressourcen

- [TensorFlow — Pruning-Leitfaden](https://www.tensorflow.org/model_optimization/guide/pruning) — Keras-basiertes Magnitude-Pruning mit Fine-Tuning
- [PyTorch — Pruning-Tutorial](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html) — Unstrukturiertes und strukturiertes Pruning mit `torch.nn.utils.prune`
- [SparseGPT Paper](https://arxiv.org/abs/2301.00774) — One-Shot-Pruning für große Sprachmodelle ohne Neutraining
- [Wanda Paper](https://arxiv.org/abs/2306.11695) — Einfaches, kalibrierungsfreies LLM-Pruning mit Gewichts- und Aktivierungsmagnituden

## Siehe auch

- [Modellkomprimierung](/docs/model-compression)
- [Wissensdestillation](/docs/knowledge-distillation)
