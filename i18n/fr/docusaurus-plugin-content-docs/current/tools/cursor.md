---
title: Cursor
description: AI-powered code editor and pair-programming tool.
keywords: [Cursor, AI coding, IDE]
---

# Cursor

## Définition

Cursor is an éditeur de code propulsé par l'IA basé sur VS Code. It integrates [LLMs](/docs/llms) for code completion, édition et chat, avec contexte de la base de code et de la documentation.

C'est similar to [GitHub Copilot](/docs/tools/github-copilot) but adds deeper project context, chat, and edit-in-place. Useful for [agent](/docs/agents)-like workflows (describe a feature, get code changes) and pair programming. Supports multiple models and optional project rules for consistent behavior.

## Comment ça fonctionne

On utilise le **langage naturel** dans le chat ou en ligne pour demander des modifications, de la génération ou du refactoring. Le **modèle** a accès à les fichiers ouverts, le fichier actuel et optionnellement toute la base de code (via indexation). You can accept, edit, or reject suggestions. **Edit flow**: select code or place cursor, describe the change, the model proposes a diff. **Chat**: ask questions, get explanations, or request multi-file changes. **Rules/skills** (par ex. in .cursorrules) steer the model for your stack and conventions. Multiple [LLM](/docs/llms) backends and model sizes are supported; context window and indexing determine how much of the repo is visible to the model.

## Cas d'utilisation

Cursor fits developers who want AI-assisted editing and chat inside the IDE with project and file context.

- In-IDE code completion, generation, and refactoring
- Pair programming with project-aware AI (files, docs)
- Exploring codebases and implementing features from descriptions

## Documentation externe

- [Cursor – Documentation](https://docs.cursor.com/) — Official Cursor docs and guides

## Voir aussi

- [Agents](/docs/agents)
- [GitHub Copilot](/docs/tools/github-copilot)
- [LLMs](/docs/llms)
