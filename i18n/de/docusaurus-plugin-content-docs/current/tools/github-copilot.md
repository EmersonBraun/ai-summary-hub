---
title: GitHub Copilot
description: KI-Pair-Programmer für Code-Vervollständigung und -Generierung.
keywords: [GitHub Copilot, code completion, AI Programmierung]
---

# GitHub Copilot

## Definition

GitHub Copilot ist ein KI-Assistent, der Code-Vervollständigungen vorschlägt and can generate code from comments or natural language. Es ist powered by [LLMs](/docs/llms) trained on public code.

Es konzentriert sich auf **inline** completion and short generation (z. B. from a Kommentar oder Docstring). Für tieferen Projektkontext, Chat und direktes Bearbeiten, see [Cursor](/docs/tools/cursor). Both are examples of [LLM](/docs/llms)-powered Programmierung tools; Copilot is lightweight and IDE-agnostic.

## Funktionsweise

**Beim Tippen** schlägt Copilot Vervollständigungen vor (grauer Geistertext); Tab akzeptiert. **Beim Hinzufügen von Kommentaren oder Docstrings** kann es kann eine Funktion oder einen Block generieren. Sie können akzeptieren, bearbeiten oder reject. The model sees the current file and nearby context (und optional other open files, depending auf dem IDE). **Integrations** exist for VS Code, JetBrains, Neovim, and others. **Languages**: most mainstream languages and frameworks are supported. Suggestions are based on public code and your current context; quality varies by language and task. No project-level rules; for project-specific behavior, use Cursor rules or similar.

## Anwendungsfälle

GitHub Copilot is for inline completions and generating code from comments across many languages and IDEs.

- Inline code completion and snippet generation while Programmierung
- Generating functions or tests from comments or docstrings
- Speeding up development across many languages and frameworks

## Externe Dokumentation

- [GitHub Copilot documentation](https://docs.github.com/en/copilot) — Setup, usage, and best practices

## Siehe auch

- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
