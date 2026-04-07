---
title: GitHub Copilot
description: AI pair programmer for code completion and generation.
keywords: [GitHub Copilot, code completion, AI coding]
tags: [beginner]
authors: [EmersonBraun]
---

# GitHub Copilot

## Definition

GitHub Copilot is an AI assistant that suggests code completions and can generate code from comments or natural language. It is powered by [LLMs](/docs/llms) trained on public code.

It focuses on **inline** completion and short generation (e.g. from a comment or docstring). For deeper project context, chat, and edit-in-place, see [Cursor](/docs/tools/cursor). Both are examples of [LLM](/docs/llms)-powered coding tools; Copilot is lightweight and IDE-agnostic.

## How it works

**As you type**, Copilot suggests completions (gray ghost text); Tab accepts. **As you add comments or docstrings**, it can generate a function or block. You can accept, edit, or reject. The model sees the current file and nearby context (and optionally other open files, depending on the IDE). **Integrations** exist for VS Code, JetBrains, Neovim, and others. **Languages**: most mainstream languages and frameworks are supported. Suggestions are based on public code and your current context; quality varies by language and task. No project-level rules; for project-specific behavior, use Cursor rules or similar.

## Use cases

GitHub Copilot is for inline completions and generating code from comments across many languages and IDEs.

- Inline code completion and snippet generation while coding
- Generating functions or tests from comments or docstrings
- Speeding up development across many languages and frameworks

## External documentation

- [GitHub Copilot documentation](https://docs.github.com/en/copilot) — Setup, usage, and best practices

## See also

- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
