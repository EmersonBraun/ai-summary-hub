---
title: Compresión de modelos
description: Reducción del tamaño del modelo y el cómputo para el despliegue.
keywords: [compresión de modelos, poda, cuantización, destilación]
tags: [advanced]
authors: [EmersonBraun]
---

# Compresión de modelos

## Definición

La compresión de modelos reduce el tamaño, la latencia o la memoria de los modelos para que puedan ejecutarse en el borde o con cómputo limitado. Los métodos incluyen [poda](/docs/pruning), [cuantización](/docs/quantization) y [destilación de conocimiento](/docs/knowledge-distillation).

Úselo cuando el modelo completo es demasiado grande para el despliegue (como [LLMs](/docs/llms) en el borde, servicio en tiempo real). Equilibre la precisión frente al tamaño/latencia; a menudo se combinan varios métodos. Ver [infraestructura](/docs/infrastructure) sobre cómo se sirven los modelos comprimidos a escala.

## Cómo funciona

```mermaid
flowchart LR
  LargeModel[Modelo grande] --> Compress["Podar/Cuantizar/Destilar"]
  Compress --> SmallModel[Modelo pequeño]
```

Se comienza desde un **modelo grande** y se aplican uno o más pasos de **compresión**. La **poda** elimina pesos o estructuras de baja importancia (no estructurado o por canal). La **cuantización** almacena los pesos (y opcionalmente las activaciones) en menor precisión (como INT8). La **destilación** entrena un **modelo pequeño** (estudiante) más pequeño para imitar al grande (maestro) mediante etiquetas blandas o representaciones. El resultado es un modelo más pequeño y rápido; la precisión se valida en un conjunto de desarrollo. Los métodos a menudo se combinan (como podar luego cuantizar, o destilar luego cuantizar) y pueden requerir ajuste fino para recuperar la precisión.

## Casos de uso

La compresión de modelos se usa cuando se necesitan modelos más pequeños o rápidos para el borde, móvil o producción sensible a los costos.

- Desplegar modelos grandes en el borde o móvil con memoria limitada
- Reducir la latencia de inferencia y el costo en producción
- Combinar poda, cuantización y destilación para la máxima compresión

## Recursos prácticos

- [PyTorch – Cuantización](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Optimización de modelos](https://www.tensorflow.org/model_optimization)

## Ver también

- [Cuantización](/docs/quantization)
- [Poda](/docs/pruning)
- [Destilación de conocimiento](/docs/knowledge-distillation)
