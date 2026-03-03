---
title: Transfer Learning
description: Reusing pretrained models for new tasks.
keywords: [transfer learning, pretraining, Feinabstimmung]
---

# Transfer Learning

## Definition

Transfer Learning nutzt Wissen aus einer Quellaufgabe oder -domäne wieder to improve learning on a target task mit begrenztem data. Vortrainierte Modelle (z. B. ImageNet, BERT) are feinabgestimmt on downstream tasks.

Es ist standard in [NLP](/docs/nlp) (z. B. BERT, GPT) and [vision](/docs/cv) (z. B. ImageNet backbones). When the target has little labeled data, starting from a **source model** and [Feinabstimmung](/docs/llms/fine-tuning) on **target data** is much more data-efficient than training von Grund auf. See [few-shot](/docs/few-shot-learning) and [zero-shot](/docs/zero-shot-learning) für den extreme of very few or keine Zielbeispiele.

## Funktionsweise

Obtain a **source model** (vortrainiert auf a large dataset, z. B. ImageNet or web text). Take **target data** (your task’s labeled examples) and **fine-tune**: update the model (all parameters or only a subset, z. B. adapter, head) to minimize loss auf dem target task. Das Ergebnis ist ein **target model**. **Full Feinabstimmung** updates all weights; **adapter** or **prompt tuning** updates a small number of parameters to save compute and preserve source knowledge. Works best when source and target share useful representations (z. B. same modality, related domains).

## Anwendungsfälle

Transfer learning is standard wenn Sie have limited target data and a related pretrained model to adapt.

- Fine-tuning BERT or GPT on domain-specific NLP tasks
- Adapting ImageNet-pretrained models to medical or satellite imagery
- Reusing pretrained representations when target data is limited

## Externe Dokumentation

- [Hugging Face – Transfer learning](https://huggingface.co/course/chapter1/4?fw=pt)
- [TensorFlow – Transfer learning](https://www.tensorflow.org/tutorials/images/transfer_learning)

## Siehe auch

- [Fine-tuning](/docs/llms/fine-tuning)
- [Few-shot learning](/docs/few-shot-learning)
