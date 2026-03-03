---
title: Antigravity
description: 以代理为先的 IDE，用于自主执行和氛围编程。
keywords: [Antigravity, agent-first IDE, autonomous coding]
---

# Antigravity

## 定义

Antigravity is an **agent-first IDE** that uses autonomous [LLM](/docs/llms)-powered [agents](/docs/agents) to handle coding, testing, and debugging across the editor, terminal, and browser. An **Agent Manager** coordinates multiple agents in parallel across workspaces; an **Artifacts Timeline** records plans, code diffs, screenshots, and browser recordings for verifiable outputs.

它强调自主性和人在回路中的反馈: agents execute tasks while users can comment and steer in real time. The IDE supports inline AI assistance and is powered by large models (例如 Gemini and others) with large context windows. Useful for [agent](/docs/agents)-centric workflows and [spec-driven development](/docs/spec-driven-development) where artifacts and auditability matter.

## 工作原理

你在**双重界面**中工作：一个功能齐全的**编辑器**带有内联 AI（重构、生成）和一个**代理管理器ager** that runs and orchestrates agents. **Agents** operate across editor, terminal, and browser—例如 implement a feature, run tests, or debug. **Artifacts** (plans, diffs, screenshots, recordings) are produced and shown in a timeline so outputs are inspectable. **Feedback**: you comment on agent work; the system incorporates feedback for the next steps. The platform runs on desktop (Windows, macOS, Linux) and supports large context and multiple model backends.

## 应用场景

Antigravity fits teams that want autonomous or semi-autonomous coding with clear artifacts and control.

- Agent-driven implementation and testing with verifiable artifacts
- Parallel work across multiple agents and workspaces
- Inline AI assistance plus manager-driven autonomy in one IDE

## 外部文档

- [Antigravity – Agent-first IDE](https://www.antigravityai.io/) — Product and overview
- [Antigravity IDE](https://antigravityaiide.com/) — Platform and capabilities

## 另请参阅

- [Agents](/docs/agents)
- [Spec-driven development](/docs/spec-driven-development)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
