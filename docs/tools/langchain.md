---
title: LangChain
description: Framework for LLM applications and agents.
keywords: [LangChain, chains, agents, RAG]
tags: [intermediate]
authors: [EmersonBraun]
---

# LangChain

## Definition

LangChain is a framework for building [LLM](/docs/llms) applications: chains, [agents](/docs/agents), tools, and [RAG](/docs/rag) pipelines. It abstracts providers, prompts, and retrieval for quick prototyping and production.

It complements [LlamaIndex](/docs/tools/llamaindex) (which emphasizes data and indexing); LangChain emphasizes composable chains and agent loops. Use it when you need [RAG](/docs/rag), [agents](/docs/agents) with tools, or multi-step [prompt](/docs/prompt-engineering) workflows with minimal glue code.

## How it works

You **compose** components: LLM (OpenAI, Anthropic, local, etc.), [prompts](/docs/prompt-engineering), retrievers ([vector stores](/docs/rag/vector-databases), [embeddings](/docs/rag/embeddings)), and tools (APIs, search, code). **Chains** wire them in sequence (e.g. prompt → LLM → parser). **Agents** add a loop: LLM decides which tool to call, you execute it and append the result, repeat until the LLM returns a final answer. LangSmith provides tracing and evaluation. Integrations cover many [vector databases](/docs/rag/vector-databases), document loaders, and tool APIs. Start with a template (e.g. RAG, agent) and swap or add components as needed.

## Use cases

LangChain is used to assemble LLM apps quickly: RAG, agents, and workflows with minimal boilerplate.

- Building RAG pipelines and document Q&A applications
- Implementing agents with tools (search, APIs, code)
- Rapid prototyping of LLM workflows with minimal boilerplate

## External documentation

- [LangChain documentation](https://python.langchain.com/docs/)
- [LangChain – Agents](https://python.langchain.com/docs/concepts/agents/)
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)

## See also

- [RAG](/docs/rag)
- [Agents](/docs/agents)
- [LlamaIndex](/docs/tools/llamaindex)
