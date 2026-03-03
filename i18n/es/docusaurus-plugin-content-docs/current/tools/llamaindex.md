---
title: LlamaIndex
description: Framework de datos para aplicaciones LLM y RAG.
keywords: [LlamaIndex, RAG, data layer]
---

# LlamaIndex

## Definición

LlamaIndex focuses on connecting [LLMs](/docs/llms) to your data: ingestion, indexing, and querying. It provides flexible [RAG](/docs/rag) pipelines, multiple index types, and evaluation tools.

Complementa [LangChain](/docs/tools/langchain): LlamaIndex emphasizes the **data layer** (documents, [embeddings](/docs/rag/embeddings), [vector stores](/docs/rag/vector-databases), indexing strategies). Úselo cuando your priority is robust RAG over your own docs, APIs, or databases, with control over chunking, recuperación, and synthesis. Also supports [agents](/docs/agents) and query engines.

## Cómo funciona

**Cargar** datos desde documentos, APIs o bases de datos en un formato de documento unificado. **Construir índices**: índice vectorial ([embeddings](/docs/rag/embeddings) + [vector store](/docs/rag/vector-databases)), keyword index, or hybrid; you choose node parsers (chunking), embedding model, and index type. **Query engines** run recuperación (optionally with reranking) and then **synthesis** (the LLM answers from retrieved nodes). You can customize retrievers, node parsers, and response synthesis (por ej. tree summarization, simple concatenation). **Evaluation** tools (por ej. faithfulness, relevance) help tune chunking and recuperación for production [RAG](/docs/rag). Agents can use LlamaIndex query engines as tools inside [LangChain](/docs/tools/langchain) or native agent loops.

## Casos de uso

LlamaIndex fits when you need flexible RAG indexing, query engines, and evaluation over your own data and APIs.

- RAG and document Q&A with flexible indexing and query engines
- Connecting LLMs to internal data (docs, APIs, databases)
- Evaluating and tuning recuperación and synthesis for production RAG

## Documentación externa

- [LlamaIndex documentation](https://docs.llamaindex.ai/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [LlamaIndex – Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/)

## Ver también

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [Vector databases](/docs/rag/vector-databases)
