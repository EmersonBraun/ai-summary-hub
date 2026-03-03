---
title: Redes neuronales convolucionales (CNN)
description: CNNs para datos espaciales e imágenes.
keywords: [CNN, convolución, visión por computadora]
---

# Redes neuronales convolucionales (CNN)

## Definición

Las CNN usan capas convolucionales para capturar patrones locales (bordes, texturas) y construir características jerárquicas. Son el backbone estándar para clasificación, detección y segmentación de imágenes.

A diferencia de las [redes neuronales](/docs/neural-networks) densas, las convoluciones comparten pesos en el espacio, por lo que son equivariantes a la traslación y eficientes para imágenes y otros datos de tipo rejilla. Forman el backbone de la mayoría de los sistemas de [visión por computadora](/docs/cv) y también se usan en [transformers](/docs/transformers) para embedding de parches.

## Cómo funciona

```mermaid
flowchart LR
  Image[Imagen] --> Conv[Conv]
  Conv --> Pool[Pool]
  Pool --> Conv2[Conv]
  Conv2 --> Class[Clase]
```

La **imagen** (o mapa de características) se alimenta a capas **convolucionales**: cada filtro se desliza sobre la entrada y calcula productos punto, produciendo mapas de activación que resaltan patrones locales (bordes, texturas). El **pooling** (p. ej., max pooling) reduce espacialmente el tamaño, añadiendo ligera invarianza. Las capas **conv** más profundas ven campos receptivos más grandes y capturan características más abstractas (partes, objetos). La cabeza final de **clase** (o detección/segmentación) suele ser una o más capas densas sobre las características aplanadas o con pooling. El entrenamiento usa la misma retropropagación y descenso de gradiente que otros modelos de [aprendizaje profundo](/docs/fundamentals/deep-learning).

## Casos de uso

Las CNN son el estándar para cualquier tarea donde la estructura espacial (imágenes, video o señales 2D/3D) importa.

- Clasificación de imágenes (p. ej., reconocimiento de objetos, análisis de imágenes médicas)
- Detección de objetos y segmentación de instancias
- Análisis de video y reconocimiento de acciones

## Documentación externa

- [CS231n – CNNs para reconocimiento visual](https://cs231n.github.io/convolutional-networks/)
- [PyTorch – Redes neuronales convolucionales](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets)

## Ver también

- [Visión por computadora](/docs/cv)
- [Redes neuronales](/docs/neural-networks)
