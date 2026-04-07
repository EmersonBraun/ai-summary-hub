---
title: Spec-driven development
description: Building AI systems from explicit specifications.
keywords: [spec-driven, specification, requirements, RDD]
tags: [intermediate]
authors: [EmersonBraun]
---

# Spec-driven development

## Definition

Spec-driven development builds AI systems (agents, pipelines, tools) from explicit specifications: requirements, output formats, allowed actions, and constraints. Specs are retrieved and used at runtime (e.g. in RDD) so behavior stays aligned with intent.

It is especially useful for [agents](/docs/agents) and [RDD](/docs/reasoning-patterns/rdd): instead of encoding all rules in weights or prompts, you maintain specs (e.g. in docs or a knowledge base) and retrieve them at runtime. Fits regulated domains and teams that want behavior to be auditable and updatable without retraining.

## How it works

```mermaid
flowchart LR
  Spec[Spec] --> Retrieve[Retrieve spec]
  Task[Task] --> Retrieve
  Retrieve --> Decide[Decide]
  Decide --> Generate[Generate]
  Generate --> Validate[Validate]
```

You **write specs** (natural language, schemas, or structured rules) and index them for retrieval (e.g. in a vector store or structured repo). At runtime, the **task** (and optionally the current state) is used to **retrieve** relevant spec fragments. The model or agent **decides** (e.g. next step, allowed actions) and **generates** (output, tool call) with the spec in context. **Validate** checks the output against the spec (e.g. schema, rules); if validation fails, you can retry or surface an error. This keeps generation and decisions aligned with the spec without baking everything into [prompt engineering](/docs/prompt-engineering) or [fine-tuning](/docs/llms/fine-tuning).

## Use cases

Spec-driven development fits when behavior must stay aligned with retrievable requirements (RDD, compliance, or safety).

- Building agents that retrieve and follow specs (e.g. RDD pattern)
- Enforcing output format and constraints (JSON, allowed actions)
- Regulated or safety-critical flows where behavior must match requirements

## External documentation

- [LangChain – Structured output](https://python.langchain.com/docs/concepts/output_parsers/) — Enforcing output format from LLMs
- [OpenAI – Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

## See also

- [RDD](/docs/reasoning-patterns/rdd)
- [Agents](/docs/agents)
- [Prompt engineering](/docs/prompt-engineering)
