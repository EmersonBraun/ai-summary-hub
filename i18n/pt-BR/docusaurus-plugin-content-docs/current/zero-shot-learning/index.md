---
title: Aprendizado zero-shot
description: Performing tasks without task-specific training examples.
keywords: [zero-shot, generalization, prompts]
---

# Aprendizado zero-shot

## Definição

Zero-shot learning é resolver uma tarefa sem nenhum exemplo rotulado para essa tarefa. Os LLMs fazem isso via prompting; modelo de vision models can do it with text-conditioned classifiers (por ex. CLIP).

No [fine-tuning](/docs/llms/fine-tuning) or [few-shot](/docs/few-shot-learning) examples are used; the task is specified only by description or by mapping to a shared space (por ex. text). [LLMs](/docs/llms) excel at zero-shot for many NLP tasks; CLIP and similar models enable zero-shot image classification from text. Quality depends on how well pretraining covered the task or similar ones.

## Como funciona

The **task** is described in natural language (por ex. [prompt](/docs/prompt-engineering): “Classify the sentiment as positive or negative”) or via a shared representation (por ex. attribute vectors, text embeddings). **Input** (por ex. a sentence or image) is fed to the **model** along with the task description. The **model** produces an **output** (por ex. label, summary) using only what it learned at pretraining—no gradient updates on the target task. For CLIP: image and text are embedded in a shared space; zero-shot classification is done by comparing the image embedding to class name embeddings. For LLMs: the prompt states the task and format; the model completes accordingly.

## Casos de uso

Zero-shot learning fits when you want to run a task with no target-task training—only a task description (por ex. prompt or class names).

- LLM tasks via prompts (por ex. classification, summarization) without fine-tuning
- CLIP-style image classification from text descriptions
- New categories or languages without labeled examples

## Documentação externa

- [Learning Transferable Visual Models (CLIP) (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [OpenAI – Zero-shot classification](https://platform.openai.com/docs/guides/classification)

## Veja também

- [Few-shot learning](/docs/few-shot-learning)
- [Prompt engineering](/docs/prompt-engineering)
- [LLMs](/docs/llms)
