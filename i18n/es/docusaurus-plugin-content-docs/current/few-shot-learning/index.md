---
title: Aprendizaje con pocos ejemplos
description: Learning from very few examples.
keywords: [few-shot, meta-learning, MAML]
---

# Aprendizaje con pocos ejemplos

## Definición

El aprendizaje few-shot busca adaptarse rápidamente a partir de un número pequeño de ejemplos etiquetados (por ej. 1–5 por clase). Meta-learning (por ej. MAML) trains models to be good at few-shot adaptation.

Se sitúa entre [transfer learning](/docs/transfer-learning) (más datos objetivo) and [zero-shot](/docs/zero-shot-learning) (sin ejemplos objetivo). [LLMs](/docs/llms) do few-shot implicitly via in-context examples in the prompt; classical few-shot uses episodic meta-training (por ej. MAML) so the model learns to adapt from a support set.

## Cómo funciona

```mermaid
flowchart LR
  Support[Support set] --> Adapt[Adapt]
  Adapt --> Query[Query set]
  Query --> Predict[Predict]
```

Each task has a **support set** (pocos ejemplos etiquetados, por ej. 1–5 por clase) and a **query set** (examples to predict). **Adapt**: the model uses the support set to adapt (por ej. compute prototypes, or take a few gradient steps in MAML). **Predict**: the adapted model predicts labels for the query set. **Episodic training**: sample many few-shot tasks from a meta-train set; for each, adapt on the task support set and optimize so that predictions on the query set improve. At test time, the model gets a new task’s support set and predicts on its query set. For LLMs, "adapt" is just conditioning on the support examples in the prompt (in-context few-shot).

## Casos de uso

Few-shot learning applies when you have only a handful of examples por clase or task (including in-context LLM prompts).

- Classifying rare classes with only a pocos ejemplos etiquetados
- LLM in-context learning (por ej. 1–5 examples in the prompt)
- Rapid adaptation in robotics or personalization with minimal data

## Documentación externa

- [Model-Agnostic Meta-Learning (MAML) (Finn et al.)](https://arxiv.org/abs/1703.03400)
- [Hugging Face – Few-shot learning](https://huggingface.co/docs/transformers/tasks/summarization#few-shot-summarization)

## Ver también

- [Zero-shot learning](/docs/zero-shot-learning)
- [LLMs](/docs/llms)
- [Transfer learning](/docs/transfer-learning)
