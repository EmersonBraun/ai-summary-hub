---
title: LlamaIndex
description: 用于大语言模型应用和 RAG 的数据框架。
keywords: [LlamaIndex, RAG, 数据层]
tags: [intermediate]
authors: [EmersonBraun]
---

# LlamaIndex

## 定义

LlamaIndex（前身为 GPT Index）是一个将[大型语言模型](/docs/llms)与你自己的数据源连接起来的数据框架。它的主要关注点是文档、数据库和 API 的摄入、索引和查询，使 LLM 能够回答基于私有或领域特定信息的问题。它对[检索增强生成](/docs/rag)的每个步骤提供高度控制：数据加载、节点解析（分块）、嵌入选择、索引构建、检索策略、重排序和响应合成。

[LangChain](/docs/tools/langchain) 强调可组合的编排和代理循环，而 LlamaIndex 则针对**数据层**优化：你可以在不重建管道的情况下替换分块策略、检索算法和合成方法。它提供开箱即用的查询引擎、聊天引擎和子问题分解。多种索引类型（向量、摘要、知识图谱、关键词）可以在单个查询中组合，用于混合检索。

LlamaIndex 还支持[代理](/docs/agents)：查询引擎可以注册为工具，代理推理循环（ReAct、OpenAI 函数调用）可以选择查询哪个引擎。评估套件（忠实度、相关性、上下文精度）帮助诊断 RAG 质量，并指导生产环境中的分块或检索调优。

## 工作原理

### 摄入管道

```mermaid
flowchart LR
  Source["数据源\n（文件、API、数据库）"] -->|"加载"| Loader["文档加载器"]
  Loader -->|"分割"| Parser["节点解析器\n（分块）"]
  Parser -->|"嵌入"| Embed["嵌入模型"]
  Embed -->|"存储"| Index["索引\n（向量 / 关键词 / 图谱）"]
```

### 查询管道

```mermaid
flowchart LR
  Query["用户查询"] -->|"嵌入并搜索"| Retriever["检索器"]
  Retriever -->|"top-k 节点"| Reranker["重排序器（可选）"]
  Reranker -->|"排序后的上下文"| Synth["响应合成器\n（LLM）"]
  Synth -->|"响应"| Response["最终响应"]
```

### 核心抽象

**节点**是检索单元——带有元数据的文档片段。**索引**存储节点并支持基于向量、关键词或图谱的搜索。**查询引擎**将索引 + 检索器 + 合成器封装为单个可调用对象。**聊天引擎**维护对话历史。**子问题引擎**将复杂查询分解为分布在多个索引上的简单查询。

## 何时使用 / 何时不使用

| 场景 | 使用 LlamaIndex | 不使用 LlamaIndex |
|------|---------------|-----------------|
| 对大型文档语料库进行带分块控制的 RAG | 是——精细的节点解析器和多种索引类型 | |
| 将 LLM 连接到内部数据库和 API | 是——支持 SQL、Notion、Slack、S3 等的数据连接器 | |
| 评估检索的忠实度和相关性 | 是——内置评估模块 | |
| 调用多个外部 API 的多步骤代理工作流 | | 更丰富的代理工具首选 [LangChain](/docs/tools/langchain) |
| 无需检索的简单单轮对话 | | 开销不必要；直接调用 LLM API |
| 需要 LangSmith 追踪的生产管道 | | 与 LangChain 集成或使用专用追踪工具 |

## 对比

| 功能 | LlamaIndex | LangChain |
|------|-----------|-----------|
| 主要关注点 | 数据索引和检索（RAG） | 编排、链、代理 |
| 分块控制 | 精细的节点解析器 | 高级文本分割器 |
| 索引类型 | 向量、关键词、图谱、摘要、混合 | 主要通过检索器使用向量 |
| 评估 | 内置（忠实度、相关性） | 通过 LangSmith |
| 代理支持 | 查询引擎作为工具，ReAct | 一流的 LCEL 代理 |
| 最适合 | 大型语料库的深度 RAG | 多步骤代理编排 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 对每个 RAG 步骤的精细控制 | 比简单的 LLM 封装学习曲线更陡 |
| 多种索引类型包括知识图谱 | 与 LangChain 相比非 RAG 集成较少 |
| 内置生产 RAG 评估套件 | 部分抽象增加冗余 |
| 可组合管道便于替换组件 | 文档可能落后于快速发布 |

## 代码示例

```python
# Simple RAG pipeline with LlamaIndex
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI
from llama_index.core import Settings

# Configure LLM and embedding model
Settings.llm = OpenAI(model="gpt-4o-mini")

# 1. Load documents from a directory
documents = SimpleDirectoryReader("./data").load_data()

# 2. Build a vector index (embeds and stores nodes automatically)
index = VectorStoreIndex.from_documents(documents)

# 3. Create a query engine with top-k retrieval
query_engine = index.as_query_engine(similarity_top_k=3)

# 4. Query
response = query_engine.query("What are the main topics covered?")
print(response)
```

## 高效使用技巧

- 根据你的文档选择分块大小：256–512 token 适合事实问答；1024+ 适合摘要任务。
- 使用重排序器（如 `SentenceTransformerRerank`）提高检索精度而无需更改索引。
- 将向量索引（语义搜索）与关键词索引（精确匹配检索）使用 `QueryFusionRetriever` 组合。
- 在开发过程中定期运行内置评估套件，以检测检索质量退化。
- 使用带 `RedisDocumentStore` 的 `IngestionPipeline` 进行增量摄入，避免重新运行时重复嵌入文档。

## 实用资源

- [LlamaIndex 文档](https://docs.llamaindex.ai/) — 完整指南、API 参考和教程
- [LlamaIndex — RAG 指南](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/) — 摄入、索引和查询管道
- [LlamaIndex — 代理](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/) — 以查询引擎为工具构建代理
- [LlamaIndex — 评估](https://docs.llamaindex.ai/en/stable/module_guides/evaluating/) — 忠实度、相关性和上下文精度指标
- [LlamaHub](https://llamahub.ai/) — 社区数据连接器、工具和集成

## 另请参阅

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [向量数据库](/docs/rag/vector-databases)
