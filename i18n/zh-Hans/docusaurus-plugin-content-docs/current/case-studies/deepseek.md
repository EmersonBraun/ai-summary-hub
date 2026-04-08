---
title: Case study — DeepSeek
description: DeepSeek AI 的开放权重大语言模型，具有强大的推理和代码能力；MoE 和高效扩展。
keywords: [DeepSeek, open weights, 推理, code, MoE]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: DeepSeek

## 定义

DeepSeek 是 DeepSeek AI 的一系列 [LLMs](/docs/llms)。这些模型以强大的推理和代码性能著称，以**开放权重**发布，可以[本地](/docs/local-inference)运行或进行微调。变体包括密集和专家混合（MoE）架构，适用于不同的规模和成本权衡。

它们展示了与 [ChatGPT](/docs/case-studies/chatgpt) 和 [Claude](/docs/case-studies/claude) 相同的核心技术栈（预训练、指令调优、对齐），重点强调开放发布和效率。使用场景：当自托管或成本控制很重要时，用于聊天、代码生成、推理任务以及 [RAG](/docs/rag) 或[智能体](/docs/agents)。

## 工作原理

**基础模型**在大型文本和代码语料库上预训练；**指令调优**和**偏好优化**（例如 DPO）使其对齐以进行聊天和工具使用。**MoE** 变体每个 token 只激活参数的子集，以在不按比例增加计算量的情况下扩展容量。权重以标准格式发布（例如 SafeTensors）；团队使用[量化](/docs/quantization)在消费级 GPU 上运行，或通过[本地推理](/docs/local-inference)运行时（vLLM、Ollama 等）部署。[提示词工程](/docs/prompt-engineering)和[微调](/docs/llms/fine-tuning)扩展了特定领域的使用。

## 应用场景

DeepSeek 适合希望以开放权重和本地或经济高效的部署来获得强大推理和代码能力的情况。

- 代码生成和代码辅助工作流（IDE、智能体）
- 使用开放、可自托管模型的推理和数学
- 针对隐私或成本的微调和[本地推理](/docs/local-inference)

## 外部文档

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — 权重和模型卡

## 另请参阅

- [LLMs](/docs/llms)
- [本地推理](/docs/local-inference)
- [微调](/docs/llms/fine-tuning)
