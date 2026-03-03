---
title: Antigravity
description: Agent-First-IDE für autonome Ausführung und Vibe Coding.
keywords: [Antigravity, Agent-First-IDE, autonomous Programmierung]
---

# Antigravity

## Definition

Antigravity ist eine **Agent-First-IDE** das autonome [LLM](/docs/llms)-powered [agents](/docs/agents) zum Programmieren, Testen und Debuggen verwendetcross the editor, Terminal, and browser. An **Agent-Manager** coordinates multiple agents in parallel across workspaces; an **Artifacts Timeline** records plans, code diffs, screenshots, and browser recordings for verifiable outputs.

Es betont Autonomie und Mensch-in-der-Schleife-Feedback: Agenten führen Aufgaben aus, während Benutzer in Echtzeit kommentieren und steuern können. Die IDE unterstützt Inline-KI assistance and is powered by großes Modells (z. B. Gemini and others) with large context windows. Useful for [agent](/docs/agents)-centric workflows and [spec-driven development](/docs/spec-driven-development) where artifacts and auditability matter.

## Funktionsweise

Man arbeitet in einer **dualen Oberfläche**: einem vollständigen **Editor** mit Inline-KI (Refactoring, Generierung) und einem **Agent-Manager**, der Agenten ausführt und orchestriert. **Agenten** arbeiten über vditor, Terminal, and browser—z. B. implement a feature, run tests, or debug. **Artifacts** (plans, diffs, screenshots, recordings) are produced and shown in a timeline so outputs are inspectable. **Feedback**: you comment on agent work; the system incorporates feedback für den next steps. The platform runs on desktop (Windows, macOS, Linux) and supports large context and multiple model backends.

## Anwendungsfälle

Antigravity fits teams that want autonomous or semi-autonomous Programmierung with clear artifacts and control.

- Agent-driven implementation and testing with verifiable artifacts
- Parallel work across multiple agents and workspaces
- Inline AI assistance plus manager-driven autonomy in one IDE

## Externe Dokumentation

- [Antigravity – Agent-first IDE](https://www.antigravityai.io/) — Product and overview
- [Antigravity IDE](https://antigravityaiide.com/) — Platform and capabilities

## Siehe auch

- [Agents](/docs/agents)
- [Spec-driven development](/docs/spec-driven-development)
- [Cursor](/docs/tools/cursor)
- [LLMs](/docs/llms)
