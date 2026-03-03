---
title: Reinforcement learning (RL)
description: Apprentissage à partir de récompenses et prise de décision séquentielle.
keywords: [reinforcement learning, RL, rewards, MDP]
---

# Reinforcement learning (RL)

## Définition

L'apprentissage par renforcement entraîne des agents à maximiser la récompense cumulative in an environment. The agent takes actions, receives observations and rewards, and improves its policy (par ex. value-based, policy gradient, actor-critic).

Il se distingue de [supervised](/docs/fundamentals/machine-learning) and [unsupervised](/docs/fundamentals/machine-learning) learning car le retour est sparse and delayed (rewards), and the agent must explore. Used in games, robotics, and [LLM](/docs/llms) alignment (RLHF). For high-dimensional states/actions, see [deep RL](/docs/drl).

## Comment ça fonctionne

Le cadre est généralement un **MDP** : l'**agent** voit un **état**, choisit une **action**, et l'**environnement** renvoies a **reward** and **next state**. The agent improves its policy (mapping from state to action) to maximize cumulative reward. **Value-based** methods (par ex. Q-learning, DQN) learn a value function and derive the policy; **policy gradient** methods (par ex. PPO, SAC) optimize the policy directly. Exploration (par ex. epsilon-greedy, entropy bonus) is needed because rewards are only observed for actions taken. Algorithms differ in how they handle off-policy data, continuous actions, and scaling to large state spaces.

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

## Cas d'utilisation

Reinforcement learning applies wherever an agent learns from rewards and sequential décisions (games, control, alignment).

- Game playing (par ex. Atari, Go, poker) and simulation
- Robotics control and continuous control (par ex. manipulation)
- LLM alignment (par ex. RLHF) and sequential décision systems

## Documentation externe

- [Reinforcement Learning (Sutton & Barto)](http://incompleteideas.net/book/the-book-2nd.html) — Free online book
- [Spinning Up in Deep RL (OpenAI)](https://spinningup.openai.com/)

## Voir aussi

- [Deep RL](/docs/drl)
- [Machine learning](/docs/fundamentals/machine-learning)
- [Agents](/docs/agents)
