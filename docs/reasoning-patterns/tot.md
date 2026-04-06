---
title: Tree of thoughts (ToT)
description: Exploring multiple reasoning branches.
keywords: [tree of thoughts, ToT, search, reasoning]
tags: [intermediate]
---

# Tree of thoughts (ToT)

## Definition

Tree of thoughts extends CoT by maintaining multiple reasoning branches. At each step, the model generates several continuations; a heuristic (or another model) scores them and guides search (e.g. best-first, beam).

Use it when a single [chain-of-thought](/docs/reasoning-patterns/cot) path might get stuck (e.g. game moves, multi-step planning) and you can afford multiple LLM calls. It trades compute for better search over the space of solutions. See [reasoning patterns](/docs/reasoning-patterns) for the full set of options.

## How it works

```mermaid
flowchart TB
  Root[Root] --> Branch1[Branch1]
  Root --> Branch2[Branch2]
  Branch1 --> Score[Score]
  Branch2 --> Score
  Score --> Expand[Expand]
  Expand --> Root
```

Start from a **root** (e.g. the question or initial state). **Branch**: at each step, generate several continuations (e.g. next reasoning steps or moves). **Score** each branch with a heuristic or a separate model (e.g. “how promising is this partial solution?”). **Expand** the best node(s) and repeat; prune low-scoring branches to limit cost. Search strategy (best-first, beam, BFS) and branching factor control exploration vs compute. The tree is built incrementally until a solution is found or a depth/budget limit is reached.

## Use cases

Tree-of-thoughts is useful when you want to explore and score multiple solution paths instead of a single chain.

- Game playing and planning where multiple moves need evaluation
- Math or logic with several solution paths to explore
- Creative or design tasks where generating and scoring options helps

## External documentation

- [Tree of Thoughts (Yao et al.)](https://arxiv.org/abs/2305.10601) — ToT paper
- [LangChain – Tree of thoughts](https://python.langchain.com/docs/concepts/agents/) — ToT and related patterns

## See also

- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [Reasoning patterns](/docs/reasoning-patterns)
