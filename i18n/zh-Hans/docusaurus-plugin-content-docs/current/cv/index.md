---
title: Computer vision (CV)
description: 图像分类、目标检测和分割。
keywords: [computer vision, image, video, CNN]
---

# Computer vision (CV)

## 定义

计算机视觉使机器能够解释图像和视频: classification, detection, segmentation, tracking, and generative tasks. [CNNs](/docs/neural-networks/cnn) and vision [transformers](/docs/transformers) are core building blocks.

它与…重叠 [multimodal](/docs/multimodal-ai) when combining vision and language (例如 VLMs). Generative CV uses [diffusion](/docs/diffusion-models) or [GANs](/docs/gans). Most pipelines follow a backbone (feature extraction) plus task head; [transfer learning](/docs/transfer-learning) from ImageNet or similar is standard.

## 工作原理

```mermaid
flowchart LR
  Image[Image] --> Backbone[Backbone]
  Backbone --> Features[Features]
  Features --> Head[Head]
  Head --> Output["Detection/Seg/Class"]
```

The **image** (or video frame) 被输入到一个 **backbone** (例如 ResNet, ViT) 输出 **features** (spatial feature maps or patch tokens). A **head** (one or more layers) maps features to the **output**: classification (logits 每类), detection (boxes + classes), segmentation (mask per pixel), or generation (例如 [diffusion](/docs/diffusion-models)). Backbones are usually 预训练于 large datasets (例如 ImageNet) then fine-tuned with the head on the target task. Data augmentation, normalization, and loss 设计 (例如 focal loss, mask head) are task-specific.

## 应用场景

Computer vision is used wherever you need to interpret or generate images and video (detection, segmentation, recognition).

- Object detection, instance segmentation, and tracking
- Image classification and recognition (例如 medical, satellite)
- Video understanding and action recognition

## 外部文档

- [CS231n – CNNs for Visual Recognition](https://cs231n.github.io/)
- [PyTorch – Vision tutorials](https://pytorch.org/vision/stable/index.html)

## 另请参阅

- [CNN](/docs/neural-networks/cnn)
- [Multimodal AI](/docs/multimodal-ai)
- [Diffusion models](/docs/diffusion-models)
