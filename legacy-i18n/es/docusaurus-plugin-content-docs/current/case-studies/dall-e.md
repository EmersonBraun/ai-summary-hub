---
title: Case study — DALL·E
description: Generación de imágenes a partir de texto con difusión y lenguaje.
keywords: [DALL-E, text-to-image, diffusion]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: DALL·E

## Definición

DALL·E (y DALL·E 2) son modelos de texto a imagen de OpenAI. Generan imágenes a partir de prompts de texto usando [modelos de difusión](/docs/diffusion-models) y alineamiento lenguaje-imagen.

Son un ejemplo destacado de generación [multimodal](/docs/multimodal-ai): texto de entrada, imagen de salida. Las mismas ideas de [difusión](/docs/diffusion-models) y condicionamiento aparecen en Stable Diffusion y otros modelos abiertos. Caso de uso: imágenes creativas y de producto a partir del lenguaje natural; se aplican políticas de seguridad y contenido.

## Cómo funciona

El **texto** se codifica con un codificador de lenguaje o [multimodal](/docs/multimodal-ai) (p. ej., codificador de texto CLIP, T5) en un **embedding de texto**. Un modelo de **difusión** (p. ej., UNet) se **condiciona** sobre este embedding: el proceso de eliminación de ruido se guía para que la imagen generada coincida con el texto. El entrenamiento utiliza grandes conjuntos de datos de imágenes con leyendas; el modelo aprende a asociar contenido de texto e imagen. **Muestreo**: comenzar desde ruido, ejecutar el proceso de difusión inversa con el embedding de texto como condición y decodificar a una imagen. **Filtros de seguridad** (p. ej., clasificador, política) limitan las salidas dañinas o restringidas antes de la entrega. Las variantes (inpainting, edición) se condicionan tanto sobre texto como sobre una imagen o máscara existente.

## Casos de uso

Los modelos de texto a imagen como DALL·E se utilizan donde se necesitan imágenes generadas o editadas a partir del lenguaje natural (creatividad, producto, UI).

- Generación de activos creativos y de marketing a partir de prompts de texto
- Arte conceptual, ilustración y exploración de diseño
- Maquetas de productos e interfaces a partir de descripciones en lenguaje natural

## Documentación externa

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Ver también

- [Modelos de difusión](/docs/diffusion-models)
- [IA multimodal](/docs/multimodal-ai)
