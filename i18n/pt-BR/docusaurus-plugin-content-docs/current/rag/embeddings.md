---
title: Embeddings
description: Representações vetoriais para busca semântica e recuperação.
keywords: [embeddings, vector, semantic similarity]
---

# Embeddings

## Definição

Embeddings são representações vetoriais densas de texto (ou outras modalidades). Similar content maps to nearby vectors, enabling semantic search and recuperação in RAG.

Eles são a ponte entre texto bruto e [bancos de dados vetoriais](/docs/rag/vector-databases): tanto documentos quanto consultas são embedded so similarity can be computed as vector distance (por ex. cosine). Choice of [embedding](/docs/rag/embeddings) model affects [RAG](/docs/rag) recuperação quality and cost; see [semantic search](/docs/semantic-search) for the broader use of embeddings in search.

## Como funciona

```mermaid
flowchart LR
  Text[Text] --> Encoder[Encoder]
  Encoder --> Vector[Vector]
```

**Texto** (uma sentença, parágrafo ou fragmento) é alimentado em um **codificador** (por ex. OpenAI embeddings, Cohere ou código abertoe sentence-transformers). The encoder outputs a fixed-size **vector** (por ex. 768 or 1536 dimensions). Training uses contrastive or similar objectives so that semantically related texts get nearby vectors; similarity at query time is usually cosine or dot product. Models can be multilingual or domain-specific. For [RAG](/docs/rag), use the same encoder for documents and queries so distances are meaningful.

## Casos de uso

Embeddings são a ponte entre texto bruto e busca por similaridade; a qualidade aqui determina o recall de recuperação e a precisão do RAG.

- Converting documents and queries to vectors for RAG recuperação
- Semantic similarity and clustering (por ex. duplicate detection)
- Cross-lingual and multimodal recuperação when using matching encoders

## Documentação externa

- [OpenAI – Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Hugging Face – Sentence transformers](https://www.sbert.net/)

## Veja também

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Semantic search](/docs/semantic-search)
