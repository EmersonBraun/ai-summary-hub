---
title: Kiro
description: IDE de IA com desenvolvimento orientado por especificações e hooks de agentes do protótipo à produção.
keywords: [Kiro, spec-driven, AI IDE, agent hooks]
---

# Kiro

## Definição

Kiro é uma **IDE impulsionada por IA** que aplica [desenvolvimento orientado por especificações](/docs/spec-driven-development): ele converte prompts em requisitos estruturados, projetos de sistema e tarefas de implementação mantendong the developer in control. **Agent hooks** run autonomous [agents](/docs/agents) on events (por ex. file save) for documentation, tests, or optimization; **Autopilot** allows larger tasks to run with oversight.

It integrates multimodal chat, code diff views, and [MCP](https://modelcontextprotocol.io/) for docs, databases, and APIs. Built on VS Code–compatible foundations (Open VSX, themes, settings). Useful for [spec-driven development](/docs/spec-driven-development), [agent](/docs/agents) workflows, and going from prototype to production with clear structure.

## Como funciona

Você descreve objetivos em **prompts**; Kiro ajuda a produzir **requisitos**, **projetos** e **tarefas** de forma estruturada. **Hooks de agente** são acionados por eventos (por ex. salvar, commit) para executar tarefas comoe generating docs or tests. **Chat** and **diff views** support review and editing with optional image-based guidance. **Autopilot** runs multi-step work with checkpoints. **Steering files** configure agent behavior and project standards. **Kiro CLI** brings the same agents and flows to the terminal. MCP connects to external data and tools.

## Casos de uso

Kiro fits teams that want spec-driven, agent-augmented development with control and visibility.

- Turning prompts into requirements and implementation tasks
- Event-driven agents (docs, tests, optimization) on save or commit
- Prototype-to-production workflows with structure and steering

## Documentação externa

- [Kiro – AI IDE](https://kiro.dev/) — Product and overview
- [Kiro – Docs and chat](https://kiro.dev/docs/chat) — Documentation

## Veja também

- [Spec-driven development](/docs/spec-driven-development)
- [Agents](/docs/agents)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
