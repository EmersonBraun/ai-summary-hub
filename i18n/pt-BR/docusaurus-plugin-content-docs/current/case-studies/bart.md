---
title: Case study — BART
description: Predecessor codificador-decodificador do Gemini; pré-treinamento com remoção de ruído para resumo e geração.
keywords: [BART, encoder-decoder, denoising, summarization]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: BART

## Definição

BART (Bidirectional and Auto-Regressive Transformers) é um modelo **codificador-decodificador** [transformer](/docs/transformers) da Meta (Facebook AI). É pré-treinado com objetivos de remoção de ruído (p. ex., exclusão de tokens, mascaramento, permutação de frases) e ajustado para resumo, tradução e geração condicional.

BART representa uma geração anterior de grandes modelos sequência a sequência; [Gemini](/docs/case-studies/gemini) do Google e outros [LLMs](/docs/llms) modernos se baseiam em arquiteturas diferentes (apenas decodificador, multimodal), mas compartilham o objetivo de forte compreensão e geração de texto. Caso de uso: resumo, resposta a perguntas e geração de texto condicional onde a estrutura codificador-decodificador é benéfica.

## Como funciona

**Codificador**: um codificador bidirecional semelhante ao [BERT](/docs/transformers/bert) processa a sequência de origem. **Decodificador**: um decodificador causal (autorregressivo) atende à saída do codificador e às posições anteriores do decodificador para gerar o destino. **Pré-treinamento**: corromper a entrada (mascarar, excluir, permutar) e treinar o modelo para reconstruir o original — esse objetivo de remoção de ruído aprende representações robustas. **Ajuste fino**: adicionar uma cabeça específica para a tarefa ou usar a saída da sequência para resumo (p. ex., CNN/DailyMail), tradução ou perguntas e respostas. Inferência: codificar a origem e decodificar token por token.

## Casos de uso

Os modelos codificador-decodificador no estilo BART são adequados para tarefas de geração condicional e compreensão com uma origem e um destino claros.

- Resumo de documentos e diálogos
- Geração condicional (p. ex., completar frases, dados para texto)
- Ajuste fino para NLU e geração específicos de domínio

## Documentação externa

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Veja também

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
