---
title: Réseaux de neurones convolutifs (CNN)
description: CNN pour les données spatiales et images.
keywords: [CNN, convolution, vision par ordinateur]
tags: [intermediate]
authors: [EmersonBraun]
---

# Réseaux de neurones convolutifs (CNN)

## Définition

Les CNN utilisent des couches convolutives pour capturer des motifs locaux (bords, textures) et construire des caractéristiques hiérarchiques. Ils constituent la colonne vertébrale standard pour la classification d'images, la détection et la segmentation.

Contrairement aux [réseaux de neurones](/docs/neural-networks) denses, les convolutions partagent les poids dans l'espace, donc elles sont équivariantes à la translation et efficaces pour les images et autres données en grille. Ils forment la colonne vertébrale de la plupart des systèmes de [vision par ordinateur](/docs/cv) et sont également utilisés dans les [transformers](/docs/transformers) pour l'intégration de patches.

L'idée clé derrière les CNN est le **partage des poids** : le même filtre est appliqué à chaque emplacement spatial, réduisant considérablement le nombre de paramètres par rapport aux couches entièrement connectées tout en capturant la structure locale. Les couches précoces apprennent des caractéristiques de bas niveau (bords, taches de couleur) ; les couches plus profondes combinent celles-ci en motifs de niveau progressivement plus élevé (textures, parties d'objets, objets entiers). Cet apprentissage hiérarchique des caractéristiques, combiné au pooling pour le sous-échantillonnage spatial, rend les CNN extrêmement efficaces pour toute donnée où les valeurs voisines partagent une signification sémantique — images, vidéo, spectrogrammes audio et plus.

## Fonctionnement

```mermaid
flowchart LR
  Image[Image d'entrée] -->|glisser des filtres| Conv1[Conv + ReLU]
  Conv1 -->|sous-échantillonner| Pool1[Max pool]
  Pool1 -->|filtres plus profonds| Conv2[Conv + ReLU]
  Conv2 -->|sous-échantillonner| Pool2[Max pool]
  Pool2 -->|aplatir| FC[Entièrement connecté]
  FC -->|softmax| Class[Scores de classe]
```

### Couches convolutives

L'**image** (ou carte de caractéristiques) est alimentée dans des couches **convolutives** : chaque filtre (noyau) glisse sur l'entrée et calcule un produit scalaire, produisant des cartes d'activation qui mettent en évidence les motifs locaux. Plusieurs filtres apprennent différents motifs en parallèle. Une non-linéarité (ReLU) suit chaque convolution.

### Pooling

Le **pooling** (par ex. max pooling) sous-échantillonne spatialement, réduisant la taille et ajoutant une légère invariance à la translation. Les convolutions avec stride sont une alternative moderne qui réalise un sous-échantillonnage similaire tout en conservant plus d'informations.

### Tête de classification

Les couches **conv** plus profondes voient des champs réceptifs plus grands et capturent des caractéristiques plus abstraites (parties, objets). La tête finale de **classe** (ou détection/segmentation) est généralement une ou plusieurs couches denses appliquées aux caractéristiques aplaties ou globalement mises en commun. L'entraînement utilise la rétropropagation et la descente de gradient comme dans d'autres modèles d'[apprentissage profond](/docs/fundamentals/deep-learning).

## Quand utiliser / Quand NE PAS utiliser

| Scénario | Utiliser CNN ? | Notes |
|---|---|---|
| Classification / reconnaissance d'images | Oui | Les CNN sont la norme éprouvée |
| Détection et segmentation d'objets | Oui | Les colonnes vertébrales comme ResNet alimentent YOLO, Mask R-CNN |
| Compréhension vidéo | Oui | Les convolutions 3D s'étendent à la dimension temporelle |
| Séquences de texte de longueur variable | Non | Les Transformers gèrent mieux cela |
| Dépendances à longue portée dans les séquences | Non | Les mécanismes d'attention sont plus efficaces |
| Données de nuage de points ou de graphes | Avec précaution | Des variantes spécialisées graphes/3D sont nécessaires |

## Comparaisons

| Aspect | CNN | RNN | Transformer |
|---|---|---|---|
| Cas d'usage principal | Images, grilles | Séquences | Texte, multimodal |
| Gère les dépendances à longue portée | Mal (champ réceptif limité) | Modérément (avec LSTM/GRU) | Bien (attention globale) |
| Entraînement parallélisable | Oui | Non (séquentiel) | Oui |
| Invariance spatiale | Élevée (partage des poids) | N/A | Apprise (encodage positionnel) |
| Coût computationnel (inférence) | Faible à modéré | Modéré | Élevé avec contexte long |

## Avantages et inconvénients

| Avantages | Inconvénients |
|---|---|
| Efficacité des paramètres via le partage des poids | Limité aux données structurées en grille |
| Équivariance à la translation intégrée | Un grand champ réceptif nécessite de nombreuses couches |
| Écosystème très mature (ResNet, EfficientNet) | Moins efficace pour les tâches séquentielles/textuelles |
| Inférence rapide, facile à quantifier | Nécessite de grands ensembles de données étiquetées |

## Exemples de code

```python
# CNN for image classification with PyTorch (CIFAR-10 style)
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# Data
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
])
train_data = datasets.CIFAR10('.', train=True, download=True, transform=transform)
train_loader = DataLoader(train_data, batch_size=64, shuffle=True)

# Model
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

# One training epoch
model.train()
for X, y in train_loader:
    X, y = X.to(device), y.to(device)
    opt.zero_grad()
    loss_fn(model(X), y).backward()
    opt.step()

print("Training step complete.")
```

## Ressources pratiques

- [CS231n – CNN pour la reconnaissance visuelle](https://cs231n.github.io/convolutional-networks/) — Notes de cours Stanford avec explications visuelles claires
- [PyTorch – Réseaux de neurones convolutifs](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets) — Tutoriel officiel pratique
- [Papers With Code – Classification d'images](https://paperswithcode.com/task/image-classification) — Classements de référence et code reproductible

## Voir aussi

- [Vision par ordinateur](/docs/cv)
- [Réseaux de neurones](/docs/neural-networks)
- [RNN](/docs/neural-networks/rnn)
