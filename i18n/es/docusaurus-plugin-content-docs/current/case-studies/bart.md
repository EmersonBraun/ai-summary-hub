---
title: Case study — BART
description: Predecesor codificador-decodificador de Gemini; preentrenamiento con eliminación de ruido para resumen y generación.
keywords: [BART, encoder-decoder, eliminación de ruido, summarization]
---

# Case study: BART

## Definición

BART (Bidirectional and Auto-Regressive Transformers) es un modelo **codificador-decodificador** [transformer](/docs/transformers) de Meta (Facebook AI). Es pretrained with eliminación de ruido objectives (por ej. token deletion, masking, sentence permutation) and fine-tuned for summarization, translation, and conditional generation.

BART represents an earlier generation of large sequence-to-sequence models; Google’s [Gemini](/docs/case-studies/gemini) and other modern [LLMs](/docs/llms) build on different architectures (decoder-only, multimodal) but share the goal of strong text understanding and generation. Use case: summarization, question answering, and conditional text generation where encoder-decoder structure is beneficial.

## Cómo funciona

**Codificador**: un codificador bidireccional similar a [BERT](/docs/transformers/bert) procesa la secuencia de entrada. **Decodificador**: un decodificador causal (autorregresivo)er attends to the encoder output and previous decoder positions to generate the target. **Pretraining**: corrupt the input (mask, delete, permute) and train the model to reconstruct the original—this eliminación de ruido objective learns robust representations. **Fine-tuning**: add a task-specific head or use the sequence output for summarization (por ej. CNN/DailyMail), translation, or QA. Inference: encode source, then decode token by token.

## Casos de uso

BART-style encoder-decoder models fit conditional generation and understanding tasks with a clear source and target.

- Document and dialogue summarization
- Conditional generation (por ej. sentence completion, data-to-text)
- Fine-tuning for domain-specific NLU and generation

## Documentación externa

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Ver también

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
