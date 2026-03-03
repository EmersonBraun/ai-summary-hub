---
title: Embeddings
description: Vektorrepräsentationen für semantische Suche und Retrieval.
keywords: [embeddings, vector, semantic similarity]
---

# Embeddings

## Definition

Einbettungen sind dichte Vektorrepräsentationen von Text (oder anderer Modalitäten). Ähnliche Inhalte werden auf nahe Vektoren abgebildet, was semantische Suche und Retrieval in RAG ermöglicht.

Sie sind die Brücke zwischen Rohtext und [Vektordatenbanken](/docs/rag/vector-databases): sowohl Dokumente als auch Abfragen werden embedded so similarity can be computed as vector distance (z. B. cosine). Choice of [embedding](/docs/rag/embeddings) model affects [RAG](/docs/rag) Abruf quality and cost; see [semantic search](/docs/semantic-search) für den broader use of embeddings in search.

## Funktionsweise

```mermaid
flowchart LR
  Text[Text] --> Encoder[Encoder]
  Encoder --> Vector[Vector]
```

**Text** (a sentence, paragraph, or chunk) wird in einen **encoder** (z. B. OpenAI embeddings, Cohere, or open-source sentence-transformers). The encoder outputs a fixed-size **vector** (z. B. 768 or 1536 dimensions). Training uses contrastive or similar objectives so that semantically related texts get nearby vectors; similarity zur Abfragezeit is usually cosine or dot product. Models can be multilingual or domain-specific. For [RAG](/docs/rag), use the same encoder for documents and queries so distances are meaningful.

## Anwendungsfälle

Embeddings sind die Brücke zwischen Rohtext und Ähnlichkeitssuche; die Qualität hier bestimmt den Retrieval-Recall und die RAG-Genauigkeit.

- Converting documents and queries to vectors for RAG Abruf
- Semantic similarity and clustering (z. B. duplicate detection)
- Cross-lingual and multimodal Abruf when using nachzuahmening encoders

## Externe Dokumentation

- [OpenAI – Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Hugging Face – Sentence transformers](https://www.sbert.net/)

## Siehe auch

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Semantic search](/docs/semantic-search)
