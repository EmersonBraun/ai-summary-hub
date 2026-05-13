---
title: DeepSeek
description: Chinese AI lab offering open-weights models with state-of-the-art reasoning and coding capabilities at significantly lower cost than proprietary alternatives.
keywords: [deepseek, DeepSeek-V3, DeepSeek-R1, reasoning model, chain-of-thought, open weights, code generation, cost-efficient LLM, Chinese AI]
tags: [intermediate]
authors: [EmersonBraun]
---

# DeepSeek

## Definición

**DeepSeek** es un laboratorio de investigación de IA chino y plataforma comercial que ha ganado considerable atención internacional por producir modelos que logran un rendimiento competitivo con los mejores modelos propietarios mientras publica los pesos de forma abierta y opera a una fracción del costo. Fundado en 2023 como subsidiaria de High-Flyer (un fondo de cobertura cuantitativo), el enfoque de DeepSeek se caracteriza por una investigación rigurosa sobre eficiencia de entrenamiento — incluyendo innovaciones en arquitecturas de mezcla de expertos (MoE), aprendizaje por refuerzo con retroalimentación humana y enfoques novedosos al razonamiento que no dependen de presupuestos masivos de cómputo.

La línea de modelos abarca tres áreas principales de capacidad. **DeepSeek-V3** es un modelo de chat e instrucciones de propósito general que rivaliza con GPT-4o y Claude 3.5 Sonnet en benchmarks estándar mientras es dramáticamente más económico a través de la API. **DeepSeek-R1** es un modelo de razonamiento dedicado que utiliza cadena de pensamiento extendida (CoT) — el modelo genera trazas de razonamiento explícitas antes de producir una respuesta final — haciéndolo particularmente fuerte en matemáticas, deducción lógica y resolución de problemas de múltiples pasos. **DeepSeek-Coder** (y sus variantes sucesorias integradas en V3/R1) se especializa en generación, completación y depuración de código en una amplia gama de lenguajes de programación.

El enfoque de pesos abiertos de DeepSeek significa que todos los modelos principales están disponibles en Hugging Face y pueden autoalojarse en su propia infraestructura — una capacidad crítica para organizaciones con requisitos de soberanía de datos o aquellas que buscan evitar costos por token de API a escala. La plataforma DeepSeek también expone una API que es wire-compatible con el formato de API de OpenAI, lo que significa que cualquier aplicación construida con el SDK de Python de OpenAI puede cambiar a modelos DeepSeek cambiando la `base_url` y la clave API sin ningún otro cambio de código.

## Cómo funciona

### Plataforma API

DeepSeek aloja una API de inferencia en la nube en `api.deepseek.com` que acepta solicitudes en el formato OpenAI Chat Completions. Esta capa de compatibilidad significa que la sobrecarga de integración es mínima — los desarrolladores familiarizados con el SDK de OpenAI pueden migrar o probar modelos DeepSeek en minutos. La plataforma admite respuestas en streaming, llamadas a funciones y prompts de sistema. Los precios son basados en tokens y están listados públicamente, con tarifas que típicamente son 90–95% más bajas que los modelos OpenAI de nivel equivalente, haciendo que las implementaciones de producción de alto volumen sean sustancialmente más económicas.

### Modelos de razonamiento (DeepSeek-R1)

DeepSeek-R1 se entrena usando un proceso de múltiples etapas que incorpora aprendizaje por refuerzo para recompensar al modelo por producir respuestas finales correctas — crucialmente, sin depender de datos supervisados de cadena de pensamiento en la etapa central de entrenamiento. El modelo genera un bloque `<think>` que contiene su traza de razonamiento antes de la respuesta final. Este bloc de notas explícito permite al modelo realizar deducción de múltiples pasos, verificar su trabajo y retroceder de caminos incorrectos — comportamientos que mejoran dramáticamente el rendimiento en problemas de olimpiadas de matemáticas, lógica formal y tareas de codificación complejas que requieren planificación a través de muchos pasos.

### Modelos de código y DeepSeek-Coder

Los modelos especializados en código de DeepSeek se preentrenan en grandes corpus de código fuente (GitHub, plataformas de programación competitiva, documentación) y se ajustan fino para seguir instrucciones en tareas de codificación. Admiten completación fill-in-the-middle (FIM), que es el formato estándar utilizado por herramientas de autocompletado de IDE como Copilot. DeepSeek-Coder logra un rendimiento superior en HumanEval, MBPP y SWE-bench, superando frecuentemente a modelos varias veces más grandes de otros proveedores. Las capacidades de codificación también están integradas en DeepSeek-V3 y R1, por lo que los modelos de propósito general también funcionan bien en tareas de código.

### Implementación de pesos abiertos

Todos los modelos principales de DeepSeek tienen sus pesos publicados en Hugging Face bajo licencias permisivas, habilitando la inferencia autoalojada en hardware GPU de consumo o empresarial. DeepSeek-V3 utiliza una arquitectura de mezcla de expertos donde solo un subconjunto de parámetros se activa por token, reduciendo significativamente el costo de inferencia en comparación con modelos densos de capacidad comparable. Las opciones de implementación populares incluyen vLLM, Ollama (para versiones cuantizadas) y contenedores NVIDIA NIM. La implementación autoalojada es particularmente atractiva para cargas de trabajo por lotes a gran escala, ajuste fino en datos propietarios, o escenarios donde todos los datos deben permanecer on-premises.

```mermaid
flowchart TD
  U[User / Application] -->|OpenAI-compatible request| API[DeepSeek API\napi.deepseek.com]
  U -->|self-hosted request| SH[Self-Hosted Inference\nvLLM / Ollama / NIM]

  API -->|general chat / code| V3[DeepSeek-V3]
  API -->|reasoning tasks| R1[DeepSeek-R1]
  SH -->|open weights| HF[Hugging Face\nModel Weights]

  R1 -->|generates reasoning trace| THINK["\<think\> block\n(chain-of-thought)"]
  THINK -->|produces| ANS[Final Answer]
  V3 -->|direct response| ANS
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|-------------|---------------|
| El costo es una restricción primaria — la API de DeepSeek es más de un 90% más económica que GPT-4o con calidad comparable | Necesita un proveedor con un SLA empresarial establecido, certificaciones de cumplimiento (SOC 2, HIPAA) o procesamiento de datos en EE.UU. |
| Las tareas requieren razonamiento profundo de múltiples pasos: matemáticas, lógica, pruebas formales, codificación compleja | Su tarea es principalmente multimodal — DeepSeek-V3/R1 son modelos solo de texto |
| Quiere autoalojar modelos de pesos abiertos para soberanía de datos o ajuste fino personalizado | Necesita el ecosistema más amplio posible de plugins/herramientas e integraciones de terceros |
| Construyendo pipelines de lotes de alto volumen donde la reducción de costo por token se acumula significativamente | Aplicaciones de consumo críticas para la latencia donde la traza de razonamiento de R1 agrega tiempo de respuesta |
| La generación de código, revisión de código o depuración son sus casos de uso principales | Se encuentra en una jurisdicción con requisitos regulatorios sobre el origen del modelo de IA |

## Comparaciones

| Criterio | DeepSeek (V3 / R1) | OpenAI (GPT-4o / o1) | Meta / Llama |
|----------|--------------------|----------------------|--------------|
| Rendimiento de razonamiento | R1 competitivo con o1 en benchmarks de matemáticas/lógica | o1 es de primer nivel; GPT-4o fuerte en razonamiento general | Llama 3.x competitivo pero por debajo de R1/o1 en razonamiento difícil |
| Calidad de chat general | V3 competitivo con GPT-4o | GPT-4o mejor calidad general | Llama 3.3 70B competitivo para su tamaño |
| Pesos abiertos | Sí (todos los modelos en Hugging Face) | No (solo propietario) | Sí (Meta open-sources Llama) |
| Costo de API | Muy bajo (~$0,27/M tokens de entrada para V3) | Alto (~$2,50/M para entrada GPT-4o) | Gratis (autoalojado); API de Fireworks/Together asequible |
| Ecosistema e integraciones | Creciendo; API compatible con OpenAI facilita adopción | Mayor ecosistema, más integraciones | Gran ecosistema de código abierto |
| Soberanía de datos | Auto-host posible; datos de API procesados en China | Azure OpenAI para procesamiento en región de EE.UU. | Auto-host completo posible |
| Multimodal | Solo texto (V3/R1) | Sí (GPT-4o, DALL-E) | Llama 3.2 tiene capacidades de visión |

## Pros y contras

| Pros | Contras |
|------|---------|
| Costo de API dramáticamente más bajo que OpenAI/Anthropic | Los datos de la API se enrutan a través de servidores chinos — preocupación para algunas industrias reguladas |
| R1 ofrece rendimiento de razonamiento de nivel frontera | Las trazas de razonamiento de R1 agregan latencia y uso de tokens |
| API compatible con OpenAI — costo de cambio casi nulo | Menor reconocimiento de confianza/marca en ciclos de ventas empresariales occidentales |
| Los pesos abiertos permiten autoalojamiento y ajuste fino | V3/R1 son solo texto; sin capacidades nativas de imagen o audio |
| Fuerte generación de código en la mayoría de los lenguajes de programación convencionales | La comunidad y la documentación son principalmente en chino; los recursos en inglés todavía se están poniendo al día |

## Ejemplos de código

### Completación de chat con DeepSeek-V3 (compatible con OpenAI)

```python
from openai import OpenAI

# DeepSeek uses the OpenAI SDK with a custom base_url
client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",  # maps to DeepSeek-V3
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "Explain the difference between MoE and dense transformer architectures."},
    ],
    temperature=0.7,
    max_tokens=1024,
)

print(response.choices[0].message.content)
```

### Razonamiento con DeepSeek-R1 (cadena de pensamiento)

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-reasoner",  # maps to DeepSeek-R1
    messages=[
        {
            "role": "user",
            "content": (
                "A train leaves City A at 08:00 and travels at 120 km/h. "
                "Another train leaves City B (300 km away) at 09:00 and travels "
                "toward City A at 80 km/h. At what time do they meet?"
            ),
        }
    ],
)

# R1 exposes the reasoning trace in reasoning_content
message = response.choices[0].message
if hasattr(message, "reasoning_content") and message.reasoning_content:
    print("=== Reasoning trace ===")
    print(message.reasoning_content)
    print()

print("=== Final answer ===")
print(message.content)
```

### Respuesta en streaming con DeepSeek-V3

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

stream = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Write a Python function that implements binary search."},
    ],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta
    if delta.content:
        print(delta.content, end="", flush=True)
print()
```

### Inferencia autoalojada con vLLM

```python
# Start vLLM server (run in terminal):
# vllm serve deepseek-ai/DeepSeek-V3 --tensor-parallel-size 4 --port 8000

from openai import OpenAI

# Point to your local vLLM server instead of DeepSeek cloud
client = OpenAI(
    api_key="not-needed",  # vLLM does not require a real key
    base_url="http://localhost:8000/v1",
)

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3",
    messages=[
        {"role": "user", "content": "Summarize the key advantages of mixture-of-experts models."},
    ],
)

print(response.choices[0].message.content)
```

## Recursos prácticos

- [Documentación de la API de DeepSeek](https://platform.deepseek.com/api-docs/) — Referencia oficial para la API de la plataforma DeepSeek incluyendo modelos, parámetros y precios
- [GitHub de DeepSeek](https://github.com/deepseek-ai) — Repositorios de código abierto para modelos DeepSeek, código de entrenamiento y artículos de investigación
- [DeepSeek-R1 en Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-R1) — Tarjeta del modelo con pesos, resultados de benchmark e instrucciones de implementación
- [Informe técnico de DeepSeek-V3](https://arxiv.org/abs/2412.19437) — Artículo de investigación que detalla la arquitectura V3, el enfoque de entrenamiento y las comparaciones de benchmark
- [Guía de implementación de DeepSeek con vLLM](https://docs.vllm.ai/en/latest/models/supported_models.html) — Instrucciones para autoalojar modelos DeepSeek con vLLM para inferencia en producción

## Ver también

- [Proveedores de modelos](/docs/model-providers)
- [Caso de estudio DeepSeek](/docs/case-studies/deepseek)
- [Patrones de razonamiento](/docs/reasoning-patterns)
