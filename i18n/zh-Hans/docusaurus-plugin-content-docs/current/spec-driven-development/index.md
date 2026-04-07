---
title: 规范驱动开发
description: Building AI systems 基于明确的规范.
keywords: [spec-driven, specification, requirements, RDD]
---

# 规范驱动开发

## 定义

Spec-driven development 构建 AI 系统 (agents, pipelines, tools) 基于明确的规范: requirements, output formats, allowed actions, and constraints. Specs are retrieved and used at runtime (例如 in RDD) so behavior stays aligned with intent.

它是 especially useful for [agents](/docs/agents) and [RDD](/docs/reasoning-patterns/rdd): instead of encoding all rules in weights or prompts, you maintain specs (例如 in docs or a knowledge base) and retrieve them at runtime. Fits regulated domains and teams that want behavior to be auditable and updatable 无需重新训练.

## 工作原理

```mermaid
flowchart LR
  Spec[Spec] --> Retrieve[Retrieve spec]
  Task[Task] --> Retrieve
  Retrieve --> Decide[Decide]
  Decide --> Generate[Generate]
  Generate --> Validate[Validate]
```

You **write specs** (natural language, schemas, or structured rules) and index them for 检索 (例如 in a vector store or structured repo). At runtime, the **task** (and optionally the current state) is used to **retrieve** relevant spec fragments. The model or agent **decides** (例如 next step, allowed actions) and **generates** (output, tool call) with the spec in context. **Validate** checks the output against the spec (例如 schema, rules); if validation fails, you can retry or surface an error. This keeps generation and 决策s aligned with the spec without baking everything into [prompt engineering](/docs/prompt-engineering) or [fine-tuning](/docs/llms/fine-tuning).

## 应用场景

Spec-driven development fits when behavior must stay aligned with retrievable requirements (RDD, compliance, or safety).

- Building agents that retrieve and follow specs (例如 RDD pattern)
- Enforcing output format and constraints (JSON, allowed actions)
- Regulated or safety-critical flows where behavior must match requirements

## 外部文档

- [LangChain – Structured output](https://python.langchain.com/docs/concepts/output_parsers/) — Enforcing output format from LLMs
- [OpenAI – Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

## 另请参阅

- [RDD](/docs/reasoning-patterns/rdd)
- [Agents](/docs/agents)
- [Prompt engineering](/docs/prompt-engineering)
