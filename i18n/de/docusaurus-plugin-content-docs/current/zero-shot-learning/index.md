---
title: Zero-Shot Learning
description: Performing tasks without task-specific training examples.
keywords: [zero-shot, generalization, prompts]
---

# Zero-Shot Learning

## Definition

Zero-Shot-Lernen löst eine Aufgabe ohne gelabelte Beispiele für diese Aufgabe. LLMs tun dies über Prompting; Bildmodelle können dies mit textbedingtenoned classifiers (z. B. CLIP).

No [Feinabstimmung](/docs/llms/fine-tuning) or [few-shot](/docs/few-shot-learning) examples are used; die Aufgabe wird nur durch Beschreibung oder durch Zuordnung spezifiziertping to a shared space (z. B. text). [LLMs](/docs/llms) excel at zero-shot for many NLP tasks; CLIP and similar models enable zero-shot image classification from text. Quality depends on how well pretraining covered the task or similar ones.

## Funktionsweise

The **task** is described in natural language (z. B. [prompt](/docs/prompt-engineering): “Classify the sentiment as positive or negative”) or via a shared representation (z. B. attribute vectors, text embeddings). **Input** (z. B. a sentence or image) is fed to the **model** along mit dem task description. The **model** erzeugt an **output** (z. B. label, summary) using only what it learned at pretraining—no gradient updates auf dem target task. For CLIP: image and text are embedded in a shared space; zero-shot classification is done by comparing the image embedding to class name embeddings. For LLMs: the prompt states the task and format; the model completes accordingly.

## Anwendungsfälle

Zero-shot learning passt, wenn you want to run a task with no target-task training—only a task description (z. B. prompt or class names).

- LLM tasks via prompts (z. B. classification, summarization) without Feinabstimmung
- CLIP-style image classification from text descriptions
- New categories or languages without labeled examples

## Externe Dokumentation

- [Learning Transferable Visual Models (CLIP) (Radford et al.)](https://arxiv.org/abs/2103.00020)
- [OpenAI – Zero-shot classification](https://platform.openai.com/docs/guides/classification)

## Siehe auch

- [Few-shot learning](/docs/few-shot-learning)
- [Prompt engineering](/docs/prompt-engineering)
- [LLMs](/docs/llms)
