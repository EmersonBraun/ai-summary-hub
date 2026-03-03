---
title: Case study — BART
description: Gemini 的编码器-解码器前身；用于摘要和生成的去噪预训练。
keywords: [BART, encoder-decoder, denoising, summarization]
---

# Case study: BART

## 定义

BART（Bidirectional and Auto-Regressive Transformers）是来自 Meta（Facebook AI）的 [transformer](/docs/transformers) **编码器-解码器**模型。 它是 pretrained with denoising objectives (例如 token deletion, masking, sentence permutation) and fine-tuned for summarization, translation, and conditional generation.

BART represents an earlier generation of large sequence-to-sequence models; Google’s [Gemini](/docs/case-studies/gemini) and other modern [LLMs](/docs/llms) build on different architectures (decoder-only, multimodal) but share the goal of strong text understanding and generation. Use case: summarization, question answering, and conditional text generation where encoder-decoder structure is beneficial.

## 工作原理

**编码器**：一个类似 [BERT](/docs/transformers/bert) 的双向编码器处理源序列。**解码器**：一个因果（自回归）解码er attends to the encoder output and previous decoder positions to generate the target. **Pretraining**: corrupt the input (mask, delete, permute) and train the model to reconstruct the original—this denoising objective learns robust representations. **Fine-tuning**: add a task-specific head or use the sequence output for summarization (例如 CNN/DailyMail), translation, or QA. Inference: encode source, then decode token by token.

## 应用场景

BART-style encoder-decoder models fit conditional generation and understanding tasks with a clear source and target.

- Document and dialogue summarization
- Conditional generation (例如 sentence completion, data-to-text)
- Fine-tuning for domain-specific NLU and generation

## 外部文档

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## 另请参阅

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
