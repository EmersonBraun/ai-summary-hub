---
title: Aprendizaje zero-shot
description: Performing tasks without task-specific training examples.
keywords: [zero-shot, generalization, prompts]
---

# Aprendizaje zero-shot

## Definición

El aprendizaje zero-shot resuelve una tarea sin ejemplos etiquetados para esa tarea. los LLMs hacen esto mediante prompting; vision models can do it with text-conditioned classifiers (por ej. CLIP).

No [fine-tuning](/docs/llms/fine-tuning) or [few-shot](/docs/few-shot-learning) examples are used; la tarea se especifica solo por descripción o por asignaciónping to a shared space (por ej. text). [LLMs](/docs/llms) excel at zero-shot for many NLP tasks; CLIP and similar models enable zero-shot image classification from text. Quality depends on how well pretraining covered the task or similar ones.

## Cómo funciona

The **task** is described in natural language (por ej. [prompt](/docs/llms/prompt-engineering): “Classify the sentiment as positive or negative”) or via a shared representation (por ej. attribute vectors, text embeddings). **Input** (por ej. a sentence or image) is fed to the **model** along with the task description. The **model** produce an **output** (por ej. label, summary) using only what it learned at pretraining—no gradient updates on the target task. For CLIP: image and text are embedded in a shared space; zero-shot classification is done by comparing the image embedding to class name embeddings. For LLMs: the prompt states the task and format; the model completes accordingly.

## Casos de uso

Zero-shot learning fits when you want to run a task with no target-task training—only a task description (por ej. prompt or class names).

- LLM tasks via prompts (por ej. classification, summarization) without fine-tuning
- CLIP-style image classification from text descriptions
- New categories or languages without labeled examples

## Documentación externa

- [Learning Transferable Visual Models (CLIP) (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [OpenAI – Zero-shot classification](https://platform.openai.com/docs/guides/classification)

## Ver también

- [Few-shot learning](/docs/few-shot-learning)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [LLMs](/docs/llms)
