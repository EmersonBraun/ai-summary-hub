---
title: Réseaux antagonistes génératifs (GAN)
description: Adversarial training for generative models.
keywords: [GAN, generative, discriminator, generator]
---

# Réseaux antagonistes génératifs (GAN)

## Définition

GANs entraînent un générateur et un discriminateur dans un jeu: the generator produces samples; the discriminator tries to distinguish them from real data. Training pushes the generator toward realistic outputs.

They étaient l'approche générative dominante avant [diffusion models](/docs/diffusion-models). Compared to [VAEs](/docs/vaes), GANs often produce sharper images but training can be unstable (mode collapse, discriminator/generator balance). Still used for style transfer, data augmentation, and some image editing.

## Comment ça fonctionne

**Generator:** Takes **noise** (vecteur aléatoire) and outputs a **fake sample** (par ex. image). **Discriminator:** Receives **real data** and **fake sample**, outputs **real or fake** (or a score). Training is a **min-max game**: the generator tries to maximize the discriminator’s loss (fool it), the discriminator tries to minimize it (tell real from fake). In practice you alternate gradient steps. Variants (DCGAN, StyleGAN, etc.) use better architectures and training tricks (par ex. spectral norm, progressive growing) for stability and quality.

```mermaid
flowchart LR
  Z[Noise] --> G[Generator]
  G --> Fake[Fake sample]
  Real[Real data] --> D[Discriminator]
  Fake --> D
  D --> Out[Real or fake]
```

## Cas d'utilisation

GANs are used for generative and discriminative tasks when you want adversarial training and sharp samples (images, audio, data aug).

- Image generation and editing (par ex. StyleGAN, face synthesis)
- Data augmentation and synthetic data for training
- Domain adaptation and style transfer

## Documentation externe

- [Generative Adversarial Networks (Goodfellow et al.)](https://arxiv.org/abs/1406.2661)
- [PyTorch – DCGAN tutorial](https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html)

## Voir aussi

- [Diffusion models](/docs/diffusion-models)
- [VAEs](/docs/vaes)
