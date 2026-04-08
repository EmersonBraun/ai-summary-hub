---
title: Case study — Qwen
description: Família de LLMs da Alibaba; suporte multilíngue, de programação e de contexto longo.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: Qwen

## Definição

Qwen é a família de [LLMs](/docs/llms) da Alibaba. Os modelos são construídos para uso **multilíngue** (incluindo chinês e inglês), **programação** (Qwen-Coder) e **contexto longo**, e estão disponíveis como pesos abertos e via API.

Assim como [DeepSeek](/docs/case-studies/deepseek) e [Claude](/docs/case-studies/claude), Qwen usa pré-treinamento, ajuste de instruções e alinhamento; a diferenciação inclui variantes multilíngues e de programação sólidas e suporte a contexto longo. Caso de uso: chat, assistência de código, [RAG](/docs/rag) sobre documentos longos e [ajuste fino](/docs/llms/fine-tuning) para aplicações específicas de domínio.

## Como funciona

Os **modelos base** são pré-treinados em grandes corpus multilíngues e de código. O **ajuste de instruções** e o **alinhamento** (p. ex., DPO, estilo RLHF) produzem variantes de chat e uso de ferramentas. **Versões especializadas**: Qwen-Coder para código, Qwen-VL para visão-linguagem. O **contexto longo** é suportado via janelas de contexto estendidas e [RAG](/docs/rag) opcional. Os pesos são publicados para [inferência local](/docs/local-inference) e [ajuste fino](/docs/llms/fine-tuning); o acesso via API também é oferecido. [Engenharia de prompts](/docs/prompt-engineering) e [agentes](/docs/agents) estendem o sistema para aplicações.

## Casos de uso

Qwen é adequado para aplicações multilíngues e de programação e fluxos de trabalho de contexto longo com acesso aberto ou via API.

- Chat multilíngue, tradução e geração de conteúdo
- Geração de código e [agentes](/docs/agents) focados em código
- Perguntas e respostas em documentos longos e [RAG](/docs/rag) com grandes janelas de contexto

## Documentação externa

- [Qwen – Official site](https://qwenlm.github.io/) — Modelos e documentação
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Pesos e cartões de modelo

## Veja também

- [LLMs](/docs/llms)
- [Ajuste fino](/docs/llms/fine-tuning)
- [Inferência local](/docs/local-inference)
