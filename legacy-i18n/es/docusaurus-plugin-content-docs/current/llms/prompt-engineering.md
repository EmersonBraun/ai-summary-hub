---
title: Ingeniería de prompts
description: Creación de prompts efectivos para dirigir la salida del LLM.
keywords: [prompt engineering, prompting, in-context learning]
---

# Ingeniería de prompts

## Definición

El prompt engineering es la práctica de diseñar texto de entrada (prompts) para obtener el comportamiento deseado de los LLMs: task format, few-shot examples, chain-of-thought, role-playing, and constraints.

Es the primary way to steer [LLMs](/docs/llms) without [fine-tuning](/docs/llms/fine-tuning): you control context, format, and examples in the prompt. Combined with [RAG](/docs/rag), prompts often include retrieved passages; with [agents](/docs/agents), they define tool use and razonamiento style.

## Cómo funciona

```mermaid
flowchart LR
  Prompt[Prompt] --> LLM[LLM]
  Examples[Examples] --> LLM
  LLM --> Output[Output]
```

Se compone un **prompt** (mensaje de sistema, descripción de tarea, restricciones) y opcionalmente **ejemplos** (few-shot). El **LLM** takes this as input and produce an **output**. **Zero-shot** uses only instructions; **few-shot** adds example input-output pairs so the model infers the task. **Chain-of-thought** (see [CoT](/docs/reasoning-patterns/cot)) asks the model to “think paso a paso” to improve razonamiento. **Structured output** (por ej. “respond in JSON”) can be enforced via parsing or API options. Iterate on prompt wording and examples, and evaluate on a dev set to improve reliability.

## Casos de uso

Prompt engineering matters whenever you call an LLM: it shapes behavior, format, and razonamiento without changing weights.

- Steering chat and task completion (role, format, examples)
- Eliciting razonamiento (chain-of-thought) for math or logic
- Constraining outputs (JSON, length, tone) for APIs or UX

## Documentación externa

- [OpenAI – Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic – Prompt diseño](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

## Ver también

- [LLMs](/docs/llms)
- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [RAG](/docs/rag)
