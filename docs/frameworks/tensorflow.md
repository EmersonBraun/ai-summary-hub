---
title: TensorFlow
description: Deep learning framework by Google.
keywords: [TensorFlow, Keras, deep learning]
tags: [beginner]
authors: [EmersonBraun]
---

# TensorFlow

## Definition

TensorFlow is a [deep learning](/docs/fundamentals/deep-learning) framework with a focus on production deployment. Keras is the high-level API. It supports CPU, GPU, TPU, and mobile/edge (TFLite). It is an alternative to [PyTorch](/docs/frameworks/pytorch); TensorFlow and Keras are strong for production pipelines, [infrastructure](/docs/infrastructure) (TF Serving, TPU), and mobile (TFLite). Used for [vision](/docs/cv), [NLP](/docs/nlp), and recommendation systems; the ecosystem includes TensorFlow Hub for pretrained models.

## How it works

**Build** models with Keras (sequential or functional API) or the lower-level TensorFlow API. **Train** with eager execution (default, PyTorch-like) or graph mode (faster, exportable). **Export** to SavedModel (standard serving format) or TFLite (mobile/edge, with [quantization](/docs/quantization) support). TensorFlow Hub and Keras Applications provide pretrained models for [transfer learning](/docs/transfer-learning). Distributed training uses tf.distribute; deployment uses TF Serving, Vertex AI, or on-device TFLite. The pipeline from data (tf.data) to training to serving is well integrated.

## Use cases

TensorFlow suits production pipelines, mobile/edge (TFLite), and quick prototyping with Keras and Hub models.

- Production ML pipelines and serving (e.g. SavedModel, TF Serving)
- Mobile and edge deployment (TFLite)
- Quick prototyping with Keras and pretrained models from Hub

## External documentation

- [TensorFlow – Get started](https://www.tensorflow.org/tutorials)
- [Keras documentation](https://keras.io/)

## See also

- [PyTorch](/docs/frameworks/pytorch)
- [Deep learning](/docs/fundamentals/deep-learning)
- [Infrastructure](/docs/infrastructure)
