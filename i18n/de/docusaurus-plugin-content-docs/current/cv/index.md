---
title: Computer vision (CV)
description: Bildklassifikation, Objekterkennung und Segmentierung.
keywords: [computer vision, image, video, CNN]
---

# Computer vision (CV)

## Definition

Computer Vision ermöglicht Maschinen, Bilder und Video zu interpretieren: classification, detection, segmentation, tracking, and generative tasks. [CNNs](/docs/neural-networks/cnn) and vision [transformers](/docs/transformers) are core building blocks.

Es überschneidet sich mit [multimodal](/docs/multimodal-ai) when combining vision und Sprache (z. B. VLMs). Generative CV uses [diffusion](/docs/diffusion-models) or [GANs](/docs/gans). Most pipelines follow a backbone (feature extraction) plus task head; [transfer learning](/docs/transfer-learning) from ImageNet or similar is standard.

## Funktionsweise

```mermaid
flowchart LR
  Image[Image] --> Backbone[Backbone]
  Backbone --> Features[Features]
  Features --> Head[Head]
  Head --> Output["Detection/Seg/Class"]
```

The **image** (or video frame) wird in ein **backbone** (z. B. ResNet, ViT) das ausgibt **features** (räumliche Feature-Maps oder Patch-Token). A **head** (one or more layers) maps features to the **output**: classification (logits pro Klasse), detection (boxes + classes), segmentation (mask per pixel), or generation (z. B. [diffusion](/docs/diffusion-models)). Backbones are usually vortrainiert auf large datasets (z. B. ImageNet) then feinabgestimmt mit dem head auf dem target task. Data augmentation, normalization, and loss Entwurf (z. B. focal loss, mask head) are task-specific.

## Anwendungsfälle

Computer vision wird überall verwendet, wo you need to interpret or generate images and video (detection, segmentation, recognition).

- Object detection, instance segmentation, and tracking
- Image classification and recognition (z. B. medical, satellite)
- Video understanding and action recognition

## Externe Dokumentation

- [CS231n – CNNs for Visual Recognition](https://cs231n.github.io/)
- [PyTorch – Vision tutorials](https://pytorch.org/vision/stable/index.html)

## Siehe auch

- [CNN](/docs/neural-networks/cnn)
- [Multimodal AI](/docs/multimodal-ai)
- [Diffusion models](/docs/diffusion-models)
