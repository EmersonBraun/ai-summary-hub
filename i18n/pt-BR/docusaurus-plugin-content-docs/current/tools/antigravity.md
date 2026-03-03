---
title: Antigravity
description: IDE orientada a agentes para execução autônoma e vibe coding.
keywords: [Antigravity, agent-first IDE, autonomous coding]
---

# Antigravity

## Definição

Antigravity é uma **IDE orientada a agentes** que usa [agentes](/docs/agents) autônomos impulsionados por [LLM](/docs/llms) para lidar com coding, testing, and debugging across the editor, terminal, and browser. An **Agent Manager** coordinates multiple agents in parallel across workspaces; an **Artifacts Timeline** records plans, code diffs, screenshots, and browser recordings for verifiable outputs.

Enfatiza autonomia e feedback humano no ciclo: os agentes executam tarefas enquanto os usuários podem comentar e direcionar em tempo real. A IDE suporta assistência de IA inline e é alimentada por grandes modelos (por ex. Gemini and others) with large context windows. Useful for [agent](/docs/agents)-centric workflows and [spec-driven development](/docs/spec-driven-development) where artifacts and auditability matter.

## Como funciona

Você trabalha em uma **interface dupla**: um **editor** completo com IA inline (refatoração, geração) e um **Gerenciador de Agentesador de Agentes** que executa e orquestra agentes. **Agentes** operam em editor, terminal, and browser—por ex. implement a feature, run tests, or debug. **Artifacts** (plans, diffs, screenshots, recordings) are produced and shown in a timeline so outputs are inspectable. **Feedback**: you comment on agent work; the system incorporates feedback for the next steps. The platform runs on desktop (Windows, macOS, Linux) and supports large context and multiple model backends.

## Casos de uso

Antigravity fits teams that want autonomous or semi-autonomous coding with clear artifacts and control.

- Agent-driven implementation and testing with verifiable artifacts
- Parallel work across multiple agents and workspaces
- Inline AI assistance plus manager-driven autonomy in one IDE

## Documentação externa

- [Antigravity – Agent-first IDE](https://www.antigravityai.io/) — Product and overview
- [Antigravity IDE](https://antigravityaiide.com/) — Platform and capabilities

## Veja também

- [Agents](/docs/agents)
- [Spec-driven development](/docs/spec-driven-development)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
