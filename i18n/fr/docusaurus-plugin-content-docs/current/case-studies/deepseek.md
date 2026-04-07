---
title: Case study — DeepSeek
description: LLM à poids ouverts de DeepSeek AI avec raisonnement et code solides ; MoE et mise à l'échelle efficace.
keywords: [DeepSeek, open weights, raisonnement, code, MoE]
---

# Case study: DeepSeek

## Définition

DeepSeek is a famille de [LLMs](/docs/llms) from DeepSeek AI. The models are connus pour leurs performances solides en raisonnement et code, released as **open weights** so they can be run [locally](/docs/local-inference) or fine-tuned. Variants include dense and mixture-of-experts (MoE) architectures for different scale and cost trade-offs.

They illustrate the same core stack (pretraining, ajustement d'instructions, alignment) as [ChatGPT](/docs/case-studies/chatgpt) and [Claude](/docs/case-studies/claude), with an emphasis on open release and efficiency. Use case: chat, code generation, raisonnement tasks, and [RAG](/docs/rag) or [agents](/docs/agents) when self-hosted or cost control matters.

## Comment ça fonctionne

**Base models** sont pré-entraînés sur large text and code corpora; **ajustement d'instructions** and **preference optimization** (par ex. DPO) align them for chat and tool use. **MoE** variants activate a subset of parameters per token to scale capacity without proportionally increasing compute. Weights are published in standard formats (par ex. SafeTensors); teams run them with [quantization](/docs/quantization) on consumer GPUs or deploy via [local inference](/docs/local-inference) runtimes (vLLM, Ollama, etc.). [Prompt engineering](/docs/prompt-engineering) and [fine-tuning](/docs/llms/fine-tuning) extend use for specific domains.

## Cas d'utilisation

DeepSeek fits when you want strong raisonnement and code capability with open weights and local or cost-effective deployment.

- Code generation and code-assisted workflows (IDE, agents)
- Reasoning and math with open, self-hostable models
- Fine-tuning and [local inference](/docs/local-inference) for confidentialité or cost

## Documentation externe

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Weights and cards

## Voir aussi

- [LLMs](/docs/llms)
- [Local inference](/docs/local-inference)
- [Fine-tuning](/docs/llms/fine-tuning)
