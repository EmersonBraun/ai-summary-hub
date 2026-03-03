---
title: Kiro
description: KI-IDE mit Spec-Driven Development und Agent Hooks vom Prototyp bis zur Produktion.
keywords: [Kiro, spec-driven, AI IDE, agent hooks]
---

# Kiro

## Definition

Kiro ist eine **KI-gestützte IDE** die anwendet [spec-driven development](/docs/spec-driven-development): es wandelt Prompts in strukturierte Anforderungen um, system Entwurfs, and implementation tasks while keeping the developer in control. **Agent hooks** run autonomous [agents](/docs/agents) on events (z. B. file save) for documentation, tests, or optimization; **Autopilot** allows larger tasks to run with oversight.

Es integriert multimodal chat, code diff views, and [MCP](https://modelcontextprotocol.io/) for docs, databases, and APIs. Built on VS Code–compatible foundations (Open VSX, themes, settings). Useful for [spec-driven development](/docs/spec-driven-development), [agent](/docs/agents) workflows, and going from prototype to production with clear structure.

## Funktionsweise

You describe goals in **prompts**; Kiro helps produce **requirements**, **Entwurfs**, and **tasks** auf strukturierte Weise. **Agent hooks** trigger on events (z. B. save, commit) to run tasks like generating docs or tests. **Chat** and **diff views** support review and editing with optional image-based guidance. **Autopilot** runs multi-step work with checkpoints. **Steering files** configure agent behavior and project standards. **Kiro CLI** brings the same agents and flows to the Terminal. MCP connects to external data and tools.

## Anwendungsfälle

Kiro fits teams that want spec-driven, agent-augmented development with control and visibility.

- Turning prompts into requirements and implementation tasks
- Event-driven agents (docs, tests, optimization) on save or commit
- Prototype-to-production workflows with structure and steering

## Externe Dokumentation

- [Kiro – AI IDE](https://kiro.dev/) — Product and overview
- [Kiro – Docs and chat](https://kiro.dev/docs/chat) — Documentation

## Siehe auch

- [Spec-driven development](/docs/spec-driven-development)
- [Agents](/docs/agents)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
