---
title: Model providers
description: Overview of AI model providers — API-based, open-weights, and hybrid approaches.
keywords: [model providers, OpenAI, Anthropic, Google, Meta, Mistral, Cohere, DeepSeek, API]
tags: [beginner]
authors: [EmersonBraun]
---

# Proveedores de modelos

## Definición

Un proveedor de modelos es una organización que ofrece acceso a modelos de lenguaje extensos, ya sea a través de APIs alojadas, pesos descargables de código abierto, o ambos. La elección del proveedor determina las capacidades de su aplicación, la estructura de costos, la postura de privacidad de datos y la flexibilidad de implementación. Comprender el panorama de proveedores es un requisito previo para cualquier sistema de IA en producción.

El mercado se divide en tres categorías. Los **proveedores basados en API** como OpenAI, Anthropic y Google ofrecen modelos exclusivamente a través de APIs gestionadas: usted envía solicitudes y ellos se encargan de la infraestructura de inferencia. Los **proveedores de pesos abiertos** como Meta y Mistral publican pesos de modelos que puede descargar y ejecutar en su propio hardware o mediante alojamiento de terceros. Los **proveedores híbridos** como Mistral y DeepSeek ofrecen tanto modelos de pesos abiertos como acceso comercial a la API, brindando a los desarrolladores flexibilidad para elegir según sus necesidades.

Elegir un proveedor implica compromisos en múltiples dimensiones: calidad del modelo, precios, tamaño de la ventana de contexto, capacidades multimodales, privacidad de datos, soporte para ajuste fino y madurez del ecosistema. Ningún proveedor domina en todos los criterios, por lo que la mayoría de los sistemas en producción evalúan múltiples opciones y a veces utilizan diferentes proveedores para distintas tareas dentro de la misma aplicación.

## Cómo funciona

### Proveedores basados en API

Los proveedores de API alojan modelos en su infraestructura y los exponen a través de APIs REST. Usted se autentica con una clave de API, envía una solicitud con su prompt y parámetros de configuración, y recibe una respuesta. El proveedor gestiona el escalado, la asignación de GPU, las actualizaciones de modelos y el tiempo de actividad. Esta es la ruta más sencilla hacia la producción —sin infraestructura que gestionar— pero usted envía sus datos a un tercero y paga por token.

```mermaid
flowchart LR
  App[Your Application] -->|API request + tokens| GW[Provider API Gateway]
  GW -->|routes to| M[Model Cluster]
  M -->|inference| R[Response]
  R -->|tokens + usage| App
  GW -.->|billing| B[Usage Metering]
```

### Proveedores de pesos abiertos

Los proveedores de pesos abiertos publican archivos de modelos (típicamente en Hugging Face) que usted descarga y ejecuta localmente o en su infraestructura en la nube. Usted controla toda la pila: selección de hardware, cuantización, framework de servicio (vLLM, TGI, llama.cpp) y escalado. Esto brinda máxima privacidad y personalización, pero requiere experiencia en infraestructura de ML. Los proveedores de inferencia de terceros (Together AI, Groq, Fireworks) ofrecen un punto intermedio: alojan modelos abiertos con una interfaz API.

```mermaid
flowchart LR
  W[Model Weights] -->|download| L[Local GPU / Cloud VM]
  W -->|hosted by| TP[Third-Party Provider]
  L -->|self-hosted API| App[Your Application]
  TP -->|managed API| App
  L -.->|full control| CT[Custom Fine-tuning]
  CT -->|deploy| L
```

### Elegir un proveedor

El árbol de decisión depende de sus restricciones. Comience con sus requisitos —privacidad de datos, presupuesto, latencia, calidad del modelo— y reduzca desde ahí. Muchos equipos comienzan con proveedores de API para prototipos y evalúan alternativas de pesos abiertos para la optimización de costos en producción o requisitos de soberanía de datos.

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|-------------|---------------|
| **Proveedores de API**: prototipado rápido, sin equipo de infraestructura ML, necesidad inmediata de modelos de vanguardia | Los datos no pueden salir de su infraestructura (industrias reguladas, datos personales) |
| **Pesos abiertos**: requisitos de privacidad de datos, control sobre ajuste fino, optimización de costos en alto volumen | Carece de infraestructura GPU y experiencia en ML ops |
| **Modelos abiertos alojados por terceros**: flexibilidad de modelos abiertos sin gestionar infraestructura | Necesita SLAs garantizados y soporte empresarial (use APIs de primer proveedor) |
| **Múltiples proveedores**: distintas tareas tienen diferentes requisitos de calidad/costo | Su caso de uso es lo suficientemente simple como para que un proveedor lo cubra todo |

## Comparaciones

| Criterio | OpenAI | Anthropic | Google Gemini | Meta Llama | Mistral | Cohere | DeepSeek |
|----------|--------|-----------|---------------|------------|---------|--------|----------|
| Acceso al modelo | Solo API | Solo API | API + Vertex AI | Pesos abiertos | Abierto + API | Solo API | Abierto + API |
| Modelo de nivel superior | GPT-4o, o3 | Claude Opus/Sonnet | Gemini Ultra/Pro | Llama 3.1 405B | Mistral Large | Command R+ | DeepSeek-V3 |
| Ventana de contexto | 128K | 200K | 1M+ | 128K | 128K | 128K | 128K |
| Multimodal | Visión, audio, generación de imágenes | Visión | Visión, audio, video | Visión (3.2) | Visión | Enfocado en texto | Enfocado en texto |
| Especialidad | Propósito general, ecosistema | Seguridad, contexto largo | Multimodal, fundamentación en búsqueda | Pesos abiertos, personalización | Eficiencia, multilingüe | Incrustaciones, RAG, reranking | Razonamiento, eficiencia de costos |
| Ajuste fino | Ajuste fino por API | No disponible | Ajuste fino en Vertex AI | Acceso completo a pesos | Ajuste fino por API | No disponible | Acceso completo a pesos |
| Modelo de precios | Por token | Por token | Por token + nivel gratuito | Gratis (autoalojado) o terceros | Por token + modelos gratuitos | Por token | Por token (costo muy bajo) |

## Ejemplos de código

### Llamadas API comparativas (Python)

```python
# OpenAI
from openai import OpenAI

openai_client = OpenAI()
openai_response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain RAG in one sentence."}],
)
print("OpenAI:", openai_response.choices[0].message.content)
```

```python
# Anthropic
import anthropic

anthropic_client = anthropic.Anthropic()
anthropic_response = anthropic_client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=256,
    messages=[{"role": "user", "content": "Explain RAG in one sentence."}],
)
print("Anthropic:", anthropic_response.content[0].text)
```

```python
# Google Gemini
import google.generativeai as genai

model = genai.GenerativeModel("gemini-1.5-pro")
gemini_response = model.generate_content("Explain RAG in one sentence.")
print("Gemini:", gemini_response.text)
```

### Interfaz unificada con LiteLLM (Python)

```python
from litellm import completion

# Same interface, different providers
providers = {
    "OpenAI": "gpt-4o",
    "Anthropic": "claude-sonnet-4-20250514",
    "Gemini": "gemini/gemini-1.5-pro",
}

for name, model in providers.items():
    response = completion(
        model=model,
        messages=[{"role": "user", "content": "Explain RAG in one sentence."}],
    )
    print(f"{name}: {response.choices[0].message.content}")
```

## Recursos prácticos

- [Artificial Analysis](https://artificialanalysis.ai/) — Benchmarks independientes de LLM y comparación de precios
- [LiteLLM](https://docs.litellm.ai/) — API unificada para más de 100 proveedores de LLM
- [OpenRouter](https://openrouter.ai/) — Gateway de API único para múltiples proveedores
- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard) — Benchmarks de modelos abiertos
- [LMSYS Chatbot Arena](https://chat.lmsys.org/) — Rankings de LLM por evaluación humana ciega colaborativa

## Ver también

- [OpenAI](/docs/model-providers/openai)
- [Anthropic](/docs/model-providers/anthropic)
- [Google Gemini](/docs/model-providers/google-gemini)
- [Meta Llama](/docs/model-providers/meta-llama)
- [Mistral](/docs/model-providers/mistral)
- [Cohere](/docs/model-providers/cohere)
- [DeepSeek](/docs/model-providers/deepseek)
- [LLMs](/docs/llms)
- [Infrastructure](/docs/infrastructure)
- [Local inference](/docs/local-inference)
