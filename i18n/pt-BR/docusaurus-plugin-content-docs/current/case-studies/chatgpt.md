---
title: Case study — ChatGPT
description: Como funcionam o ChatGPT e os LLMs conversacionais.
keywords: [ChatGPT, OpenAI, conversational AI]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: ChatGPT

## Definição

ChatGPT é uma família de [LLMs](/docs/llms) conversacionais da OpenAI. Eles são treinados com [ajuste fino](/docs/llms/fine-tuning) supervisionado e aprendizado por reforço a partir de feedback humano (RLHF) para seguir instruções e conversar com segurança.

Eles ilustram a pilha completa de [LLM](/docs/llms): modelo base pré-treinado, ajuste de instruções e alinhamento baseado em [RL](/docs/rl) (RLHF). As mesmas ideias (ajuste de instruções, otimização de preferências) aparecem em modelos abertos e outros proprietários. Caso de uso: chat, tarefas impulsionadas por [prompts](/docs/prompt-engineering) e fluxos de trabalho semelhantes a [agentes](/docs/agents) com ferramentas.

## Como funciona

Parte-se de um **modelo base** (p. ex., GPT-4): um [transformer](/docs/transformers) [apenas decodificador](/docs/transformers/gpt) pré-treinado em previsão do próximo token. **Ajuste de instruções**: ajuste fino com pares (instrução, resposta) para que o modelo siga a intenção do usuário. **RLHF**: treinar um **modelo de recompensa** com dados de preferência humana (qual de duas respostas é melhor); depois otimizar a **política** (o LLM) com [aprendizado por reforço](/docs/rl) (p. ex., PPO) para maximizar a recompensa. O resultado é um modelo útil, que segue instruções e é menos propenso a produzir conteúdo prejudicial ou fora da política. **Segurança e salvaguardas** (filtros de conteúdo, recusas, monitoramento) são aplicados no produto. [Engenharia de prompts](/docs/prompt-engineering) e [RAG](/docs/rag) ou [agentes](/docs/agents) estendem o sistema para casos de uso específicos.

## Casos de uso

Os sistemas no estilo ChatGPT são adequados para chat, escrita, ajuda com código e automação de tarefas que se beneficiam do seguimento de instruções e uso de ferramentas.

- Assistentes conversacionais e suporte ao cliente
- Escrita, resumo e brainstorming
- Ajuda com código, tutoria e automação de tarefas via chat

## Documentação externa

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF e ajuste de instruções

## Veja também

- [LLMs](/docs/llms)
- [Aprendizado por reforço](/docs/rl)
- [Engenharia de prompts](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — LLM conversacional comparável
- [Gemini](/docs/case-studies/gemini) — Família de LLMs multimodais
