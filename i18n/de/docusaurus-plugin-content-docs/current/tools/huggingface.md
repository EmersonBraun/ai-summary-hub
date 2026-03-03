---
title: Hugging Face
description: Plattform und Bibliotheken für Modelle, Datensätze und Pipelines.
keywords: [Hugging Face, Transformers, datasets]
---

# Hugging Face

## Definition

Hugging Face stellt die [Transformers](/docs/transformers) library, Hub (models and datasets), and tools for training und Bereitstellung. Es ist ein central resource for [NLP](/docs/nlp) and [multimodal](/docs/multimodal-ai) models.

Es läuft auf [PyTorch](/docs/frameworks/pytorch) (und TensorFlow/JAX für einige Modelle). Verwenden Sie es zum Laden vortrainierter [BERT](/docs/transformers/bert), [GPT](/docs/transformers/gpt), [LLMs](/docs/llms), and vision models; [fine-tune](/docs/llms/fine-tuning) mit dem same API; and share your own models and datasets auf dem Hub. Integrates with [RAG](/docs/rag) and [agents](/docs/agents) via community integrations.

## Funktionsweise

**Install** `transformers`, `datasets`, und optional `accelerate` (für verteiltes und Mixed-Precision-Training). **Load** ein vortrainiertes model and tokenizer by name (z. B. `from_pretrained("bert-base-uncased")`); the library downloads aus dem Hub if needed. **Inference**: call `model(input_ids)` or use pipelines (z. B. text classification, summarization). **Fine-tune**: use the `Trainer` or native PyTorch loops with your dataset; push the resulting model back to the Hub. The Hub hosts model cards, datasets, and spaces (demos). Tokenizers, configs, and model weights are versioned; you can pin versions for reproducibility.

## Anwendungsfälle

Hugging Face ist der Standard für loading, Feinabstimmung, and sharing NLP and vision models and datasets.

- Loading and Feinabstimmung pretrained NLP and vision models
- Sharing and discovering models and datasets auf dem Hub
- Running inference and building pipelines mit minimalem code

## Externe Dokumentation

- [Hugging Face documentation](https://huggingface.co/docs)
- [Transformers library](https://huggingface.co/docs/transformers)
- [Hugging Face NLP course](https://huggingface.co/learn/nlp-course/)

## Siehe auch

- [Transformers](/docs/transformers)
- [LLMs](/docs/llms)
- [Frameworks](/docs/frameworks/pytorch)
