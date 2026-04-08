---
title: Visión por computadora (CV)
description: Clasificación de imágenes, detección de objetos y segmentación.
keywords: [visión por computadora, imagen, video, CNN]
tags: [intermediate]
authors: [EmersonBraun]
---

# Visión por computadora (CV)

## Definición

La visión por computadora permite a las máquinas interpretar imágenes y video: clasificación, detección, segmentación, seguimiento y tareas generativas. Las [CNNs](/docs/neural-networks/cnn) y los [transformers](/docs/transformers) de visión son los bloques constructivos centrales.

Se superpone con [multimodal](/docs/multimodal-ai) al combinar visión y lenguaje (como los VLMs). La CV generativa usa [difusión](/docs/diffusion-models) o [GANs](/docs/gans). La mayoría de los pipelines siguen un backbone (extracción de características) más una cabeza de tarea; el [aprendizaje por transferencia](/docs/transfer-learning) desde ImageNet o similar es el estándar.

## Cómo funciona

```mermaid
flowchart LR
  Image[Imagen] --> Backbone[Backbone]
  Backbone --> Features[Características]
  Features --> Head[Cabeza]
  Head --> Output["Detección/Seg/Clase"]
```

La **imagen** (o fotograma de video) se alimenta en un **backbone** (como ResNet, ViT) que produce **características** (mapas de características espaciales o tokens de parches). Una **cabeza** (una o más capas) mapea las características a la **salida**: clasificación (logits por clase), detección (cajas + clases), segmentación (máscara por píxel) o generación (como [difusión](/docs/diffusion-models)). Los backbones generalmente se preentrenan en grandes conjuntos de datos (como ImageNet) y luego se ajustan con la cabeza en la tarea objetivo. El aumento de datos, la normalización y el diseño de la pérdida (como pérdida focal, cabeza de máscara) son específicos de la tarea.

## Casos de uso

La visión por computadora se usa en cualquier lugar donde se necesite interpretar o generar imágenes y video (detección, segmentación, reconocimiento).

- Detección de objetos, segmentación de instancias y seguimiento
- Clasificación y reconocimiento de imágenes (como médico, satelital)
- Comprensión de video y reconocimiento de acciones

## Recursos prácticos

- [CS231n – CNNs para reconocimiento visual](https://cs231n.github.io/)
- [PyTorch – Tutoriales de visión](https://pytorch.org/vision/stable/index.html)

## Ver también

- [CNN](/docs/neural-networks/cnn)
- [IA multimodal](/docs/multimodal-ai)
- [Modelos de difusión](/docs/diffusion-models)
