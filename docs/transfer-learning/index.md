---
title: Transfer learning
description: Reusing pretrained models for new tasks.
keywords: [transfer learning, pretraining, fine-tuning]
tags: [beginner]
authors: [EmersonBraun]
---

# Transfer learning

## Definition

Transfer learning reuses knowledge from a source task or domain to improve learning on a target task with limited data. Pretrained models (e.g. ImageNet, BERT) are fine-tuned on downstream tasks.

It is standard in [NLP](/docs/nlp) (e.g. BERT, GPT) and [vision](/docs/cv) (e.g. ImageNet backbones). When the target has little labeled data, starting from a **source model** and [fine-tuning](/docs/llms/fine-tuning) on **target data** is much more data-efficient than training from scratch. See [few-shot](/docs/few-shot-learning) and [zero-shot](/docs/zero-shot-learning) for the extreme of very few or no target examples.

## How it works

Obtain a **source model** (pretrained on a large dataset, e.g. ImageNet or web text). Take **target data** (your task’s labeled examples) and **fine-tune**: update the model (all parameters or only a subset, e.g. adapter, head) to minimize loss on the target task. The result is a **target model**. **Full fine-tuning** updates all weights; **adapter** or **prompt tuning** updates a small number of parameters to save compute and preserve source knowledge. Works best when source and target share useful representations (e.g. same modality, related domains).

## Use cases

Transfer learning is standard when you have limited target data and a related pretrained model to adapt.

- Fine-tuning BERT or GPT on domain-specific NLP tasks
- Adapting ImageNet-pretrained models to medical or satellite imagery
- Reusing pretrained representations when target data is limited

## External documentation

- [Hugging Face – Transfer learning](https://huggingface.co/course/chapter1/4?fw=pt)
- [TensorFlow – Transfer learning](https://www.tensorflow.org/tutorials/images/transfer_learning)

## See also

- [Fine-tuning](/docs/llms/fine-tuning)
- [Few-shot learning](/docs/few-shot-learning)
