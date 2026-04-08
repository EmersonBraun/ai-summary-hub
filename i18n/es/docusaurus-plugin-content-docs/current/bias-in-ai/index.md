---
title: Sesgo en la IA
description: Fuentes y mitigación del sesgo en sistemas de ML.
keywords: [sesgo, equidad, discriminación]
tags: [intermediate]
authors: [EmersonBraun]
---

# Sesgo en la IA

## Definición

El sesgo en IA se refiere a errores sistemáticos o resultados injustos (como entre grupos demográficos) que surgen de los datos, el diseño del modelo o el despliegue. La mitigación incluye auditorías de datos, métricas de equidad y métodos de eliminación de sesgo.

Es una preocupación central en la [ética de la IA](/docs/ai-ethics) y la [seguridad de la IA](/docs/ai-safety). Las [métricas de evaluación](/docs/evaluation-metrics) de equidad (como paridad demográfica, probabilidades ecualizadas) se usan en auditorías y antes de desplegar en dominios regulados. La [IA explicable](/docs/xai) puede ayudar a identificar cuándo y por qué aparece el sesgo.

## Cómo funciona

El sesgo puede **entrar** a través de datos de entrenamiento sesgados (subrepresentación, sesgo en etiquetas), variables proxy (como código postal para etnia) o bucles de retroalimentación (las salidas del modelo influyen en los datos futuros). La **detección** usa métricas de equidad (como paridad demográfica, probabilidades ecualizadas, calibración por grupo) en conjuntos de [evaluación](/docs/evaluation-metrics) estratificados por atributos protegidos. La **mitigación** incluye: datos (reponderación, remuestreo, recopilación de datos más representativos); entrenamiento (restricciones de equidad, eliminación de sesgo adversarial); y posprocesamiento (umbrales o reglas por grupo). Existen compensaciones entre las métricas de equidad y la exactitud; las normas legales y del dominio definen qué métricas y umbrales usar. Las auditorías deben realizarse antes del despliegue y monitorizarse en producción.

## Casos de uso

El trabajo sobre sesgo aplica cuando las decisiones del modelo afectan a las personas en dominios regulados o sensibles (contratación, préstamos, puntuación, contenido).

- Auditar sistemas de contratación, préstamos o puntuación en busca de impacto discriminatorio
- Verificaciones de equidad antes de desplegar modelos en dominios regulados
- Explicabilidad y remediación cuando se detecta sesgo

## Recursos prácticos

- [Google – IA Responsable – Equidad](https://ai.google.dev/responsible-ai)
- [Fairness and Machine Learning (Barocas et al.)](https://fairmlbook.org/) — Libro gratuito

## Ver también

- [Ética de la IA](/docs/ai-ethics)
- [Seguridad de la IA](/docs/ai-safety)
- [Métricas de evaluación](/docs/evaluation-metrics)
