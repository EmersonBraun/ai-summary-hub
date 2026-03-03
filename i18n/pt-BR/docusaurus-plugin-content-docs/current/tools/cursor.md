---
title: Cursor
description: AI-powered code editor and pair-programming tool.
keywords: [Cursor, AI coding, IDE]
---

# Cursor

## Definição

Cursor é um editor de código impulsionado por IA baseado no VS Code. Ele integra [LLMs](/docs/llms) para completamento de códigoão, edição e chat, com contexto da base de código e documentação.

É similar to [GitHub Copilot](/docs/tools/github-copilot) but adds deeper project context, chat, and edit-in-place. Useful for [agent](/docs/agents)-like workflows (describe a feature, get code changes) and pair programming. Supports multiple models and optional project rules for consistent behavior.

## Como funciona

Você usa **linguagem natural** no chat ou inline para solicitar edições, geração ou refatoração. O **modelo** tem acesso a arquivos abertos, o arquivo atual e opcionalmente toda a base de código (via indexação). You can accept, edit, or reject suggestions. **Edit flow**: select code or place cursor, describe the change, the model proposes a diff. **Chat**: ask questions, get explanations, or request multi-file changes. **Rules/skills** (por ex. in .cursorrules) steer the model for your stack and conventions. Multiple [LLM](/docs/llms) backends and model sizes are supported; context window and indexing determine how much of the repo is visible to the model.

## Casos de uso

Cursor fits developers who want AI-assisted editing and chat inside the IDE with project and file context.

- In-IDE code completion, generation, and refactoring
- Pair programming with project-aware AI (files, docs)
- Exploring codebases and implementing features from descriptions

## Documentação externa

- [Cursor – Documentation](https://docs.cursor.com/) — Official Cursor docs and guides

## Veja também

- [Agents](/docs/agents)
- [GitHub Copilot](/docs/tools/github-copilot)
- [LLMs](/docs/llms)
