---
title: Sistemas multi-agente
description: Múltiples agentes que colaboran o compiten.
keywords: [multi-agente, colaboración, orquestación]
---

# Sistemas multi-agente

## Definición

Los sistemas multi-agente involucran múltiples agentes de IA que interactúan para resolver tareas: collaboration (divide work, share state), debate (argue and refine answers), or specialized roles (planner, executor, critic).

Extienden single [agents](/docs/agents) when one model or one loop is insufficient: por ej. one agent for [RAG](/docs/rag) recuperación, another for generation, another for critique. [Subagents](/docs/subagents) are a hierarchical form where a root agent delegates to children; here we focus on flat or peer-to-peer multi-agent patterns.

## Cómo funciona

```mermaid
flowchart LR
  User[User] --> Orch[Orchestrator]
  Orch --> Agent1[Agent1]
  Orch --> Agent2[Agent2]
  Agent1 --> Aggregate[Aggregate]
  Agent2 --> Aggregate
  Aggregate --> User
```

El **usuario** envía una tarea a un **orquestador** (que puede ser un LLM o un flujo de trabajo fijo). El orquestador asigna trabajo al **Agente1**, **Agente2**, etc.tc., each with its own role, tools, and optionally model. Agents may share a common state, pass messages, or be invoked in sequence/parallel. Their outputs are **aggregated** (por ej. combined, voted, or summarized) and returned to the user. Design choices include role assignment, communication protocol, and conflict resolution. MAS are useful when you want **modularity** (each agent has a clear responsibility), **specialization** (different models or tools per role), **reusability** (same agent in different workflows), and **structured control flow**.

## Casos de uso

Los sistemas multi-agente ayudan cuando un solo agente no es suficiente: se necesitan roles distintos, debate o pipelines modulares.

- Orchestrating planner, executor, and critic agents for complex tasks
- Debate or review flows where multiple agents refine an answer
- Specialized pipelines (por ej. one agent for recuperación, one for generation)

## Documentación externa

- [From Prototypes to Agents with ADK – Google Codelabs](https://codelabs.developers.google.com/your-first-agent-with-adk#0) — ADK supports composing multiple agents into a multi-agent system
- [LangChain – Multi-agent](https://python.langchain.com/docs/concepts/multi_agent/) — Multi-agent orchestration patterns

## Ver también

- [Agents](/docs/agents)
- [Subagents](/docs/subagents)
- [Autonomous agents](/docs/autonomous-agents)
