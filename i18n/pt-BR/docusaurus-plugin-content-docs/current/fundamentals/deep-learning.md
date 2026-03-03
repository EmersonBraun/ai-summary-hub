---
title: Aprendizado profundo
description: Redes neurais profundas e aprendizado de representações.
keywords: [aprendizado profundo, redes neurais, aprendizado de representações]
---

# Aprendizado profundo

## Definição

O aprendizado profundo usa redes neurais com muitas camadas para aprender representações hierárquicas a partir de dados. Impulsionou avanços em visão, linguagem e outros domínios ao escalar dados e computação.

Ele estende o [aprendizado de máquina](/docs/fundamentals/machine-learning) usando modelos diferenciáveis e em camadas (veja [redes neurais](/docs/neural-networks)) que aprendem características automaticamente em vez de projetá-las manualmente. A profundidade permite que o modelo construa representações cada vez mais abstratas (ex.: bordas → texturas → partes → objetos em visão).

## Como funciona

```mermaid
flowchart LR
  Data[Dados] --> Layers[Camadas]
  Layers --> Representation[Representação]
  Representation --> Output[Saída]
```

Os **dados** são alimentados na primeira **camada**; cada camada aplica uma transformação linear seguida de uma não linearidade (ex.: ReLU). Empilhar camadas produz uma **representação** (embedding) que se torna mais abstrata em camadas mais profundas. A camada final mapeia para a **saída** (ex.: pontuações de classe ou tokens). O treinamento usa **retropropagação** para calcular gradientes e **descida de gradiente** para atualizar pesos. Arquiteturas (CNNs para imagens, RNNs para sequências, [Transformers](/docs/transformers) para ambos) adaptam a conectividade e operações aos dados e à tarefa.

## Casos de uso

O aprendizado profundo é o padrão para percepção e geração quando dados são abundantes e tarefas são complexas.

- Reconhecimento de imagens, detecção de objetos e segmentação (visão)
- Reconhecimento de fala, tradução automática e geração de texto (linguagem)
- Jogos, controle robótico e simulação (aprendizado por reforço)

## Documentação externa

- [Deep Learning (Goodfellow et al.)](https://www.deeplearningbook.org/) — Livro online gratuito
- [PyTorch – Introdução](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — Aprendizado profundo prático

## Veja também

- [Redes neurais](/docs/neural-networks)
- [Transformers](/docs/transformers)
- [Frameworks (PyTorch, TensorFlow)](/docs/frameworks/pytorch)
