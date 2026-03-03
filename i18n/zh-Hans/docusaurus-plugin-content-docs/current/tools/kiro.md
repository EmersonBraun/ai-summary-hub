---
title: Kiro
description: AI IDE，支持规范驱动开发和代理钩子，从原型到生产。
keywords: [Kiro, spec-driven, AI IDE, agent hooks]
---

# Kiro

## 定义

Kiro is an **AI 驱动的 IDE** that applies [spec-driven development](/docs/spec-driven-development): it turns prompts into structured requirements, system 设计s, and implementation tasks while keeping the developer in control. **Agent hooks** run autonomous [agents](/docs/agents) on events (例如 file save) for documentation, tests, or optimization; **Autopilot** allows larger tasks to run with oversight.

It integrates multimodal chat, code diff views, and [MCP](https://modelcontextprotocol.io/) for docs, databases, and APIs. Built on VS Code–compatible foundations (Open VSX, themes, settings). Useful for [spec-driven development](/docs/spec-driven-development), [agent](/docs/agents) workflows, and going from prototype to production with clear structure.

## 工作原理

You describe goals in **prompts**; Kiro helps produce **requirements**, **设计s**, and **tasks** in a structured way. **Agent hooks** trigger on events (例如 save, commit) to run tasks like generating docs or tests. **Chat** and **diff views** support review and editing with optional image-based guidance. **Autopilot** runs multi-step work with checkpoints. **Steering files** configure agent behavior and project standards. **Kiro CLI** brings the same agents and flows to the terminal. MCP connects to external data and tools.

## 应用场景

Kiro fits teams that want spec-driven, agent-augmented development with control and visibility.

- Turning prompts into requirements and implementation tasks
- Event-driven agents (docs, tests, optimization) on save or commit
- Prototype-to-production workflows with structure and steering

## 外部文档

- [Kiro – AI IDE](https://kiro.dev/) — Product and overview
- [Kiro – Docs and chat](https://kiro.dev/docs/chat) — Documentation

## 另请参阅

- [Spec-driven development](/docs/spec-driven-development)
- [Agents](/docs/agents)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
