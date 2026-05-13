---
title: Case study — DALL·E
description: 基于扩散和语言的文本到图像生成。
keywords: [DALL-E, text-to-image, diffusion]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: DALL·E

## 定义

DALL·E（及 DALL·E 2）是 OpenAI 的文本到图像模型。它们使用[扩散模型](/docs/diffusion-models)和语言-图像对齐，从文本提示词生成图像。

它们是[多模态](/docs/multimodal-ai)生成的领先示例：文本输入，图像输出。相同的[扩散](/docs/diffusion-models)和条件化思路也出现在 Stable Diffusion 和其他开放模型中。使用场景：从自然语言生成创意和产品图像；安全和内容策略适用。

## 工作原理

**文本**通过语言或[多模态](/docs/multimodal-ai)编码器（例如 CLIP 文本编码器、T5）编码为**文本嵌入**。**扩散**模型（例如 UNet）在此嵌入上**条件化**：去噪过程被引导，使生成的图像与文本匹配。训练使用带有说明文字的大型图像数据集；模型学习将文本和图像内容关联起来。**采样**：从噪声开始，以文本嵌入为条件运行逆扩散过程，解码为图像。**安全过滤器**（例如分类器、策略）在交付前限制有害或受限制的输出。变体（内补绘制、编辑）同时在文本和现有图像或掩码上进行条件化。

## 应用场景

像 DALL·E 这样的文本到图像模型用于任何需要从自然语言生成或编辑图像的地方（创意、产品、UI）。

- 从文本提示词生成创意和营销素材
- 概念艺术、插图和设计探索
- 从自然语言描述创建产品和 UI 原型

## 外部文档

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## 另请参阅

- [扩散模型](/docs/diffusion-models)
- [多模态 AI](/docs/multimodal-ai)
