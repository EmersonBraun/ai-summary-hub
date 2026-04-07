---
title: Fine-tuning
description: Adaptación de modelos preentrenados a tareas o dominios específicos.
keywords: [fine-tuning, adaptation, LoRA, ajuste de instrucciones]
---

# Fine-tuning

## Definición

El afinamiento continúa el entrenamiento de un modelo preentrenado con datos específicos de tarea o dominio. Full fine-tuning updates all parameters; parameter-efficient methods (por ej. LoRA, adapters) update a small subset to reduce cost.

Úselo cuando you need stable, task-specific behavior or style (por ej. domain language, output format) and have enough labeled data. For frequently updated knowledge or one-off questions, [RAG](/docs/rag) or [prompt engineering](/docs/prompt-engineering) are often better. See [LLMs](/docs/llms) for the full training pipeline.

## Cómo funciona

```mermaid
flowchart LR
  Base[Base model] --> Train[Train]
  Dataset[Dataset] --> Train
  Train --> FineTuned[Fine-tuned model]
```

You start from a **base model** (por ej. a pretrained [LLM](/docs/llms)) and a **dataset** of task examples. You define a **loss** (por ej. cross-entropy for classification, next-token for generation) and run optimization (por ej. Adam) on your data. El resultado es un **fine-tuned model** whose weights are updated (fully or only adapters/LoRA). **Instruction tuning** uses (instruction, response) pairs so the model learns to follow prompts; **domain fine-tuning** uses in-domain text or labeled tasks. Validation and early stopping prevent overfitting; often only 1–5% of parameters are updated with LoRA to save compute.

## Casos de uso

Fine-tuning is the right tool when you need a model to follow a specific style, domain, or task better than prompting alone.

- Adapting a base model to a specific domain (por ej. legal, medical)
- Teaching a consistent output format or style (por ej. JSON, tone)
- Improving performance on a narrow task with limited labeled data

## Documentación externa

- [Hugging Face – Fine-tune a pretrained model](https://huggingface.co/docs/transformers/training)
- [OpenAI – Fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)

## Ver también

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
