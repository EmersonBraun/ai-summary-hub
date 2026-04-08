---
title: Case study — ChatGPT
description: Comment fonctionnent ChatGPT et les LLM conversationnels.
keywords: [ChatGPT, OpenAI, conversational AI]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: ChatGPT

## Définition

ChatGPT est une famille de [LLMs](/docs/llms) conversationnels d'OpenAI. Ils sont entraînés avec un [affinage](/docs/llms/fine-tuning) supervisé et l'apprentissage par renforcement à partir de retours humains (RLHF) pour suivre les instructions et converser de façon sûre.

Ils illustrent la pile complète des [LLM](/docs/llms) : modèle de base pré-entraîné, ajustement d'instructions et alignement basé sur [RL](/docs/rl) (RLHF). Les mêmes idées (ajustement d'instructions, optimisation des préférences) apparaissent dans les modèles ouverts et d'autres modèles propriétaires. Cas d'utilisation : chat, tâches pilotées par [prompt](/docs/prompt-engineering) et flux de travail de type [agent](/docs/agents) avec des outils.

## Comment ça fonctionne

On part d'un **modèle de base** (p. ex., GPT-4) : un [transformer](/docs/transformers) [décodeur uniquement](/docs/transformers/gpt) pré-entraîné sur la prédiction du prochain token. **Ajustement d'instructions** : affinage sur des paires (instruction, réponse) pour que le modèle suive l'intention de l'utilisateur. **RLHF** : entraîner un **modèle de récompense** sur des données de préférence humaine (laquelle de deux réponses est meilleure) ; puis optimiser la **politique** (le LLM) avec l'[apprentissage par renforcement](/docs/rl) (p. ex., PPO) pour maximiser la récompense. Le résultat est un modèle utile, qui suit les instructions et est moins susceptible de produire du contenu nuisible ou hors politique. **Sécurité et garde-fous** (filtres de contenu, refus, surveillance) sont appliqués dans le produit. [L'ingénierie de prompts](/docs/prompt-engineering) et [RAG](/docs/rag) ou les [agents](/docs/agents) étendent le système à des cas d'utilisation spécifiques.

## Cas d'utilisation

Les systèmes de style ChatGPT conviennent au chat, à l'écriture, à l'aide au code et à l'automatisation des tâches qui bénéficient du suivi des instructions et de l'utilisation des outils.

- Assistants conversationnels et support client
- Écriture, résumé et brainstorming
- Aide au code, tutorat et automatisation des tâches via le chat

## Documentation externe

- [OpenAI – ChatGPT and models](https://openai.com/chatgpt)
- [InstructGPT (Ouyang et al.)](https://arxiv.org/abs/2203.02155) — RLHF et ajustement d'instructions

## Voir aussi

- [LLMs](/docs/llms)
- [Apprentissage par renforcement](/docs/rl)
- [Ingénierie de prompts](/docs/prompt-engineering)
- [Claude](/docs/case-studies/claude) — LLM conversationnel comparable
- [Gemini](/docs/case-studies/gemini) — Famille de LLM multimodaux
