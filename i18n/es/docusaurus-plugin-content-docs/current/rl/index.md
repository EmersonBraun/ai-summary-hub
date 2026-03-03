---
title: Reinforcement learning (RL)
description: Aprendizaje a partir de recompensas y toma de decisiónes secuenciales.
keywords: [reinforcement learning, RL, rewards, MDP]
---

# Reinforcement learning (RL)

## Definición

El aprendizaje por refuerzo entrena agentes para maximizar la recompensa acumulada in an environment. The agent takes actions, receives observations and rewards, and improves its policy (por ej. value-based, policy gradient, actor-critic).

Difiere de [supervised](/docs/fundamentals/machine-learning) and [unsupervised](/docs/fundamentals/machine-learning) learning porque la retroalimentación es sparse and delayed (rewards), and the agent must explore. Used in games, robotics, and [LLM](/docs/llms) alignment (RLHF). For high-dimensional states/actions, see [deep RL](/docs/drl).

## Cómo funciona

El escenario es generalmente un **MDP**: el **agente** ve un **estado**, elige una **acción**, y el **entorno** devuelves a **reward** and **next state**. The agent improves its policy (mapping from state to action) to maximize cumulative reward. **Value-based** methods (por ej. Q-learning, DQN) learn a value function and derive the policy; **policy gradient** methods (por ej. PPO, SAC) optimize the policy directly. Exploration (por ej. epsilon-greedy, entropy bonus) is needed because rewards are only observed for actions taken. Algorithms differ in how they handle off-policy data, continuous actions, and scaling to large state spaces.

```mermaid
flowchart LR
  S[State] --> A[Action]
  A --> E[Environment]
  E --> R[Reward]
  E --> S2[Next state]
  R --> Agent[Agent]
  S2 --> Agent
  Agent --> A
```

## Casos de uso

Reinforcement learning applies wherever an agent learns from rewards and sequential decisións (games, control, alignment).

- Game playing (por ej. Atari, Go, poker) and simulation
- Robotics control and continuous control (por ej. manipulation)
- LLM alignment (por ej. RLHF) and sequential decisión systems

## Documentación externa

- [Reinforcement Learning (Sutton & Barto)](http://incompleteideas.net/book/the-book-2nd.html) — Free online book
- [Spinning Up in Deep RL (OpenAI)](https://spinningup.openai.com/)

## Ver también

- [Deep RL](/docs/drl)
- [Machine learning](/docs/fundamentals/machine-learning)
- [Agents](/docs/agents)
