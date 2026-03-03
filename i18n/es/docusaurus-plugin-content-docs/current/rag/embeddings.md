---
title: Embeddings
description: Representaciones vectoriales para búsqueda semántica y recuperación.
keywords: [embeddings, vector, semantic similarity]
---

# Embeddings

## Definición

Los embeddings son representaciones vectoriales densas de texto (u otras modalidades). Similar content maps to nearby vectors, enabling semantic search and recuperación in RAG.

Son el puente entre texto sin procesar y [bases de datos vectoriales](/docs/rag/vector-databases): tanto documentos como consultas se embedded so similarity can be computed as vector distance (por ej. cosine). Choice of [embedding](/docs/rag/embeddings) model affects [RAG](/docs/rag) recuperación quality and cost; see [semantic search](/docs/semantic-search) for the broader use of embeddings in search.

## Cómo funciona

```mermaid
flowchart LR
  Text[Text] --> Encoder[Encoder]
  Encoder --> Vector[Vector]
```

**Text** (a sentence, paragraph, or chunk) se alimenta en un **encoder** (por ej. OpenAI embeddings, Cohere, or open-source sentence-transformers). The encoder outputs a fixed-size **vector** (por ej. 768 or 1536 dimensions). Training uses contrastive or similar objectives so that semantically related texts get nearby vectors; similarity at query time is usually cosine or dot product. Models can be multilingual or domain-specific. For [RAG](/docs/rag), use the same encoder for documents and queries so distances are meaningful.

## Casos de uso

Embeddings son el puente entre texto sin procesar y búsqueda por similitud; la calidad aquí impulsa el recall de recuperación y la precisión de RAG.

- Converting documents and queries to vectors for RAG recuperación
- Semantic similarity and clustering (por ej. duplicate detection)
- Cross-lingual and multimodal recuperación when using igualaring encoders

## Documentación externa

- [OpenAI – Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Hugging Face – Sentence transformers](https://www.sbert.net/)

## Ver también

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Semantic search](/docs/semantic-search)
