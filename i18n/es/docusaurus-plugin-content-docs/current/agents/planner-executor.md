---
title: "Planner-Executor architecture"
description: Architecture where one LLM creates a step-by-step plan and another executes each step independently.
keywords: [planner executor, LLM planning, agent architecture, multi-agent, task decomposition, replanning]
tags: [intermediate]
authors: [EmersonBraun]
---

# Arquitectura Planner-Executor

## Definición

La arquitectura Planner-Executor separa la decisión sobre *qué hacer* de la *ejecución*. Un LLM **Planner** recibe un objetivo de alto nivel y produce un plan estructurado, paso a paso — una secuencia de subtareas que, juntas, logran el objetivo. Un LLM **Executor** (o un programa determinista) luego trabaja el plan paso a paso, llamando herramientas y produciendo resultados. Los dos componentes se comunican a través de un artefacto de plan compartido en lugar de un único prompt monolítico.

Esta separación de responsabilidades soluciona una limitación fundamental de los bucles ReAct de agente único: cuando una tarea es compleja, pensar simultáneamente en estrategia, selección de la próxima acción y manejo de detalles de herramientas de bajo nivel conduce a errores y alucinaciones. Al delegar la descomposición de alto nivel al Planner y la ejecución de bajo nivel al Executor, cada componente puede ser optimizado, con prompts personalizados y monitoreado de forma independiente. El Planner puede usar un modelo más capaz; el Executor puede usar un modelo más rápido y económico o incluso un programa que no sea LLM.

El refinamiento del plan y el replanning son extensiones críticas de la arquitectura básica. Las tareas del mundo real rara vez transcurren como se espera: una llamada a una herramienta puede fallar, una página web puede devolver datos inesperados, o un resultado intermedio puede mostrar que el plan original era incorrecto. Un sistema Planner-Executor robusto monitorea los resultados de ejecución y vuelve a invocar al Planner cuando se necesita replanning. Este bucle de retroalimentación transforma un pipeline frágil en un agente adaptativo.

## Cómo funciona

### Planner

El Planner recibe el objetivo del usuario junto con las herramientas disponibles y el contexto relevante. Genera un plan estructurado — típicamente una lista JSON de objetos de paso, cada uno describiendo una subtarea, la entrada/salida esperada y opcionalmente qué herramienta usar. Un buen prompt de planificación incluye los esquemas de herramientas para que el Planner pueda referenciarlos con precisión. El Planner no llama herramientas por sí mismo; solo razona sobre la secuencia de operaciones necesarias. La temperatura generalmente debe ser baja para producir planes deterministas y bien estructurados.

### Artefacto de plan

El plan es el contrato entre el Planner y el Executor. Es un documento legible por máquina (JSON o texto estructurado) que codifica la secuencia de pasos, sus dependencias y sus resultados esperados. Almacenar el plan como un artefacto explícito — en lugar de mantenerlo implícitamente en la cadena de pensamiento del modelo — hace que el sistema sea auditable, pausable y reanudable. Aquí se puede insertar un paso de aprobación human-in-the-loop, permitiendo a los usuarios revisar y editar el plan antes de que comience la ejecución.

### Executor

El Executor lee el plan paso a paso, resuelve cualquier referencia de entrada a salidas de pasos anteriores, llama a las herramientas apropiadas y registra el resultado. El Executor puede ser un segundo LLM (útil cuando los pasos requieren razonamiento en lenguaje natural), un script determinista (útil para pasos estructurados como llamadas a API) o un híbrido. Después de cada paso, el resultado se escribe de vuelta en el artefacto del plan para que los pasos posteriores puedan referenciarlo. Si un paso falla, el Executor lo marca y opcionalmente desencadena el replanning.

### Bucle de replanning

Cuando la ejecución se desvía del plan — debido a fallos de herramientas, salidas inesperadas o condiciones cambiantes — el control regresa al Planner con el registro de ejecución parcial. El Planner revisa los pasos restantes a la luz de la nueva información. El replanning puede activarse automáticamente (por ejemplo, en cada fallo de paso) o después de cada paso para máxima adaptabilidad. Limitar las iteraciones de replanning previene los bucles infinitos.

```mermaid
flowchart LR
  Goal[User Goal] -->|"goal + context"| Planner[Planner LLM]
  Planner -->|"structured plan"| Plan[(Plan Artifact)]
  Plan -->|"step N"| Executor[Executor LLM / Script]
  Executor -->|"tool call"| Tools[Tools & APIs]
  Tools -->|"result"| Executor
  Executor -->|"step result"| Plan
  Plan -->|"all steps done"| Output[Final Output]
  Executor -->|"step failed or replanning needed"| Planner
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|---|---|
| La tarea requiere múltiples pasos secuenciales que son difíciles de enumerar de antemano | La tarea es lo suficientemente simple para una sola llamada LLM o un bucle ReAct |
| Se desea revisión o aprobación humana antes de la ejecución | La latencia es crítica y la llamada adicional al Planner no es aceptable |
| Los pasos de ejecución tienen dependencias claras y pueden validarse individualmente | La estructura del plan sería trivial y añadiría complejidad innecesaria |
| Se necesita auditar lo que hizo el agente y por qué se tomó cada paso | La tarea es exploratoria y no puede planificarse de antemano en absoluto |
| El replanning ante fallos es importante para la fiabilidad | Las APIs de herramientas son tan poco fiables que ningún plan sobrevive el primer contacto |

## Comparaciones

| Criterio | Planner-Executor | Agente ReAct único | Agentes basados en DAG |
|---|---|---|---|
| Separación de responsabilidades | Alta — planificación y ejecución están separadas | Ninguna — un agente hace ambas | Alta — cada nodo es una unidad separada |
| Adaptabilidad / Replanning | Media — el replanning añade un viaje de ida y vuelta | Alta — el agente se adapta en cada paso | Baja — la estructura del DAG es típicamente fija |
| Trazabilidad | Alta — el artefacto del plan es explícito | Baja — el razonamiento está solo en el contexto | Alta — la estructura del grafo es explícita |
| Paralelismo | Ninguno por defecto | Ninguno | Nativo — las ramas independientes se ejecutan en paralelo |
| Complejidad de implementación | Media | Baja | Alta |
| Mejor para | Tareas de múltiples pasos con dependencias secuenciales | Tareas exploratorias y dinámicas | Tareas con subtareas paralelizables conocidas |

## Ejemplos de código

```python
"""
Planner-Executor implementation using the OpenAI API.

The Planner produces a JSON plan; the Executor steps through it,
calling mock tools and writing results back. Replanning is triggered
on step failure.
"""
from __future__ import annotations

import json
import os
from typing import Any

from openai import OpenAI  # pip install openai

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "sk-placeholder"))

# ---------------------------------------------------------------------------
# Mock tools
# ---------------------------------------------------------------------------

def web_search(query: str) -> str:
    """Mock web search tool."""
    return f"[Search result for '{query}': Found 5 relevant pages about {query}.]"

def summarize_text(text: str) -> str:
    """Mock summarizer tool."""
    return f"[Summary of: {text[:40]}...]"

def write_report(sections: list[str]) -> str:
    """Mock report writer tool."""
    return f"[Report written with {len(sections)} sections.]"

TOOLS: dict[str, Any] = {
    "web_search": web_search,
    "summarize_text": summarize_text,
    "write_report": write_report,
}

# ---------------------------------------------------------------------------
# Planner
# ---------------------------------------------------------------------------

PLANNER_SYSTEM = """
You are a planning assistant. Given a goal and available tools, produce a JSON plan.
The plan is a list of steps. Each step has:
  - "id": int (1-indexed)
  - "description": str (what this step does)
  - "tool": str (tool name from the available list, or "none")
  - "input": str (what to pass to the tool, may reference prior steps as {step_N_result})
  - "depends_on": list[int] (ids of steps that must complete first)

Return ONLY valid JSON — no markdown, no prose.
Available tools: web_search, summarize_text, write_report
"""

def create_plan(goal: str, context: str = "") -> list[dict]:
    """Call the Planner LLM to create a structured plan for the given goal."""
    user_msg = f"Goal: {goal}\n\nAdditional context: {context}" if context else f"Goal: {goal}"
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": PLANNER_SYSTEM},
            {"role": "user", "content": user_msg},
        ],
    )
    raw = response.choices[0].message.content
    parsed = json.loads(raw)
    # Handle both {"steps": [...]} and bare [...]
    return parsed.get("steps", parsed) if isinstance(parsed, dict) else parsed


# ---------------------------------------------------------------------------
# Executor
# ---------------------------------------------------------------------------

def resolve_input(template: str, results: dict[int, str]) -> str:
    """Replace {step_N_result} placeholders with actual results."""
    for step_id, result in results.items():
        template = template.replace(f"{{step_{step_id}_result}}", result)
    return template

def execute_plan(plan: list[dict]) -> dict[int, str]:
    """
    Execute each step sequentially, respecting dependencies.
    Returns a mapping of step_id -> result string.
    """
    results: dict[int, str] = {}

    for step in plan:
        step_id = step["id"]
        tool_name = step.get("tool", "none")
        raw_input = step.get("input", "")
        resolved_input = resolve_input(raw_input, results)

        print(f"  Step {step_id}: {step['description']}")

        if tool_name != "none" and tool_name in TOOLS:
            try:
                result = TOOLS[tool_name](resolved_input)
            except Exception as exc:
                # Signal failure for potential replanning
                result = f"ERROR: {exc}"
                print(f"    [FAILED] {result}")
        else:
            result = f"[No tool — step noted: {resolved_input}]"

        results[step_id] = result
        print(f"    Result: {result}\n")

    return results


# ---------------------------------------------------------------------------
# Planner-Executor orchestration with simple replanning
# ---------------------------------------------------------------------------

def run_planner_executor(goal: str, max_replan_attempts: int = 2) -> str:
    """
    Full Planner-Executor loop with replanning on failure.
    Returns the result of the last step as the final output.
    """
    attempt = 0
    context = ""

    while attempt <= max_replan_attempts:
        print(f"\n--- Planning (attempt {attempt + 1}) ---")
        plan = create_plan(goal, context=context)
        print(f"Plan has {len(plan)} steps.")

        print("\n--- Executing ---")
        results = execute_plan(plan)

        # Check for failures
        failures = {sid: r for sid, r in results.items() if r.startswith("ERROR")}
        if not failures:
            # Return the result of the last step
            last_id = max(results.keys())
            return results[last_id]

        # Build replanning context
        context = (
            f"Previous plan failed at steps: {list(failures.keys())}. "
            f"Errors: {failures}. Please revise the plan to avoid these failures."
        )
        attempt += 1

    return "Max replanning attempts reached. Could not complete goal."


if __name__ == "__main__":
    goal = "Research the latest trends in renewable energy and write a brief report."
    final = run_planner_executor(goal)
    print(f"\nFinal output:\n{final}")
```

## Recursos prácticos

- [Plan-and-Solve Prompting (Wang et al., 2023)](https://arxiv.org/abs/2305.04091) — Artículo que muestra que separar planificación y resolución mejora la precisión del razonamiento en comparación con la cadena de pensamiento estándar.
- [LangGraph — Plan-and-Execute Agent](https://langchain-ai.github.io/langgraph/tutorials/plan-and-execute/plan-and-execute/) — Tutorial oficial de LangGraph que implementa un bucle Planner-Executor con replanning.
- [LLM Compiler (Kim et al., 2023)](https://arxiv.org/abs/2312.04511) — Extiende Planner-Executor con ejecución paralela de pasos de plan independientes.
- [Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) — Guía práctica sobre arquitecturas de agentes incluyendo el patrón orquestador-subagente.

## Ver también

- [AI agents](/docs/agents)
- [DAG-based agents](/docs/agents/dag-agents)
- [Chain-of-thought reasoning](/docs/reasoning-patterns/cot)
