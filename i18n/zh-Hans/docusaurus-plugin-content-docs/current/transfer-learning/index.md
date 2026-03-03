---
title: 迁移学习
description: Reusing pretrained models for new tasks.
keywords: [transfer learning, pretraining, fine-tuning]
---

# 迁移学习

## 定义

Transfer learning 重用源任务或领域的知识来改善在数据有限的目标任务上的学习. 预训练模型 (例如 ImageNet, BERT) are fine-tuned on downstream tasks.

它是 standard in [NLP](/docs/nlp) (例如 BERT, GPT) and [vision](/docs/cv) (例如 ImageNet backbones). When the target has little labeled data, starting from a **source model** and [fine-tuning](/docs/llms/fine-tuning) on **target data** is much more data-efficient than training from scratch. See [few-shot](/docs/few-shot-learning) and [zero-shot](/docs/zero-shot-learning) for the extreme of very few or no target examples.

## 工作原理

Obtain a **source model** (预训练于 a large dataset, 例如 ImageNet or web text). Take **target data** (your task’s labeled examples) and **fine-tune**: update the model (all parameters or only a subset, 例如 adapter, head) to minimize loss on the target task. 结果是一个 **target model**. **Full fine-tuning** updates all weights; **adapter** or **prompt tuning** updates a small number of parameters to save compute and preserve source knowledge. Works best when source and target share useful representations (例如 same modality, related domains).

## 应用场景

Transfer learning is standard when you have limited target data and a related pretrained model to adapt.

- Fine-tuning BERT or GPT on domain-specific NLP tasks
- Adapting ImageNet-pretrained models to medical or satellite imagery
- Reusing pretrained representations when target data is limited

## 外部文档

- [Hugging Face – Transfer learning](https://huggingface.co/course/chapter1/4?fw=pt)
- [TensorFlow – Transfer learning](https://www.tensorflow.org/tutorials/images/transfer_learning)

## 另请参阅

- [Fine-tuning](/docs/llms/fine-tuning)
- [Few-shot learning](/docs/few-shot-learning)
