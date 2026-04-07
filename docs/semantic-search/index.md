---
title: Semantic search
description: Search by meaning using embeddings and similarity.
keywords: [semantic search, embeddings, similarity]
tags: [intermediate]
authors: [EmersonBraun]
---

# Semantic search

## Definition

Semantic search retrieves items by meaning rather than exact keywords. Query and documents are embedded; retrieval returns the most similar vectors (e.g. cosine similarity or ANN search).

It is the retrieval backbone of [RAG](/docs/rag): see [embeddings](/docs/rag/embeddings) and [vector databases](/docs/rag/vector-databases) for how vectors are produced and stored. Use it when users express intent in natural language and you want “similar meaning” rather than literal keyword match. Combines well with keyword (hybrid search) when exact terms matter.

## How it works

```mermaid
flowchart LR
  Query[Query] --> Embed[Embed]
  Embed --> VectorSearch[Vector search]
  VectorSearch --> RankedDocs[Ranked docs]
```

The **query** (and optionally filters) is sent to an **embedding** model that outputs a vector. **Vector search** (e.g. k-NN or approximate k-NN over an index of document vectors) returns the **ranked docs** (or chunk IDs) with highest similarity (e.g. cosine or dot product). Embedding models are trained so that semantically similar text maps to nearby vectors; the same model is used for queries and documents. Indexing can be offline (batch) or incremental; scale and latency determine whether you need an approximate index (HNSW, IVF) and a dedicated [vector database](/docs/rag/vector-databases).

## Use cases

Semantic search is used whenever you need to find items by meaning rather than exact keywords (RAG, recommendations, dedup).

- RAG retrieval: finding relevant chunks for a user query
- Recommendation and “similar item” search
- Duplicate or near-duplicate detection in document sets

## External documentation

- [Sentence-BERT](https://www.sbert.net/) — Dense retrieval models
- [LangChain – Vector stores](https://python.langchain.com/docs/concepts/vectorstores/)

## See also

- [Embeddings](/docs/rag/embeddings)
- [Vector databases](/docs/rag/vector-databases)
- [RAG](/docs/rag)
