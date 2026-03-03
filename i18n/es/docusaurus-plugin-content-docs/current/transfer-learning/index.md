---
title: Aprendizaje por transferencia
description: Reusing pretrained models for new tasks.
keywords: [transfer learning, pretraining, fine-tuning]
---

# Aprendizaje por transferencia

## Definición

El transfer learning reutiliza conocimiento de una tarea o dominio fuente to improve learning on a target task with limited data. Modelos preentrenados (por ej. ImageNet, BERT) are fine-tuned on downstream tasks.

Es standard in [NLP](/docs/nlp) (por ej. BERT, GPT) and [vision](/docs/cv) (por ej. ImageNet backbones). When the target has little labeled data, starting from a **source model** and [fine-tuning](/docs/llms/fine-tuning) on **target data** is much more data-efficient than training from scratch. See [few-shot](/docs/few-shot-learning) and [zero-shot](/docs/zero-shot-learning) for the extreme of very few or sin ejemplos objetivo.

## Cómo funciona

Obtain a **source model** (preentrenado en a large dataset, por ej. ImageNet or web text). Take **target data** (your task’s labeled examples) and **fine-tune**: update the model (all parameters or only a subset, por ej. adapter, head) to minimize loss on the target task. El resultado es un **target model**. **Full fine-tuning** updates all weights; **adapter** or **prompt tuning** updates a small number of parameters to save compute and preserve source knowledge. Works best when source and target share useful representations (por ej. same modality, related domains).

## Casos de uso

Transfer learning is standard when you have limited target data and a related pretrained model to adapt.

- Fine-tuning BERT or GPT on domain-specific NLP tasks
- Adapting ImageNet-pretrained models to medical or satellite imagery
- Reusing pretrained representations when target data is limited

## Documentación externa

- [Hugging Face – Transfer learning](https://huggingface.co/course/chapter1/4?fw=pt)
- [TensorFlow – Transfer learning](https://www.tensorflow.org/tutorials/images/transfer_learning)

## Ver también

- [Fine-tuning](/docs/llms/fine-tuning)
- [Few-shot learning](/docs/few-shot-learning)
