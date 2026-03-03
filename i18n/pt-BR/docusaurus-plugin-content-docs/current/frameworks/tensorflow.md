---
title: TensorFlow
description: Deep learning framework by Google.
keywords: [TensorFlow, Keras, aprendizado profundo]
---

# TensorFlow

## Definição

TensorFlow é um framework de [aprendizado profundo](/docs/fundamentals/deep-learning) com foco em implantação em produção. Keras é a API de alto nível. Ele suporta CPU, GPU, TPU, and mobile/edge (TFLite). É an alternative to [PyTorch](/docs/frameworks/pytorch); TensorFlow and Keras are strong for production pipelines, [infrastructure](/docs/infrastructure) (TF Serving, TPU), and mobile (TFLite). Used for [vision](/docs/cv), [NLP](/docs/nlp), and recommendation systems; the ecosystem includes TensorFlow Hub for pretrained models.

## Como funciona

**Construa** modelos com Keras (API sequencial ou funcional) ou a API TensorFlow de nível inferior. **Treine** com execução eagertion (default, PyTorch-like) or graph mode (faster, exportable). **Export** to SavedModel (standard serving format) or TFLite (mobile/edge, with [quantization](/docs/quantization) support). TensorFlow Hub and Keras Applications provide pretrained models for [transfer learning](/docs/transfer-learning). Distributed training uses tf.distribute; deployment uses TF Serving, Vertex AI, or on-device TFLite. The pipeline from data (tf.data) to training to serving is well integrated.

## Casos de uso

TensorFlow suits production pipelines, mobile/edge (TFLite), and quick prototyping with Keras and Hub models.

- Production ML pipelines and serving (por ex. SavedModel, TF Serving)
- Mobile and edge deployment (TFLite)
- Quick prototyping with Keras and pretrained models from Hub

## Documentação externa

- [TensorFlow – Get started](https://www.tensorflow.org/tutorials)
- [Keras documentation](https://keras.io/)

## Veja também

- [PyTorch](/docs/frameworks/pytorch)
- [Deep learning](/docs/fundamentals/deep-learning)
- [Infrastructure](/docs/infrastructure)
