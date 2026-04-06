---
title: Prompt engineering
description: Designing prompts to steer LLM behavior and improve outputs.
keywords: [prompt engineering, prompting, in-context learning]
tags: [intermediate]
---

# Prompt engineering

## Definition

Prompt engineering is the practice of crafting input text (prompts) to get desired behavior from LLMs: task format, few-shot examples, chain-of-thought, role-playing, and constraints.

It is the primary way to steer [LLMs](/docs/llms) without [fine-tuning](/docs/llms/fine-tuning): you control context, format, and examples in the prompt. Combined with [RAG](/docs/rag), prompts often include retrieved passages; with [agents](/docs/agents), they define tool use and reasoning style.

## How it works

```mermaid
flowchart LR
  Prompt[Prompt] --> LLM[LLM]
  Examples[Examples] --> LLM
  LLM --> Output[Output]
```

You compose a **prompt** (system message, task description, constraints) and optionally **examples** (few-shot). The **LLM** takes this as input and produces an **output**. **Zero-shot** uses only instructions; **few-shot** adds example input-output pairs so the model infers the task. **Chain-of-thought** (see [CoT](/docs/reasoning-patterns/cot)) asks the model to “think step by step” to improve reasoning. **Structured output** (e.g. “respond in JSON”) can be enforced via parsing or API options. Iterate on prompt wording and examples, and evaluate on a dev set to improve reliability.

## Use cases

Prompt engineering matters whenever you call an LLM: it shapes behavior, format, and reasoning without changing weights.

- Steering chat and task completion (role, format, examples)
- Eliciting reasoning (chain-of-thought) for math or logic
- Constraining outputs (JSON, length, tone) for APIs or UX

## External documentation

- [OpenAI – Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic – Prompt design](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

## See also

- [LLMs](/docs/llms)
- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [RAG](/docs/rag)
