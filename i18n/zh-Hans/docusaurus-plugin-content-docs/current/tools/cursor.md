---
title: Cursor
description: AI-powered code editor and pair-programming tool.
keywords: [Cursor, AI coding, IDE]
---

# Cursor

## 定义

Cursor is an 基于 VS Code 的 AI 驱动代码编辑器. It integrates [LLMs](/docs/llms) for code completi、编辑和聊天，具有来自代码库和文档的上下文。

它是 similar to [GitHub Copilot](/docs/tools/github-copilot) but adds deeper project context, chat, and edit-in-place. Useful for [agent](/docs/agents)-like workflows (describe a feature, get code changes) and pair programming. Supports multiple models and optional project rules for consistent behavior.

## 工作原理

你在聊天或内联中使用**自然语言**请求编辑、生成或重构。**模型**可以访问 打开的文件、当前文件，以及可选的整个代码库（通过索引). You can accept, edit, or reject suggestions. **Edit flow**: select code or place cursor, describe the change, the model proposes a diff. **Chat**: ask questions, get explanations, or request multi-file changes. **Rules/skills** (例如 in .cursorrules) steer the model for your stack and conventions. Multiple [LLM](/docs/llms) backends and model sizes are supported; context window and indexing determine how much of the repo is visible to the model.

## 应用场景

Cursor fits developers who want AI-assisted editing and chat inside the IDE with project and file context.

- In-IDE code completion, generation, and refactoring
- Pair programming with project-aware AI (files, docs)
- Exploring codebases and implementing features from descriptions

## 外部文档

- [Cursor – Documentation](https://docs.cursor.com/) — Official Cursor docs and guides

## 另请参阅

- [Agents](/docs/agents)
- [GitHub Copilot](/docs/tools/github-copilot)
- [LLMs](/docs/llms)
