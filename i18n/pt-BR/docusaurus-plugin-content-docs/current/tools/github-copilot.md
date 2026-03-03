---
title: GitHub Copilot
description: Programador par IA para completação e geração de código.
keywords: [GitHub Copilot, code completion, AI coding]
---

# GitHub Copilot

## Definição

GitHub Copilot é um assistente de IA que sugere completamentos de código e pode gerar código a partir de comentários ou linguagem natural. É powered by [LLMs](/docs/llms) trained on public code.

Foca em **inline** completion and short generation (por ex. from a comment or docstring). For deeper project context, chat, and edit-in-place, see [Cursor](/docs/tools/cursor). Both are examples of [LLM](/docs/llms)-powered coding tools; Copilot is lightweight and IDE-agnostic.

## Como funciona

**Enquanto você digita**, o Copilot sugere completamentos (texto fantasma cinza); Tab aceita. **Ao adicionar comentários ou docstrings**, ele pode gerar uma função ou bloco. Você pode aceitar, editar ou reject. The model sees the current file and nearby context (and optionally other open files, depending on the IDE). **Integrations** exist for VS Code, JetBrains, Neovim, and others. **Languages**: most mainstream languages and frameworks are supported. Suggestions are based on public code and your current context; quality varies by language and task. No project-level rules; for project-specific behavior, use Cursor rules or similar.

## Casos de uso

GitHub Copilot is for inline completions and generating code from comments across many languages and IDEs.

- Inline code completion and snippet generation while coding
- Generating functions or tests from comments or docstrings
- Speeding up development across many languages and frameworks

## Documentação externa

- [GitHub Copilot documentation](https://docs.github.com/en/copilot) — Setup, usage, and best practices

## Veja também

- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
