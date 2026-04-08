---
title: Case study — Grok
description: LLM de xAI con conocimiento en tiempo real y razonamiento.
keywords: [Grok, xAI, real-time, razonamiento]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Grok

## Definición

Grok es una familia de [LLMs](/docs/llms) de xAI. Está orientado al conocimiento en tiempo real o actualizado (p. ej., acceso a datos de X/Twitter) y al razonamiento sólido, ofrecido a través de la API y en la experiencia de producto de X.

Al igual que [ChatGPT](/docs/case-studies/chatgpt) y [Claude](/docs/case-studies/claude), Grok utiliza una base preentrenada, ajuste de instrucciones y alineamiento; la diferenciación incluye el anclaje al estilo [RAG](/docs/rag) en tiempo real y la integración con la plataforma de X. Caso de uso: chat, investigación y aplicaciones que se benefician de la información actual y el razonamiento.

## Cómo funciona

Un **modelo base** ([transformer](/docs/transformers) solo decodificador) se preentrena en texto a gran escala (y opcionalmente otros datos). El **ajuste de instrucciones** y el **alineamiento** (p. ej., optimización de preferencias) dan forma a la utilidad y la seguridad. El **conocimiento en tiempo real o en vivo** se proporciona recuperando y condicionando sobre contenido fresco (p. ej., de X) para que las respuestas puedan reflejar eventos recientes. El producto expone Grok a través de chat y API; la [ingeniería de prompts](/docs/prompt-engineering) y el uso de herramientas lo amplían para [agentes](/docs/agents) y flujos de trabajo personalizados.

## Casos de uso

Grok es adecuado para casos de uso donde la información actualizada y el razonamiento importan más que un punto de corte de entrenamiento estático.

- Chat e investigación con conciencia de noticias y eventos recientes
- Aplicaciones que necesitan respuestas en tiempo real o aumentadas por búsqueda
- Integración en X y productos de terceros a través de la API

## Documentación externa

- [xAI – Grok](https://x.ai/) — Producto y API
- [xAI – Blog](https://x.ai/blog) — Actualizaciones del modelo y capacidades

## Ver también

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Ingeniería de prompts](/docs/prompt-engineering)
