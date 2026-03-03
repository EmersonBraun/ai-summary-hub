---
title: TensorFlow
description: Deep learning framework by Google.
keywords: [TensorFlow, Keras, Deep Learning]
---

# TensorFlow

## Definition

TensorFlow ist ein [deep learning](/docs/fundamentals/deep-learning) framework mit Fokus auf Produktionsbereitstellung. Keras ist die High-Level-API. Es unterstützt CPU, GPU, TPU, and mobile/edge (TFLite). Es ist einn alternative to [PyTorch](/docs/frameworks/pytorch); TensorFlow and Keras are strong for production pipelines, [infrastructure](/docs/infrastructure) (TF Serving, TPU), and mobile (TFLite). Used for [vision](/docs/cv), [NLP](/docs/nlp), and recommendation systems; the ecosystem includes TensorFlow Hub for pretrained models.

## Funktionsweise

**Erstellen** Sie Modelle mit Keras (sequentielle oder funktionale API) oder der niedrigeren TensorFlow-API. **Trainieren** mit Eager-Ausführtion (default, PyTorch-like) or graph mode (faster, exportable). **Export** to SavedModel (standard serving format) or TFLite (mobile/edge, with [quantization](/docs/quantization) support). TensorFlow Hub and Keras Applications provide pretrained models for [transfer learning](/docs/transfer-learning). Distributed training uses tf.distribute; deployment uses TF Serving, Vertex AI, or on-device TFLite. The pipeline aus Daten (tf.data) to training to serving is well integrated.

## Anwendungsfälle

TensorFlow suits production pipelines, mobile/edge (TFLite), and quick prototyping with Keras and Hub models.

- Production ML pipelines and serving (z. B. SavedModel, TF Serving)
- Mobile and edge deployment (TFLite)
- Quick prototyping with Keras and pretrained models from Hub

## Externe Dokumentation

- [TensorFlow – Get started](https://www.tensorflow.org/tutorials)
- [Keras documentation](https://keras.io/)

## Siehe auch

- [PyTorch](/docs/frameworks/pytorch)
- [Deep learning](/docs/fundamentals/deep-learning)
- [Infrastructure](/docs/infrastructure)
