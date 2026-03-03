---
title: Embeddings
description: Représentations vectorielles pour la recherche sémantique et la récupération.
keywords: [embeddings, vector, semantic similarity]
---

# Embeddings

## Définition

Les embeddings sont des représentations vectorielles denses de texte (ou d'autres modalités). Similar content maps to nearby vectors, enabling semantic search and récupération in RAG.

Ils sont le pont entre le texte brut et les [bases de données vectorielles](/docs/rag/vector-databases) : tant les documents que les requêtes sont embedded so similarity can be computed as vector distance (par ex. cosine). Choice of [embedding](/docs/rag/embeddings) model affects [RAG](/docs/rag) récupération quality and cost; see [semantic search](/docs/semantic-search) for the broader use of embeddings in search.

## Comment ça fonctionne

```mermaid
flowchart LR
  Text[Text] --> Encoder[Encoder]
  Encoder --> Vector[Vector]
```

**Text** (a sentence, paragraph, or chunk) est alimenté dans un **encoder** (par ex. OpenAI embeddings, Cohere, or open-source sentence-transformers). The encoder outputs a fixed-size **vector** (par ex. 768 or 1536 dimensions). Training uses contrastive or similar objectives so that semantically related texts get nearby vectors; similarity at query time is usually cosine or dot product. Models can be multilingual or domain-specific. For [RAG](/docs/rag), use the same encoder for documents and queries so distances are meaningful.

## Cas d'utilisation

Embeddings sont le pont entre le texte brut et la recherche par similarité; la qualité ici détermine le rappel de récupération et la précision du RAG.

- Converting documents and queries to vectors for RAG récupération
- Semantic similarity and clustering (par ex. duplicate detection)
- Cross-lingual and multimodal récupération when using matching encoders

## Documentation externe

- [OpenAI – Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Hugging Face – Sentence transformers](https://www.sbert.net/)

## Voir aussi

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Semantic search](/docs/semantic-search)
