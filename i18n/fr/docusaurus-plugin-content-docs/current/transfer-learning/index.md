---
title: Apprentissage par transfert
description: Reusing pretrained models for new tasks.
keywords: [transfer learning, pretraining, fine-tuning]
---

# Apprentissage par transfert

## Définition

Transfer learning réutilise les connaissances d'une tâche ou d'un domaine source pour améliorer l'apprentissage sur une tâche cible avec des données limitées. Les modèles pré-entraînés (par ex. ImageNet, BERT) are fine-tuned on downstream tasks.

C'est standard in [NLP](/docs/nlp) (par ex. BERT, GPT) and [vision](/docs/cv) (par ex. ImageNet backbones). When the target has little labeled data, starting from a **source model** and [fine-tuning](/docs/llms/fine-tuning) on **target data** is much more data-efficient than training from scratch. See [few-shot](/docs/few-shot-learning) and [zero-shot](/docs/zero-shot-learning) for the extreme of very few or no target examples.

## Comment ça fonctionne

Obtain a **source model** (pré-entraîné sur a large dataset, par ex. ImageNet or web text). Take **target data** (your task’s labeled examples) and **fine-tune**: update the model (all parameters or only a subset, par ex. adapter, head) to minimize loss on the target task. Le résultat est un **target model**. **Full fine-tuning** updates all weights; **adapter** or **prompt tuning** updates a small number of parameters to save compute and preserve source knowledge. Works best when source and target share useful representations (par ex. same modality, related domains).

## Cas d'utilisation

Transfer learning is standard when you have limited target data and a related pretrained model to adapt.

- Fine-tuning BERT or GPT on domain-specific NLP tasks
- Adapting ImageNet-pretrained models to medical or satellite imagery
- Reusing pretrained representations when target data is limited

## Documentation externe

- [Hugging Face – Transfer learning](https://huggingface.co/course/chapter1/4?fw=pt)
- [TensorFlow – Transfer learning](https://www.tensorflow.org/tutorials/images/transfer_learning)

## Voir aussi

- [Fine-tuning](/docs/llms/fine-tuning)
- [Few-shot learning](/docs/few-shot-learning)
