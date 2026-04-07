---
title: Cursor
description: AI-powered code editor and pair-programming tool.
keywords: [Cursor, AI coding, IDE]
tags: [beginner]
---

# Cursor

## Definition

Cursor is an AI-powered code editor built on VS Code. It integrates [LLMs](/docs/llms) for code completion, editing, and chat, with context from the codebase and docs.

It is similar to [GitHub Copilot](/docs/tools/github-copilot) but adds deeper project context, chat, and edit-in-place. Useful for [agent](/docs/agents)-like workflows (describe a feature, get code changes) and pair programming. Supports multiple models and optional project rules for consistent behavior.

## How it works

You use **natural language** in chat or inline to request edits, generation, or refactoring. The **model** has access to open files, the current file, and optionally the whole codebase (via indexing). You can accept, edit, or reject suggestions. **Edit flow**: select code or place cursor, describe the change, the model proposes a diff. **Chat**: ask questions, get explanations, or request multi-file changes. **Rules/skills** (e.g. in .cursorrules) steer the model for your stack and conventions. Multiple [LLM](/docs/llms) backends and model sizes are supported; context window and indexing determine how much of the repo is visible to the model.

## Use cases

Cursor fits developers who want AI-assisted editing and chat inside the IDE with project and file context.

- In-IDE code completion, generation, and refactoring
- Pair programming with project-aware AI (files, docs)
- Exploring codebases and implementing features from descriptions

## External documentation

- [Cursor – Documentation](https://docs.cursor.com/) — Official Cursor docs and guides

## See also

- [Agents](/docs/agents)
- [GitHub Copilot](/docs/tools/github-copilot)
- [LLMs](/docs/llms)
