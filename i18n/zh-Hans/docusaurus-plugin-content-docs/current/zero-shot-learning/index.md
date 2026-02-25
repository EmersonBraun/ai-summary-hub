---
title: Zero-shot learning
description: Performing tasks without task-specific training examples.
keywords: [zero-shot, generalization, prompts]
---

# Zero-shot learning

## Definition

Zero-shot learning is solving a task without any labeled examples for that task. LLMs do this via prompting; vision models can do it with text-conditioned classifiers (e.g. CLIP).

No [fine-tuning](/docs/llms/fine-tuning) or [few-shot](/docs/few-shot-learning) examples are used; the task is specified only by description or by mapping to a shared space (e.g. text). [LLMs](/docs/llms) excel at zero-shot for many NLP tasks; CLIP and similar models enable zero-shot image classification from text. Quality depends on how well pretraining covered the task or similar ones.

## How it works

The **task** is described in natural language (e.g. [prompt](/docs/llms/prompt-engineering): “Classify the sentiment as positive or negative”) or via a shared representation (e.g. attribute vectors, text embeddings). **Input** (e.g. a sentence or image) is fed to the **model** along with the task description. The **model** produces an **output** (e.g. label, summary) using only what it learned at pretraining—no gradient updates on the target task. For CLIP: image and text are embedded in a shared space; zero-shot classification is done by comparing the image embedding to class name embeddings. For LLMs: the prompt states the task and format; the model completes accordingly.

## Use cases

Zero-shot learning fits when you want to run a task with no target-task training—only a task description (e.g. prompt or class names).

- LLM tasks via prompts (e.g. classification, summarization) without fine-tuning
- CLIP-style image classification from text descriptions
- New categories or languages without labeled examples

## External documentation

- [Learning Transferable Visual Models (CLIP) (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [OpenAI – Zero-shot classification](https://platform.openai.com/docs/guides/classification)

## See also

- [Few-shot learning](/docs/few-shot-learning)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [LLMs](/docs/llms)
