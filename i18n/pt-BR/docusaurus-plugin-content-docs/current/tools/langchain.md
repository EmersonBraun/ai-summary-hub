---
title: LangChain
description: Framework para aplicações e agentes de LLM.
keywords: [LangChain, chains, agents, RAG]
---

# LangChain

## Definição

LangChain é um framework for building [LLM](/docs/llms) applications: chains, [agents](/docs/agents), tools, and [RAG](/docs/rag) pipelines. It abstracts providers, prompts, and recuperação for quick prototyping and production.

Ele complementa o [LlamaIndex](/docs/tools/llamaindex) (que enfatiza dados e indexação); LangChain enfatiza cadeias componívele chains and agent loops. Use quando you need [RAG](/docs/rag), [agents](/docs/agents) with tools, or multi-step [prompt](/docs/llms/prompt-engineering) workflows with minimal glue code.

## Como funciona

Você **compõe** componentes: LLM (OpenAI, Anthropic, local, etc.), [prompts](/docs/llms/prompt-engineering), recuperadores ([vector stores](/docs/rag/vector-databases), [embeddings](/docs/rag/embeddings)), e ferramentas (APIs, busca, código). **Chains** os conectam em sequência (por ex. prompt → LLM → parser). **Agents** add a loop: LLM decides which tool to call, you execute it and append the result, repeat until the LLM returns a final answer. LangSmith provides tracing and evaluation. Integrations cover many [vector databases](/docs/rag/vector-databases), document loaders, and tool APIs. Start with a template (por ex. RAG, agent) and swap or add components as needed.

## Casos de uso

LangChain is used to assemble LLM apps quickly: RAG, agents, and workflows with minimal boilerplate.

- Building RAG pipelines and document Q&A applications
- Implementing agents with tools (search, APIs, code)
- Rapid prototyping of LLM workflows with minimal boilerplate

## Documentação externa

- [LangChain documentation](https://python.langchain.com/docs/)
- [LangChain – Agents](https://python.langchain.com/docs/concepts/agents/)
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)

## Veja também

- [RAG](/docs/rag)
- [Agents](/docs/agents)
- [LlamaIndex](/docs/tools/llamaindex)
