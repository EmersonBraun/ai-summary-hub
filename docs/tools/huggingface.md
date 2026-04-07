---
title: Hugging Face
description: Platform and libraries for models, datasets, and pipelines.
keywords: [Hugging Face, Transformers, datasets]
tags: [intermediate]
authors: [EmersonBraun]
---

# Hugging Face

## Definition

Hugging Face provides the [Transformers](/docs/transformers) library, Hub (models and datasets), and tools for training and deployment. It is a central resource for [NLP](/docs/nlp) and [multimodal](/docs/multimodal-ai) models.

It runs on [PyTorch](/docs/frameworks/pytorch) (and TensorFlow/JAX for some models). Use it to load pretrained [BERT](/docs/transformers/bert), [GPT](/docs/transformers/gpt), [LLMs](/docs/llms), and vision models; [fine-tune](/docs/llms/fine-tuning) with the same API; and share your own models and datasets on the Hub. Integrates with [RAG](/docs/rag) and [agents](/docs/agents) via community integrations.

## How it works

**Install** `transformers`, `datasets`, and optionally `accelerate` (for distributed and mixed-precision training). **Load** a pretrained model and tokenizer by name (e.g. `from_pretrained("bert-base-uncased")`); the library downloads from the Hub if needed. **Inference**: call `model(input_ids)` or use pipelines (e.g. text classification, summarization). **Fine-tune**: use the `Trainer` or native PyTorch loops with your dataset; push the resulting model back to the Hub. The Hub hosts model cards, datasets, and spaces (demos). Tokenizers, configs, and model weights are versioned; you can pin versions for reproducibility.

## Use cases

Hugging Face is the default for loading, fine-tuning, and sharing NLP and vision models and datasets.

- Loading and fine-tuning pretrained NLP and vision models
- Sharing and discovering models and datasets on the Hub
- Running inference and building pipelines with minimal code

## External documentation

- [Hugging Face documentation](https://huggingface.co/docs)
- [Transformers library](https://huggingface.co/docs/transformers)
- [Hugging Face NLP course](https://huggingface.co/learn/nlp-course/)

## See also

- [Transformers](/docs/transformers)
- [LLMs](/docs/llms)
- [Frameworks](/docs/frameworks/pytorch)
