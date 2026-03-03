---
title: Recherche sémantique
description: Search by meaning using embeddings and similarity.
keywords: [semantic search, embeddings, similarity]
---

# Recherche sémantique

## Définition

Semantic search retrieves items by meaning rather than exact keywords. Query and documents are embedded; récupération returns the most similar vectors (par ex. cosine similarity or ANN search).

C'est the récupération backbone of [RAG](/docs/rag): see [embeddings](/docs/rag/embeddings) and [vector databases](/docs/rag/vector-databases) for how vectors are produced and stored. Utilisez-le quand users express intent in natural language and you want “similar meaning” rather than literal keyword match. Combines well with keyword (hybrid search) when exact terms matter.

## Comment ça fonctionne

```mermaid
flowchart LR
  Query[Query] --> Embed[Embed]
  Embed --> VectorSearch[Vector search]
  VectorSearch --> RankedDocs[Ranked docs]
```

The **query** (and optionally filters) is sent to an **embedding** model qui produit a vector. **Vector search** (par ex. k-NN or approximate k-NN over an index of document vectors) returns the **ranked docs** (or chunk IDs) with highest similarity (par ex. cosine or dot product). Embedding models are trained so that semantically similar text maps to nearby vectors; the same model is used for queries and documents. Indexing can be offline (batch) or incremental; scale and latency determine whether you need an approximate index (HNSW, IVF) and a dedicated [vector database](/docs/rag/vector-databases).

## Cas d'utilisation

Semantic search is used whenever you need to find items by meaning rather than exact keywords (RAG, recommendations, dedup).

- RAG récupération: finding relevant chunks for a user query
- Recommendation and “similar item” search
- Duplicate or near-duplicate detection in document sets

## Documentation externe

- [Sentence-BERT](https://www.sbert.net/) — Dense récupération models
- [LangChain – Vector stores](https://python.langchain.com/docs/concepts/vectorstores/)

## Voir aussi

- [Embeddings](/docs/rag/embeddings)
- [Vector databases](/docs/rag/vector-databases)
- [RAG](/docs/rag)
