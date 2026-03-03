---
title: 嵌入
description: 用于语义搜索和检索的向量表示。
keywords: [embeddings, vector, semantic similarity]
---

# 嵌入

## 定义

嵌入是文本（或其他模态）的密集向量表示。 Similar content maps to nearby vectors, enabling semantic search and 检索 in RAG.

它们是 the bridge between raw text and [vector databases](/docs/rag/vector-databases): both documents and queries are embedded so similarity can be computed as vector distance (例如 cosine). Choice of [embedding](/docs/rag/embeddings) model affects [RAG](/docs/rag) 检索 quality and cost; see [semantic search](/docs/semantic-search) for the broader use of embeddings in search.

## 工作原理

```mermaid
flowchart LR
  Text[Text] --> Encoder[Encoder]
  Encoder --> Vector[Vector]
```

**Text** (a sentence, paragraph, or chunk) 被输入到一个 **encoder** (例如 OpenAI embeddings, Cohere, or open-source sentence-transformers). The encoder outputs a fixed-size **vector** (例如 768 or 1536 dimensions). Training uses contrastive or similar objectives so that semantically related texts get nearby vectors; similarity at query time is usually cosine or dot product. Models can be multilingual or domain-specific. For [RAG](/docs/rag), use the same encoder for documents and queries so distances are meaningful.

## 应用场景

Embeddings 是原始文本和相似性搜索之间的桥梁; 这里的质量决定了检索召回率和 RAG 准确性.

- Converting documents and queries to vectors for RAG 检索
- Semantic similarity and clustering (例如 duplicate detection)
- Cross-lingual and multimodal 检索 when using matching encoders

## 外部文档

- [OpenAI – Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Hugging Face – Sentence transformers](https://www.sbert.net/)

## 另请参阅

- [RAG](/docs/rag)
- [Vector databases](/docs/rag/vector-databases)
- [Semantic search](/docs/semantic-search)
