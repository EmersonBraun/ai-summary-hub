---
title: Computer vision (CV)
description: Clasificación de imágenes, detección de objetos y segmentación.
keywords: [computer vision, image, video, CNN]
---

# Computer vision (CV)

## Definición

La visión por computadora permite a las máquinas interpretar imágenes y video: classification, detection, segmentation, tracking, and generative tasks. [CNNs](/docs/neural-networks/cnn) and vision [transformers](/docs/transformers) are core building blocks.

Se superpone con [multimodal](/docs/multimodal-ai) when combining vision y lenguaje (por ej. VLMs). Generative CV uses [diffusion](/docs/diffusion-models) or [GANs](/docs/gans). Most pipelines follow a backbone (feature extraction) plus task head; [transfer learning](/docs/transfer-learning) from ImageNet or similar is standard.

## Cómo funciona

```mermaid
flowchart LR
  Image[Image] --> Backbone[Backbone]
  Backbone --> Features[Features]
  Features --> Head[Head]
  Head --> Output["Detection/Seg/Class"]
```

The **image** (or video frame) se alimenta en un **backbone** (por ej. ResNet, ViT) que produce **features** (spatial feature maps or patch tokens). A **head** (one or more layers) maps features to the **output**: classification (logits por clase), detection (boxes + classes), segmentation (mask per pixel), or generation (por ej. [diffusion](/docs/diffusion-models)). Backbones are usually preentrenado en large datasets (por ej. ImageNet) then fine-tuned with the head on the target task. Data augmentation, normalization, and loss diseño (por ej. focal loss, mask head) are task-specific.

## Casos de uso

Computer vision se usa en cualquier lugar donde you need to interpret or generate images and video (detection, segmentation, recognition).

- Object detection, instance segmentation, and tracking
- Image classification and recognition (por ej. medical, satellite)
- Video understanding and action recognition

## Documentación externa

- [CS231n – CNNs for Visual Recognition](https://cs231n.github.io/)
- [PyTorch – Vision tutorials](https://pytorch.org/vision/stable/index.html)

## Ver también

- [CNN](/docs/neural-networks/cnn)
- [Multimodal AI](/docs/multimodal-ai)
- [Diffusion models](/docs/diffusion-models)
