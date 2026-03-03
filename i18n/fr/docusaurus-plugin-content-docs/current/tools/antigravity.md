---
title: Antigravity
description: IDE agent-first pour exécution autonome et vibe coding.
keywords: [Antigravity, agent-first IDE, autonomous coding]
---

# Antigravity

## Définition

Antigravity is an **agent-first IDE** that uses autonomous [LLM](/docs/llms)-powered [agents](/docs/agents) to handle coding, testing, and debugging across the editor, terminal, and browser. An **Agent Manager** coordinates multiple agents in parallel across workspaces; an **Artifacts Timeline** records plans, code diffs, screenshots, and browser recordings for verifiable outputs.

Il met l'accent sur l'autonomie et la rétroaction humaine dans la boucle: agents execute tasks while users can comment and steer in real time. The IDE supports inline AI assistance and is powered by large models (par ex. Gemini and others) with large context windows. Useful for [agent](/docs/agents)-centric workflows and [spec-driven development](/docs/spec-driven-development) where artifacts and auditability matter.

## Comment ça fonctionne

On travaille dans une **double interface** : un **éditeur** complet avec IA intégrée (refactoring, génération) et un **Gestionnaire d'Agentsager** that runs and orchestrates agents. **Agents** operate across editor, terminal, and browser—par ex. implement a feature, run tests, or debug. **Artifacts** (plans, diffs, screenshots, recordings) are produced and shown in a timeline so outputs are inspectable. **Feedback**: you comment on agent work; the system incorporates feedback for the next steps. The platform runs on desktop (Windows, macOS, Linux) and supports large context and multiple model backends.

## Cas d'utilisation

Antigravity fits teams that want autonomous or semi-autonomous coding with clear artifacts and control.

- Agent-driven implementation and testing with verifiable artifacts
- Parallel work across multiple agents and workspaces
- Inline AI assistance plus manager-driven autonomy in one IDE

## Documentation externe

- [Antigravity – Agent-first IDE](https://www.antigravityai.io/) — Product and overview
- [Antigravity IDE](https://antigravityaiide.com/) — Platform and capabilities

## Voir aussi

- [Agents](/docs/agents)
- [Spec-driven development](/docs/spec-driven-development)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
