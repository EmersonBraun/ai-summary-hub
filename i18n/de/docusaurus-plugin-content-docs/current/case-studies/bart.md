---
title: Case study — BART
description: Encoder-Decoder-Vorgänger von Gemini; Denoising-Vortraining für Zusammenfassung und Generierung.
keywords: [BART, encoder-decoder, Entrauschen, summarization]
---

# Case study: BART

## Definition

BART (Bidirectional and Auto-Regressive Transformers) ist ein [transformer](/docs/transformers) **encoder-decoder** model from Meta (Facebook AI). Es ist pretrained with Entrauschen objectives (z. B. token deletion, masking, sentence permutation) and feinabgestimmt for summarization, translation, and conditional generation.

BART represents an earlier generation of large sequence-to-sequence models; Google’s [Gemini](/docs/case-studies/gemini) and other modern [LLMs](/docs/llms) build on different architectures (Decoder-only, multimodal) but share the goal of strong text understanding and generation. Use case: summarization, question answering, and conditional text generation where encoder-decoder structure is beneficial.

## Funktionsweise

**Encoder**: Ein bidirektionaler Encoder ähnlich [BERT](/docs/transformers/bert) verarbeitet die Quellsequenz. **Decoder**: Ein kausaler (autoregressiver) Dekoder attends to the encoder output and previous decoder positions to generate the target. **Pretraining**: corrupt the input (mask, delete, permute) and train the model to reconstruct the original—this Entrauschen objective learns robust representations. **Fine-tuning**: add a task-specific head or use the sequence output for summarization (z. B. CNN/DailyMail), translation, or QA. Inference: encode source, then decode token by token.

## Anwendungsfälle

BART-style encoder-decoder models fit conditional generation and understanding tasks with a clear source and target.

- Document and dialogue summarization
- Conditional generation (z. B. sentence completion, data-to-text)
- Fine-tuning for domain-specific NLU and generation

## Externe Dokumentation

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Siehe auch

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
