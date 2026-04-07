---
title: LangChain
description: 用于大语言模型应用和代理的框架。
keywords: [LangChain, chains, agents, RAG]
---

# LangChain

## 定义

LangChain 是一个框架 for building [LLM](/docs/llms) applications: chains, [agents](/docs/agents), tools, and [RAG](/docs/rag) pipelines. It abstracts providers, prompts, and 检索 for quick prototyping and production.

It complements [LlamaIndex](/docs/tools/llamaindex) (which emphasizes 数据和索引); LangChain emphasizes 可组合链和代理循环. 当…时使用 you need [RAG](/docs/rag), [agents](/docs/agents) with tools, or multi-step [prompt](/docs/prompt-engineering) workflows with minimal glue code.

## 工作原理

你**组合**组件：LLM（OpenAI、Anthropic、本地等）、[提示](/docs/prompt-engineering)、检索器（[vector stores](/docs/rag/vector-databases), [embeddings](/docs/rag/embeddings)), and tools (APIs, search, code). **Chains** wire them in sequence (例如 prompt → LLM → parser). **Agents** add a loop: LLM decides which tool to call, you execute it and append the result, repeat until the LLM returns a final answer. LangSmith provides tracing and evaluation. Integrations cover many [vector databases](/docs/rag/vector-databases), document loaders, and tool APIs. Start with a template (例如 RAG, agent) and swap or add components as needed.

## 应用场景

LangChain is used to assemble LLM apps quickly: RAG, agents, and workflows with minimal boilerplate.

- Building RAG pipelines and document Q&A applications
- Implementing agents with tools (search, APIs, code)
- Rapid prototyping of LLM workflows with minimal boilerplate

## 外部文档

- [LangChain documentation](https://python.langchain.com/docs/)
- [LangChain – Agents](https://python.langchain.com/docs/concepts/agents/)
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)

## 另请参阅

- [RAG](/docs/rag)
- [Agents](/docs/agents)
- [LlamaIndex](/docs/tools/llamaindex)
