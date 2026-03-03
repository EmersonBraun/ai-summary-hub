---
title: Tree of thoughts (ToT)
description: Razonamiento ramificado para explorar múltiples caminos de pensamiento.
keywords: [tree of thoughts, ToT, search, razonamiento]
---

# Tree of thoughts (ToT)

## Definición

El árbol de pensamientos extiende CoT manteniendo múltiples ramas de razonamiento. At each step, the model generates several continuations; a heuristic (or another model) scores them and guides search (por ej. best-first, beam).

Úselo cuando a single [chain-of-thought](/docs/reasoning-patterns/cot) path might get stuck (por ej. game moves, multi-step planning) and you can afford multiple LLM calls. It trades compute for better search over the space of solutions. See [razonamiento patterns](/docs/reasoning-patterns) for the full set of options.

## Cómo funciona

```mermaid
flowchart TB
  Root[Root] --> Branch1[Branch1]
  Root --> Branch2[Branch2]
  Branch1 --> Score[Score]
  Branch2 --> Score
  Score --> Expand[Expand]
  Expand --> Root
```

Start from a **root** (por ej. the question or initial state). **Branch**: at each step, generate several continuations (por ej. next razonamiento steps or moves). **Score** each branch with a heuristic or a separate model (por ej. “how promising is this partial solution?”). **Expand** the best node(s) and repeat; prune low-scoring branches to limit cost. Search strategy (best-first, beam, BFS) and branching factor control exploration vs compute. The tree is built incrementally until a solution is found or a depth/budget limit is reached.

## Casos de uso

Tree-of-thoughts is useful when you want to explore and score multiple solution paths instead of a single chain.

- Game playing and planning where multiple moves need evaluation
- Math or logic with several solution paths to explore
- Creative or diseño tasks where generating and scoring options helps

## Documentación externa

- [Tree of Thoughts (Yao et al.)](https://arxiv.org/abs/2305.10601) — ToT paper
- [LangChain – Tree of thoughts](https://python.langchain.com/docs/concepts/agents/) — ToT and related patterns

## Ver también

- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [Reasoning patterns](/docs/reasoning-patterns)
