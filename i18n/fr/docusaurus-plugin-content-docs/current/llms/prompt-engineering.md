---
title: Ingénierie des prompts
description: Création de prompts efficaces pour guider la sortie des LLM.
keywords: [prompt engineering, prompting, in-context learning]
---

# Ingénierie des prompts

## Définition

Le prompt engineering est la pratique de concevoir du texte d'entrée (prompts) pour obtenir le comportement souhaité des LLMs: task format, few-shot examples, chain-of-thought, role-playing, and constraints.

C'est the primary way to steer [LLMs](/docs/llms) without [fine-tuning](/docs/llms/fine-tuning): you control context, format, and examples in the prompt. Combined with [RAG](/docs/rag), prompts often include retrieved passages; with [agents](/docs/agents), they define tool use and raisonnement style.

## Comment ça fonctionne

```mermaid
flowchart LR
  Prompt[Prompt] --> LLM[LLM]
  Examples[Examples] --> LLM
  LLM --> Output[Output]
```

On compose un **prompt** (message système, description de tâche, contraintes) et optionnellement des **exemples** (few-shot). Le **LLM** takes this as input and produces an **output**. **Zero-shot** uses only instructions; **few-shot** adds example input-output pairs so the model infers the task. **Chain-of-thought** (see [CoT](/docs/reasoning-patterns/cot)) asks the model to “think étape par étape” to improve raisonnement. **Structured output** (par ex. “respond in JSON”) can be enforced via parsing or API options. Iterate on prompt wording and examples, and evaluate on a dev set to improve reliability.

## Cas d'utilisation

Prompt engineering matters whenever you call an LLM: it shapes behavior, format, and raisonnement without changing weights.

- Steering chat and task completion (role, format, examples)
- Eliciting raisonnement (chain-of-thought) for math or logic
- Constraining outputs (JSON, length, tone) for APIs or UX

## Documentation externe

- [OpenAI – Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic – Prompt conception](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

## Voir aussi

- [LLMs](/docs/llms)
- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [RAG](/docs/rag)
