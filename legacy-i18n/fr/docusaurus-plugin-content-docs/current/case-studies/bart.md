---
title: Case study — BART
description: Prédécesseur encodeur-décodeur de Gemini ; pré-entraînement par débruitage pour le résumé et la génération.
keywords: [BART, encoder-decoder, denoising, summarization]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: BART

## Définition

BART (Bidirectional and Auto-Regressive Transformers) est un modèle **encodeur-décodeur** [transformer](/docs/transformers) de Meta (Facebook AI). Il est pré-entraîné avec des objectifs de débruitage (p. ex., suppression de tokens, masquage, permutation de phrases) et affiné pour le résumé, la traduction et la génération conditionnelle.

BART représente une génération antérieure de grands modèles séquence à séquence ; [Gemini](/docs/case-studies/gemini) de Google et d'autres [LLMs](/docs/llms) modernes s'appuient sur des architectures différentes (décodeur uniquement, multimodal) mais partagent l'objectif d'une forte compréhension et génération de texte. Cas d'utilisation : résumé, questions-réponses et génération de texte conditionnelle où la structure encodeur-décodeur est bénéfique.

## Comment ça fonctionne

**Encodeur** : un encodeur bidirectionnel similaire à [BERT](/docs/transformers/bert) traite la séquence source. **Décodeur** : un décodeur causal (autorégressif) s'appuie sur la sortie de l'encodeur et les positions précédentes du décodeur pour générer la cible. **Pré-entraînement** : corrompre l'entrée (masquer, supprimer, permuter) et entraîner le modèle à reconstruire l'original — cet objectif de débruitage apprend des représentations robustes. **Affinage** : ajouter une tête spécifique à la tâche ou utiliser la sortie de séquence pour le résumé (p. ex., CNN/DailyMail), la traduction ou les questions-réponses. Inférence : encoder la source, puis décoder token par token.

## Cas d'utilisation

Les modèles encodeur-décodeur de style BART conviennent aux tâches de génération conditionnelle et de compréhension avec une source et une cible clairement définies.

- Résumé de documents et de dialogues
- Génération conditionnelle (p. ex., complétion de phrases, données vers texte)
- Affinage pour la NLU et la génération spécifiques à un domaine

## Documentation externe

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Voir aussi

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
