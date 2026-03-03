---
title: Aprendizaje profundo
description: Redes neuronales profundas y aprendizaje de representaciones.
keywords: [aprendizaje profundo, redes neuronales, aprendizaje de representaciones]
---

# Aprendizaje profundo

## Definición

El aprendizaje profundo utiliza redes neuronales con muchas capas para aprender representaciones jerárquicas a partir de datos. Ha impulsado avances en visión, lenguaje y otros dominios escalando datos y computación.

Extiende el [aprendizaje automático](/docs/fundamentals/machine-learning) mediante el uso de modelos diferenciables y en capas (ver [redes neuronales](/docs/neural-networks)) que aprenden características automáticamente en lugar de diseñarlas manualmente. La profundidad permite al modelo construir representaciones cada vez más abstractas (p. ej., bordes → texturas → partes → objetos en visión).

## Cómo funciona

```mermaid
flowchart LR
  Data[Datos] --> Layers[Capas]
  Layers --> Representation[Representación]
  Representation --> Output[Salida]
```

Los **datos** se alimentan en la primera **capa**; cada capa aplica una transformación lineal seguida de una no linealidad (p. ej., ReLU). Apilar capas produce una **representación** (embedding) que se vuelve más abstracta en capas más profundas. La capa final mapea a la **salida** (p. ej., puntuaciones de clase o tokens). El entrenamiento usa **retropropagación** para calcular gradientes y **descenso de gradiente** para actualizar pesos. Las arquitecturas (CNNs para imágenes, RNNs para secuencias, [Transformers](/docs/transformers) para ambos) adaptan la conectividad y operaciones a los datos y la tarea.

## Casos de uso

El aprendizaje profundo es el estándar para percepción y generación cuando los datos son abundantes y las tareas complejas.

- Reconocimiento de imágenes, detección de objetos y segmentación (visión)
- Reconocimiento de voz, traducción automática y generación de texto (lenguaje)
- Juegos, control robótico y simulación (aprendizaje por refuerzo)

## Documentación externa

- [Deep Learning (Goodfellow et al.)](https://www.deeplearningbook.org/) — Libro online gratuito
- [PyTorch – Introducción](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — Aprendizaje profundo práctico

## Ver también

- [Redes neuronales](/docs/neural-networks)
- [Transformers](/docs/transformers)
- [Frameworks (PyTorch, TensorFlow)](/docs/frameworks/pytorch)
