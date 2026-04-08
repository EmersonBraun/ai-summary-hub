---
title: Case study — DeepSeek
description: LLMs de pesos abiertos de DeepSeek AI con razonamiento y código sólidos; MoE y escalado eficiente.
keywords: [DeepSeek, open weights, razonamiento, code, MoE]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: DeepSeek

## Definición

DeepSeek es una familia de [LLMs](/docs/llms) de DeepSeek AI. Los modelos son conocidos por su sólido rendimiento en razonamiento y código, publicados como **pesos abiertos** para que puedan ejecutarse [localmente](/docs/local-inference) o ajustarse finamente. Las variantes incluyen arquitecturas densas y de mezcla de expertos (MoE) para diferentes equilibrios de escala y costo.

Ilustran el mismo stack central (preentrenamiento, ajuste de instrucciones, alineamiento) que [ChatGPT](/docs/case-studies/chatgpt) y [Claude](/docs/case-studies/claude), con énfasis en la publicación abierta y la eficiencia. Caso de uso: chat, generación de código, tareas de razonamiento y [RAG](/docs/rag) o [agentes](/docs/agents) cuando el autoalojamiento o el control de costos importan.

## Cómo funciona

Los **modelos base** se preentrenan en grandes corpus de texto y código; el **ajuste de instrucciones** y la **optimización de preferencias** (p. ej., DPO) los alinean para chat y uso de herramientas. Las variantes **MoE** activan un subconjunto de parámetros por token para escalar la capacidad sin aumentar el cómputo de forma proporcional. Los pesos se publican en formatos estándar (p. ej., SafeTensors); los equipos los ejecutan con [cuantización](/docs/quantization) en GPUs de consumo o los despliegan mediante tiempos de ejecución de [inferencia local](/docs/local-inference) (vLLM, Ollama, etc.). La [ingeniería de prompts](/docs/prompt-engineering) y el [ajuste fino](/docs/llms/fine-tuning) amplían el uso para dominios específicos.

## Casos de uso

DeepSeek es adecuado cuando se desea una sólida capacidad de razonamiento y código con pesos abiertos y despliegue local o rentable.

- Generación de código y flujos de trabajo asistidos por código (IDE, agentes)
- Razonamiento y matemáticas con modelos abiertos y autoalojables
- Ajuste fino e [inferencia local](/docs/local-inference) para privacidad o costo

## Documentación externa

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Pesos y tarjetas

## Ver también

- [LLMs](/docs/llms)
- [Inferencia local](/docs/local-inference)
- [Ajuste fino](/docs/llms/fine-tuning)
