---
title: Case study — Claude
description: LLM de Anthropic que sigue instrucciones con contexto largo y seguridad.
keywords: [Claude, Anthropic, constitutional AI, long context]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Claude

## Definición

Claude es la familia de [LLMs](/docs/llms) conversacionales de Anthropic. Los modelos están diseñados para el seguimiento de instrucciones, contexto largo y seguridad, utilizando técnicas como la IA constitucional y el alineamiento al estilo RLHF.

Comparten el mismo stack amplio que [ChatGPT](/docs/case-studies/chatgpt): base preentrenada, ajuste de instrucciones y alineamiento basado en preferencias. Claude hace hincapié en ventanas de contexto largo, comportamiento amigable con la [ingeniería de prompts](/docs/prompt-engineering) y restricciones de seguridad. Caso de uso: chat, análisis de documentos largos, programación y flujos de trabajo de estilo [agente](/docs/agents) a través de la API y productos como [Claude Code](/docs/tools/claude-code).

## Cómo funciona

Un **modelo base** ([transformer](/docs/transformers) solo decodificador) se preentrena en grandes corpus de texto. El **ajuste de instrucciones** entrena el modelo con pares (instrucción, respuesta). La **IA constitucional** y el **RLHF** (modelo de recompensa + optimización de política) dan forma a la utilidad, honestidad y rechazos. El resultado es un modelo con soporte de contexto largo (p. ej., más de 100 000 tokens), adecuado para documentos y conversaciones extendidas. La **seguridad y las salvaguardas** (política de contenido, rechazos) se aplican en el producto. [RAG](/docs/rag) y herramientas amplían Claude para aplicaciones específicas.

## Casos de uso

Claude es adecuado para aplicaciones que necesitan contexto largo, seguimiento cuidadoso de instrucciones y valores predeterminados de seguridad sólidos.

- Preguntas y respuestas, resumen y análisis de documentos largos
- Asistencia de programación y generación de código con contexto de base de código grande
- Chat y automatización de tareas con comportamiento explícito de seguridad y rechazo

## Documentación externa

- [Anthropic – Claude](https://www.anthropic.com/product) — Modelos y producto
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API y guías

## Ver también

- [LLMs](/docs/llms)
- [Ingeniería de prompts](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
