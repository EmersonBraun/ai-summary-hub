---
title: Hugging Face
description: Plataforma y bibliotecas para modelos, conjuntos de datos y pipelines.
keywords: [Hugging Face, Transformers, datasets]
---

# Hugging Face

## Definición

Hugging Face provides the [Transformers](/docs/transformers) library, Hub (models and datasets), and tools for training and deployment. Es a central resource for [NLP](/docs/nlp) and [multimodal](/docs/multimodal-ai) models.

Se ejecuta sobre [PyTorch](/docs/frameworks/pytorch) (y TensorFlow/JAX para algunos modelos). Úsalo para cargar modelos preentrenados [BERT](/docs/transformers/bert), [GPT](/docs/transformers/gpt), [LLMs](/docs/llms), and vision models; [fine-tune](/docs/llms/fine-tuning) with the same API; and share your own models and datasets on the Hub. Integrates with [RAG](/docs/rag) and [agents](/docs/agents) via community integrations.

## Cómo funciona

**Instale** `transformers`, `datasets` y opcionalmente `accelerate` (para entrenamiento distribuido y de precisión mixta). **Carad** a pretrained model and tokenizer by name (por ej. `from_pretrained("bert-base-uncased")`); the library downloads from the Hub if needed. **Inference**: call `model(input_ids)` or use pipelines (por ej. text classification, summarization). **Fine-tune**: use the `Trainer` or native PyTorch loops with your dataset; push the resulting model back to the Hub. The Hub hosts model cards, datasets, and spaces (demos). Tokenizers, configs, and model weights are versioned; you can pin versions for reproducibility.

## Casos de uso

Hugging Face is the default for loading, fine-tuning, and sharing NLP and vision models and datasets.

- Loading and fine-tuning pretrained NLP and vision models
- Sharing and discovering models and datasets on the Hub
- Running inference and building pipelines with minimal code

## Documentación externa

- [Hugging Face documentation](https://huggingface.co/docs)
- [Transformers library](https://huggingface.co/docs/transformers)
- [Hugging Face NLP course](https://huggingface.co/learn/nlp-course/)

## Ver también

- [Transformers](/docs/transformers)
- [LLMs](/docs/llms)
- [Frameworks](/docs/frameworks/pytorch)
