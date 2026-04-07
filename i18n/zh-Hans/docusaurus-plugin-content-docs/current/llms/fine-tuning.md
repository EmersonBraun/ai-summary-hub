---
title: 微调
description: 将预训练模型适配到特定任务或领域。
keywords: [fine-tuning, adaptation, LoRA, 指令调优]
---

# 微调

## 定义

微调在任务特定或领域数据上继续训练预训练模型。 Full fine-tuning updates all parameters; parameter-efficient methods (例如 LoRA, adapters) update a small subset to reduce cost.

当…时使用 you need stable, task-specific behavior or style (例如 domain language, output format) and have enough labeled data. For frequently updated knowledge or one-off questions, [RAG](/docs/rag) or [prompt engineering](/docs/prompt-engineering) are often better. See [LLMs](/docs/llms) for the full training pipeline.

## 工作原理

```mermaid
flowchart LR
  Base[Base model] --> Train[Train]
  Dataset[Dataset] --> Train
  Train --> FineTuned[Fine-tuned model]
```

You start from a **base model** (例如 a pretrained [LLM](/docs/llms)) and a **dataset** of task examples. You define a **loss** (例如 cross-entropy for classification, next-token for generation) and run optimization (例如 Adam) on your data. 结果是一个 **fine-tuned model** whose weights are updated (fully or only adapters/LoRA). **Instruction tuning** uses (instruction, response) pairs so the model learns to follow prompts; **domain fine-tuning** uses in-domain text or labeled tasks. Validation and early stopping prevent overfitting; often only 1–5% of parameters are updated with LoRA to save compute.

## 应用场景

Fine-tuning is the right tool when you need a model to follow a specific style, domain, or task better than prompting alone.

- Adapting a base model to a specific domain (例如 legal, medical)
- Teaching a consistent output format or style (例如 JSON, tone)
- Improving performance on a narrow task with limited labeled data

## 外部文档

- [Hugging Face – Fine-tune a pretrained model](https://huggingface.co/docs/transformers/training)
- [OpenAI – Fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)

## 另请参阅

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
