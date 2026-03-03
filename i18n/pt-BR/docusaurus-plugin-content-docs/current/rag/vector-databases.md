---
title: Bancos de dados vetoriais
description: Armazenamento e consulta de vetores para recuperação.
keywords: [vector database, similarity search, embeddings]
---

# Bancos de dados vetoriais

## Definição

Bancos de dados vetoriais armazenam vetores de alta dimensão (embeddings) e suportam busca rápida por similaridade (por ex. k-NN, approximate nearest neighbor). Eles são the backbone of recuperação in RAG.

Eles se situam entre [embeddings](/docs/rag/embeddings) (que produzem os vetores) e o recuperador [RAG](/docs/rag) (which needs the top-k chunks). Diferente de keyword search, they support semantic similarity: “customer support” can match “help desk” if the [embedding](/docs/rag/embeddings) model maps them close together. See [RAG architecture](/docs/rag/architecture) for how the index fits into the full pipeline.

## Como funciona

```mermaid
flowchart LR
  QueryVec[Query vector] --> kNN[k-NN]
  Index[Index] --> kNN
  kNN --> TopK[Top-k ids]
```

Documentos são [incorporados](/docs/rag/embeddings) e seus vetores são escritos em um **índice** (por ex. HNSW, IVF ou flat for small datasets). At query time, the **query vector** is compared against the index via **k-NN** (or approximate k-NN for scale); the index returns **top-k ids** (and optionally the vectors or stored metadata). You then fetch the corresponding chunks and pass them to the LLM. Options include Pinecone, Weaviate, Chroma, pgvector, and others; choice depends on scale, latency, and whether you need metadata filtering.

## Casos de uso

Vector stores are used whenever you need fast similarity search over many embeddings (RAG, recommendations, dedup).

- Storing and querying document embeddings for RAG
- Real-time similarity search at scale (por ex. recommendations, dedup)
- Combining vector search with metadata filters (por ex. by date, category)

## Documentação externa

- [Chroma – Get started](https://docs.trychroma.com/getting-started)
- [Pinecone – Vector database docs](https://docs.pinecone.io/)
- [pgvector](https://github.com/pgvector/pgvector) — Vector similarity search in PostgreSQL

## Veja também

- [RAG](/docs/rag)
- [Embeddings](/docs/rag/embeddings)
- [Semantic search](/docs/semantic-search)
