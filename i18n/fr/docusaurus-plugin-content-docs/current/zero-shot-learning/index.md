---
title: Apprentissage zero-shot
description: Performing tasks without task-specific training examples.
keywords: [zero-shot, generalization, prompts]
---

# Apprentissage zero-shot

## Définition

Zero-shot learning is solving a task sans aucun exemple étiqueté pour cette tâche. les LLMs font cela via le prompting; vision models can do it with text-conditioned classifiers (par ex. CLIP).

No [fine-tuning](/docs/llms/fine-tuning) or [few-shot](/docs/few-shot-learning) examples are used; the task is specified only by description or by mapping to a shared space (par ex. text). [LLMs](/docs/llms) excel at zero-shot for many NLP tasks; CLIP and similar models enable zero-shot image classification from text. Quality depends on how well pretraining covered the task or similar ones.

## Comment ça fonctionne

The **task** is described in natural language (par ex. [prompt](/docs/prompt-engineering): “Classify the sentiment as positive or negative”) or via a shared representation (par ex. attribute vectors, text embeddings). **Input** (par ex. a sentence or image) is fed to the **model** along with the task description. The **model** produces an **output** (par ex. label, summary) using only what it learned at pretraining—no gradient updates on the target task. For CLIP: image and text are embedded in a shared space; zero-shot classification is done by comparing the image embedding to class name embeddings. For LLMs: the prompt states the task and format; the model completes accordingly.

## Cas d'utilisation

Zero-shot learning fits when you want to run a task with no target-task training—only a task description (par ex. prompt or class names).

- LLM tasks via prompts (par ex. classification, summarization) without fine-tuning
- CLIP-style image classification from text descriptions
- New categories or languages without labeled examples

## Documentation externe

- [Learning Transferable Visual Models (CLIP) (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [OpenAI – Zero-shot classification](https://platform.openai.com/docs/guides/classification)

## Voir aussi

- [Few-shot learning](/docs/few-shot-learning)
- [Prompt engineering](/docs/prompt-engineering)
- [LLMs](/docs/llms)
