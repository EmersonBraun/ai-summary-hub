---
title: Case study — Qwen
description: Familia de LLMs de Alibaba; soporte multilingüe, de programación y de contexto largo.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: Qwen

## Definición

Qwen es la familia de [LLMs](/docs/llms) de Alibaba. Los modelos están diseñados para uso **multilingüe** (incluyendo chino e inglés), **programación** (Qwen-Coder) y **contexto largo**, y están disponibles como pesos abiertos y a través de API.

Al igual que [DeepSeek](/docs/case-studies/deepseek) y [Claude](/docs/case-studies/claude), Qwen utiliza preentrenamiento, ajuste de instrucciones y alineamiento; la diferenciación incluye variantes multilingües y de programación sólidas y soporte de contexto largo. Caso de uso: chat, asistencia de código, [RAG](/docs/rag) sobre documentos largos y [ajuste fino](/docs/llms/fine-tuning) para aplicaciones específicas de dominio.

## Cómo funciona

Los **modelos base** se preentrenan en grandes corpus multilingües y de código. El **ajuste de instrucciones** y el **alineamiento** (p. ej., DPO, estilo RLHF) producen variantes de chat y uso de herramientas. **Versiones especializadas**: Qwen-Coder para código, Qwen-VL para visión-lenguaje. El **contexto largo** se admite mediante ventanas de contexto ampliadas y [RAG](/docs/rag) opcional. Los pesos se publican para [inferencia local](/docs/local-inference) y [ajuste fino](/docs/llms/fine-tuning); también se ofrece acceso a través de API. La [ingeniería de prompts](/docs/prompt-engineering) y los [agentes](/docs/agents) amplían el sistema para las aplicaciones.

## Casos de uso

Qwen es adecuado para aplicaciones multilingües y de programación, y flujos de trabajo de contexto largo con acceso abierto o mediante API.

- Chat multilingüe, traducción y generación de contenido
- Generación de código y [agentes](/docs/agents) centrados en código
- Preguntas y respuestas sobre documentos largos y [RAG](/docs/rag) con grandes ventanas de contexto

## Documentación externa

- [Qwen – Official site](https://qwenlm.github.io/) — Modelos y documentación
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Pesos y tarjetas de modelo

## Ver también

- [LLMs](/docs/llms)
- [Ajuste fino](/docs/llms/fine-tuning)
- [Inferencia local](/docs/local-inference)
