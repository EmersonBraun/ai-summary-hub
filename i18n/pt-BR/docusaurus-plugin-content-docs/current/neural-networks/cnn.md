---
title: Redes neurais convolucionais (CNN)
description: CNNs para dados espaciais e imagens.
keywords: [CNN, convolução, visão computacional]
---

# Redes neurais convolucionais (CNN)

## Definição

CNNs usam camadas convolucionais para capturar padrões locais (bordas, texturas) e construir características hierárquicas. São o backbone padrão para classificação, detecção e segmentação de imagens.

Diferente das [redes neurais](/docs/neural-networks) densas, as convoluções compartilham pesos no espaço, sendo equivariantes à translação e eficientes para imagens e outros dados de tipo grade. Formam o backbone da maioria dos sistemas de [visão computacional](/docs/cv) e também são usadas em [transformers](/docs/transformers) para embedding de patches.

## Como funciona

```mermaid
flowchart LR
  Image[Imagem] --> Conv[Conv]
  Conv --> Pool[Pool]
  Pool --> Conv2[Conv]
  Conv2 --> Class[Classe]
```

A **imagem** (ou mapa de características) é alimentada em camadas **convolucionais**: cada filtro desliza sobre a entrada e calcula produtos internos, produzindo mapas de ativação que destacam padrões locais (bordas, texturas). O **pooling** (ex.: max pooling) reduz espacialmente o tamanho, adicionando leve invariância. Camadas **conv** mais profundas veem campos receptivos maiores e capturam características mais abstratas (partes, objetos). A cabeça final de **classe** (ou detecção/segmentação) geralmente consiste em uma ou mais camadas densas sobre as características achatadas ou com pooling. O treinamento usa a mesma retropropagação e descida de gradiente que outros modelos de [aprendizado profundo](/docs/fundamentals/deep-learning).

## Casos de uso

CNNs são o padrão para qualquer tarefa onde a estrutura espacial (imagens, vídeo ou sinais 2D/3D) importa.

- Classificação de imagens (ex.: reconhecimento de objetos, análise de imagens médicas)
- Detecção de objetos e segmentação de instâncias
- Análise de vídeo e reconhecimento de ações

## Documentação externa

- [CS231n – CNNs para reconhecimento visual](https://cs231n.github.io/convolutional-networks/)
- [PyTorch – Redes neurais convolucionais](https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html#convolutional-nets)

## Veja também

- [Visão computacional](/docs/cv)
- [Redes neurais](/docs/neural-networks)
