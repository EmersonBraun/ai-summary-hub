---
title: Fine-tuning
description: Adapting LLMs to specific tasks and domains.
keywords: [fine-tuning, adaptation, LoRA, instruction tuning]
tags: [intermediate]
authors: [EmersonBraun]
---

# Fine-tuning

## Definition

Fine-tuning continues training a pretrained model on task-specific or domain data. Full fine-tuning updates all parameters; parameter-efficient methods (e.g. LoRA, adapters) update a small subset to reduce cost.

Use it when you need stable, task-specific behavior or style (e.g. domain language, output format) and have enough labeled data. For frequently updated knowledge or one-off questions, [RAG](/docs/rag) or [prompt engineering](/docs/llms/prompt-engineering) are often better. See [LLMs](/docs/llms) for the full training pipeline.

## How it works

```mermaid
flowchart LR
  Base[Base model] --> Train[Train]
  Dataset[Dataset] --> Train
  Train --> FineTuned[Fine-tuned model]
```

You start from a **base model** (e.g. a pretrained [LLM](/docs/llms)) and a **dataset** of task examples. You define a **loss** (e.g. cross-entropy for classification, next-token for generation) and run optimization (e.g. Adam) on your data. The result is a **fine-tuned model** whose weights are updated (fully or only adapters/LoRA). **Instruction tuning** uses (instruction, response) pairs so the model learns to follow prompts; **domain fine-tuning** uses in-domain text or labeled tasks. Validation and early stopping prevent overfitting; often only 1–5% of parameters are updated with LoRA to save compute.

## Use cases

Fine-tuning is the right tool when you need a model to follow a specific style, domain, or task better than prompting alone.

- Adapting a base model to a specific domain (e.g. legal, medical)
- Teaching a consistent output format or style (e.g. JSON, tone)
- Improving performance on a narrow task with limited labeled data

## External documentation

- [Hugging Face – Fine-tune a pretrained model](https://huggingface.co/docs/transformers/training)
- [OpenAI – Fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)

## See also

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/llms/prompt-engineering)
