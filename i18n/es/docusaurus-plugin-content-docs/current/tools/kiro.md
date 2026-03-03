---
title: Kiro
description: IDE de IA con desarrollo basado en especificaciones y agent hooks del prototipo a producción.
keywords: [Kiro, spec-driven, AI IDE, agent hooks]
---

# Kiro

## Definición

Kiro es un **IDE impulsado por IA** que aplica [spec-driven development](/docs/spec-driven-development): convierte prompts en requisitos estructurados, system diseños, and implementation tasks while keeping the developer in control. **Agent hooks** run autonomous [agents](/docs/agents) on events (por ej. file save) for documentation, tests, or optimization; **Autopilot** allows larger tasks to run with oversight.

Integra multimodal chat, code diff views, and [MCP](https://modelcontextprotocol.io/) for docs, databases, and APIs. Built on VS Code–compatible foundations (Open VSX, themes, settings). Useful for [spec-driven development](/docs/spec-driven-development), [agent](/docs/agents) workflows, and going from prototype to production with clear structure.

## Cómo funciona

You describe goals in **prompts**; Kiro helps produce **requirements**, **diseños**, and **tasks** in a structured way. **Agent hooks** trigger on events (por ej. save, commit) to run tasks like generating docs or tests. **Chat** and **diff views** support review and editing with optional image-based guidance. **Autopilot** runs multi-step work with checkpoints. **Steering files** configure agent behavior and project standards. **Kiro CLI** brings the same agents and flows to the terminal. MCP connects to external data and tools.

## Casos de uso

Kiro fits teams that want spec-driven, agent-augmented development with control and visibility.

- Turning prompts into requirements and implementation tasks
- Event-driven agents (docs, tests, optimization) on save or commit
- Prototype-to-production workflows with structure and steering

## Documentación externa

- [Kiro – AI IDE](https://kiro.dev/) — Product and overview
- [Kiro – Docs and chat](https://kiro.dev/docs/chat) — Documentation

## Ver también

- [Spec-driven development](/docs/spec-driven-development)
- [Agents](/docs/agents)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
