---
title: Búsqueda semántica
description: Search by meaning using embeddings and similarity.
keywords: [semantic search, embeddings, similarity]
---

# Búsqueda semántica

## Definición

La búsqueda semántica recupera elementos por significado en lugar de palabras clave exactas. Query and documents are embedded; recuperación returns the most similar vectors (por ej. cosine similarity or ANN search).

Es the recuperación backbone of [RAG](/docs/rag): see [embeddings](/docs/rag/embeddings) and [vector databases](/docs/rag/vector-databases) for how vectors are produced and stored. Úselo cuando users express intent in natural language and you want “similar meaning” rather than literal keyword igualar. Combines well with keyword (hybrid search) when exact terms matter.

## Cómo funciona

```mermaid
flowchart LR
  Query[Query] --> Embed[Embed]
  Embed --> VectorSearch[Vector search]
  VectorSearch --> RankedDocs[Ranked docs]
```

La **consulta** (y opcionalmente filtros) se envía a un modelo de **embedding** que produce un vector. **Búsqueda vectorial** (por ej.j. k-NN or approximate k-NN over an index of document vectors) returns the **ranked docs** (or chunk IDs) with highest similarity (por ej. cosine or dot product). Embedding models are trained so that semantically similar text maps to nearby vectors; the same model is used for queries and documents. Indexing can be offline (batch) or incremental; scale and latency determine whether you need an approximate index (HNSW, IVF) and a dedicated [vector database](/docs/rag/vector-databases).

## Casos de uso

Semantic search is used whenever you need to find items by meaning rather than exact keywords (RAG, recommendations, dedup).

- RAG recuperación: finding relevant chunks for a user query
- Recommendation and “similar item” search
- Duplicate or near-duplicate detection in document sets

## Documentación externa

- [Sentence-BERT](https://www.sbert.net/) — Dense recuperación models
- [LangChain – Vector stores](https://python.langchain.com/docs/concepts/vectorstores/)

## Ver también

- [Embeddings](/docs/rag/embeddings)
- [Vector databases](/docs/rag/vector-databases)
- [RAG](/docs/rag)
