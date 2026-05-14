---
title: Case study — DeepSeek
description: LLM à poids ouverts de DeepSeek AI avec raisonnement et code solides ; MoE et mise à l'échelle efficace.
keywords: [DeepSeek, open weights, raisonnement, code, MoE]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: DeepSeek

## Définition

DeepSeek est une famille de [LLMs](/docs/llms) de DeepSeek AI. Les modèles sont connus pour leurs solides performances en raisonnement et en code, publiés comme **poids ouverts** pour pouvoir être exécutés [localement](/docs/local-inference) ou affinés. Les variantes comprennent des architectures denses et de mélange d'experts (MoE) pour différents compromis d'échelle et de coût.

Ils illustrent la même pile centrale (pré-entraînement, ajustement d'instructions, alignement) que [ChatGPT](/docs/case-studies/chatgpt) et [Claude](/docs/case-studies/claude), avec un accent sur la publication ouverte et l'efficacité. Cas d'utilisation : chat, génération de code, tâches de raisonnement et [RAG](/docs/rag) ou [agents](/docs/agents) quand l'auto-hébergement ou le contrôle des coûts importent.

## Comment ça fonctionne

Les **modèles de base** sont pré-entraînés sur de grands corpus de texte et de code ; **l'ajustement d'instructions** et **l'optimisation des préférences** (p. ex., DPO) les alignent pour le chat et l'utilisation des outils. Les variantes **MoE** activent un sous-ensemble de paramètres par token pour augmenter la capacité sans augmenter proportionnellement le calcul. Les poids sont publiés dans des formats standards (p. ex., SafeTensors) ; les équipes les exécutent avec [quantification](/docs/quantization) sur des GPU grand public ou les déploient via des environnements d'exécution d'[inférence locale](/docs/local-inference) (vLLM, Ollama, etc.). [L'ingénierie de prompts](/docs/prompt-engineering) et l'[affinage](/docs/llms/fine-tuning) étendent l'utilisation pour des domaines spécifiques.

## Cas d'utilisation

DeepSeek convient quand on veut de solides capacités de raisonnement et de code avec des poids ouverts et un déploiement local ou rentable.

- Génération de code et flux de travail assistés par code (IDE, agents)
- Raisonnement et mathématiques avec des modèles ouverts et auto-hébergeables
- Affinage et [inférence locale](/docs/local-inference) pour la confidentialité ou le coût

## Documentation externe

- [DeepSeek – Official site](https://www.deepseek.com/)
- [DeepSeek – Models on Hugging Face](https://huggingface.co/deepseek-ai) — Poids et fiches

## Voir aussi

- [LLMs](/docs/llms)
- [Inférence locale](/docs/local-inference)
- [Affinage](/docs/llms/fine-tuning)
