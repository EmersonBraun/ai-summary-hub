---
title: Case study — BART
description: Gemini 的编码器-解码器前身；用于摘要和生成的去噪预训练。
keywords: [BART, encoder-decoder, denoising, summarization]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: BART

## 定义

BART（Bidirectional and Auto-Regressive Transformers）是来自 Meta（Facebook AI）的 [transformer](/docs/transformers) **编码器-解码器**模型。它以去噪目标进行预训练（例如，token 删除、掩码、句子排列），并针对摘要、翻译和条件生成进行微调。

BART 代表了大型序列到序列模型的早期一代；谷歌的 [Gemini](/docs/case-studies/gemini) 和其他现代 [LLMs](/docs/llms) 基于不同的架构（仅解码器、多模态），但都追求强大的文本理解和生成能力。使用场景：摘要、问答以及编码器-解码器结构有优势的条件文本生成。

## 工作原理

**编码器**：类似 [BERT](/docs/transformers/bert) 的双向编码器处理源序列。**解码器**：因果（自回归）解码器关注编码器的输出和之前的解码器位置来生成目标。**预训练**：破坏输入（掩码、删除、排列）并训练模型重建原始内容——这种去噪目标学习到鲁棒的表示。**微调**：添加任务特定的头部，或将序列输出用于摘要（例如 CNN/DailyMail）、翻译或问答。推理：编码源序列，然后逐 token 解码。

## 应用场景

BART 风格的编码器-解码器模型适合具有明确源和目标的条件生成和理解任务。

- 文档和对话摘要
- 条件生成（例如句子补全、数据到文本）
- 针对特定领域 NLU 和生成的微调

## 外部文档

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## 另请参阅

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
