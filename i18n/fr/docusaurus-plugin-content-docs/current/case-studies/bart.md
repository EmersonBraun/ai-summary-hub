---
title: Case study — BART
description: Prédécesseur encodeur-décodeur de Gemini ; pré-entraînement par débruitage pour le résumé et la génération.
keywords: [BART, encoder-decoder, denoising, summarization]
---

# Case study: BART

## Définition

BART (Bidirectional and Auto-Regressive Transformers) est un modèle **encodeur-décodeur** [transformer](/docs/transformers) de Meta (Facebook AI). C'est pretrained with denoising objectives (par ex. token deletion, masking, sentence permutation) and fine-tuned for summarization, translation, and conditional generation.

BART represents an earlier generation of large sequence-to-sequence models; Google’s [Gemini](/docs/case-studies/gemini) and other modern [LLMs](/docs/llms) build on different architectures (decoder-only, multimodal) but share the goal of strong text understanding and generation. Use case: summarization, question answering, and conditional text generation where encoder-decoder structure is beneficial.

## Comment ça fonctionne

**Encodeur** : un encodeur bidirectionnel similaire à [BERT](/docs/transformers/bert) traite la séquence source. **Décodeur** : un décodeur causal (autorégressif)er attends to the encoder output and previous decoder positions to generate the target. **Pretraining**: corrupt the input (mask, delete, permute) and train the model to reconstruct the original—this denoising objective learns robust representations. **Fine-tuning**: add a task-specific head or use the sequence output for summarization (par ex. CNN/DailyMail), translation, or QA. Inference: encode source, then decode token by token.

## Cas d'utilisation

BART-style encoder-decoder models fit conditional generation and understanding tasks with a clear source and target.

- Document and dialogue summarization
- Conditional generation (par ex. sentence completion, data-to-text)
- Fine-tuning for domain-specific NLU and generation

## Documentation externe

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Voir aussi

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
