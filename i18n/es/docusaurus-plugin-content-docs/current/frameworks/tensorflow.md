---
title: TensorFlow
description: Deep learning framework by Google.
keywords: [TensorFlow, Keras, aprendizaje profundo]
---

# TensorFlow

## Definición

TensorFlow is a [deep learning](/docs/fundamentals/deep-learning) framework with a focus on production deployment. Keras es la API de alto nivel. Soporta CPU, GPU, TPU, and mobile/edge (TFLite). Es an alternative to [PyTorch](/docs/frameworks/pytorch); TensorFlow and Keras are strong for production pipelines, [infrastructure](/docs/infrastructure) (TF Serving, TPU), and mobile (TFLite). Used for [vision](/docs/cv), [NLP](/docs/nlp), and recommendation systems; the ecosystem includes TensorFlow Hub for pretrained models.

## Cómo funciona

**Construya** modelos con Keras (API secuencial o funcional) o la API de TensorFlow de nivel inferior. **Entrene** con ejecución eagertion (default, PyTorch-like) or graph mode (faster, exportable). **Export** to SavedModel (standard serving format) or TFLite (mobile/edge, with [quantization](/docs/quantization) support). TensorFlow Hub and Keras Applications provide pretrained models for [transfer learning](/docs/transfer-learning). Distributed training uses tf.distribute; deployment uses TF Serving, Vertex AI, or on-device TFLite. The pipeline from data (tf.data) to training to serving is well integrated.

## Casos de uso

TensorFlow suits production pipelines, mobile/edge (TFLite), and quick prototyping with Keras and Hub models.

- Production ML pipelines and serving (por ej. SavedModel, TF Serving)
- Mobile and edge deployment (TFLite)
- Quick prototyping with Keras and pretrained models from Hub

## Documentación externa

- [TensorFlow – Get started](https://www.tensorflow.org/tutorials)
- [Keras documentation](https://keras.io/)

## Ver también

- [PyTorch](/docs/frameworks/pytorch)
- [Deep learning](/docs/fundamentals/deep-learning)
- [Infrastructure](/docs/infrastructure)
