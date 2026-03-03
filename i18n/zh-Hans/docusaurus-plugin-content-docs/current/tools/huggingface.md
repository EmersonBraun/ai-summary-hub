---
title: Hugging Face
description: 用于模型、数据集和管道的平台与库。
keywords: [Hugging Face, Transformers, datasets]
---

# Hugging Face

## 定义

Hugging Face provides the [Transformers](/docs/transformers) library, Hub (models and datasets), and tools for training and deployment. 它是 a central resource for [NLP](/docs/nlp) and [multimodal](/docs/multimodal-ai) models.

它运行在 [PyTorch](/docs/frameworks/pytorch) (and TensorFlow/JAX for some models). Use it to load pretrained [BERT](/docs/transformers/bert), [GPT](/docs/transformers/gpt), [LLMs](/docs/llms), and vision models; [fine-tune](/docs/llms/fine-tuning) with the same API; and share your own models and datasets on the Hub. Integrates with [RAG](/docs/rag) and [agents](/docs/agents) via community integrations.

## 工作原理

**安装** `transformers`、`datasets`，以及可选的 `accelerate`（用于分布式和混合精度训练）。**加ad** a pretrained model and tokenizer by name (例如 `from_pretrained("bert-base-uncased")`); the library downloads from the Hub if needed. **Inference**: call `model(input_ids)` or use pipelines (例如 text classification, summarization). **Fine-tune**: use the `Trainer` or native PyTorch loops with your dataset; push the resulting model back to the Hub. The Hub hosts model cards, datasets, and spaces (demos). Tokenizers, configs, and model weights are versioned; you can pin versions for reproducibility.

## 应用场景

Hugging Face is the default for loading, fine-tuning, and sharing NLP and vision models and datasets.

- Loading and fine-tuning pretrained NLP and vision models
- Sharing and discovering models and datasets on the Hub
- Running inference and building pipelines with minimal code

## 外部文档

- [Hugging Face documentation](https://huggingface.co/docs)
- [Transformers library](https://huggingface.co/docs/transformers)
- [Hugging Face NLP course](https://huggingface.co/learn/nlp-course/)

## 另请参阅

- [Transformers](/docs/transformers)
- [LLMs](/docs/llms)
- [Frameworks](/docs/frameworks/pytorch)
