---
title: Computer vision (CV)
description: AI for images and video.
keywords: [computer vision, image, video, CNN]
---

# Computer vision (CV)

## Definition

Computer vision enables machines to interpret images and video: classification, detection, segmentation, tracking, and generative tasks. [CNNs](/docs/neural-networks/cnn) and vision [transformers](/docs/transformers) are core building blocks.

It overlaps with [multimodal](/docs/multimodal-ai) when combining vision and language (e.g. VLMs). Generative CV uses [diffusion](/docs/diffusion-models) or [GANs](/docs/gans). Most pipelines follow a backbone (feature extraction) plus task head; [transfer learning](/docs/transfer-learning) from ImageNet or similar is standard.

## How it works

```mermaid
flowchart LR
  Image[Image] --> Backbone[Backbone]
  Backbone --> Features[Features]
  Features --> Head[Head]
  Head --> Output["Detection/Seg/Class"]
```

The **image** (or video frame) is fed into a **backbone** (e.g. ResNet, ViT) that outputs **features** (spatial feature maps or patch tokens). A **head** (one or more layers) maps features to the **output**: classification (logits per class), detection (boxes + classes), segmentation (mask per pixel), or generation (e.g. [diffusion](/docs/diffusion-models)). Backbones are usually pretrained on large datasets (e.g. ImageNet) then fine-tuned with the head on the target task. Data augmentation, normalization, and loss design (e.g. focal loss, mask head) are task-specific.

## Use cases

Computer vision is used wherever you need to interpret or generate images and video (detection, segmentation, recognition).

- Object detection, instance segmentation, and tracking
- Image classification and recognition (e.g. medical, satellite)
- Video understanding and action recognition

## External documentation

- [CS231n – CNNs for Visual Recognition](https://cs231n.github.io/)
- [PyTorch – Vision tutorials](https://pytorch.org/vision/stable/index.html)

## See also

- [CNN](/docs/neural-networks/cnn)
- [Multimodal AI](/docs/multimodal-ai)
- [Diffusion models](/docs/diffusion-models)
