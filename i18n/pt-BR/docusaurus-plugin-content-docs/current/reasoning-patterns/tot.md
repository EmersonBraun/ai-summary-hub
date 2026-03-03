---
title: Tree of thoughts (ToT)
description: Raciocínio ramificado para explorar múltiplos caminhos de pensamento.
keywords: [tree of thoughts, ToT, search, raciocínio]
---

# Tree of thoughts (ToT)

## Definição

Tree of thoughts extends CoT by maintaining multiple raciocínio branches. At each step, the model generates several continuations; a heuristic (or another model) scores them and guides search (por ex. best-first, beam).

Use quando a single [chain-of-thought](/docs/reasoning-patterns/cot) path might get stuck (por ex. game moves, multi-step planning) and you can afford multiple LLM calls. It trades compute for better search over the space of solutions. See [raciocínio patterns](/docs/reasoning-patterns) for the full set of options.

## Como funciona

```mermaid
flowchart TB
  Root[Root] --> Branch1[Branch1]
  Root --> Branch2[Branch2]
  Branch1 --> Score[Score]
  Branch2 --> Score
  Score --> Expand[Expand]
  Expand --> Root
```

Parte de uma **raiz** (por ex. a pergunta ou estado inicial). **Ramificação**: em cada etapa, gera várias continuações (por ex. next raciocínio steps or moves). **Score** each branch with a heuristic or a separate model (por ex. “how promising is this partial solution?”). **Expand** the best node(s) and repeat; prune low-scoring branches to limit cost. Search strategy (best-first, beam, BFS) and branching factor control exploration vs compute. The tree is built incrementally until a solution is found or a depth/budget limit is reached.

## Casos de uso

Tree-of-thoughts is useful when you want to explore and score multiple solution paths instead of a single chain.

- Game playing and planning where multiple moves need evaluation
- Math or logic with several solution paths to explore
- Creative or projeto tasks where generating and scoring options helps

## Documentação externa

- [Tree of Thoughts (Yao et al.)](https://arxiv.org/abs/2305.10601) — ToT paper
- [LangChain – Tree of thoughts](https://python.langchain.com/docs/concepts/agents/) — ToT and related patterns

## Veja também

- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [Reasoning patterns](/docs/reasoning-patterns)
