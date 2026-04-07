---
title: Knowledge distillation
description: Training a small student model to mimic a large teacher.
keywords: [knowledge distillation, distillation, student-teacher]
tags: [advanced]
---

# Knowledge distillation

## Definition

Knowledge distillation trains a smaller student model to match the outputs (and sometimes intermediate representations) of a larger teacher. The student gains from the teacher’s soft labels and can run with less compute.

It is a [model compression](/docs/model-compression) technique that preserves more of the teacher’s behavior than training the student on hard labels alone. Used for BERT → DistilBERT, large [LLMs](/docs/llms) → smaller variants, and [transfer learning](/docs/transfer-learning) from ensembles.

## How it works

```mermaid
flowchart LR
  Teacher[Teacher] --> Logits[Logits]
  Student[Student] --> Match[Match logits]
  HardLabels[Hard labels] --> Match
  Match --> Student
```

The **teacher** (large model) produces **logits** (or embeddings) on training data. The **student** (smaller model) is trained to **match** the teacher’s logits (e.g. KL divergence with temperature scaling) in addition to or instead of **hard labels** (ground truth). Temperature softens the teacher distribution so the student learns from dark knowledge (relative scores across classes). Optionally, intermediate layers or attention can be matched. The student is trained with a mix of distillation loss and task loss; after training it runs with the student’s capacity and latency.

## Use cases

Knowledge distillation fits when you want a small, fast student that approximates a large teacher for deployment.

- Training smaller, faster models that approximate large ones (e.g. BERT → DistilBERT)
- Enabling deployment when the teacher is too heavy for production
- Transferring knowledge from ensembles or from multiple teachers

## External documentation

- [Distilling the Knowledge in a Neural Network (Hinton et al.)](https://arxiv.org/abs/1503.02531)
- [Hugging Face – Distillation](https://huggingface.co/docs/transformers/tasks/distillation)

## See also

- [Model compression](/docs/model-compression)
- [Transfer learning](/docs/transfer-learning)
