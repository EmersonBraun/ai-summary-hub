---
title: Computer vision (CV)
description: Classification d'images, détection d'objets et segmentation.
keywords: [computer vision, image, video, CNN]
---

# Computer vision (CV)

## Définition

La vision par ordinateur permet aux machines d'interpréter les images et la vidéo: classification, detection, segmentation, tracking, and generative tasks. [CNNs](/docs/neural-networks/cnn) and vision [transformers](/docs/transformers) are core building blocks.

Il chevauche [multimodal](/docs/multimodal-ai) when combining vision and language (par ex. VLMs). Generative CV uses [diffusion](/docs/diffusion-models) or [GANs](/docs/gans). Most pipelines follow a backbone (feature extraction) plus task head; [transfer learning](/docs/transfer-learning) from ImageNet or similar is standard.

## Comment ça fonctionne

```mermaid
flowchart LR
  Image[Image] --> Backbone[Backbone]
  Backbone --> Features[Features]
  Features --> Head[Head]
  Head --> Output["Detection/Seg/Class"]
```

The **image** (or video frame) est alimenté dans un **backbone** (par ex. ResNet, ViT) qui produit **features** (spatial feature maps or patch tokens). A **head** (one or more layers) maps features to the **output**: classification (logits par classe), detection (boxes + classes), segmentation (mask per pixel), or generation (par ex. [diffusion](/docs/diffusion-models)). Backbones are usually pré-entraîné sur large datasets (par ex. ImageNet) then fine-tuned with the head on the target task. Data augmentation, normalization, and loss conception (par ex. focal loss, mask head) are task-specific.

## Cas d'utilisation

Computer vision is used wherever you need to interpret or generate images and video (detection, segmentation, recognition).

- Object detection, instance segmentation, and tracking
- Image classification and recognition (par ex. medical, satellite)
- Video understanding and action recognition

## Documentation externe

- [CS231n – CNNs for Visual Recognition](https://cs231n.github.io/)
- [PyTorch – Vision tutorials](https://pytorch.org/vision/stable/index.html)

## Voir aussi

- [CNN](/docs/neural-networks/cnn)
- [Multimodal AI](/docs/multimodal-ai)
- [Diffusion models](/docs/diffusion-models)
