---
title: Modelos de difusión
description: Modelos generativos que generan mediante eliminación gradual de ruido.
keywords: [difusión, eliminación de ruido, DALL-E, Stable Diffusion]
tags: [advanced]
authors: [EmersonBraun]
---

# Modelos de difusión

## Definición

Los modelos de difusión generan datos aprendiendo a invertir un proceso gradual de adición de ruido. Se han convertido en el enfoque dominante para la generación de imágenes (como DALL·E 2, Stable Diffusion).

A diferencia de las [GANs](/docs/gans), el entrenamiento es estable (sin juego min-max); a diferencia de los [VAEs](/docs/vaes), las muestras son nítidas y diversas. El costo son muchos pasos de eliminación de ruido en la inferencia (aunque la destilación y los programadores de menos pasos reducen esto). Se usa para texto a imagen, inpainting y video.

## Cómo funciona

**Proceso hacia adelante:** A partir de datos **x0** y añadiendo ruido Gaussiano a lo largo de T pasos para obtener **x1**, ..., **xT** (aproximadamente ruido puro). **Proceso inverso:** Aprender una red que predice el ruido (o x0) en cada paso para poder ir de **xT** a **x0** mediante la eliminación iterativa de ruido. Entrenamiento: tomar una muestra real, agregar ruido a un paso aleatorio t, entrenar la red para predecir el ruido añadido. **Muestreo:** Comenzar desde **xT** aleatorio, ejecutar el proceso inverso aprendido paso a paso para obtener **x0**. El diagrama resume el proceso hacia adelante (datos → ruido) e inverso (ruido → datos).

## Casos de uso

Los modelos de difusión son la opción preferida para la generación y edición de imágenes, audio y video de alta calidad a partir de ruido.

- Generación de imágenes (como DALL·E 2, Stable Diffusion, Midjourney)
- Edición de imágenes, inpainting y superresolución
- Generación de audio y video

## Recursos prácticos

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Modelos de difusión](https://huggingface.co/docs/diffusers/)

## Ver también

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Estudio de caso: DALL-E](/docs/case-studies/dall-e)
