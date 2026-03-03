---
title: LlamaIndex
description: 用于大语言模型应用和 RAG 的数据框架。
keywords: [LlamaIndex, RAG, data layer]
---

# LlamaIndex

## 定义

LlamaIndex focuses on connecting [LLMs](/docs/llms) to your data: ingestion, indexing, and querying. It provides flexible [RAG](/docs/rag) pipelines, multiple index types, and evaluation tools.

It complements [LangChain](/docs/tools/langchain): LlamaIndex emphasizes the **data layer** (documents, [embeddings](/docs/rag/embeddings), [vector stores](/docs/rag/vector-databases), indexing strategies). 当…时使用 your priority is robust RAG over your own docs, APIs, or databases, with control over chunking, 检索, and synthesis. Also supports [agents](/docs/agents) and query engines.

## 工作原理

从文档、API 或数据库**加载**数据到统一的文档格式。**构建索引**：向量索引（[embeddings](/docs/rag/embeddings) + [vector store](/docs/rag/vector-databases)), keyword index, or hybrid; you choose node parsers (chunking), embedding model, and index type. **Query engines** run 检索 (optionally with reranking) and then **synthesis** (the LLM answers from retrieved nodes). You can customize retrievers, node parsers, and response synthesis (例如 tree summarization, simple concatenation). **Evaluation** tools (例如 faithfulness, relevance) help tune chunking and 检索 for production [RAG](/docs/rag). Agents can use LlamaIndex query engines as tools inside [LangChain](/docs/tools/langchain) or native agent loops.

## 应用场景

LlamaIndex fits when you need flexible RAG indexing, query engines, and evaluation over your own data and APIs.

- RAG and document Q&A with flexible indexing and query engines
- Connecting LLMs to internal data (docs, APIs, databases)
- Evaluating and tuning 检索 and synthesis for production RAG

## 外部文档

- [LlamaIndex documentation](https://docs.llamaindex.ai/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [LlamaIndex – Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/)

## 另请参阅

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [Vector databases](/docs/rag/vector-databases)
