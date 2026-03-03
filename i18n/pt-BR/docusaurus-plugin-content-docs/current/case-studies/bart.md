---
title: Case study — BART
description: Predecessor codificador-decodificador do Gemini; pré-treinamento com remoção de ruído para resumo e geração.
keywords: [BART, encoder-decoder, denoising, summarization]
---

# Case study: BART

## Definição

BART (Bidirectional and Auto-Regressive Transformers) é um modelo **codificador-decodificador** [transformer](/docs/transformers) da Meta (Facebook AI). É pretrained with denoising objectives (por ex. token deletion, masking, sentence permutation) and fine-tuned for summarization, translation, and conditional generation.

BART represents an earlier generation of large sequence-to-sequence models; Google’s [Gemini](/docs/case-studies/gemini) and other modern [LLMs](/docs/llms) build on different architectures (decoder-only, multimodal) but share the goal of strong text understanding and generation. Use case: summarization, question answering, and conditional text generation where encoder-decoder structure is beneficial.

## Como funciona

**Codificador**: um codificador bidirecional similar ao [BERT](/docs/transformers/bert) processa a sequência de entrada. **Decodificador**: um decodificador causal (autorregressivo)er attends to the encoder output and previous decoder positions to generate the target. **Pretraining**: corrupt the input (mask, delete, permute) and train the model to reconstruct the original—this denoising objective learns robust representations. **Fine-tuning**: add a task-specific head or use the sequence output for summarization (por ex. CNN/DailyMail), translation, or QA. Inference: encode source, then decode token by token.

## Casos de uso

BART-style encoder-decoder models fit conditional generation and understanding tasks with a clear source and target.

- Document and dialogue summarization
- Conditional generation (por ex. sentence completion, data-to-text)
- Fine-tuning for domain-specific NLU and generation

## Documentação externa

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Veja também

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
