---
title: Kiro
description: IDE IA avec développement piloté par les spécifications et hooks d'agents du prototype à la production.
keywords: [Kiro, spec-driven, AI IDE, agent hooks]
---

# Kiro

## Définition

Kiro is an **IDE propulsé par l'IA** that applies [spec-driven development](/docs/spec-driven-development): it turns prompts into structured requirements, system conceptions, and implementation tasks while keeping the developer in control. **Agent hooks** run autonomous [agents](/docs/agents) on events (par ex. file save) for documentation, tests, or optimization; **Autopilot** allows larger tasks to run with oversight.

It integrates multimodal chat, code diff views, and [MCP](https://modelcontextprotocol.io/) for docs, databases, and APIs. Built on VS Code–compatible foundations (Open VSX, themes, settings). Useful for [spec-driven development](/docs/spec-driven-development), [agent](/docs/agents) workflows, and going from prototype to production with clear structure.

## Comment ça fonctionne

You describe goals in **prompts**; Kiro helps produce **requirements**, **conceptions**, and **tasks** in a structured way. **Agent hooks** trigger on events (par ex. save, commit) to run tasks like generating docs or tests. **Chat** and **diff views** support review and editing with optional image-based guidance. **Autopilot** runs multi-step work with checkpoints. **Steering files** configure agent behavior and project standards. **Kiro CLI** brings the same agents and flows to the terminal. MCP connects to external data and tools.

## Cas d'utilisation

Kiro fits teams that want spec-driven, agent-augmented development with control and visibility.

- Turning prompts into requirements and implementation tasks
- Event-driven agents (docs, tests, optimization) on save or commit
- Prototype-to-production workflows with structure and steering

## Documentation externe

- [Kiro – AI IDE](https://kiro.dev/) — Product and overview
- [Kiro – Docs and chat](https://kiro.dev/docs/chat) — Documentation

## Voir aussi

- [Spec-driven development](/docs/spec-driven-development)
- [Agents](/docs/agents)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
