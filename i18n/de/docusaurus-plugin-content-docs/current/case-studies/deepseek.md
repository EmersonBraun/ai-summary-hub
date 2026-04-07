---
title: Case study — DeepSeek
description: DeepSeek AIs Open-Weight-LLMs mit starkem Reasoning und Code; MoE und effiziente Skalierung.
keywords: [DeepSeek, open weights, Schlussfolgern, code, MoE]
---

# Case study: DeepSeek

## Definition

DeepSeek ist eine Familie von [LLMs](/docs/llms) von DeepSeek AI. Die Modelle sind bekannt für starke Schlussfolgerungs- und Code-Leistung, released as **open weights** sodass sie can be run [locally](/docs/local-inference) or feinabgestimmt. Variants include dense and mixture-of-experts (MoE) architectures for different scale and cost trade-offs.

They illustrate the same core Stack (pretraining, Instruktions-Tuning, alignment) as [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), with an emphasis on open release and efficiency. Use case: chat, code generation, Schlussfolgern tasks, and [RAG](/docs/rag) or [agents](/docs/agents) when self-hosted or cost control matters.

## Funktionsweise

**Base models** are vortrainiert auf großen Text- und Code-Korpora; **Instruktions-Tuning** and **Präferenzoptimierung** (z. B. DPO) align them for chat and tool use. **MoE** variants activate a subset of parameters per token to scale capacity without proportionally increasing compute. Weights are published in standard formats (z. B. SafeTensors); teams run them with [quantization](/docs/quantization) on consumer GPUs or deploy via [local inference](/docs/local-inference) runtimes (vLLM, Ollama, etc.). [Prompt engineering](/docs/prompt-engineering) and [Feinabstimmung](/docs/llms/fine-tuning) extend use for specific domains.

## Anwendungsfälle

DeepSeek passt, wenn you want strong Schlussfolgern and code capability with open weights and local or cost-effective deployment.

- Code generation and code-assisted workflows (IDE, agents)
- Reasoning and math with open, self-hostable models
- Fine-tuning and [local inference](/docs/local-inference) for Datenschutz or cost

## Externe Dokumentation

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Weights and cards

## Siehe auch

- [LLMs](/docs/llms)
- [Local inference](/docs/local-inference)
- [Fine-tuning](/docs/llms/fine-tuning)
