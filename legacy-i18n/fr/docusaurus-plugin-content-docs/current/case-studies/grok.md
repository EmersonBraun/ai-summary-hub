---
title: Case study — Grok
description: LLM de xAI avec connaissances en temps réel et raisonnement.
keywords: [Grok, xAI, real-time, raisonnement]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: Grok

## Définition

Grok est une famille de [LLMs](/docs/llms) de xAI. Il est positionné autour des connaissances en temps réel ou à jour (p. ex., accès aux données de X/Twitter) et d'un raisonnement solide, proposé via l'API et dans l'expérience produit de X.

Comme [ChatGPT](/docs/case-studies/chatgpt) et [Claude](/docs/case-studies/claude), Grok utilise une base pré-entraînée, un ajustement d'instructions et un alignement ; la différenciation comprend l'ancrage de style [RAG](/docs/rag) en temps réel et l'intégration avec la plateforme de X. Cas d'utilisation : chat, recherche et applications qui bénéficient des informations actuelles et du raisonnement.

## Comment ça fonctionne

Un **modèle de base** ([transformer](/docs/transformers) décodeur uniquement) est pré-entraîné sur du texte à grande échelle (et optionnellement d'autres données). **L'ajustement d'instructions** et **l'alignement** (p. ex., optimisation des préférences) façonnent l'utilité et la sécurité. Les **connaissances en temps réel ou en direct** sont fournies en récupérant et en conditionnant sur du contenu frais (p. ex., de X) pour que les réponses puissent refléter des événements récents. Le produit expose Grok via le chat et l'API ; [l'ingénierie de prompts](/docs/prompt-engineering) et l'utilisation des outils l'étendent pour les [agents](/docs/agents) et les flux de travail personnalisés.

## Cas d'utilisation

Grok convient aux cas d'utilisation où les informations à jour et le raisonnement importent plus qu'une date de coupure d'entraînement statique.

- Chat et recherche avec conscience des actualités et des événements récents
- Applications nécessitant des réponses en temps réel ou augmentées par la recherche
- Intégration dans X et des produits tiers via l'API

## Documentation externe

- [xAI – Grok](https://x.ai/) — Produit et API
- [xAI – Blog](https://x.ai/blog) — Mises à jour du modèle et des capacités

## Voir aussi

- [LLMs](/docs/llms)
- [RAG](/docs/rag)
- [Ingénierie de prompts](/docs/prompt-engineering)
