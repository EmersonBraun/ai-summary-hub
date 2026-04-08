---
title: Case study — DeepSeek
description: LLMs de pesos abertos da DeepSeek AI com raciocínio e código robustos; MoE e escalabilidade eficiente.
keywords: [DeepSeek, open weights, raciocínio, code, MoE]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: DeepSeek

## Definição

DeepSeek é uma família de [LLMs](/docs/llms) da DeepSeek AI. Os modelos são conhecidos pelo forte desempenho em raciocínio e código, publicados como **pesos abertos** para que possam ser executados [localmente](/docs/local-inference) ou ajustados. As variantes incluem arquiteturas densas e de mistura de especialistas (MoE) para diferentes compensações de escala e custo.

Eles ilustram a mesma pilha central (pré-treinamento, ajuste de instruções, alinhamento) que [ChatGPT](/docs/case-studies/chatgpt) e [Claude](/docs/case-studies/claude), com ênfase em publicação aberta e eficiência. Caso de uso: chat, geração de código, tarefas de raciocínio e [RAG](/docs/rag) ou [agentes](/docs/agents) quando a auto-hospedagem ou o controle de custos importam.

## Como funciona

Os **modelos base** são pré-treinados em grandes corpus de texto e código; o **ajuste de instruções** e a **otimização de preferências** (p. ex., DPO) os alinham para chat e uso de ferramentas. As variantes **MoE** ativam um subconjunto de parâmetros por token para escalar a capacidade sem aumentar proporcionalmente o cômputo. Os pesos são publicados em formatos padrão (p. ex., SafeTensors); equipes os executam com [quantização](/docs/quantization) em GPUs de consumo ou os implantam via runtimes de [inferência local](/docs/local-inference) (vLLM, Ollama, etc.). [Engenharia de prompts](/docs/prompt-engineering) e [ajuste fino](/docs/llms/fine-tuning) estendem o uso para domínios específicos.

## Casos de uso

DeepSeek é adequado quando se deseja forte capacidade de raciocínio e código com pesos abertos e implantação local ou econômica.

- Geração de código e fluxos de trabalho assistidos por código (IDE, agentes)
- Raciocínio e matemática com modelos abertos e auto-hospedáveis
- Ajuste fino e [inferência local](/docs/local-inference) para privacidade ou custo

## Documentação externa

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Pesos e cartões

## Veja também

- [LLMs](/docs/llms)
- [Inferência local](/docs/local-inference)
- [Ajuste fino](/docs/llms/fine-tuning)
