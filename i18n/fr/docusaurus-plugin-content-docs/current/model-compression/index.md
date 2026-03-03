---
title: Compression de modèles
description: Réduction de la taille du modèle et du calcul pour le déploiement.
keywords: [model compression, pruning, quantization, distillation]
---

# Compression de modèles

## Définition

La compression de modèles réduit la taille, la latence ou la mémoire des modèles so they can run on edge or with limited compute. Methods include [pruning](/docs/pruning), [quantization](/docs/quantization), and [knowledge distillation](/docs/knowledge-distillation).

Utilisez-le quand the full model is too large for deployment (par ex. [LLMs](/docs/llms) on edge, real-time serving). Trade off accuracy vs size/latency; often combine several methods. See [infrastructure](/docs/infrastructure) for how compressed models are served at scale.

## Comment ça fonctionne

```mermaid
flowchart LR
  LargeModel[Large model] --> Compress["Prune/Quantize/Distill"]
  Compress --> SmallModel[Small model]
```

On part d'un **grand modèle** et on applique une ou plusieurs étapes de **compression**. **L'élagage** supprime les poids de faible importance ou structures (unstructured or channel-wise). **Quantization** stores weights (and optionally activations) in lower precision (par ex. INT8). **Distillation** trains a smaller **small model** (student) to mimic the large one (teacher) via soft labels or representations. Le résultat est un smaller, faster model; accuracy is validated on a dev set. Methods are often combined (par ex. prune then quantize, or distill then quantize) and may require fine-tuning to recover accuracy.

## Cas d'utilisation

Model compression is used when you need smaller or faster models for edge, mobile, or cost-sensitive production.

- Deploying large models on edge or mobile with limited memory
- Reducing inference latency and cost in production
- Combining pruning, quantization, and distillation for maximum compression

## Documentation externe

- [PyTorch – Quantization](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow – Model optimization](https://www.tensorflow.org/model_optimization)

## Voir aussi

- [Quantization](/docs/quantization)
- [Pruning](/docs/pruning)
- [Knowledge distillation](/docs/knowledge-distillation)
