---
title: LangGraph
description: Stateful agent graphs built on LangChain, where nodes are Python functions, edges define routing, and a shared TypedDict state enables cycles, conditional branching, persistence, and human-in-the-loop checkpoints.
keywords: [LangGraph, stateful agents, state graph, nodes, edges, conditional routing, cycles, persistence, human-in-the-loop, LangChain]
tags: [intermediate]
authors: [EmersonBraun]
---

# LangGraph

## Definição

LangGraph ist eine Open-Source-Python-Bibliothek, die auf LangChain aufbaut, zur Konstruktion **zustandsbehafteter Agenten-Workflows als explizite gerichtete Graphen**. Wo die meisten Agenten-Frameworks die Ausführungsschleife hinter einem undurchsichtigen `run()`-Aufruf verbergen, legt LangGraph sie als erstklassiges Graph-Objekt frei, das Sie inspizieren, testen und modifizieren können. Knoten sind normale Python-Funktionen (jede kann ein LLM, ein Werkzeug oder beliebige Logik aufrufen); Kanten sind Übergänge zwischen Knoten; und der gesamte Workflow teilt ein einziges **Zustands**-Objekt – ein typisiertes Dictionary, aus dem jeder Knoten lesen und in das schreiben kann.

Die Schlüsselerkenntnis in LangGraph ist, dass viele Agenten-Verhaltensweisen, die komplex erscheinen – Loopen bis eine Bedingung erfüllt ist, Branching auf dem Inhalt einer LLM-Antwort, Pausieren für menschliche Genehmigung, Wiederaufnehmen von einem gespeicherten Checkpoint – sauber auf Graph-Primitive abbilden: Zyklen, bedingte Kanten, Interrupts und persistenter Zustand. Diese Explizitheit hat einen Preis (mehr Boilerplate als CrewAI oder AutoGen), zahlt sich aber in der Produktion aus: Sie können jeden Knoten isoliert unit-testen, genau verfolgen, welchen Pfad eine Ausführung genommen hat, und einen Workflow von jedem Checkpoint aus wiedergeben.

LangGraph unterstützt sowohl **Single-Agent**-Muster (ein Graph mit wenigen Knoten, der Werkzeuge in einer Schleife aufruft) als auch **Multi-Agent**-Muster (mehrere Subgraphen zusammengesetzt, mit Graph-übergreifender Zustandsteilung). Es integriert sich nativ in LangChains Werkzeug-Ökosystem, Chat-Modelle und LangSmith für Beobachtbarkeit. Das Framework ist die Grundlage der empfohlenen Produktions-Agenten-Architektur von LangChain ab 2024-2025.

## Como funciona

### Knoten: Python-Funktionen als Ausführungseinheiten

Ein Knoten in LangGraph ist jedes Python-Callable, das den aktuellen Zustand akzeptiert und einen (teilweisen) aktualisierten Zustand zurückgibt. Knoten werden dem Graphen mit `graph.add_node("name", function)` hinzugefügt. Die Funktionssignatur ist immer `(state: State) -> dict` – sie liest, was sie braucht, aus dem Zustand, erledigt ihre Arbeit (LLM-Aufruf, Werkzeugausführung, Datentransformation) und gibt nur die Schlüssel zurück, die sie aktualisieren möchte. Das macht Knoten einfach unabhängig zu testen: Übergeben Sie einen Mock-Zustand, bestätigen Sie das zurückgegebene Dict. LangChains `ToolNode` ist ein vorgefertigter Knoten, der Werkzeugaufrufe aus einer LLM-Antwort ausführt und deckt das gängigste Agenten-Muster direkt ab.

### Kanten: Routing und bedingtes Branching

Kanten verbinden Knoten und bestimmen die Ausführungsreihenfolge. Eine einfache Kante (`graph.add_edge("a", "b")`) übergeht immer von Knoten `a` zu Knoten `b`. Eine bedingte Kante (`graph.add_conditional_edges`) ruft eine Routing-Funktion mit dem aktuellen Zustand auf und verwendet die zurückgegebene Zeichenfolge, um den nächsten Knoten zu bestimmen. Dies ist der Mechanismus für dynamischen Kontrollfluss: Nachdem ein LLM eine Antwort generiert hat, prüft ein Router, ob sie Werkzeugaufrufe enthält (Route zu `tools`) oder eine Endantwort (Route zu `END`). Bedingte Kanten machen LangGraph deutlich mächtiger als eine sequentielle Pipeline – Sie können komplexe Entscheidungsbäume, Wiederholungslogik und Eskalationspfade als lesbare Graphstruktur ausdrücken.

### Zustand: geteiltes TypedDict über alle Knoten

Zustand ist das Rückgrat einer LangGraph-Anwendung. Sie definieren ein `TypedDict` (oder ein Pydantic-Modell) mit allen Feldern, die Ihr Workflow benötigt: Nachrichten, Zwischenergebnisse, Flags, Zähler. Jeder Knoten erhält den vollständigen Zustand und gibt nur die Felder zurück, die er ändert. LangGraph fügt partielle Updates mit dem aktuellen Zustand mithilfe von **Reducern** zusammen – standardmäßig überschreiben Zuweisungen; mit dem `add_messages`-Reducer wird die Nachrichtenliste angefügt statt ersetzt. Explizite Zustandstypisierung bedeutet, dass Typprüfer Fehler vor der Laufzeit erkennen können, und der Zustands-Snapshot bei jedem Checkpoint ist ein vollständiges, inspizierbares Protokoll dessen, was passiert ist.

### Zyklen, Persistenz und Human-in-the-Loop

LangGraph verarbeitet Zyklen nativ: Ein Knoten kann basierend auf einer Bedingung zu einem vorherigen Knoten (oder sich selbst) zurückkanten und ermöglicht so Agenten-Wiederholungsschleifen, Selbstkorrekturmuster und mehrstufige Werkzeug-Nutzung ohne spezielle Behandlung. Persistenz wird von **Checkpointern** (SQLite, Postgres, Redis oder In-Memory) bereitgestellt: Der Graph speichert den vollständigen Zustand nach jeder Knotenausführung, sodass Sie von jedem Punkt aus nach einem Absturz oder einer Unterbrechung fortsetzen können. Human-in-the-Loop wird über `interrupt_before` und `interrupt_after` implementiert – der Graph pausiert beim angegebenen Knoten, zeigt dem Aufrufer den aktuellen Zustand, akzeptiert menschliche Eingaben und setzt fort. Dies macht LangGraph zur stärksten Wahl, wenn Sie auditierbare, unterbrechbare, produktionsreife Agenten-Pipelines benötigen.

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

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|---|---|
| Feingranulare Kontrolle über jeden Schritt der Agenten-Ausführung benötigt wird | Eine deklarative, hochrangige API gewünscht wird und keine Schritt-Level-Kontrolle benötigt wird |
| Persistenz und die Möglichkeit, Workflows mitten in der Ausführung fortzusetzen, erforderlich sind | Der Workflow einfach und linear ist — eine Kette oder Single-Agent-Schleife ausreicht |
| Human-in-the-Loop-Genehmigungen bei bestimmten Schritten erforderlich sind | Das Team nicht mit Graph-Theorie vertraut ist und ein einfacheres Denkmodell bevorzugt |
| Produktionssysteme gebaut werden, die vollständige Beobachtbarkeit und Replay benötigen | Agenten Forschungsprototypen sind, die keine produktionsreife Zuverlässigkeit benötigen |
| Der Workflow komplexes bedingtes Branching oder Zyklen hat, die sich linear schwer ausdrücken lassen | Multi-Agent-Rollenkoordination der primäre Bedarf ist — CrewAI oder AutoGen sind einfacher |

## Comparações

| Kriterium | LangGraph | CrewAI | AutoGen |
|---|---|---|---|
| **Abstraktionsebene** | Niedrig: expliziter Graph, Knoten, Kanten und Zustand | Hoch: deklarative Rollen, Ziele, Aufgaben | Mittel: konversationale Agenten mit Nachrichtenverlauf |
| **Kontrollfluss** | Explizite bedingte Kanten und Zyklen | Sequentieller oder hierarchischer Prozess (undurchsichtig) | Nachrichtengesteuert, rundenbasiert (undurchsichtig) |
| **Persistenz** | Erstklassig: Checkpointer für SQLite, Postgres, Redis | Nicht eingebaut | Nicht eingebaut |
| **Human-in-the-Loop** | Erstklassig: `interrupt_before` / `interrupt_after` | Nur manuell | Erstklassig: `human_input_mode` pro Agent |
| **Testbarkeit** | Hoch: Knoten sind reine Funktionen, einfach unit-zu-testen | Mittel: Aufgaben können getestet werden, aber Crew-Ausführung ist undurchsichtig | Niedrig: Konversationsflows sind schwer deterministisch unit-zu-testen |

## Exemplos de código

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

## Recursos práticos

- [LangGraph official documentation](https://langchain-ai.github.io/langgraph/) — Vollständige Referenz für Graph-Konstruktion, Zustandsverwaltung, Checkpointer und Human-in-the-Loop-Muster.
- [LangGraph GitHub repository](https://github.com/langchain-ai/langgraph) — Quellcode, Issue-Tracker und Beispiel-Notebooks, die gängige Muster abdecken.
- [LangGraph "How-to" guides](https://langchain-ai.github.io/langgraph/how-tos/) — Praktische Rezepte für Persistenz, Streaming, Subgraphen, Multi-Agent-Koordination und mehr.
- [LangSmith tracing for LangGraph](https://docs.smith.langchain.com/) — Beobachtbarkeitsplattform zum Tracing von LangGraph-Ausführungen, Inspektion des Zustands bei jedem Knoten und Debugging von Fehlern.

## Veja também

- [Agent frameworks overview](/docs/agents/frameworks-overview)
- [CrewAI](/docs/agents/crewai)
- [AutoGen](/docs/agents/autogen)
- [LangChain](/docs/tools/langchain)
- [Multi-agent systems](/docs/agents/multi-agent-systems)
- [ReAct](/docs/reasoning-patterns/react)
