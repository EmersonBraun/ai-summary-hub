---
title: LangGraph
description: Stateful agent graphs built on LangChain, where nodes are Python functions, edges define routing, and a shared TypedDict state enables cycles, conditional branching, persistence, and human-in-the-loop checkpoints.
keywords: [LangGraph, stateful agents, state graph, nodes, edges, conditional routing, cycles, persistence, human-in-the-loop, LangChain]
tags: [intermediate]
authors: [EmersonBraun]
---

# LangGraph

## Definición

LangGraph es una biblioteca Python de código abierto construida sobre LangChain para la construcción de **flujos de trabajo de agentes con estado como grafos dirigidos explícitos**. Donde la mayoría de los frameworks de agentes ocultan el bucle de ejecución detrás de una llamada `run()` opaca, LangGraph lo expone como un objeto de grafo de primera clase que se puede inspeccionar, probar y modificar. Los nodos son funciones Python normales (cada una puede llamar a un LLM, una herramienta o cualquier lógica); las aristas son transiciones entre nodos; y todo el flujo de trabajo comparte un único objeto de **estado** — un diccionario tipado del que cada nodo puede leer y en el que puede escribir.

La clave en LangGraph es que muchos comportamientos de agentes que parecen complejos — hacer bucles hasta que se cumpla una condición, ramificar según el contenido de una respuesta LLM, pausar para aprobación humana, reanudar desde un checkpoint guardado — se mapean limpiamente a primitivas de grafo: ciclos, aristas condicionales, interrupciones y estado persistente. Esta explicititud tiene un costo (más código repetitivo que CrewAI o AutoGen), pero se amortiza en producción: se puede probar unitariamente cada nodo de forma aislada, rastrear exactamente qué camino tomó una ejecución, y reproducir un flujo de trabajo desde cualquier checkpoint.

LangGraph admite tanto patrones de **agente único** (un grafo con pocos nodos que llama herramientas en un bucle) como patrones **multi-agente** (varios subgrafos compuestos, con estado compartido entre grafos). Se integra de forma nativa con el ecosistema de herramientas de LangChain, modelos de chat y LangSmith para observabilidad. El framework es la base de la arquitectura de agentes de producción recomendada por LangChain desde 2024-2025.

## Cómo funciona

### Nodos: funciones Python como unidades de ejecución

Un nodo en LangGraph es cualquier callable de Python que acepta el estado actual y devuelve un estado (parcialmente) actualizado. Los nodos se añaden al grafo con `graph.add_node("nombre", función)`. La firma de la función siempre es `(state: State) -> dict` — lee lo que necesita del estado, realiza su trabajo (llamada LLM, ejecución de herramienta, transformación de datos) y devuelve solo las claves que desea actualizar. Esto hace que los nodos sean fáciles de probar de forma independiente: se pasa un estado simulado y se verifica el dict devuelto. El `ToolNode` de LangChain es un nodo preconstruido que ejecuta llamadas de herramientas desde una respuesta LLM y cubre directamente el patrón de agente más común.

### Aristas: enrutamiento y ramificación condicional

Las aristas conectan nodos y determinan el orden de ejecución. Una arista simple (`graph.add_edge("a", "b")`) siempre pasa del nodo `a` al nodo `b`. Una arista condicional (`graph.add_conditional_edges`) llama a una función de enrutamiento con el estado actual y usa la cadena devuelta para determinar el siguiente nodo. Este es el mecanismo de flujo de control dinámico: después de que un LLM genera una respuesta, un enrutador verifica si contiene llamadas a herramientas (ruta a `tools`) o una respuesta final (ruta a `END`). Las aristas condicionales hacen que LangGraph sea significativamente más potente que un pipeline secuencial — se pueden expresar árboles de decisión complejos, lógica de reintentos y rutas de escalación como una estructura de grafo legible.

### Estado: TypedDict compartido entre todos los nodos

El estado es la columna vertebral de una aplicación LangGraph. Se define un `TypedDict` (o un modelo Pydantic) con todos los campos que necesita el flujo de trabajo: mensajes, resultados intermedios, banderas, contadores. Cada nodo recibe el estado completo y devuelve solo los campos que cambia. LangGraph fusiona actualizaciones parciales con el estado actual usando **reductores** — por defecto, las asignaciones sobrescriben; con el reductor `add_messages`, la lista de mensajes se añade en lugar de reemplazarse. La tipificación explícita del estado significa que los verificadores de tipo pueden detectar errores antes del tiempo de ejecución, y la instantánea de estado en cada checkpoint es un registro completo e inspeccionable de lo que sucedió.

### Ciclos, persistencia y human-in-the-loop

LangGraph maneja ciclos de forma nativa: un nodo puede hacer una arista de regreso a un nodo anterior (o a sí mismo) basándose en una condición, lo que permite bucles de reintento de agentes, patrones de autocorrección y uso de herramientas de múltiples pasos sin tratamiento especial. La persistencia es proporcionada por **checkpointers** (SQLite, Postgres, Redis o en memoria): el grafo guarda el estado completo después de cada ejecución de nodo, por lo que se puede reanudar desde cualquier punto tras un fallo o interrupción. El human-in-the-loop se implementa a través de `interrupt_before` e `interrupt_after` — el grafo hace una pausa en el nodo especificado, muestra el estado actual al llamador, acepta entrada humana y continúa. Esto hace que LangGraph sea la opción más potente cuando se necesitan pipelines de agentes auditables, interrumpibles y listos para producción.

```mermaid
flowchart TD
  Start([START]) -->|initializes state| CallModel[call_model node\nLLM generates response]
  CallModel -->|reads tool_calls from state| Router{tools_router\nconditional edge}
  Router -->|tool_calls present| ToolNode[tool_node\nexecutes tool calls]
  ToolNode -->|appends tool results to state| CallModel
  Router -->|no tool_calls| End([END\nfinal answer])
  CallModel -->|on error| ErrorHandler[error_handler node\nretry or escalate]
  ErrorHandler -->|retry| CallModel
  ErrorHandler -->|max retries exceeded| End
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|---|---|
| Se necesita control granular sobre cada paso de la ejecución del agente | Se desea una API declarativa de alto nivel y no se necesita control a nivel de paso |
| Se requiere persistencia y la capacidad de reanudar flujos de trabajo en medio de la ejecución | El flujo de trabajo es simple y lineal — una cadena o bucle de agente único es suficiente |
| Se requieren aprobaciones human-in-the-loop en pasos específicos | El equipo no está familiarizado con la teoría de grafos y prefiere un modelo mental más simple |
| Se construyen sistemas de producción que necesitan observabilidad completa y reproducción | Los agentes son prototipos de investigación que no necesitan fiabilidad lista para producción |
| El flujo de trabajo tiene ramificación condicional compleja o ciclos que son difíciles de expresar linealmente | La coordinación de roles multi-agente es la necesidad principal — CrewAI o AutoGen son más simples |

## Comparaciones

| Criterio | LangGraph | CrewAI | AutoGen |
|---|---|---|---|
| **Nivel de abstracción** | Bajo: grafo explícito, nodos, aristas y estado | Alto: roles declarativos, objetivos, tareas | Medio: agentes conversacionales con historial de mensajes |
| **Flujo de control** | Aristas condicionales explícitas y ciclos | Proceso secuencial o jerárquico (opaco) | Basado en mensajes, por turnos (opaco) |
| **Persistencia** | Primera clase: checkpointers para SQLite, Postgres, Redis | No integrado | No integrado |
| **Human-in-the-Loop** | Primera clase: `interrupt_before` / `interrupt_after` | Solo manual | Primera clase: `human_input_mode` por agente |
| **Capacidad de prueba** | Alta: los nodos son funciones puras, fáciles de probar unitariamente | Media: las tareas se pueden probar, pero la ejecución del crew es opaca | Baja: los flujos conversacionales son difíciles de probar unitariamente de forma determinista |

## Ejemplos de código

```python
import os
from typing import Annotated, TypedDict, Literal
from langchain_anthropic import ChatAnthropic
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

# --- State definition ---
# add_messages is a reducer: it appends to the messages list instead of replacing it.
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    step_count: int  # track how many steps we have taken

# --- Tool definitions ---
# Tools are standard LangChain tools decorated with @tool.
# The docstring becomes the tool description sent to the LLM.

@tool
def search_web(query: str) -> str:
    """Search the web for current information on a topic."""
    # In production, replace with a real search API (Serper, Tavily, etc.)
    return f"Search results for '{query}': LangGraph is a stateful agent framework by LangChain."

@tool
def add_numbers(a: float, b: float) -> str:
    """Add two numbers together and return the result."""
    return f"Result: {a + b}"

tools = [search_web, add_numbers]

# --- LLM setup ---
# Bind tools to the model so it knows what functions are available.
llm = ChatAnthropic(model="claude-opus-4-5")
llm_with_tools = llm.bind_tools(tools)

# --- Node definitions ---
# Each node is a plain Python function: (state) -> partial state update.

def call_model(state: AgentState) -> dict:
    """Primary agent node: calls the LLM and returns its response."""
    response = llm_with_tools.invoke(state["messages"])
    return {
        "messages": [response],  # add_messages reducer will append this
        "step_count": state["step_count"] + 1,
    }

def handle_error(state: AgentState) -> dict:
    """Error handling node: appends a fallback message if something went wrong."""
    fallback = AIMessage(content="I encountered an error. Let me try a different approach.")
    return {"messages": [fallback]}

# --- Routing function (conditional edge) ---
# Returns the name of the next node based on the current state.

def should_continue(state: AgentState) -> Literal["tools", "end"]:
    """Route to tools if the LLM made tool calls, otherwise end."""
    last_message = state["messages"][-1]
    # Safety limit: stop after 10 steps to prevent infinite loops
    if state["step_count"] >= 10:
        return "end"
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return "end"

# --- Graph construction ---
tool_node = ToolNode(tools)  # prebuilt node that executes tool calls

graph = StateGraph(AgentState)

# Add nodes
graph.add_node("agent", call_model)
graph.add_node("tools", tool_node)
graph.add_node("error_handler", handle_error)

# Set entry point
graph.set_entry_point("agent")

# Add conditional edge from agent: either call tools or end
graph.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",  # route to tool execution
        "end": END,        # route to terminal node
    },
)

# After tool execution, always return to the agent (creates a cycle)
graph.add_edge("tools", "agent")

# Error handler routes back to agent for a retry
graph.add_edge("error_handler", "agent")

# Compile the graph into a runnable application
app = graph.compile()

# --- Optional: add persistence with a checkpointer ---
# from langgraph.checkpoint.sqlite import SqliteSaver
# memory = SqliteSaver.from_conn_string(":memory:")
# app = graph.compile(checkpointer=memory)
# Use config={"configurable": {"thread_id": "session-1"}} to resume sessions.

# --- Run the agent ---
initial_state = {
    "messages": [HumanMessage(content="What is LangGraph and what is 42 plus 17?")],
    "step_count": 0,
}

result = app.invoke(initial_state)
print("Final answer:", result["messages"][-1].content)
print("Total steps:", result["step_count"])

# --- Inspect the graph structure ---
# app.get_graph().print_ascii()  # print ASCII diagram of the graph
```

## Recursos prácticos

- [LangGraph official documentation](https://langchain-ai.github.io/langgraph/) — Referencia completa para la construcción de grafos, gestión de estado, checkpointers y patrones human-in-the-loop.
- [LangGraph GitHub repository](https://github.com/langchain-ai/langgraph) — Código fuente, rastreador de problemas y notebooks de ejemplo que cubren patrones comunes.
- [LangGraph "How-to" guides](https://langchain-ai.github.io/langgraph/how-tos/) — Recetas prácticas para persistencia, streaming, subgrafos, coordinación multi-agente y más.
- [LangSmith tracing for LangGraph](https://docs.smith.langchain.com/) — Plataforma de observabilidad para rastrear ejecuciones de LangGraph, inspeccionar el estado en cada nodo y depurar fallos.

## Ver también

- [Agent frameworks overview](/docs/agents/frameworks-overview)
- [CrewAI](/docs/agents/crewai)
- [AutoGen](/docs/agents/autogen)
- [LangChain](/docs/tools/langchain)
- [Multi-agent systems](/docs/agents/multi-agent-systems)
- [ReAct](/docs/reasoning-patterns/react)
