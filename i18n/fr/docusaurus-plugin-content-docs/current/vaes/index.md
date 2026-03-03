---
title: Auto-encodeurs variationnels (VAE)
description: Auto-encodeurs probabilistes pour la génération et la représentation.
keywords: [VAE, variational, autoencoder, latent]
---

# Auto-encodeurs variationnels (VAE)

## Définition

VAEs learn a latent space by training an encoder-decoder with a variational (reparameterized) objective. They support generation and smooth interpolation in latent space.

Ils se distinguent de [GANs](/docs/gans) (adversarial) and [diffusion](/docs/diffusion-models) (denoising): l'espace latent est régularisé (KL to a prior) so it is smooth and interpretable. Generation can be blurrier than GANs/diffusion, but VAEs are useful for representation learning, anomaly detection, and when a low-D latent is desired.

## Comment ça fonctionne

**Input** est passé à un **encoder** qui produit parameters of a latent distribution (par ex. mean and log-variance for Gaussian). A **z** vector is sampled (reparameterization trick: z = mean + std * epsilon) and fed to the **decoder**, which **reconstructs** the input. **Loss** = reconstruction loss (par ex. MSE or cross-entropy) + KL divergence from the latent to a prior (par ex. standard normal). The KL term regularizes the latent space; the reconstruction term keeps it informative. At generation time, sample z from the prior and run the decoder.

## Cas d'utilisation

VAEs suit tasks that need a continuous latent space: smooth generation, anomaly detection, or learned representations.

- Generative modeling with smooth latent interpolation
- Anomaly detection via reconstruction error
- Learned representations for downstream tasks

## Documentation externe

- [Auto-Encoding Variational Bayes (Kingma & Welling)](https://arxiv.org/abs/1312.6114)
- [PyTorch – VAE tutorial](https://github.com/pytorch/examples/tree/main/vae)

## Voir aussi

- [GANs](/docs/gans)
- [Diffusion models](/docs/diffusion-models)
