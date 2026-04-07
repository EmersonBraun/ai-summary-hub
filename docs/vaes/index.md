---
title: Variational autoencoders (VAEs)
description: Probabilistic autoencoders for generation and representation.
keywords: [VAE, variational, autoencoder, latent]
tags: [advanced]
---

# Variational autoencoders (VAEs)

## Definition

VAEs learn a latent space by training an encoder-decoder with a variational (reparameterized) objective. They support generation and smooth interpolation in latent space.

They differ from [GANs](/docs/gans) (adversarial) and [diffusion](/docs/diffusion-models) (denoising): the latent space is regularized (KL to a prior) so it is smooth and interpretable. Generation can be blurrier than GANs/diffusion, but VAEs are useful for representation learning, anomaly detection, and when a low-D latent is desired.

## How it works

**Input** is passed to an **encoder** that outputs parameters of a latent distribution (e.g. mean and log-variance for Gaussian). A **z** vector is sampled (reparameterization trick: z = mean + std * epsilon) and fed to the **decoder**, which **reconstructs** the input. **Loss** = reconstruction loss (e.g. MSE or cross-entropy) + KL divergence from the latent to a prior (e.g. standard normal). The KL term regularizes the latent space; the reconstruction term keeps it informative. At generation time, sample z from the prior and run the decoder.

## Use cases

VAEs suit tasks that need a continuous latent space: smooth generation, anomaly detection, or learned representations.

- Generative modeling with smooth latent interpolation
- Anomaly detection via reconstruction error
- Learned representations for downstream tasks

## External documentation

- [Auto-Encoding Variational Bayes (Kingma & Welling)](https://arxiv.org/abs/1312.6114)
- [PyTorch – VAE tutorial](https://github.com/pytorch/examples/tree/main/vae)

## See also

- [GANs](/docs/gans)
- [Diffusion models](/docs/diffusion-models)
