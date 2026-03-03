---
title: GitHub Copilot
description: Programador par IA para completado y generación de código.
keywords: [GitHub Copilot, code completion, AI codificación]
---

# GitHub Copilot

## Definición

GitHub Copilot es un asistente de IA que sugiere completados de código y puede generar código a partir de comentarios o lenguaje natural. Es powered by [LLMs](/docs/llms) trained on public code.

Se centra en **inline** completion and short generation (por ej. from a comment or docstring). For deeper project context, chat, and edit-in-place, see [Cursor](/docs/tools/cursor). Both are examples of [LLM](/docs/llms)-powered codificación tools; Copilot is lightweight and IDE-agnostic.

## Cómo funciona

**Mientras escribes**, Copilot sugiere completados (texto fantasma gris); Tab acepta. **Al añadir comentarios o docstrings**, puede can generate a function or block. You can accept, edit, or reject. The model sees the current file and nearby context (and optionally other open files, depending on the IDE). **Integrations** exist for VS Code, JetBrains, Neovim, and others. **Languages**: most mainstream languages and frameworks are supported. Suggestions are based on public code and your current context; quality varies by language and task. No project-level rules; for project-specific behavior, use Cursor rules or similar.

## Casos de uso

GitHub Copilot is for inline completions and generating code from comments across many languages and IDEs.

- Inline code completion and snippet generation while codificación
- Generating functions or tests from comments or docstrings
- Speeding up development across many languages and frameworks

## Documentación externa

- [GitHub Copilot documentation](https://docs.github.com/en/copilot) — Setup, usage, and best practices

## Ver también

- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
