---
title: Case study — Qwen
description: Famille de LLM d'Alibaba ; support multilingue, de programmation et de contexte long.
keywords: [Qwen, Alibaba, multilingual, coding, long context]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: Qwen

## Définition

Qwen est la famille de [LLMs](/docs/llms) d'Alibaba. Les modèles sont conçus pour une utilisation **multilingue** (y compris le chinois et l'anglais), la **programmation** (Qwen-Coder) et le **contexte long**, et sont disponibles sous forme de poids ouverts et via API.

Comme [DeepSeek](/docs/case-studies/deepseek) et [Claude](/docs/case-studies/claude), Qwen utilise le pré-entraînement, l'ajustement d'instructions et l'alignement ; la différenciation comprend de solides variantes multilingues et de programmation ainsi qu'un support de contexte long. Cas d'utilisation : chat, assistance au code, [RAG](/docs/rag) sur de longs documents et [affinage](/docs/llms/fine-tuning) pour des applications spécifiques à un domaine.

## Comment ça fonctionne

Les **modèles de base** sont pré-entraînés sur de grands corpus multilingues et de code. **L'ajustement d'instructions** et **l'alignement** (p. ex., DPO, style RLHF) produisent des variantes de chat et d'utilisation des outils. **Versions spécialisées** : Qwen-Coder pour le code, Qwen-VL pour la vision-langage. Le **contexte long** est pris en charge via des fenêtres de contexte étendues et un [RAG](/docs/rag) optionnel. Les poids sont publiés pour l'[inférence locale](/docs/local-inference) et l'[affinage](/docs/llms/fine-tuning) ; l'accès API est également proposé. [L'ingénierie de prompts](/docs/prompt-engineering) et les [agents](/docs/agents) étendent le système pour les applications.

## Cas d'utilisation

Qwen convient aux applications multilingues et de programmation, et aux flux de travail à contexte long avec accès ouvert ou via API.

- Chat multilingue, traduction et génération de contenu
- Génération de code et [agents](/docs/agents) axés sur le code
- Questions-réponses sur de longs documents et [RAG](/docs/rag) avec de grandes fenêtres de contexte

## Documentation externe

- [Qwen – Official site](https://qwenlm.github.io/) — Modèles et documentation
- [Qwen – Hugging Face](https://huggingface.co/Qwen2) — Poids et fiches de modèle

## Voir aussi

- [LLMs](/docs/llms)
- [Affinage](/docs/llms/fine-tuning)
- [Inférence locale](/docs/local-inference)
