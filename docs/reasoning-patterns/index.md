---
title: Reasoning patterns
description: How LLMs and agents structure reasoning and action.
keywords: [reasoning, CoT, ReAct, ToT, RDD]
tags: [intermediate]
---

# Reasoning patterns

## Definition

Reasoning patterns are structured ways to elicit or organize model reasoning: chain-of-thought (step-by-step), tree-of-thoughts (explore branches), ReAct (reason + act), and RDD (retrieval-decision-design), among others. Using a clear pattern improves **reliability** (more consistent reasoning) and **debuggability** (you can inspect steps or actions).

They are used in [prompt engineering](/docs/llms/prompt-engineering) (e.g. CoT) and inside [agents](/docs/agents) (e.g. ReAct, RDD). Choosing a pattern depends on the task: CoT for math/reasoning, ReAct for tool use, ToT for search/planning, RDD for spec compliance.

## How it works

```mermaid
flowchart LR
  Input[Input] --> Pattern["Pattern CoT/ReAct/ToT"]
  Pattern --> Output[Output]
```

You feed **input** (question, task) into a **pattern**: the pattern constrains how the model reasons or acts (e.g. “think step by step”, or thought–action–observation loops). The model produces an **output** (answer, action sequence). Prompts or system design encourage the model to show reasoning (e.g. “Think step by step”) or to interleave thought and action. Patterns can be combined (e.g. [CoT](/docs/reasoning-patterns/cot) inside an [agent](/docs/agents) loop). See the linked pages for each pattern’s details.

## Use cases

Different patterns suit different needs: CoT for stepwise reasoning, ReAct for tool use, ToT for search and planning.

- CoT: math, logic, and multi-step reasoning tasks
- ReAct: tool-using agents that reason before each action
- ToT: search and planning over multiple solution branches

## External documentation

- [Chain-of-Thought Prompting (Wei et al.)](https://arxiv.org/abs/2201.11903) — CoT paper
- [ReAct: Synergizing Reasoning and Acting (Yao et al.)](https://arxiv.org/abs/2210.03629) — ReAct paper
- [Tree of Thoughts (Yao et al.)](https://arxiv.org/abs/2305.10601) — ToT paper

## See also

- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [Tree of thoughts](/docs/reasoning-patterns/tot)
- [ReAct](/docs/reasoning-patterns/react)
- [RDD](/docs/reasoning-patterns/rdd)
