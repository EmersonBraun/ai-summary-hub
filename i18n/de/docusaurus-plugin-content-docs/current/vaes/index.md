---
title: Variational Autoencoders (VAEs)
description: Probabilistische Autoencoder für Generierung und Repräsentation.
keywords: [VAE, variational, autoencoder, latent]
---

# Variational Autoencoders (VAEs)

## Definition

VAEs lernen einen latenten Raum durch Training eines Encoder-Decoders with a variational (reparameterized) objective. They support generation and smooth interpolation in latent space.

Sie unterscheiden sich von [GANs](/docs/gans) (adversarisch) und [Diffusion](/docs/diffusion-models) (Entrauschen): der latente Raum ist regularisiert (KL zu einem Prior) sodass es is smooth and interpretable. Generation can be blurrier than GANs/diffusion, but VAEs are useful for representation learning, anomaly detection, and when a low-D latent is desired.

## Funktionsweise

**Input** wird an einen **encoder** das ausgibt parameters of a latent distribution (z. B. Mittelwert und Log-Varianz for Gaussian). A **z** vector is sampled (reparameterization trick: z = mean + std * epsilon) and fed to the **decoder**, which **reconstructs** the input. **Loss** = reconstruction loss (z. B. MSE or cross-entropy) + KL divergence aus dem latent to a prior (z. B. standard normal). The KL term regularizes the latent space; the reconstruction term keeps it informative. At generation time, sample z aus dem prior and run the decoder.

## Anwendungsfälle

VAEs suit tasks that need a continuous latent space: smooth generation, anomaly detection, or learned representations.

- Generative modeling with smooth latent interpolation
- Anomaly detection via reconstruction error
- Learned representations für nachgelagerte Aufgaben

## Externe Dokumentation

- [Auto-EnProgrammierung Variational Bayes (Kingma & Welling)](https://arxiv.org/abs/1312.6114)
- [PyTorch – VAE tutorial](https://github.com/pytorch/examples/tree/main/vae)

## Siehe auch

- [GANs](/docs/gans)
- [Diffusion models](/docs/diffusion-models)
