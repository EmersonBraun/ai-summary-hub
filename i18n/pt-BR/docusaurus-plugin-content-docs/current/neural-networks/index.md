---
title: Redes neurais
description: Introdução às redes neurais artificiais e seus componentes básicos.
keywords: [redes neurais, RNA, camadas, ativação]
---

# Redes neurais

## Definição

Redes neurais são aproximadores de funções construídos a partir de camadas de unidades (neurônios) com pesos aprendíveis e ativações não lineares. Podem aproximar mapeamentos complexos de entradas para saídas quando treinadas com dados.

São os blocos de construção do [aprendizado profundo](/docs/fundamentals/deep-learning). Variantes como [CNNs](/docs/neural-networks/cnn) e [RNNs](/docs/neural-networks/rnn) adicionam vieses indutivos (ex.: localidade, recorrência) para tipos de dados específicos; o mesmo mecanismo de treinamento (retropropagação, descida de gradiente) se aplica.

## Como funciona

```mermaid
flowchart LR
  Input[Entrada] --> Layer1[Camada1]
  Layer1 --> Layer2[Camada2]
  Layer2 --> Output[Saída]
```

A **entrada** é passada para a primeira camada. Cada **camada** calcula uma combinação linear de suas entradas (pesos) e então uma ativação não linear (ex.: ReLU, sigmoide). A saída de uma camada se torna a entrada da próxima; empilhar camadas permite à rede aprender características hierárquicas. A camada de **saída** final mapeia tipicamente para predições (ex.: pontuações de classe ou um escalar). O treinamento minimiza uma perda por **retropropagação** (cálculo de gradientes pela regra da cadeia) e **descida de gradiente** (atualização de pesos). Profundidade e largura determinam a capacidade; regularização e tamanho dos dados controlam o overfitting.

## Casos de uso

Redes neurais são usadas onde quer que se precise de aproximação de funções flexível e orientada por dados.

- Regressão e classificação (ex.: previsão de vendas, classificação de imagens)
- Aprendizado de características para tarefas posteriores (embeddings, transfer learning)
- Aproximação de funções não lineares complexas em controle ou simulação

## Documentação externa

- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com/) — Livro online gratuito
- [3Blue1Brown – Redes neurais](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) — Introdução visual

## Veja também

- [CNN](/docs/neural-networks/cnn)
- [RNN](/docs/neural-networks/rnn)
- [Aprendizado profundo](/docs/fundamentals/deep-learning)
