---
title: Embeddings
description: Dense vector representations for text and retrieval.
keywords: [embeddings, vector, semantic similarity]
tags: [beginner]
authors: [EmersonBraun]
---

# Embeddings

## Definition

Embeddings are dense vector representations of text (or other modalities). Similar content maps to nearby vectors, enabling semantic search and retrieval in RAG.

They are the bridge between raw text and [vector databases](/docs/rag/vector-databases): both documents and queries are embedded so similarity can be computed as vector distance (e.g. cosine). Choice of [embedding](/docs/rag/embeddings) model affects [RAG](/docs/rag) retrieval quality and cost; see [semantic search](/docs/semantic-search) for the broader use of embeddings in search.

## How it works

```mermaid
flowchart LR
  Text[Text] --> Encoder[Encoder]
  Encoder --> Vector[Vector]
```

**Text** (a sentence, paragraph, or chunk) is fed into an **encoder** (e.g. OpenAI embeddings, Cohere, or open-source sentence-transformers). The encoder outputs a fixed-size **vector** (e.g. 768 or 1536 dimensions). Training uses contrastive or similar objectives so that semantically related texts get nearby vectors; similarity at query time is usually cosine or dot product. Models can be multilingual or domain-specific. For [RAG](/docs/rag), use the same encoder for documents and queries so distances are meaningful.

## Use cases

Embeddings are the bridge between raw text and similarity search; quality here drives retrieval recall and RAG accuracy.

- Converting documents and queries to vectors for RAG retrieval
- Semantic similarity and clustering (e.g. duplicate detection)
- Cross-lingual and multimodal retrieval when using matching encoders

## External documentation

- [OpenAI – Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Hugging Face – Sentence transformers](https://www.sbert.net/)

## See also

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Semantic search](/docs/semantic-search)
