---
title: LangChain
description: Framework für LLM-Anwendungen und Agenten.
keywords: [LangChain, chains, agents, RAG]
---

# LangChain

## Definition

LangChain ist ein Framework zum Erstellen von [LLM](/docs/llms) applications: chains, [agents](/docs/agents), tools, and [RAG](/docs/rag) pipelines. It abstracts providers, prompts, and Abruf for quick prototyping and production.

Es ergänzt [LlamaIndex](/docs/tools/llamaindex) (which emphasizes Daten und Indexierung); LangChain betont komposierbare Ketten und Agenten-Schleifen. Verwenden Sie es, wenn Sie brauchen [RAG](/docs/rag), [agents](/docs/agents) with tools, or multi-step [prompt](/docs/prompt-engineering) workflows mit minimalem glue code.

## Funktionsweise

Man **komponiert** Komponenten: LLM (OpenAI, Anthropic, lokal, etc.), [Prompts](/docs/prompt-engineering), Retriever ([vector stores](/docs/rag/vector-databases), [embeddings](/docs/rag/embeddings)), and tools (APIs, search, code). **Chains** wire them in sequence (z. B. prompt → LLM → parser). **Agents** add a loop: LLM decides which tool to call, you execute it and append the result, repeat until the LLM returns a final answer. LangSmith provides tracing and evaluation. Integrations cover many [vector databases](/docs/rag/vector-databases), document loaders, and tool APIs. Start with a template (z. B. RAG, agent) and swap or add components as needed.

## Anwendungsfälle

LangChain is used to assemble LLM apps quickly: RAG, agents, and workflows mit minimalem boilerplate.

- Building RAG pipelines and document Q&A applications
- Implementing agents with tools (search, APIs, code)
- Rapid prototyping of LLM workflows mit minimalem boilerplate

## Externe Dokumentation

- [LangChain documentation](https://python.langchain.com/docs/)
- [LangChain – Agents](https://python.langchain.com/docs/concepts/agents/)
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)

## Siehe auch

- [RAG](/docs/rag)
- [Agents](/docs/agents)
- [LlamaIndex](/docs/tools/llamaindex)
