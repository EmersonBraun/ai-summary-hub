---
title: Case study — Claude
description: LLM d'Anthropic suivant les instructions avec contexte long et sécurité.
keywords: [Claude, Anthropic, constitutional AI, long context]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Claude

## Définition

Claude est la famille de [LLMs](/docs/llms) conversationnels d'Anthropic. Les modèles sont conçus pour le suivi d'instructions, le contexte long et la sécurité, en utilisant des techniques telles que l'IA constitutionnelle et l'alignement de style RLHF.

Ils partagent la même pile générale que [ChatGPT](/docs/case-studies/chatgpt) : base pré-entraînée, ajustement d'instructions et alignement basé sur les préférences. Claude met l'accent sur les fenêtres de contexte long, le comportement favorable à l'[ingénierie de prompts](/docs/prompt-engineering) et les contraintes de sécurité. Cas d'utilisation : chat, analyse de longs documents, programmation et flux de travail de style [agent](/docs/agents) via l'API et des produits comme [Claude Code](/docs/tools/claude-code).

## Comment ça fonctionne

Un **modèle de base** ([transformer](/docs/transformers) décodeur uniquement) est pré-entraîné sur de grands corpus de texte. **L'ajustement d'instructions** entraîne le modèle sur des paires (instruction, réponse). **L'IA constitutionnelle** et le **RLHF** (modèle de récompense + optimisation de politique) façonnent l'utilité, l'honnêteté et les refus. Le résultat est un modèle avec un support de contexte long (p. ex., plus de 100 000 tokens), adapté aux documents et aux conversations étendues. La **sécurité et les garde-fous** (politique de contenu, refus) sont appliqués dans le produit. [RAG](/docs/rag) et les outils étendent Claude pour des applications spécifiques.

## Cas d'utilisation

Claude convient aux applications qui ont besoin d'un contexte long, d'un suivi attentif des instructions et de valeurs par défaut de sécurité solides.

- Questions-réponses, résumé et analyse de longs documents
- Assistance à la programmation et génération de code avec un contexte de grande base de code
- Chat et automatisation des tâches avec un comportement de sécurité et de refus explicite

## Documentation externe

- [Anthropic – Claude](https://www.anthropic.com/product) — Modèles et produit
- [Anthropic – Model documentation](https://docs.anthropic.com/) — API et guides

## Voir aussi

- [LLMs](/docs/llms)
- [Ingénierie de prompts](/docs/prompt-engineering)
- [Claude Code](/docs/tools/claude-code)
