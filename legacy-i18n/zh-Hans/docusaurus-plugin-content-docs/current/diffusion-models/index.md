---
title: 扩散模型
description: 通过逐步去噪生成内容的生成模型。
keywords: [diffusion, denoising, DALL-E, Stable Diffusion]
---

# 扩散模型

## 定义

扩散模型通过学习逆转逐渐加噪过程来生成数据。 They have become the dominant approach for image generation (例如 DALL·E 2, Stable Diffusion).

与…不同 [GANs](/docs/gans), 训练稳定 (无最小-最大博弈); 不同于 [VAEs](/docs/vaes), 样本清晰且多样. 代价是 many denoising steps at inference (though distillation and fewer-step schedulers reduce this). Used for text-to-image, inpainting, and video; see [case study: DALL-E](/docs/case-studies/dall-e).

## 工作原理

**正向过程：**从数据 **x0** 开始，在 T 步中添加高斯噪声得到 **x1**、…、**xT**（近似pure noise). **Reverse process:** Learn a network that predicts the noise (or x0) at each step so you can go from **xT** to **x0** by iteratively denoising. Training: take a real sample, add noise to a random step t, train the network to predict the added noise. **Sampling:** Start from random **xT**, run the learned reverse process 逐步 to get **x0**. The diagram summarizes forward (data → noise) and reverse (noise → data).

## 应用场景

Diffusion models are 从噪声生成和编辑高质量图像、音频和视频的首选方法.

- Image generation (例如 DALL·E 2, Stable Diffusion, Midjourney)
- Image editing, inpainting, and super-resolution
- Audio and video generation

## 外部文档

- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239)
- [Hugging Face – Diffusion models](https://huggingface.co/docs/diffusers/)

## 另请参阅

- [GANs](/docs/gans)
- [VAEs](/docs/vaes)
- [Case study: DALL-E](/docs/case-studies/dall-e)
