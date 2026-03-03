---
title: Bases de données vectorielles
description: Stockage et interrogation de vecteurs pour la récupération.
keywords: [vector database, similarity search, embeddings]
---

# Bases de données vectorielles

## Définition

Les bases de données vectorielles stockent des vecteurs haute dimension (embeddings) et supportent la recherche rapide par similarité (par ex. k-NN, approximate nearest neighbor). Ils sont the backbone of récupération in RAG.

They se situent entre [embeddings](/docs/rag/embeddings) (which produce the vectors) and the [RAG](/docs/rag) retriever (which needs the top-k chunks). Contrairement à keyword search, they support semantic similarity: “customer support” can match “help desk” if the [embedding](/docs/rag/embeddings) model maps them close together. See [RAG architecture](/docs/rag/architecture) for how the index fits into the full pipeline.

## Comment ça fonctionne

```mermaid
flowchart LR
  QueryVec[Query vector] --> kNN[k-NN]
  Index[Index] --> kNN
  kNN --> TopK[Top-k ids]
```

Documents are [embedded](/docs/rag/embeddings) and their vectors sont écrits dans un **index** (par ex. HNSW, IVF, or flat for small datasets). At query time, the **query vector** is compared against the index via **k-NN** (or approximate k-NN for scale); the index returns **top-k ids** (and optionally the vectors or stored metadata). You then fetch the corresponding chunks and pass them to the LLM. Options include Pinecone, Weaviate, Chroma, pgvector, and others; choice depends on scale, latency, and whether you need metadata filtering.

## Cas d'utilisation

Vector stores are used whenever you need fast similarity search over many embeddings (RAG, recommendations, dedup).

- Storing and querying document embeddings for RAG
- Real-time similarity search at scale (par ex. recommendations, dedup)
- Combining vector search with metadata filters (par ex. by date, category)

## Documentation externe

- [Chroma – Get started](https://docs.trychroma.com/getting-started)
- [Pinecone – Vector database docs](https://docs.pinecone.io/)
- [pgvector](https://github.com/pgvector/pgvector) — Vector similarity search in PostgreSQL

## Voir aussi

- [RAG](/docs/rag)
- [Embeddings](/docs/rag/embeddings)
- [Semantic search](/docs/semantic-search)
