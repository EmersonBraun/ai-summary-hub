---
title: Cursor
description: AI-powered code editor and pair-programming tool.
keywords: [Cursor, AI Programmierung, IDE]
---

# Cursor

## Definition

Cursor ist ein KI-gestützter Code-Editor, der auf VS Code basiert. Es integriert [LLMs](/docs/llms) für Code-Vervollständigung, Bearbeitung und Chat, with context aus dem codebase and docs.

Es ist similar to [GitHub Copilot](/docs/tools/github-copilot) but adds deeper project context, chat, and edit-in-place. Useful for [agent](/docs/agents)-like workflows (describe a feature, get code changes) and pair programming. Supports multiple models and optional project rules for consistent behavior.

## Funktionsweise

Man verwendet **natürliche Sprache** im Chat oder Inline, um Bearbeitungen, Generierung oder Refactoring anzufordern. Das **Modell** hat Zugriff auf open files, the current file, und optional the whole codebase (via indexing). You can accept, edit, or reject suggestions. **Edit flow**: select code or place cursor, describe the change, the model proposes a diff. **Chat**: ask questions, get explanations, or request multi-file changes. **Rules/skills** (z. B. in .cursorrules) steer the model for your Stack and conventions. Multiple [LLM](/docs/llms) backends and model sizes are supported; context window and indexing determine how much of the repo is visible to the model.

## Anwendungsfälle

Cursor fits developers who want AI-assisted editing and chat inside the IDE with project and file context.

- In-IDE code completion, generation, and refactoring
- Pair programming with project-aware AI (files, docs)
- Exploring codebases and implementing features from descriptions

## Externe Dokumentation

- [Cursor – Documentation](https://docs.cursor.com/) — Official Cursor docs and guides

## Siehe auch

- [Agents](/docs/agents)
- [GitHub Copilot](/docs/tools/github-copilot)
- [LLMs](/docs/llms)
