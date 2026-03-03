---
title: Case study — DeepSeek
description: DeepSeek AI 的开放权重大语言模型，具有强大的推理和代码能力；MoE 和高效扩展。
keywords: [DeepSeek, open weights, 推理, code, MoE]
---

# Case study: DeepSeek

## 定义

DeepSeek is a 家族 [LLMs](/docs/llms) from DeepSeek AI. The models are 以强大的推理和代码性能著称, released as **open weights** so they can be run [locally](/docs/local-inference) or fine-tuned. Variants include dense and mixture-of-experts (MoE) architectures for different scale and cost trade-offs.

They illustrate the same core stack (pretraining, 指令调优, alignment) as [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), with an emphasis on open release and efficiency. Use case: chat, code generation, 推理 tasks, and [RAG](/docs/rag) or [agents](/docs/agents) when self-hosted or cost control matters.

## 工作原理

**Base models** 在...上预训练 large text and code corpora; **指令调优** and **preference optimization** (例如 DPO) align them for chat and tool use. **MoE** variants activate a subset of parameters per token to scale capacity without proportionally increasing compute. Weights are published in standard formats (例如 SafeTensors); teams run them with [quantization](/docs/quantization) on consumer GPUs or deploy via [local inference](/docs/local-inference) runtimes (vLLM, Ollama, etc.). [Prompt engineering](/docs/llms/prompt-engineering) and [fine-tuning](/docs/llms/fine-tuning) extend use for specific domains.

## 应用场景

DeepSeek fits when you want strong 推理 and code capability with open weights and local or cost-effective deployment.

- Code generation and code-assisted workflows (IDE, agents)
- Reasoning and math with open, self-hostable models
- Fine-tuning and [local inference](/docs/local-inference) for privacy or cost

## 外部文档

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Weights and cards

## 另请参阅

- [LLMs](/docs/llms)
- [Local inference](/docs/local-inference)
- [Fine-tuning](/docs/llms/fine-tuning)
