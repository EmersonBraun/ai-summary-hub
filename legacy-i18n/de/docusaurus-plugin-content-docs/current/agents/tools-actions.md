---
title: "Agent tools and actions"
description: What tools and actions are in the agent context, their types, schemas, and how agents select which tool to use.
keywords: [agent tools, function calling, actions, tool use, web search, code execution, OpenAI tools, tool schema, API calls]
tags: [beginner]
authors: [EmersonBraun]
---

# Agenten-Werkzeuge und -Aktionen

## Definition

Werkzeuge und Aktionen sind die Hände eines KI-Agenten. Während das LLM Reasoning und Sprachverständnis bietet, geben Werkzeuge dem Agenten die Fähigkeit, auf die Welt einzuwirken: das Web durchsuchen, Code ausführen, eine Datenbank abfragen, Nachrichten senden oder eine externe API aufrufen. Ohne Werkzeuge ist ein Agent auf das beschränkt, was er aus seinen Trainingsdaten weiß; mit Werkzeugen kann er auf Echtzeit-Informationen zugreifen, Berechnungen durchführen und seiteneffektbehaftete Aktionen ausführen.

Im OpenAI- und Anthropic-Ökosystem wird der Mechanismus für die Werkzeug-Nutzung als **Function Calling** (OpenAI) oder **Tool Use** (Anthropic) bezeichnet. Der Entwickler definiert einen Satz von Werkzeug-Schemas – strukturierte JSON-Beschreibungen des Namens, Zwecks und der Parameter jedes Werkzeugs – und nimmt diese in die API-Anfrage auf. Wenn das LLM entscheidet, dass ein Werkzeug benötigt wird, gibt es ein strukturiertes Werkzeugaufruf-Objekt statt einfachen Texts zurück. Der aufrufende Code führt das Werkzeug aus und speist das Ergebnis zurück in das Gespräch ein. Diese Schleife wiederholt sich, bis der Agent eine Endantwort produziert.

Die Breite der verfügbaren Werkzeuge ist im Wesentlichen unbegrenzt: Wenn etwas als Python-Funktion ausgedrückt werden kann, kann es ein Werkzeug sein. Häufige Kategorien umfassen Websuche, Code-Ausführungs-Sandboxes, SQL- oder NoSQL-Datenbankabfragen, Dateisystemzugriff, REST-API-Aufrufe, E-Mail- und Messaging-Integrationen und Computer-Use-Werkzeuge, die mit GUIs interagieren. Das Entwerfen guter Werkzeuge – mit klaren Schemas, vorhersehbarem Verhalten und hilfreichen Fehlermeldungen – ist eines der wirkungsvollsten Dinge, die ein Entwickler tun kann, um die Agenten-Zuverlässigkeit zu verbessern.

## Funktionsweise

### Werkzeug-Schema-Definition

Jedes Werkzeug wird durch ein Schema beschrieben, das das LLM verwendet, um zu verstehen, wann und wie es aufgerufen werden soll. Ein Schema enthält: einen Namen (kurzer, snake_case-Identifier), eine Beschreibung (klare natürlichsprachliche Erklärung, was das Werkzeug tut und wann es verwendet werden soll) und ein Parameter-Objekt (JSON Schema, das jedes Argument beschreibt: Name, Typ, Beschreibung und ob es erforderlich ist). Die Qualität der Beschreibung beeinflusst direkt, wie zuverlässig der Agent das Werkzeug korrekt auswählt und aufruft. Vage Beschreibungen führen zu Missbrauch; präzise Beschreibungen mit Beispielen führen zu genauen Werkzeugaufrufen.

### Werkzeugauswahl

Wenn das LLM eine Benutzernachricht zusammen mit einem Satz von Werkzeug-Schemas erhält, entscheidet es bei jedem Schritt, ob es direkt antwortet oder ein Werkzeug aufruft. Diese Entscheidung wird implizit beim Fine-Tuning auf Function-Calling-Daten erlernt. In der Praxis wird die Werkzeugauswahl durch den System-Prompt beeinflusst (der den Agenten anweisen kann, wann bestimmte Werkzeuge bevorzugt werden sollen), die Spezifität der Werkzeugbeschreibungen und das Vertrauen des Modells, dass es aus Trainingsdaten direkt antworten kann. Die Angabe eines `tool_choice`-Parameters kann die Werkzeugauswahl programmatisch erzwingen oder einschränken.

### Werkzeugausführung und Ergebniseinspeisung

Wenn das LLM einen Werkzeugaufruf ausgibt, fängt der aufrufende Code ihn ab, validiert die Argumente gegen das Schema, führt die entsprechende Funktion aus und erhält ein Ergebnis. Dieses Ergebnis – ob eine Zeichenfolge, ein JSON-Objekt oder eine Fehlermeldung – wird als `tool`-Rollen-Nachricht formatiert und dem Konversationsverlauf hinzugefügt. Das LLM generiert dann den nächsten Schritt mit vollständiger Kenntnis der Ausgabe des Werkzeugs. Fehlermeldungen von fehlgeschlagenen Werkzeugaufrufen sind wichtig: Der Agent muss wissen, dass ein Werkzeug fehlgeschlagen ist, damit er es erneut versuchen, eine Alternative versuchen oder den Benutzer um Klärung bitten kann.

### Multi-Werkzeug und parallele Werkzeugaufrufe

Moderne LLM-APIs unterstützen parallele Werkzeugaufrufe: Das Modell kann mehrere Werkzeugaufrufungen in einer einzigen Antwort anfordern, wenn es feststellt, dass sie unabhängig sind. Zum Beispiel könnte ein Agent `web_search` für drei verschiedene Anfragen gleichzeitig aufrufen statt sequentiell und die Latenz um zwei Drittel reduzieren. Der aufrufende Code führt alle Werkzeuge parallel aus, sammelt die Ergebnisse und speist sie zusammen im nächsten Turn zurück. Das Entwerfen von Werkzeugen als zustandslos und idempotent, wo möglich, maximiert den Nutzen paralleler Ausführung.

```mermaid
flowchart LR
  User[User Message] -->|"message + tool schemas"| Agent[Agent / LLM\nReasoning]
  Agent -->|"selects tool"| ToolSelection[Tool Selection\nFunction Call Object]
  ToolSelection -->|"dispatch"| ToolExec[Tool Execution\nPython Function]
  ToolExec -->|"calls"| External[External Service\nAPI / DB / Web]
  External -->|"raw result"| ToolExec
  ToolExec -->|"formatted result"| Agent
  Agent -->|"continue reasoning or answer"| Agent
  Agent -->|"final answer"| User
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Der Agent Echtzeit- oder externe Informationen benötigt, die nicht in den Trainingsdaten sind | Die Aufgabe vollständig aus dem Wissen des Modells beantwortet werden kann |
| Aktionen mit Nebenwirkungen erforderlich sind (E-Mail senden, Datei schreiben, DB aktualisieren) | Werkzeuge Sicherheitsrisiken einführen ohne ordnungsgemäßes Sandboxing oder Rate-Limiting |
| Berechnungen jenseits der LLM-Fähigkeiten benötigt werden (Arithmetik, Code-Ausführung) | Jeder Werkzeugaufruf Latenz hinzufügt und die Aufgabe zeitkritisch ist |
| Strukturierter Datenabruf (SQL-Abfragen, API-Antworten) wesentlich ist | Das Werkzeug-Schema so komplex ist, dass das Modell es häufig falsch verwendet |
| Mehrere spezialisierte Werkzeuge kombiniert werden können, um komplexe Aufgaben zu lösen | Die Fehlermodi des Werkzeugs nicht wiederherstellbar sind und Schaden verursachen könnten |

## Vor- und Nachteile

| Vorteile | Nachteile |
|---|---|
| Erweitert den Agenten über statische Trainingsdaten hinaus | Jeder Werkzeugaufruf fügt Latenz und API-Kosten hinzu |
| Ermöglicht reale Nebenwirkungen und Automatisierung | Werkzeugmissbrauch kann irreversible Aktionen verursachen |
| Unterstützt strukturierte, validierte I/O über JSON Schema | Das Entwerfen klarer Schemas erfordert sorgfältiges Prompt Engineering |
| Parallele Werkzeugaufrufe reduzieren die Gesamtantwortzeit | Mehr Werkzeuge erhöhen die kognitive Last für das Modell bei der Auswahl |
| Vollständig erweiterbar — jede Python-Funktion kann ein Werkzeug werden | Fehlerbehandlung und Wiederholungen müssen explizit implementiert werden |

## Code-Beispiele

```python
"""
OpenAI function calling example with multiple tools:
- web_search: retrieve current information from the web
- safe_math: evaluate arithmetic using operator-based parsing (no eval)
- get_weather: fetch weather data for a city

The agent loop continues until the LLM produces a final text response
with no tool calls.
"""
from __future__ import annotations

import json
import math
import operator
import os
from typing import Any

from openai import OpenAI  # pip install openai

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "sk-placeholder"))
MODEL = "gpt-4o-mini"

# ---------------------------------------------------------------------------
# Tool implementations
# ---------------------------------------------------------------------------

def web_search(query: str, num_results: int = 3) -> str:
    """
    Mock web search. Replace with a real search API such as
    Tavily (https://tavily.com) or Serper (https://serper.dev).
    """
    return json.dumps({
        "query": query,
        "results": [
            {
                "title": f"Result {i + 1} for '{query}'",
                "snippet": f"Relevant information about {query}.",
            }
            for i in range(min(num_results, 10))
        ],
    })


def safe_math(operation: str, a: float, b: float) -> str:
    """
    Perform basic arithmetic safely using an explicit operator table.
    Supports: add, subtract, multiply, divide, power, sqrt (b unused), log.
    This avoids arbitrary code execution entirely.
    """
    ops: dict[str, Any] = {
        "add": operator.add,
        "subtract": operator.sub,
        "multiply": operator.mul,
        "divide": operator.truediv,
        "power": operator.pow,
        "sqrt": lambda x, _: math.sqrt(x),
        "log": lambda x, base: math.log(x, base) if base else math.log(x),
    }
    if operation not in ops:
        return f"Unknown operation '{operation}'. Supported: {', '.join(ops)}"
    try:
        result = ops[operation](a, b)
        return json.dumps({"operation": operation, "a": a, "b": b, "result": result})
    except (ValueError, ZeroDivisionError, OverflowError) as exc:
        return json.dumps({"error": str(exc)})


def get_weather(city: str, units: str = "celsius") -> str:
    """
    Mock weather API. Replace with OpenWeatherMap or similar.
    """
    mock_data = {
        "city": city,
        "temperature": 22,
        "units": units,
        "condition": "Partly cloudy",
        "humidity_percent": 65,
    }
    return json.dumps(mock_data)


# Map tool names to Python functions
TOOL_FUNCTIONS: dict[str, Any] = {
    "web_search": web_search,
    "safe_math": safe_math,
    "get_weather": get_weather,
}

# ---------------------------------------------------------------------------
# Tool schemas (sent to the LLM with every request)
# ---------------------------------------------------------------------------

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": (
                "Search the web for current information. Use this tool when the user asks "
                "about recent events, facts that may have changed, or anything that requires "
                "up-to-date information."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query to execute.",
                    },
                    "num_results": {
                        "type": "integer",
                        "description": "Number of results to return (default 3, max 10).",
                        "default": 3,
                    },
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "safe_math",
            "description": (
                "Perform a mathematical operation on two numbers. "
                "Supported operations: add, subtract, multiply, divide, power, sqrt, log. "
                "Use this instead of trying to compute arithmetic mentally."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "operation": {
                        "type": "string",
                        "enum": ["add", "subtract", "multiply", "divide", "power", "sqrt", "log"],
                        "description": "The arithmetic operation to perform.",
                    },
                    "a": {
                        "type": "number",
                        "description": "The first operand (or the only operand for sqrt).",
                    },
                    "b": {
                        "type": "number",
                        "description": "The second operand (base for log, ignored for sqrt).",
                    },
                },
                "required": ["operation", "a", "b"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": (
                "Get the current weather for a city. Use this tool when the user asks "
                "about weather conditions, temperature, or humidity in a specific location."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "The city name, e.g. 'Tokyo' or 'New York'.",
                    },
                    "units": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature units (default: celsius).",
                        "default": "celsius",
                    },
                },
                "required": ["city"],
            },
        },
    },
]

# ---------------------------------------------------------------------------
# Agent loop
# ---------------------------------------------------------------------------

def dispatch_tool_call(tool_call) -> str:
    """Execute a single tool call and return the result as a string."""
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    print(f"  [Tool call] {name}({args})")

    if name not in TOOL_FUNCTIONS:
        return f"Error: unknown tool '{name}'"

    result = TOOL_FUNCTIONS[name](**args)
    preview = result[:120] + ("..." if len(result) > 120 else "")
    print(f"  [Tool result] {preview}")
    return result


def run_agent(user_message: str, system_prompt: str = "You are a helpful assistant.") -> str:
    """
    Agent loop: send message, handle tool calls, repeat until a final answer is produced.
    """
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message},
    ]

    print(f"User: {user_message}\n")

    max_turns = 10  # Safety limit to prevent infinite loops
    for _ in range(max_turns):
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",  # Let the model decide; "none" disables tools
        )
        msg = response.choices[0].message

        # If no tool calls, we have the final answer
        if not msg.tool_calls:
            print(f"\nAssistant: {msg.content}")
            return msg.content

        # Append the assistant message with tool calls to history
        messages.append(msg)

        # Execute all tool calls (for parallel execution use asyncio + concurrent.futures)
        for tool_call in msg.tool_calls:
            result = dispatch_tool_call(tool_call)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result,
            })

    return "Max turns reached without a final answer."


if __name__ == "__main__":
    # Example 1: requires web search
    run_agent("What are the main differences between GPT-4 and Claude 3?")

    print("\n" + "=" * 60 + "\n")

    # Example 2: requires safe_math tool
    run_agent("What is 2 raised to the power of 16, and what is the square root of that?")

    print("\n" + "=" * 60 + "\n")

    # Example 3: requires weather tool
    run_agent("What's the weather like in London right now?")
```

## Praktische Ressourcen

- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling) — Offizielle Dokumentation zu Werkzeug-Schemas, parallelen Aufrufen und Best Practices für Funktionsdefinitionen.
- [Anthropic Tool Use Documentation](https://docs.anthropic.com/en/docs/tool-use) — Anthropics Leitfaden zur Werkzeug-Nutzung mit Claude, einschließlich Streaming, Computer Use und Multi-Werkzeug-Muster.
- [Tavily AI Search API](https://tavily.com/) — Zweckgebundene Such-API für LLM-Agenten, die saubere strukturierte Ergebnisse ideal für Werkzeug-Nutzung liefert.
- [LangChain Tools Concepts](https://python.langchain.com/docs/concepts/tools/) — Überblick über Werkzeug-Design-Muster in LangChain, einschließlich benutzerdefinierter Werkzeuge und eingebauter Integrationen.
- [Gorilla: Large Language Model Connected with Massive APIs (Patil et al., 2023)](https://arxiv.org/abs/2305.15334) — Forschung zum Fine-Tuning von LLMs für genaue API/Werkzeug-Auswahl über Tausende von Werkzeugen.

## Siehe auch

- [AI agents](/docs/agents)
- [Anthropic tool use](/docs/agents/anthropic-tool-use)
- [Agent frameworks overview](/docs/agents/frameworks-overview)
