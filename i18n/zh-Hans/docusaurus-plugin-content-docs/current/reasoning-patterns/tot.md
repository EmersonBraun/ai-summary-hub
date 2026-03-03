---
title: Tree of thoughts (ToT)
description: 分支推理以探索多条思维路径。
keywords: [tree of thoughts, ToT, search, 推理]
---

# Tree of thoughts (ToT)

## 定义

Tree of thoughts extends CoT by maintaining multiple 推理 branches. At each step, the model generates several continuations; a heuristic (or another model) scores them and guides search (例如 best-first, beam).

当…时使用 a single [chain-of-thought](/docs/reasoning-patterns/cot) path might get stuck (例如 game moves, multi-step planning) and you can afford multiple LLM calls. It trades compute for better search over the space of solutions. See [推理 patterns](/docs/reasoning-patterns) for the full set of options.

## 工作原理

```mermaid
flowchart TB
  Root[Root] --> Branch1[Branch1]
  Root --> Branch2[Branch2]
  Branch1 --> Score[Score]
  Branch2 --> Score
  Score --> Expand[Expand]
  Expand --> Root
```

Start from a **root** (例如 the question or initial state). **Branch**: at each step, generate several continuations (例如 next 推理 steps or moves). **Score** each branch with a heuristic or a separate model (例如 “how promising is this partial solution?”). **Expand** the best node(s) and repeat; prune low-scoring branches to limit cost. Search strategy (best-first, beam, BFS) and branching factor control exploration vs compute. The tree is built incrementally until a solution is found or a depth/budget limit is reached.

## 应用场景

Tree-of-thoughts is useful when you want to explore and score multiple solution paths instead of a single chain.

- Game playing and planning where multiple moves need evaluation
- Math or logic with several solution paths to explore
- Creative or 设计 tasks where generating and scoring options helps

## 外部文档

- [Tree of Thoughts (Yao et al.)](https://arxiv.org/abs/2305.10601) — ToT paper
- [LangChain – Tree of thoughts](https://python.langchain.com/docs/concepts/agents/) — ToT and related patterns

## 另请参阅

- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [Reasoning patterns](/docs/reasoning-patterns)
