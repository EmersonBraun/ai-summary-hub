---
title: KI und Robotik
description: KI für Wahrnehmung, Planung und Steuerung in der Robotik.
keywords: [Robotik, Steuerung, Wahrnehmung, RL]
---

# KI und Robotik

## Definition

KI in der Robotik umfasst Wahrnehmung (Vision, Berührung), Planung (Bewegung, Aufgabe) und Steuerung (Aktorik). [Reinforcement learning](/docs/rl) and imitation learning train policies aus Daten; sim-to-real transfer is a key challenge.

Wahrnehmung nutzt häufig [Computer Vision](/docs/cv) und manchmal [multimodale](/docs/multimodal-ai) Modelle. Steuerungsrichtlinien werden in der Simulation trainiert ([DRL](/docs/drl)) or from human demonstrations; deploying to real hardware requires dealing with dynamics misnachzuahmen (sim-to-real), safety, and latency.

## Funktionsweise

**Sensors** (cameras, Kraft/Drehmoment, Propriozeption) fließen in **perception** models die den Zustand schätzen (z. B. Objektposen, Szenenlayout). **Planners** (classical or learned) produce trajectories or high-level actions (z. B. “pick block A”). **Controllers** (z. B. PID, learned policy) execute low-level commands (joint torques, velocities) to track the plan. **End-to-end** learning maps raw sensor input to actions in one network; **modular** pipelines separate perception, planning, and control for interpretability and reuse. Training wird oft in simulation ([DRL](/docs/drl)); sim-to-real (domain randomization, system identification) and safety constraints are critical for deployment.

## Anwendungsfälle

KI-Robotik kommt zum Einsatz, wenn Wahrnehmung, Planung oder Steuerung aus Daten gelernt werden (Manipulation, Navigation, Sim-to-Real).

- Manipulation und Greifen (z. B. Pick-and-Place, Montage)
- Navigation und autonomes Fahren
- Sim-to-Real und Imitationslernen für Policy-Training

## Externe Dokumentation

- [Spinning Up in Deep RL (OpenAI)](https://spinningup.openai.com/) — RL for control
- [Google – Robotics](https://research.google/pubs/robotics/) — Forschungsübersicht

## Siehe auch

- [Reinforcement learning](/docs/rl)
- [Computer vision](/docs/cv)
