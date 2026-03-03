---
title: GitHub Copilot
description: Programmeur pair IA pour la complétion et la génération de code.
keywords: [GitHub Copilot, code completion, AI coding]
---

# GitHub Copilot

## Définition

GitHub Copilot is an AI assistant that suggests code completions and can generate code from comments or natural language. C'est powered by [LLMs](/docs/llms) trained on public code.

Il se concentre sur **inline** completion and short generation (par ex. from a comment or docstring). For deeper project context, chat, and edit-in-place, see [Cursor](/docs/tools/cursor). Both are examples of [LLM](/docs/llms)-powered coding tools; Copilot is lightweight and IDE-agnostic.

## Comment ça fonctionne

**En tapant**, Copilot suggère des complétions (texte fantôme gris) ; Tab accepte. **En ajoutant des commentaires ou docstrings**, il can generate a function or block. You can accept, edit, or reject. The model sees the current file and nearby context (and optionally other open files, depending on the IDE). **Integrations** exist for VS Code, JetBrains, Neovim, and others. **Languages**: most mainstream languages and frameworks are supported. Suggestions are based on public code and your current context; quality varies by language and task. No project-level rules; for project-specific behavior, use Cursor rules or similar.

## Cas d'utilisation

GitHub Copilot is for inline completions and generating code from comments across many languages and IDEs.

- Inline code completion and snippet generation while coding
- Generating functions or tests from comments or docstrings
- Speeding up development across many languages and frameworks

## Documentation externe

- [GitHub Copilot documentation](https://docs.github.com/en/copilot) — Setup, usage, and best practices

## Voir aussi

- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
