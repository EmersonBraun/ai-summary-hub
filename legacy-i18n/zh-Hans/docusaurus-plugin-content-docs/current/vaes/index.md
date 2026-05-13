---
title: 变分自编码器 (VAE)
description: 用于生成和表示的概率自编码器。
keywords: [VAE, variational, autoencoder, latent]
---

# 变分自编码器 (VAE)

## 定义

VAEs learn a latent space by training an encoder-decoder with a variational (reparameterized) objective. They support generation and smooth interpolation in latent space.

它们不同于 [GANs](/docs/gans)（对抗性）和[扩散模型](/docs/diffusion-models)（去噪）：潜在空间是正则化的 (KL to a prior) so it is smooth and interpretable. Generation can be blurrier than GANs/diffusion, but VAEs are useful for representation learning, anomaly detection, and when a low-D latent is desired.

## 工作原理

**Input** 被传递给一个 **encoder** 输出 parameters of a latent distribution (例如 mean and log-variance for Gaussian). A **z** vector is sampled (reparameterization trick: z = mean + std * epsilon) and fed to the **decoder**, which **reconstructs** the input. **Loss** = reconstruction loss (例如 MSE or cross-entropy) + KL divergence from the latent to a prior (例如 standard normal). The KL term regularizes the latent space; the reconstruction term keeps it informative. At generation time, sample z from the prior and run the decoder.

## 应用场景

VAEs suit tasks that need a continuous latent space: smooth generation, anomaly detection, or learned representations.

- Generative modeling with smooth latent interpolation
- Anomaly detection via reconstruction error
- Learned representations for downstream tasks

## 外部文档

- [Auto-Encoding Variational Bayes (Kingma & Welling)](https://arxiv.org/abs/1312.6114)
- [PyTorch – VAE tutorial](https://github.com/pytorch/examples/tree/main/vae)

## 另请参阅

- [GANs](/docs/gans)
- [Diffusion models](/docs/diffusion-models)
