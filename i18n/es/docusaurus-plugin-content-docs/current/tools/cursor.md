---
title: Cursor
description: AI-powered code editor and pair-programming tool.
keywords: [Cursor, AI codificación, IDE]
---

# Cursor

## Definición

Cursor es un editor de código impulsado por IA basado en VS Code. Integra [LLMs](/docs/llms) para completado de código, edición y chat, with context from the codebase and docs.

Es similar to [GitHub Copilot](/docs/tools/github-copilot) but adds deeper project context, chat, and edit-in-place. Useful for [agent](/docs/agents)-like workflows (describe a feature, get code changes) and pair programming. Supports multiple models and optional project rules for consistent behavior.

## Cómo funciona

Se usa **lenguaje natural** en chat o inline para solicitar ediciones, generación o refactorización. El **modelo** tiene acceso a archivos abiertos, el archivo actual y opcionalmente toda la base de código (vía indexación). You can accept, edit, or reject suggestions. **Edit flow**: select code or place cursor, describe the change, the model proposes a diff. **Chat**: ask questions, get explanations, or request multi-file changes. **Rules/skills** (por ej. in .cursorrules) steer the model for your stack and conventions. Multiple [LLM](/docs/llms) backends and model sizes are supported; context window and indexing determine how much of the repo is visible to the model.

## Casos de uso

Cursor fits developers who want AI-assisted editing and chat inside the IDE with project and file context.

- In-IDE code completion, generation, and refactoring
- Pair programming with project-aware AI (files, docs)
- Exploring codebases and implementing features from descriptions

## Documentación externa

- [Cursor – Documentation](https://docs.cursor.com/) — Official Cursor docs and guides

## Ver también

- [Agents](/docs/agents)
- [GitHub Copilot](/docs/tools/github-copilot)
- [LLMs](/docs/llms)
