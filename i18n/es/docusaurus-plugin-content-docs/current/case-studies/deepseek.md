---
title: Case study — DeepSeek
description: LLMs de pesos abiertos de DeepSeek AI con razonamiento y código sólidos; MoE y escalado eficiente.
keywords: [DeepSeek, open weights, razonamiento, code, MoE]
---

# Case study: DeepSeek

## Definición

DeepSeek es una familia de [LLMs](/docs/llms) de DeepSeek AI. Los modelos son conocidos por su fuerte rendimiento en razonamiento y código, released as **open weights** so they can be run [locally](/docs/local-inference) or fine-tuned. Variants include dense and mixture-of-experts (MoE) architectures for different scale and cost trade-offs.

They illustrate the same core stack (pretraining, ajuste de instrucciones, alignment) as [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), with an emphasis on open release and efficiency. Use case: chat, code generation, razonamiento tasks, and [RAG](/docs/rag) or [agents](/docs/agents) when self-hosted or cost control matters.

## Cómo funciona

**Base models** se preentrenan en large text and code corpora; **ajuste de instrucciones** and **preference optimization** (por ej. DPO) align them for chat and tool use. **MoE** variants activate a subset of parameters per token to scale capacity without proportionally increasing compute. Weights are published in standard formats (por ej. SafeTensors); teams run them with [quantization](/docs/quantization) on consumer GPUs or deploy via [local inference](/docs/local-inference) runtimes (vLLM, Ollama, etc.). [Prompt engineering](/docs/llms/prompt-engineering) and [fine-tuning](/docs/llms/fine-tuning) extend use for specific domains.

## Casos de uso

DeepSeek fits when you want strong razonamiento and code capability with open weights and local or cost-effective deployment.

- Code generation and code-assisted workflows (IDE, agents)
- Reasoning and math with open, self-hostable models
- Fine-tuning and [local inference](/docs/local-inference) for privacidad or cost

## Documentación externa

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Weights and cards

## Ver también

- [LLMs](/docs/llms)
- [Local inference](/docs/local-inference)
- [Fine-tuning](/docs/llms/fine-tuning)
