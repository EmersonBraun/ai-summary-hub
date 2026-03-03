---
title: Aprendizado de máquina
description: Introdução ao aprendizado de máquina — supervisionado, não supervisionado e por reforço.
keywords: [aprendizado de máquina, ML, supervisionado, não supervisionado]
---

# Aprendizado de máquina

## Definição

Aprendizado de máquina (ML) é o estudo de algoritmos que melhoram com a experiência (dados). Os principais paradigmas incluem **aprendizado supervisionado** (aprender com exemplos rotulados), **aprendizado não supervisionado** (encontrar estrutura sem rótulos) e **aprendizado por reforço** (aprender com recompensas).

ML é preferido em relação a regras codificadas manualmente quando o problema é complexo demais para especificar explicitamente ou quando dados são abundantes. Situa-se entre a IA clássica (regras simbólicas) e o [aprendizado profundo](/docs/fundamentals/deep-learning) (grandes redes neurais); muitos sistemas reais combinam modelos ML com pipelines e lógica de negócio.

## Como funciona

```mermaid
flowchart LR
  Data[Dados] --> Train[Treinamento]
  Train --> Model[Modelo]
  Model --> Predict[Predição]
```

**Treinamento:** Você escolhe uma representação (ex.: modelo linear, árvore ou rede neural) e um objetivo (perda para supervisionado/não supervisionado, recompensa para RL). Um otimizador (ex.: descida de gradiente) atualiza os parâmetros do modelo para minimizar a perda ou maximizar a recompensa nos dados de treino. **Modelo:** O resultado é um modelo ajustado (pesos, estrutura) que captura padrões nos dados. **Predição:** No tempo de inferência, novas entradas são alimentadas no modelo para obter saídas (rótulos, pontuações ou ações). A avaliação usa splits de treino/validação/teste para estimar a generalização e evitar overfitting.

## Casos de uso

O ML clássico se destaca com dados estruturados ou tabulares e rótulos ou metas claros.

- Classificação de spam, detecção de fraude e outras tarefas de classificação supervisionada
- Sistemas de recomendação e filtragem colaborativa
- Previsões e predição de séries temporais

## Documentação externa

- [Curso acelerado de ML do Google](https://developers.google.com/machine-learning/crash-course)
- [Scikit-learn – Guia do usuário](https://scikit-learn.org/stable/user_guide.html) — ML clássico na prática

## Veja também

- [Aprendizado profundo](/docs/fundamentals/deep-learning)
- [Aprendizado por reforço](/docs/rl)
- [Métricas de avaliação](/docs/evaluation-metrics)
