---
title: TensorFlow
description: Deep learning framework by Google.
keywords: [TensorFlow, Keras, 深度学习]
---

# TensorFlow

## 定义

TensorFlow is a [deep learning](/docs/fundamentals/deep-learning) framework with a focus on production deployment. Keras 是高级 API. 它支持 CPU, GPU, TPU, and mobile/edge (TFLite). 它是 an alternative to [PyTorch](/docs/frameworks/pytorch); TensorFlow and Keras are strong for production pipelines, [infrastructure](/docs/infrastructure) (TF Serving, TPU), and mobile (TFLite). Used for [vision](/docs/cv), [NLP](/docs/nlp), and recommendation systems; the ecosystem includes TensorFlow Hub for pretrained models.

## 工作原理

用 Keras（顺序或函数式 API）或更底层的 TensorFlow API **构建**模型。用 eager 执行**训练tion (default, PyTorch-like) or graph mode (faster, exportable). **Export** to SavedModel (standard serving format) or TFLite (mobile/edge, with [quantization](/docs/quantization) support). TensorFlow Hub and Keras Applications provide pretrained models for [transfer learning](/docs/transfer-learning). Distributed training uses tf.distribute; deployment uses TF Serving, Vertex AI, or on-device TFLite. The pipeline from data (tf.data) to training to serving is well integrated.

## 应用场景

TensorFlow suits production pipelines, mobile/edge (TFLite), and quick prototyping with Keras and Hub models.

- Production ML pipelines and serving (例如 SavedModel, TF Serving)
- Mobile and edge deployment (TFLite)
- Quick prototyping with Keras and pretrained models from Hub

## 外部文档

- [TensorFlow – Get started](https://www.tensorflow.org/tutorials)
- [Keras documentation](https://keras.io/)

## 另请参阅

- [PyTorch](/docs/frameworks/pytorch)
- [Deep learning](/docs/fundamentals/deep-learning)
- [Infrastructure](/docs/infrastructure)
