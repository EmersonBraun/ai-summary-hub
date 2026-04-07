---
title: Case study — DeepSeek
description: LLMs de pesos abertos da DeepSeek AI com raciocínio e código robustos; MoE e escalabilidade eficiente.
keywords: [DeepSeek, open weights, raciocínio, code, MoE]
---

# Case study: DeepSeek

## Definição

DeepSeek é uma família de [LLMs](/docs/llms) da DeepSeek AI. Os modelos são conhecidos pelo forte desempenho em raciocínio e código, released as **open weights** so they can be run [locally](/docs/local-inference) or fine-tuned. Variants include dense and mixture-of-experts (MoE) architectures for different scale and cost trade-offs.

They illustrate the same core stack (pretraining, ajuste de instruções, alignment) as [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), with an emphasis on open release and efficiency. Use case: chat, code generation, raciocínio tasks, and [RAG](/docs/rag) or [agents](/docs/agents) when self-hosted or cost control matters.

## Como funciona

**Modelos base** são pré-treinados em grandes corpus de texto e código; **ajuste de instruções** e **otimização de preferências** (por ex. DPO) os alinham para chat and tool use. **MoE** variants activate a subset of parameters per token to scale capacity without proportionally increasing compute. Weights are published in standard formats (por ex. SafeTensors); teams run them with [quantization](/docs/quantization) on consumer GPUs or deploy via [local inference](/docs/local-inference) runtimes (vLLM, Ollama, etc.). [Prompt engineering](/docs/prompt-engineering) and [fine-tuning](/docs/llms/fine-tuning) extend use for specific domains.

## Casos de uso

DeepSeek fits when you want strong raciocínio and code capability with open weights and local or cost-effective deployment.

- Code generation and code-assisted workflows (IDE, agents)
- Reasoning and math with open, self-hostable models
- Fine-tuning and [local inference](/docs/local-inference) for privacy or cost

## Documentação externa

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Weights and cards

## Veja também

- [LLMs](/docs/llms)
- [Local inference](/docs/local-inference)
- [Fine-tuning](/docs/llms/fine-tuning)
