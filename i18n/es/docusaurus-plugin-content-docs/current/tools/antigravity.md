---
title: Antigravity
description: IDE centrado en agentes para ejecución autónoma y vibe codificación.
keywords: [Antigravity, IDE centrado en agentes, autonomous codificación]
---

# Antigravity

## Definición

Antigravity es un **IDE centrado en agentes** que usa agentes autónomos [LLM](/docs/llms)-powered [agents](/docs/agents) para manejar codificación, pruebas y depuracióncross the editor, terminal, and browser. An **Agent Manager** coordinates multiple agents in parallel across workspaces; an **Artifacts Timeline** records plans, code diffs, screenshots, and browser recordings for verifiable outputs.

Enfatiza la autonomía y la retroalimentación humano-en-el-bucle: los agentes ejecutan tareas mientras los usuarios pueden comentar y dirigir en tiempo real. El IDE soporta IA inline assistance and is powered by modelo grandes (por ej. Gemini and others) with large context windows. Useful for [agent](/docs/agents)-centric workflows and [spec-driven development](/docs/spec-driven-development) where artifacts and auditability matter.

## Cómo funciona

Se trabaja en una **interfaz dual**: un **editor** completo con IA inline (refactorización, generación) y un **Gestor de Agentesager** that runs and orchestrates agents. **Agents** operate across editor, terminal, and browser—por ej. implement a feature, run tests, or debug. **Artifacts** (plans, diffs, screenshots, recordings) are produced and shown in a timeline so outputs are inspectable. **Feedback**: you comment on agent work; the system incorporates feedback for the next steps. The platform runs on desktop (Windows, macOS, Linux) and supports large context and multiple model backends.

## Casos de uso

Antigravity fits teams that want autonomous or semi-autonomous codificación with clear artifacts and control.

- Agent-driven implementation and testing with verifiable artifacts
- Parallel work across multiple agents and workspaces
- Inline AI assistance plus manager-driven autonomy in one IDE

## Documentación externa

- [Antigravity – Agent-first IDE](https://www.antigravityai.io/) — Product and overview
- [Antigravity IDE](https://antigravityaiide.com/) — Platform and capabilities

## Ver también

- [Agents](/docs/agents)
- [Spec-driven development](/docs/spec-driven-development)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
