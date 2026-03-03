---
title: AI 与机器人技术
description: AI 在机器人技术中的感知、规划和控制。
keywords: [机器人技术, 控制, 感知, RL]
---

# AI 与机器人技术

## 定义

AI in robotics covers perception (vision, touch), planning (motion, task), and control (actuation). [Reinforcement learning](/docs/rl) and imitation learning train policies from data; sim-to-real transfer is a key challenge.

感知通常使用[计算机视觉](/docs/cv)，有时使用[多模态](/docs/multimodal-ai)模型。控制策略在模拟中训练（[DRL](/docs/drl)) or from human demonstrations; deploying to real hardware requires dealing with dynamics mismatch (sim-to-real), safety, and latency.

## 工作原理

**Sensors** (cameras, force/torque, proprioception) 输入到 **perception** models that estimate state (例如 object poses, scene layout). **Planners** (classical or learned) produce trajectories or high-level actions (例如 “pick block A”). **Controllers** (例如 PID, learned policy) execute low-level commands (joint torques, velocities) to track the plan. **End-to-end** learning maps raw sensor input to actions in one network; **modular** pipelines separate perception, planning, and control for interpretability and reuse. Training is often in simulation ([DRL](/docs/drl)); sim-to-real (domain randomization, system identification) and safety constraints are critical for deployment.

## 应用场景

AI robotics applies when perception, planning, or control are learned from data (manipulation, navigation, sim-to-real).

- Manipulation and grasping (例如 pick-and-place, assembly)
- Navigation and autonomous driving
- Sim-to-real and imitation learning for policy training

## 外部文档

- [Spinning Up in Deep RL (OpenAI)](https://spinningup.openai.com/) — RL for control
- [Google – Robotics](https://research.google/pubs/robotics/) — Research overview

## 另请参阅

- [Reinforcement learning](/docs/rl)
- [Computer vision](/docs/cv)
