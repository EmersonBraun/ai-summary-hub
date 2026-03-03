---
title: LangChain
description: Framework para aplicaciones y agentes de LLM.
keywords: [LangChain, chains, agents, RAG]
---

# LangChain

## Definición

LangChain es un framework for building [LLM](/docs/llms) applications: chains, [agents](/docs/agents), tools, and [RAG](/docs/rag) pipelines. It abstracts providers, prompts, and recuperación for quick prototyping and production.

Complementa [LlamaIndex](/docs/tools/llamaindex) (que enfatiza datos e indexación); LangChain enfatiza cadenas componibles y bucles de agentes. Úselo cuando you need [RAG](/docs/rag), [agents](/docs/agents) with tools, or multi-step [prompt](/docs/llms/prompt-engineering) workflows with minimal glue code.

## Cómo funciona

Se **componen** componentes: LLM (OpenAI, Anthropic, local, etc.), [prompts](/docs/llms/prompt-engineering), recuperadores ([vector stores](/docs/rag/vector-databases), [embeddings](/docs/rag/embeddings)), and tools (APIs, search, code). **Chains** wire them in sequence (por ej. prompt → LLM → parser). **Agents** add a loop: LLM decides which tool to call, you execute it and append the result, repeat until the LLM returns a final answer. LangSmith provides tracing and evaluation. Integrations cover many [vector databases](/docs/rag/vector-databases), document loaders, and tool APIs. Start with a template (por ej. RAG, agent) and swap or add components as needed.

## Casos de uso

LangChain is used to assemble LLM apps quickly: RAG, agents, and workflows with minimal boilerplate.

- Building RAG pipelines and document Q&A applications
- Implementing agents with tools (search, APIs, code)
- Rapid prototyping of LLM workflows with minimal boilerplate

## Documentación externa

- [LangChain documentation](https://python.langchain.com/docs/)
- [LangChain – Agents](https://python.langchain.com/docs/concepts/agents/)
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)

## Ver también

- [RAG](/docs/rag)
- [Agents](/docs/agents)
- [LlamaIndex](/docs/tools/llamaindex)
