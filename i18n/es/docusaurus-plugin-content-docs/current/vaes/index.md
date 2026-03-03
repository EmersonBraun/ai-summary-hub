---
title: Autocodificadores variacionales (VAE)
description: Autoencoders probabilísticos para generación y representación.
keywords: [VAE, variational, autoencoder, latent]
---

# Autocodificadores variacionales (VAE)

## Definición

Los VAEs aprenden un espacio latente entrenando un encoder-decoder with a variational (reparameterized) objective. They support generation and smooth interpolation in latent space.

Se diferencian de [GANs](/docs/gans) (adversariales) y [difusión](/docs/diffusion-models) (eliminación de ruido): el espacio latente está regularizado (KL hacia un prior) so it is smooth and interpretable. Generation can be blurrier than GANs/diffusion, but VAEs are useful for representation learning, anomaly detection, and when a low-D latent is desired.

## Cómo funciona

**Input** se pasa a un **encoder** que produce parameters of a latent distribution (por ej. mean and log-variance for Gaussian). A **z** vector is sampled (reparameterization trick: z = mean + std * epsilon) and fed to the **decoder**, which **reconstructs** the input. **Loss** = reconstruction loss (por ej. MSE or cross-entropy) + KL divergence from the latent to a prior (por ej. standard normal). The KL term regularizes the latent space; the reconstruction term keeps it informative. At generation time, sample z from the prior and run the decoder.

## Casos de uso

VAEs suit tasks that need a continuous latent space: smooth generation, anomaly detection, or learned representations.

- Generative modeling with smooth latent interpolation
- Anomaly detection via reconstruction error
- Learned representations for downstream tasks

## Documentación externa

- [Auto-Encodificación Variational Bayes (Kingma & Welling)](https://arxiv.org/abs/1312.6114)
- [PyTorch – VAE tutorial](https://github.com/pytorch/examples/tree/main/vae)

## Ver también

- [GANs](/docs/gans)
- [Diffusion models](/docs/diffusion-models)
