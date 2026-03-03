---
title: Redes neuronales
description: Introducción a las redes neuronales artificiales y sus componentes.
keywords: [redes neuronales, RNA, capas, activación]
---

# Redes neuronales

## Definición

Las redes neuronales son aproximadores de funciones construidos a partir de capas de unidades (neuronas) con pesos aprendibles y activaciones no lineales. Pueden aproximar mapeos complejos de entradas a salidas cuando se entrenan con datos.

Son los bloques de construcción del [aprendizaje profundo](/docs/fundamentals/deep-learning). Variantes como las [CNN](/docs/neural-networks/cnn) y las [RNN](/docs/neural-networks/rnn) añaden sesgos inductivos (p. ej., localidad, recurrencia) para tipos de datos específicos; el mismo mecanismo de entrenamiento (retropropagación, descenso de gradiente) aplica.

## Cómo funciona

```mermaid
flowchart LR
  Input[Entrada] --> Layer1[Capa1]
  Layer1 --> Layer2[Capa2]
  Layer2 --> Output[Salida]
```

La **entrada** se pasa a la primera capa. Cada **capa** calcula una combinación lineal de sus entradas (pesos) y luego una activación no lineal (p. ej., ReLU, sigmoide). La salida de una capa se convierte en la entrada de la siguiente; apilar capas permite a la red aprender características jerárquicas. La capa de **salida** final mapea típicamente a predicciones (p. ej., puntuaciones de clase o un escalar). El entrenamiento minimiza una pérdida mediante **retropropagación** (cálculo de gradientes por la regla de la cadena) y **descenso de gradiente** (actualización de pesos). La profundidad y anchura determinan la capacidad; la regularización y el tamaño de datos controlan el sobreajuste.

## Casos de uso

Las redes neuronales se utilizan en cualquier lugar donde se necesite aproximación de funciones flexible y basada en datos.

- Regresión y clasificación (p. ej., predicción de ventas, etiquetado de imágenes)
- Aprendizaje de características para tareas posteriores (embeddings, transfer learning)
- Aproximación de funciones no lineales complejas en control o simulación

## Documentación externa

- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com/) — Libro online gratuito
- [3Blue1Brown – Redes neuronales](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) — Introducción visual

## Ver también

- [CNN](/docs/neural-networks/cnn)
- [RNN](/docs/neural-networks/rnn)
- [Aprendizaje profundo](/docs/fundamentals/deep-learning)
