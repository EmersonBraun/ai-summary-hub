---
title: Arquitetura RAG
description: Design de sistemas RAG e visão geral dos componentes.
keywords: [RAG, architecture, chunks, recuperação]
---

# Arquitetura RAG

## Definição

RAG architecture covers how you chunk documents, choose embeddings and vector stores, run recuperação (dense, sparse, or hybrid), and combine context with the LLM (prompt projeto, reranking).

Design choices here directly affect [RAG](/docs/rag) quality and latency. Trade-offs include chunk size (larger = more context per chunk, less precision), [embedding](/docs/rag/embeddings) model (quality vs cost), and whether to add a reranker or hybrid search. See [vector databases](/docs/rag/vector-databases) for indexing options.

## Como funciona

```mermaid
flowchart LR
  Chunk[Chunk] --> Embed[Embed]
  Embed --> Index[Index]
  Query[Query] --> EmbedQ[Embed]
  EmbedQ --> Retrieve[Retrieve]
  Retrieve --> Rank[Rank]
```

**Fragmentação:** Documentos são divididos em segmentos (por parágrafo, sentença ou tamanho fixo); sobreposição e metadados podem ser adicionados. **Embed** and **index:** Chunks are turned into vectors via an [embedding](/docs/rag/embeddings) model and stored in a [vector database](/docs/rag/vector-databases). **Query:** At query time the query is embedded; **retrieve** fetches the top-k similar chunks (dense search), optionally combined with keyword (sparse) for hybrid. **Rank:** An optional reranker (por ex. cross-encoder) rescores the top candidates. The chosen chunks are then formatted into the LLM prompt. Advanced setups add query rewriting, multi-hop recuperação, and citation extraction.

## Casos de uso

Architecture choices (chunking, recuperação, reranking) directly affect answer quality and latency in production RAG.

- Designing chunking and indexing for long documents or codebases
- Choosing dense vs. sparse or hybrid recuperação for domain data
- Adding reranking and citation for production RAG systems

## Documentação externa

- [LangChain – RAG architecture](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex – Document processing and indexing](https://docs.llamaindex.ai/en/stable/module_guides/loading/)

## Veja também

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Embeddings](/docs/rag/embeddings)
