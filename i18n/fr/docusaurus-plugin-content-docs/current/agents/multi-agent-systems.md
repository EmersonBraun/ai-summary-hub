---
title: Systèmes multi-agents
description: Plusieurs agents qui collaborent ou sont en compétition.
keywords: [multi-agent, collaboration, orchestration]
---

# Systèmes multi-agents

## Définition

Les systèmes multi-agents impliquent plusieurs agents IA qui interagissent pour résoudre des tâches: collaboration (divide work, share state), debate (argue and refine answers), or specialized roles (planner, executor, critic).

They extend single [agents](/docs/agents) when one model or one loop is insufficient: par ex. one agent for [RAG](/docs/rag) récupération, another for generation, another for critique. [Subagents](/docs/subagents) are a hierarchical form where a root agent delegates to children; here we focus on flat or peer-to-peer multi-agent patterns.

## Comment ça fonctionne

```mermaid
flowchart LR
  User[User] --> Orch[Orchestrator]
  Orch --> Agent1[Agent1]
  Orch --> Agent2[Agent2]
  Agent1 --> Aggregate[Aggregate]
  Agent2 --> Aggregate
  Aggregate --> User
```

L'**utilisateur** envoie une tâche à un **orchestrateur** (qui peut être un LLM ou un workflow fixe). L'orchestrateur attribue le travail à **Agent1**, **Agent2**, etc.tc., each with its own role, tools, and optionally model. Agents may share a common state, pass messages, or be invoked in sequence/parallel. Their outputs are **aggregated** (par ex. combined, voted, or summarized) and returned to the user. Design choices include role assignment, communication protocol, and conflict resolution. MAS are useful when you want **modularity** (each agent has a clear responsibility), **specialization** (different models or tools per role), **reusability** (same agent in different workflows), and **structured control flow**.

## Cas d'utilisation

Les systèmes multi-agents aident lorsqu'un seul agent ne suffit pas : vous avez besoin de rôles distincts, de débats ou de pipelines modulaires.

- Orchestrating planner, executor, and critic agents for complex tasks
- Debate or review flows where multiple agents refine an answer
- Specialized pipelines (par ex. one agent for récupération, one for generation)

## Documentation externe

- [From Prototypes to Agents with ADK – Google Codelabs](https://codelabs.developers.google.com/your-first-agent-with-adk#0) — ADK supports composing multiple agents into a multi-agent system
- [LangChain – Multi-agent](https://python.langchain.com/docs/concepts/multi_agent/) — Multi-agent orchestration patterns

## Voir aussi

- [Agents](/docs/agents)
- [Subagents](/docs/subagents)
- [Autonomous agents](/docs/autonomous-agents)
