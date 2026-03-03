---
title: LlamaIndex
description: Daten-Framework für LLM-Anwendungen und RAG.
keywords: [LlamaIndex, RAG, data layer]
---

# LlamaIndex

## Definition

LlamaIndex konzentriert sich auf die Verbindung von [LLMs](/docs/llms) to your data: ingestion, indexing, and querying. It provides flexible [RAG](/docs/rag) pipelines, multiple index types, and evaluation tools.

Es ergänzt [LangChain](/docs/tools/langchain): LlamaIndex emphasizes the **data layer** (documents, [embeddings](/docs/rag/embeddings), [vector stores](/docs/rag/vector-databases), indexing strategies). Verwenden Sie es, wenn your priority is robust RAG over your own docs, APIs, or databases, with control over chunking, Abruf, and synthesis. Also supports [agents](/docs/agents) and query engines.

## Funktionsweise

**Laden** von Daten aus Dokumenten, APIs oder Datenbanken in ein einheitliches Dokumentformat. **Indizes erstellen**: Vektorindex ([Embeddings](/docs/rag/embeddings) + [vector store](/docs/rag/vector-databases)), keyword index, or hybrid; you choose node parsers (chunking), embedding model, and index type. **Query engines** run Abruf (optionally with reranking) and then **synthesis** (the LLM answers from retrieved nodes). You can customize retrievers, node parsers, and response synthesis (z. B. tree summarization, simple concatenation). **Evaluation** tools (z. B. faithfulness, relevance) help tune chunking and Abruf for production [RAG](/docs/rag). Agents can use LlamaIndex query engines as tools inside [LangChain](/docs/tools/langchain) or native agent loops.

## Anwendungsfälle

LlamaIndex passt, wenn you need flexible RAG indexing, query engines, and evaluation over your own data and APIs.

- RAG and document Q&A with flexible indexing and query engines
- Connecting LLMs to internal data (docs, APIs, databases)
- Evaluating and tuning Abruf and synthesis for production RAG

## Externe Dokumentation

- [LlamaIndex documentation](https://docs.llamaindex.ai/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [LlamaIndex – Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/)

## Siehe auch

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [Vector databases](/docs/rag/vector-databases)
