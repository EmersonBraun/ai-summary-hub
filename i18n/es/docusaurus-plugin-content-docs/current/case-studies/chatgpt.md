---
title: Case study — ChatGPT
description: Cómo funcionan ChatGPT y los LLMs conversacionales.
keywords: [ChatGPT, OpenAI, conversational AI]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: ChatGPT

## Definición

ChatGPT es una familia de [LLMs](/docs/llms) conversacionales de OpenAI. Se entrenan con [ajuste fino](/docs/llms/fine-tuning) supervisado y aprendizaje por refuerzo a partir de retroalimentación humana (RLHF) para seguir instrucciones y conversar de forma segura.

Ilustran el stack completo de [LLM](/docs/llms): modelo base preentrenado, ajuste de instrucciones y alineamiento basado en [RL](/docs/rl) (RLHF). Las mismas ideas (ajuste de instrucciones, optimización de preferencias) aparecen en modelos abiertos y otros propietarios. Caso de uso: chat, tareas impulsadas por [prompts](/docs/prompt-engineering) y flujos de trabajo similares a [agentes](/docs/agents) con herramientas.

## Cómo funciona

Se parte de un **modelo base** (p. ej., GPT-4): un [transformer](/docs/transformers) [solo decodificador](/docs/transformers/gpt) preentrenado en predicción del siguiente token. **Ajuste de instrucciones**: se ajusta fino con pares (instrucción, respuesta) para que el modelo siga la intención del usuario. **RLHF**: se entrena un **modelo de recompensa** con datos de preferencia humana (cuál de dos respuestas es mejor); luego se optimiza la **política** (el LLM) con [aprendizaje por refuerzo](/docs/rl) (p. ej., PPO) para maximizar la recompensa. El resultado es un modelo que es útil, sigue instrucciones y es menos probable que produzca contenido dañino o fuera de la política. **Seguridad y salvaguardas** (filtros de contenido, rechazos, monitoreo) se aplican en el producto. [Ingeniería de prompts](/docs/prompt-engineering) y [RAG](/docs/rag) o [agentes](/docs/agents) amplían el sistema para casos de uso específicos.

## Casos de uso

Los sistemas de estilo ChatGPT son adecuados para chat, escritura, ayuda con código y automatización de tareas que se benefician del seguimiento de instrucciones y el uso de herramientas.

- Asistentes conversacionales y soporte al cliente
- Escritura, resumen y lluvia de ideas
- Ayuda con código, tutoría y automatización de tareas a través del chat

## Documentación externa

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF y ajuste de instrucciones

## Ver también

- [LLMs](/docs/llms)
- [Aprendizaje por refuerzo](/docs/rl)
- [Ingeniería de prompts](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — LLM conversacional comparable
- [Gemini](/docs/case-studies/gemini) — Familia de LLMs multimodales
