---
title: Hugging Face
description: Plateforme et bibliothèques pour modèles, jeux de données et pipelines.
keywords: [Hugging Face, Transformers, datasets]
---

# Hugging Face

## Définition

Hugging Face provides the [Transformers](/docs/transformers) library, Hub (models and datasets), and tools for training and deployment. C'est a central resource for [NLP](/docs/nlp) and [multimodal](/docs/multimodal-ai) models.

Il s'exécute sur [PyTorch](/docs/frameworks/pytorch) (and TensorFlow/JAX for some models). Use it to load pretrained [BERT](/docs/transformers/bert), [GPT](/docs/transformers/gpt), [LLMs](/docs/llms), and vision models; [fine-tune](/docs/llms/fine-tuning) with the same API; and share your own models and datasets on the Hub. Integrates with [RAG](/docs/rag) and [agents](/docs/agents) via community integrations.

## Comment ça fonctionne

**Installez** `transformers`, `datasets` et optionnellement `accelerate` (pour l'entraînement distribué et en précision mixte). **Charad** a pretrained model and tokenizer by name (par ex. `from_pretrained("bert-base-uncased")`); the library downloads from the Hub if needed. **Inference**: call `model(input_ids)` or use pipelines (par ex. text classification, summarization). **Fine-tune**: use the `Trainer` or native PyTorch loops with your dataset; push the resulting model back to the Hub. The Hub hosts model cards, datasets, and spaces (demos). Tokenizers, configs, and model weights are versioned; you can pin versions for reproducibility.

## Cas d'utilisation

Hugging Face is the default for loading, fine-tuning, and sharing NLP and vision models and datasets.

- Loading and fine-tuning pretrained NLP and vision models
- Sharing and discovering models and datasets on the Hub
- Running inference and building pipelines with minimal code

## Documentation externe

- [Hugging Face documentation](https://huggingface.co/docs)
- [Transformers library](https://huggingface.co/docs/transformers)
- [Hugging Face NLP course](https://huggingface.co/learn/nlp-course/)

## Voir aussi

- [Transformers](/docs/transformers)
- [LLMs](/docs/llms)
- [Frameworks](/docs/frameworks/pytorch)
