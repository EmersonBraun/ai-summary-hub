---
title: Case study — ChatGPT
description: ChatGPT 和对话式大语言模型的工作原理。
keywords: [ChatGPT, OpenAI, conversational AI]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: ChatGPT

## 定义

ChatGPT 是 OpenAI 的一系列对话式 [LLMs](/docs/llms)。它们通过监督[微调](/docs/llms/fine-tuning)和基于人类反馈的强化学习（RLHF）进行训练，以遵循指令并安全地进行对话。

它们展示了完整的 [LLM](/docs/llms) 技术栈：预训练基础模型、指令调优和基于 [RL](/docs/rl) 的对齐（RLHF）。相同的思路（指令调优、偏好优化）也出现在开放模型和其他专有模型中。使用场景：聊天、[提示词](/docs/prompt-engineering)驱动的任务，以及借助工具的类[智能体](/docs/agents)工作流。

## 工作原理

从**基础模型**出发（例如 GPT-4）：一个在下一个 token 预测上预训练的[仅解码器](/docs/transformers/gpt) [transformer](/docs/transformers)。**指令调优**：在（指令，响应）对上进行微调，使模型遵循用户意图。**RLHF**：在人类偏好数据（哪个响应更好）上训练**奖励模型**；然后用[强化学习](/docs/rl)（例如 PPO）优化**策略**（LLM）以最大化奖励。结果是一个有用的、遵循指令的、更少产生有害或违规内容的模型。**安全与防护**（内容过滤、拒绝、监控）在产品中应用。[提示词工程](/docs/prompt-engineering)和 [RAG](/docs/rag) 或[智能体](/docs/agents)将系统扩展到特定用例。

## 应用场景

ChatGPT 风格的系统适合聊天、写作、代码辅助和任务自动化，这些任务得益于指令遵循和工具使用。

- 对话助手和客户支持
- 写作、摘要和头脑风暴
- 代码辅助、辅导和通过聊天自动化任务

## 外部文档

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF 和指令调优

## 另请参阅

- [LLMs](/docs/llms)
- [强化学习](/docs/rl)
- [提示词工程](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — 可对比的对话式 LLM
- [Gemini](/docs/case-studies/gemini) — 多模态 LLM 系列
