---
title: 零样本学习
description: Performing tasks without task-specific training examples.
keywords: [zero-shot, generalization, prompts]
---

# 零样本学习

## 定义

Zero-shot learning is solving a task 没有该任务的任何标注示例. LLM 通过提示实现这一点; vision models can do it with text-conditioned classifiers (例如 CLIP).

No [fine-tuning](/docs/llms/fine-tuning) or [few-shot](/docs/few-shot-learning) examples are used; the task is specified only by description or by mapping to a shared space (例如 text). [LLMs](/docs/llms) excel at zero-shot for many NLP tasks; CLIP and similar models enable zero-shot image classification from text. Quality depends on how well pretraining covered the task or similar ones.

## 工作原理

The **task** is described in natural language (例如 [prompt](/docs/llms/prompt-engineering): “Classify the sentiment as positive or negative”) or via a shared representation (例如 attribute vectors, text embeddings). **Input** (例如 a sentence or image) is fed to the **model** along with the task description. The **model** produces an **output** (例如 label, summary) using only what it learned at pretraining—no gradient updates on the target task. For CLIP: image and text are embedded in a shared space; zero-shot classification is done by comparing the image embedding to class name embeddings. For LLMs: the prompt states the task and format; the model completes accordingly.

## 应用场景

Zero-shot learning fits when you want to run a task with no target-task training—only a task description (例如 prompt or class names).

- LLM tasks via prompts (例如 classification, summarization) without fine-tuning
- CLIP-style image classification from text descriptions
- New categories or languages without labeled examples

## 外部文档

- [Learning Transferable Visual Models (CLIP) (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [OpenAI – Zero-shot classification](https://platform.openai.com/docs/guides/classification)

## 另请参阅

- [Few-shot learning](/docs/few-shot-learning)
- [Prompt engineering](/docs/llms/prompt-engineering)
- [LLMs](/docs/llms)
