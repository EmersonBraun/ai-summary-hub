---
title: "Memoria conversacional"
description: Patrones de memoria para agentes de chat — memoria de buffer, resumen, vectorial y de entidades.
keywords: [memoria conversacional, memoria de buffer, memoria de resumen, memoria vectorial, memoria de entidades, LangChain, historial de chat]
---

# Memoria conversacional

## Definición

La memoria conversacional se refiere al conjunto de técnicas que permiten a un agente de chat retener y utilizar información de turnos anteriores en un diálogo. A diferencia de la generación aumentada por recuperación, que extrae documentos externos, la memoria conversacional se ocupa exclusivamente de lo que ya se ha dicho entre el usuario y el agente. Hacerlo bien es lo que separa a un chatbot frustrante que te pide repetir lo que dijiste de un agente que se siente genuinamente atento.

Existen varias estrategias distintas para gestionar el historial de conversación, cada una con diferentes compromisos entre costo, fidelidad y escalabilidad. El enfoque más simple — conservar cada mensaje literalmente — funciona bien para conversaciones cortas, pero rápidamente agota la ventana de contexto del modelo. Los patrones más sofisticados utilizan resumen o indexación semántica para comprimir o recuperar selectivamente el historial más relevante para el turno actual.

Elegir el patrón de memoria correcto depende en gran medida de la longitud esperada de la conversación, la importancia del texto exacto frente al significado semántico y las restricciones de costo del despliegue. En la práctica, los agentes de chat en producción a menudo combinan dos o más patrones: un buffer literal a corto plazo para la coherencia inmediata y una capa de resumen o vectorial para el recuerdo a largo plazo.

## Cómo funciona

### Memoria de buffer

La memoria de buffer es el patrón más directo: el agente mantiene una lista ordenada de los últimos N pares de mensajes y los antepone a cada nueva ventana de contexto. Cuando el buffer alcanza su capacidad, se descarta el par más antiguo (FIFO). Esto garantiza que el agente siempre tenga acceso a los intercambios más recientes sin ninguna transformación o compresión con pérdida. La memoria de buffer es ideal para conversaciones cortas a medianas donde la recencia es la señal principal, y no incurre en llamadas adicionales al LLM. Su principal debilidad es que el contexto más antiguo se pierde silenciosamente sin ningún resumen.

### Memoria de resumen

La memoria de resumen aborda el problema del olvido utilizando un LLM para generar periódicamente un resumen continuo de la conversación hasta el momento. Cuando el buffer crece demasiado, el agente lo condensa en una narrativa compacta — capturando hechos clave, decisiones y sentimiento — y luego descarta los mensajes en bruto. El resumen ocupa mucho menos tokens que los turnos originales, haciendo viables las conversaciones largas. El compromiso es una llamada secundaria al LLM para cada paso de resumen, lo que añade latencia y costo, y algo de información inevitablemente se pierde en la compresión.

### Memoria vectorial

La memoria vectorial incrusta cada turno de conversación y lo almacena en una base de datos vectorial. En cada nuevo turno, los intercambios pasados semánticamente más relevantes se recuperan mediante búsqueda por similitud y se inyectan en la ventana de contexto junto a los mensajes recientes del buffer. Este patrón sobresale cuando las conversaciones son muy largas o cuando la pregunta actual se relaciona con algo dicho muchos turnos atrás. La memoria vectorial es el enfoque de mayor fidelidad para el recuerdo a largo plazo, pero requiere infraestructura de embedding e introduce latencia de recuperación.

### Memoria de entidades

La memoria de entidades extrae entidades con nombre — personas, lugares, productos, preferencias — de la conversación y mantiene un registro estructurado de lo que el agente sabe sobre cada entidad. Cuando se menciona una entidad de nuevo, su perfil almacenado se inyecta en el contexto. La memoria de entidades es ideal para casos de uso de asistente personal donde recordar que "Alice prefiere reuniones por la mañana" o "la fecha límite del proyecto es el 10 de junio" es más valioso que recordar el texto exacto de mensajes pasados.

```mermaid
flowchart TD
  Msg[New User Message] -->|"add to"| Buffer[Buffer Memory\nlast N turns]
  Msg -->|"embed query"| VectorDB[(Vector Memory\nembedding store)]
  VectorDB -->|"retrieve similar turns"| Merge[Context Assembly]
  Buffer -->|"recent verbatim turns"| Merge
  Summary[Summary Memory\nrunning narrative] -->|"inject summary"| Merge
  Entities[Entity Memory\nkey facts / profiles] -->|"relevant entities"| Merge
  Merge -->|"assembled context"| LLM[LLM Inference]
  LLM -->|"response"| Out[Agent Output]
  LLM -->|"trigger summarize"| Summarizer[Summarizer LLM]
  Summarizer -->|"update"| Summary
  LLM -->|"extract entities"| Extractor[Entity Extractor]
  Extractor -->|"update"| Entities
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|---|---|
| Las conversaciones abarcan más de unos pocos turnos | La tarea es de un solo turno sin necesidad de historial |
| Los usuarios esperan que el agente recuerde lo que dijeron antes | Los datos de conversación no pueden almacenarse por razones de privacidad o cumplimiento |
| Los costos de la ventana de contexto son significativos y el historial es largo | La conversación siempre es lo suficientemente corta como para caber completamente en la ventana de contexto |
| Los usuarios discuten múltiples entidades o temas a lo largo de la sesión | La latencia de resumen es inaceptable para el caso de uso |
| Se requiere recuerdo entre sesiones (patrones vectoriales/de entidades) | La complejidad de infraestructura adicional supera el beneficio de fidelidad |

## Comparaciones

| Criterio | Memoria de buffer | Memoria de resumen | Memoria vectorial |
|---|---|---|---|
| Costo por turno | Bajo (sin llamada adicional al LLM) | Medio (llamada ocasional al resumidor) | Medio (llamada de embedding + consulta a DB) |
| Fidelidad del recuerdo | Exacta pero limitada a los últimos N turnos | Compresión con pérdida de turnos antiguos | Alta para contenido semánticamente relevante |
| Manejo de longitud de contexto | Deficiente — los turnos más antiguos se descartan silenciosamente | Bueno — el resumen comprime los turnos antiguos | Excelente — recupera solo los fragmentos relevantes |
| Latencia | Mínima | Moderada (el resumen agrega un paso) | Moderada (embedding + búsqueda de vecino más cercano) |
| Recuerdo entre sesiones | No (buffer en memoria) | Posible si el resumen se persiste | Sí (el almacén vectorial es persistente) |
| Complejidad de implementación | Muy baja | Baja–media | Media–alta |

## Ejemplos de código

```python
"""
Conversational memory patterns using LangChain.

Demonstrates:
1. ConversationBufferMemory  — keep verbatim last N messages
2. ConversationSummaryMemory — compress history into a running summary
3. ConversationBufferWindowMemory — sliding window variant
"""
# pip install langchain langchain-openai openai
from langchain.memory import (
    ConversationBufferMemory,
    ConversationSummaryMemory,
    ConversationBufferWindowMemory,
)
from langchain.chains import ConversationChain
from langchain_openai import ChatOpenAI


# ---------------------------------------------------------------------------
# 1. Buffer memory — keeps ALL messages (use for short conversations)
# ---------------------------------------------------------------------------
def demo_buffer_memory():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    memory = ConversationBufferMemory(return_messages=True)
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)

    reply1 = chain.predict(input="My name is Alice. I enjoy hiking.")
    reply2 = chain.predict(input="What outdoor activities would you recommend for me?")

    # The second call has access to the first turn verbatim
    print("Buffer memory — reply 2:", reply2)
    print("History length:", len(memory.chat_memory.messages), "messages\n")


# ---------------------------------------------------------------------------
# 2. Summary memory — LLM compresses history on each turn
# ---------------------------------------------------------------------------
def demo_summary_memory():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    # The same LLM is used to generate summaries; you can use a cheaper model here
    memory = ConversationSummaryMemory(llm=llm, return_messages=True)
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)

    chain.predict(input="I'm planning a trip to Japan next spring.")
    chain.predict(input="I'm most interested in traditional temples and local food.")
    reply3 = chain.predict(input="Can you suggest a one-week itinerary?")

    print("Summary memory — reply 3:", reply3)
    # The buffer contains only the latest summary, not all past raw messages
    print("Summary:", memory.moving_summary_buffer[:200], "...\n")


# ---------------------------------------------------------------------------
# 3. Window memory — keeps only the last k turns (sliding window)
# ---------------------------------------------------------------------------
def demo_window_memory(k: int = 3):
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    # k=3 means only the last 3 HumanMessage+AIMessage pairs are retained
    memory = ConversationBufferWindowMemory(k=k, return_messages=True)
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)

    for i in range(6):
        reply = chain.predict(input=f"This is message number {i + 1}.")
        print(f"Turn {i + 1}: {reply[:80]}")

    print(
        f"\nWindow memory keeps {len(memory.chat_memory.messages)} messages "
        f"(max {k * 2} for k={k} turn pairs)\n"
    )


# ---------------------------------------------------------------------------
# Manual entity-style memory (illustrative, no extra dependency)
# ---------------------------------------------------------------------------
def demo_entity_memory_manual():
    """
    Minimal entity memory: parse key facts from each turn and inject them.
    In production, use LangChain's ConversationEntityMemory or a dedicated NER model.
    """
    entity_store: dict[str, str] = {}

    def extract_entities_mock(text: str) -> dict[str, str]:
        """Mock extraction — real impl would call an LLM or NER model."""
        entities = {}
        if "my name is" in text.lower():
            name = text.lower().split("my name is")[-1].strip().split()[0].rstrip(".,")
            entities["user_name"] = name.capitalize()
        if "deadline" in text.lower():
            entities["deadline"] = "mentioned but not parsed in this mock"
        return entities

    turns = [
        ("user", "My name is Bob and my project deadline is end of July."),
        ("user", "Can you help me prioritize my tasks?"),
    ]
    for role, msg in turns:
        entity_store.update(extract_entities_mock(msg))
        entity_context = "; ".join(f"{k}={v}" for k, v in entity_store.items())
        print(f"[{role}] {msg}")
        print(f"  Entity context injected: {entity_context}\n")


if __name__ == "__main__":
    import os

    if os.getenv("OPENAI_API_KEY"):
        demo_buffer_memory()
        demo_summary_memory()
        demo_window_memory()
    else:
        print("Set OPENAI_API_KEY to run LangChain demos.")
    demo_entity_memory_manual()
```

## Recursos prácticos

- [Documentación de memoria de LangChain](https://python.langchain.com/docs/concepts/memory/) — Referencia completa para todas las clases de memoria de LangChain con ejemplos de uso.
- [Repensando la memoria en IA conversacional (Lilian Weng)](https://lilianweng.github.io/posts/2023-06-23-agent/#memory) — Artículo de blog en profundidad que cubre la taxonomía de memoria y los compromisos de diseño en sistemas de agentes.
- [MemoryOS: Sistema operativo basado en memoria para agentes LLM](https://arxiv.org/abs/2506.06326) — Investigación sobre gestión jerárquica de memoria inspirada en el diseño de sistemas operativos.
- [Gestión de hilos de OpenAI Assistants](https://platform.openai.com/docs/assistants/how-it-works/managing-threads) — Cómo la API gestionada de OpenAI maneja los hilos de conversación persistentes.

## Ver también

- [Memoria de agentes](/docs/agents/memory)
- [Agentes de IA](/docs/agents)
- [Embeddings de RAG](/docs/rag/embeddings)
