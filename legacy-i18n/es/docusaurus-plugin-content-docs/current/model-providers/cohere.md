---
title: Cohere
description: Enterprise-focused AI platform specializing in embeddings, reranking, and RAG for search and information retrieval at scale.
keywords: [cohere, embeddings, reranking, RAG, enterprise search, multilingual, Command R, Embed, Rerank, semantic search]
tags: [intermediate]
authors: [EmersonBraun]
---

# Cohere

## Definición

**Cohere** es una empresa de IA empresarial que construye modelos de lenguaje y APIs específicamente diseñadas para aplicaciones de negocio, con un enfoque distintivo en búsqueda, recuperación de información y generación aumentada por recuperación (RAG). A diferencia de los proveedores de propósito general que ofrecen una amplia gama de características para consumidores y desarrolladores, Cohere se dirige a clientes empresariales que necesitan infraestructura NLP confiable y lista para producción — particularmente para casos de uso donde *encontrar y presentar la información correcta* es el problema central.

La línea de modelos de Cohere refleja este enfoque. **Command R** y **Command R+** son modelos conversacionales y de seguimiento de instrucciones optimizados específicamente para flujos de trabajo RAG — admiten ventanas de contexto largas y están entrenados para seguir prompts fundamentados en recuperación de manera confiable. **Embed** proporciona embeddings de vectores densos multilingüe de última generación en más de 100 idiomas, convirtiéndolo en la opción preferida para aplicaciones de búsqueda empresarial global. **Rerank** es un modelo cross-encoder que toma un conjunto inicial de documentos recuperados y los vuelve a puntuar contra la consulta original para lograr una precisión que la recuperación dispersa y densa por sí solas no pueden alcanzar.

Lo que diferencia a Cohere de los proveedores de propósito general como OpenAI es que toda su suite de productos está diseñada en torno al pipeline de recuperación como flujo de trabajo de primera clase. Los modelos Embed, Rerank y Command R están construidos para trabajar juntos como una pila cohesiva, y Cohere ofrece opciones de implementación en las instalaciones y en nube privada que cumplen con los estrictos requisitos de gobernanza de datos empresariales y cumplimiento normativo — una distinción crítica para industrias reguladas como finanzas, salud y gobierno.

## Cómo funciona

### API de Chat y Generación

Se accede a los modelos Command R y Command R+ a través de la API de Chat de Cohere y admiten tanto interacciones conversacionales de múltiples turnos como tareas de generación de un solo turno. Command R+ es la variante más grande y capaz, adecuada para razonamiento complejo y RAG con muchos documentos, mientras que Command R está optimizado para menor latencia y costo en pipelines de producción de alto rendimiento. Ambos modelos aceptan un parámetro `documents` que le permite pasar contexto recuperado directamente al prompt, habilitando un modo RAG nativo donde el modelo recibe instrucciones de fundamentar su respuesta en el contenido proporcionado y citar fuentes.

### API de Embed (embeddings multilingüe)

La API de Embed convierte texto en representaciones vectoriales densas adecuadas para búsqueda semántica de similitud. Los modelos de embedding de Cohere admiten más de 100 idiomas en un solo modelo, haciendo posible la búsqueda entre idiomas y la recuperación multilingüe de documentos sin modelos específicos por idioma. Los embeddings pueden generarse con diferentes valores de `input_type` — `search_document` para indexar contenido en reposo y `search_query` para codificar consultas en tiempo de ejecución — una distinción que aplica señales de entrenamiento asimétricas y típicamente mejora la precisión de recuperación en comparación con esquemas de embedding simétrico.

### API de Rerank

La API de Rerank acepta una consulta y una lista de documentos candidatos (generalmente los resultados top-k de una búsqueda vectorial o por palabras clave) y devuelve cada documento con una puntuación de relevancia calculada por un cross-encoder. Los cross-encoders evalúan la consulta y el documento conjuntamente en un único forward pass, proporcionando una precisión mucho mayor que los bi-encoders que codifican la consulta y el documento por separado. El reranking es un paso ligero pero altamente efectivo que mejora drásticamente la precisión@k — es más valioso cuando la recuperación inicial es relativamente barata (BM25 o búsqueda ANN) pero la precisión necesita maximizarse antes de pasar el contexto a un LLM.

### Integración RAG

La integración RAG de Cohere une Embed, Rerank y Command R en una pipeline unificada. El flujo típico es: incrustar la consulta, ejecutar búsqueda de vecinos más cercanos aproximados en una base de datos vectorial, reranquear los candidatos principales para obtener los documentos más relevantes, luego pasar esos documentos a Command R con la consulta original para generación fundamentada. El modelo devuelve una respuesta junto con objetos de cita que hacen referencia a pasajes específicos en los documentos recuperados, facilitando la construcción de aplicaciones de IA auditables con citas de fuentes.

```mermaid
flowchart LR
  Q[User Query] -->|embed with\nsearch_query| E[Embed API]
  E -->|query vector| VDB[(Vector Database)]
  VDB -->|top-k candidates| RR[Rerank API]
  RR -->|ranked documents\nwith scores| CMD[Command R / R+]
  Q -->|original question| CMD
  CMD -->|grounded answer\nwith citations| A[Response]

  DOCS[Documents] -->|embed with\nsearch_document| E2[Embed API]
  E2 -->|document vectors| VDB
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|-------------|---------------|
| Se construye búsqueda empresarial o preguntas y respuestas de base de conocimiento donde la precisión de recuperación es crítica | Necesita asistencia de chat de propósito general sin componente de recuperación |
| Su contenido abarca múltiples idiomas y necesita un único modelo de embedding para todos | Su caso de uso es principalmente imagen, audio o multimodal — Cohere es solo texto |
| Desea agregar un paso de reranking para mejorar la precisión después de una búsqueda vectorial o BM25 inicial | Necesita razonamiento, matemáticas o codificación altamente capaces para tareas independientes |
| Los requisitos de gobernanza de datos exigen implementación en las instalaciones o en nube privada | Su proyecto es un prototipo rápido y desea el ecosistema más amplio de integraciones |
| Necesita citas de fuentes y fundamentación de documentos de forma nativa en la salida del modelo | El presupuesto es extremadamente ajustado — los precios empresariales de Cohere son más altos que algunas alternativas |

## Comparaciones

| Criterio | Cohere | OpenAI | Mistral |
|----------|--------|--------|---------|
| Calidad de embedding (MTEB) | Multilingüe de primer nivel, 100+ idiomas | Fuerte en inglés primero (text-embedding-3-large) | Competitivo; mistral-embed disponible |
| Reranking | API de Rerank nativa (cross-encoder) | Sin endpoint de reranking nativo | Sin endpoint de reranking nativo |
| Modelos nativos de RAG | Command R/R+ diseñados para RAG con citas | GPT-4o funciona bien con prompts RAG pero no es nativo de RAG | Mixtral/Mistral funcionan con prompts RAG |
| Pesos abiertos | No (solo API propietaria) | No (solo API propietaria) | Sí (modelos Mistral en Hugging Face) |
| En las instalaciones / nube privada | Sí (contratos empresariales) | Azure OpenAI (limitado) | Sí (autoalojar pesos abiertos) |
| Embedding multilingüe | Modelo único, 100+ idiomas | Soporte multilingüe separado o limitado | Soporte de embedding multilingüe limitado |
| Modelo de precios | Empresarial / pago por token | Pago por token, bien documentado | Pago por token; opción de autoalojamiento gratuita |

## Pros y contras

| Pros | Contras |
|------|---------|
| Embeddings multilingüe de primer nivel en un solo modelo | Ecosistema general más pequeño en comparación con OpenAI |
| La API de Rerank nativa mejora significativamente la precisión de recuperación | Sin opción de pesos abiertos para autoalojamiento |
| Command R/R+ están diseñados específicamente para RAG fundamentado con citas | Menos capaz que GPT-4o / Claude para razonamiento independiente complejo |
| Opciones de implementación empresarial que incluyen nube privada | Documentación y recursos de la comunidad más escasos que OpenAI |
| Los componentes del pipeline RAG (Embed + Rerank + Command R) trabajan como una pila cohesiva | Los precios pueden ser más altos para experimentos a pequeña escala |

## Ejemplos de código

### Chat con Command R

```python
import cohere

co = cohere.Client("YOUR_COHERE_API_KEY")

response = co.chat(
    model="command-r-plus",
    message="Explain retrieval-augmented generation in plain English.",
)
print(response.text)
```

### Embeddings para búsqueda semántica

```python
import cohere

co = cohere.Client("YOUR_COHERE_API_KEY")

# Embed documents at indexing time
documents = [
    "Cohere specializes in enterprise NLP and semantic search.",
    "RAG combines retrieval with language model generation.",
    "Multilingual embeddings support over 100 languages.",
]
doc_embeddings = co.embed(
    texts=documents,
    model="embed-multilingual-v3.0",
    input_type="search_document",
).embeddings

# Embed a query at search time
query_embedding = co.embed(
    texts=["What does Cohere specialize in?"],
    model="embed-multilingual-v3.0",
    input_type="search_query",
).embeddings[0]

# Compute cosine similarity (or use a vector DB)
import numpy as np

doc_array = np.array(doc_embeddings)
query_array = np.array(query_embedding)
scores = doc_array @ query_array / (
    np.linalg.norm(doc_array, axis=1) * np.linalg.norm(query_array)
)
top_idx = int(np.argmax(scores))
print(f"Most relevant: '{documents[top_idx]}' (score: {scores[top_idx]:.4f})")
```

### Reranking de candidatos recuperados

```python
import cohere

co = cohere.Client("YOUR_COHERE_API_KEY")

query = "How does multilingual embedding work?"
candidates = [
    "Cohere Embed supports over 100 languages in a single model.",
    "Command R+ is optimized for RAG workflows with long context.",
    "Rerank re-scores retrieved documents with a cross-encoder.",
    "BM25 is a classic keyword-based retrieval algorithm.",
]

results = co.rerank(
    model="rerank-multilingual-v3.0",
    query=query,
    documents=candidates,
    top_n=3,
)

for hit in results.results:
    print(f"[{hit.relevance_score:.4f}] {candidates[hit.index]}")
```

### Pipeline RAG completo con citas de Command R+

```python
import cohere

co = cohere.Client("YOUR_COHERE_API_KEY")

# Documents retrieved from your vector store (simplified)
retrieved_docs = [
    {"id": "doc1", "text": "Cohere Embed supports 100+ languages for multilingual search."},
    {"id": "doc2", "text": "Command R+ is designed for grounded generation with source citations."},
    {"id": "doc3", "text": "Rerank improves precision by re-scoring candidates with a cross-encoder."},
]

response = co.chat(
    model="command-r-plus",
    message="How does Cohere's pipeline improve search quality?",
    documents=retrieved_docs,
)

print(response.text)
print("\n--- Citations ---")
for citation in response.citations:
    print(f"  [{citation.start}:{citation.end}] → {[doc['id'] for doc in citation.documents]}")
```

## Recursos prácticos

- [Documentación de la API de Cohere](https://docs.cohere.com/) — Referencia completa para todas las APIs de Cohere incluyendo Chat, Embed y Rerank
- [Documentación de Cohere Embed](https://docs.cohere.com/docs/embeddings) — Guía detallada sobre modelos de embedding, tipos de entrada y soporte multilingüe
- [Documentación de Cohere Rerank](https://docs.cohere.com/docs/reranking) — Guía de la API de Rerank con ejemplos y consejos de selección de modelos
- [Guía RAG de Cohere](https://docs.cohere.com/docs/retrieval-augmented-generation-rag) — Tutorial completo para construir una pipeline RAG con Command R
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) — Benchmark independiente que compara modelos de embedding incluyendo Cohere Embed

## Ver también

- [Proveedores de modelos](/docs/model-providers)
- [RAG](/docs/rag)
- [Embeddings](/docs/rag/embeddings)
- [Búsqueda semántica](/docs/semantic-search)
