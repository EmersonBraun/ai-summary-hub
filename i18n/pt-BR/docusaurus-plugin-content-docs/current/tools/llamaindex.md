---
title: LlamaIndex
description: Framework de dados para aplicações LLM e RAG.
keywords: [LlamaIndex, RAG, data layer]
---

# LlamaIndex

## Definição

LlamaIndex focuses on connecting [LLMs](/docs/llms) to your data: ingestion, indexing, and querying. It provides flexible [RAG](/docs/rag) pipelines, multiple index types, and evaluation tools.

Ele complementa o [LangChain](/docs/tools/langchain): LlamaIndex enfatiza a **camada de dados** (documentos, [embeddings](/docs/rag/embeddings), [vector stores](/docs/rag/vector-databases), indexing strategies). Use quando your priority is robust RAG over your own docs, APIs, or databases, with control over chunking, recuperação, and synthesis. Also supports [agents](/docs/agents) and query engines.

## Como funciona

**Carregar** dados de documentos, APIs ou bancos de dados em um formato de documento unificado. **Construir índices**: índice vetorial ([embeddings](/docs/rag/embeddings) + [vector store](/docs/rag/vector-databases)), keyword index, or hybrid; you choose node parsers (chunking), embedding model, and index type. **Query engines** run recuperação (optionally with reranking) and then **synthesis** (the LLM answers from retrieved nodes). You can customize retrievers, node parsers, and response synthesis (por ex. tree summarization, simple concatenation). **Evaluation** tools (por ex. faithfulness, relevance) help tune chunking and recuperação for production [RAG](/docs/rag). Agents can use LlamaIndex query engines as tools inside [LangChain](/docs/tools/langchain) or native agent loops.

## Casos de uso

LlamaIndex fits when you need flexible RAG indexing, query engines, and evaluation over your own data and APIs.

- RAG and document Q&A with flexible indexing and query engines
- Connecting LLMs to internal data (docs, APIs, databases)
- Evaluating and tuning recuperação and synthesis for production RAG

## Documentação externa

- [LlamaIndex documentation](https://docs.llamaindex.ai/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [LlamaIndex – Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/)

## Veja também

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [Vector databases](/docs/rag/vector-databases)
