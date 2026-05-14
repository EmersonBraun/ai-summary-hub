---
title: Prompting de paso atrás
description: Una técnica de prompting en dos pasos que primero le pregunta al modelo una pregunta abstracta de nivel superior, luego usa esa abstracción como contexto para responder la pregunta específica original — mejorando la precisión del razonamiento en tareas complejas.
keywords: [step-back prompting, abstraction, reasoning, chain-of-thought, prompt engineering, Zheng et al, higher-level reasoning, LLM reasoning]
tags: [intermediate]
authors: [EmersonBraun]
---

# Prompting de paso atrás

## Definición

El prompting de paso atrás es una técnica de prompting en dos pasos introducida por Zheng et al. (2023) en Google DeepMind. La idea central es engañosamente simple: antes de pedirle al modelo que responda una pregunta específica y potencialmente difícil, primero hazle una versión más abstracta y de nivel superior de la misma pregunta —y luego usa la respuesta del modelo a esa pregunta abstracta como contexto al responder la original. La técnica se fundamenta en la observación de que los LLM a menudo fallan en preguntas específicas de hechos o razonamiento no porque les falte el conocimiento relevante, sino porque la especificidad de la pregunta activa el "contexto de recuperación" incorrecto en las representaciones internas del modelo. Retroceder a un nivel superior de abstracción activa un conocimiento más amplio y fiable, que luego fundamenta la respuesta final.

La idea detrás del prompting de paso atrás se inspira en cómo los expertos abordan los problemas difíciles. Un físico al que se le pregunta "¿Qué le pasa a la presión en un gas si aumenta la temperatura a volumen constante?" podría primero recordar la ley del gas ideal (PV = nRT) como trasfondo general antes de aplicarla al caso específico —en lugar de saltar directamente a una respuesta que arriesga mezclar variables. El prompting de paso atrás instruye al modelo a hacer lo mismo: generar un principio o concepto general que subyace a la pregunta específica, luego razonar desde ese principio hasta la respuesta. Esto añade efectivamente un paso de andamiaje conceptual que reduce la posibilidad de que la coincidencia de patrones superficial lleve a una respuesta incorrecta.

En el artículo original, el prompting de paso atrás se demuestra con ejemplos de pocos disparos que enseñan al modelo cómo "dar un paso atrás" apropiadamente para un dominio dado. Para preguntas de física, la pregunta abstracta generalmente pregunta sobre la ley o principio físico relevante. Para preguntas de historia, pregunta sobre el contexto histórico más amplio. Para preguntas médicas, pregunta sobre la fisiología relevante. La técnica es agnóstica al modelo y no requiere ajuste fino —es puramente una intervención a nivel de prompt. En los benchmarks MMLU y TimeQA, el prompting de paso atrás supera tanto a la cadena de pensamiento estándar como a las líneas base de recuperación aumentada en preguntas difíciles e intensivas en conocimiento.

## Cómo funciona

```mermaid
flowchart TD
  Original[Original specific question] -->|"step-back prompt"| Abstract[Abstract / higher-level question]
  Abstract -->|"answer abstract question"| Principle[General principle\nor concept]
  Original -->|"combine with principle"| Grounded[Grounded prompt:\nprinciple + original question]
  Principle -->|"provides context"| Grounded
  Grounded -->|"reason to answer"| Final[Final answer]
```

### Paso 1 — Generación de la pregunta abstracta

El primer paso es hacer un prompt al modelo para que identifique una pregunta de nivel superior que subsuma la original. Esto típicamente se hace con un prompt de pocos disparos que contiene ejemplos específicos del dominio de pares (pregunta específica, pregunta abstracta). Por ejemplo, si la pregunta original es "¿Cuál es el punto de fusión del arseniuro de galio?", la pregunta abstracta podría ser "¿Cuáles son las propiedades termodinámicas y cristalográficas de los semiconductores III-V?" La pregunta abstracta debe ser lo suficientemente general para activar un amplio conocimiento relevante, pero no tan general como para ser poco informativa. Obtener el nivel correcto de abstracción es el principal desafío de ingeniería de prompts, y los ejemplos de pocos disparos son esenciales para guiar al modelo al nivel de abstracción apropiado para un dominio dado.

### Paso 2 — Responder la pregunta abstracta

Con la pregunta abstracta generada, el modelo la responde. Esta respuesta típicamente toma la forma de un principio general, una definición, una ley física o un resumen del contexto de trasfondo relevante. La propiedad clave de este paso es que la pregunta abstracta generalmente es más fácil de responder de forma fiable para el modelo que la pregunta específica original —activa representaciones bien aprendidas y fundamentadas factualmente en lugar de casos extremos o hechos numéricos específicos que son más propensos a la alucinación. La respuesta a la pregunta abstracta se convierte en un bloque de contexto que restringe e informa el paso de razonamiento final.

### Paso 3 — Responder la pregunta original usando la abstracción como contexto

El paso final combina el principio abstracto con la pregunta específica original en un solo prompt: "Dado este trasfondo: [respuesta abstracta], responde la pregunta específica: [pregunta original]." El modelo ahora razona desde una base conceptual sólida en lugar de intentar la recuperación directa de un hecho específico. Esto reduce el riesgo de alucinación en preguntas intensivas en hechos y mejora la consistencia lógica del razonamiento de múltiples pasos. En el artículo original, este paso final también usa cadena de pensamiento, haciendo que el prompting de paso atrás sea componible con CoT: el paso de abstracción fundamenta el razonamiento, y CoT lo hace explícito.

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|-------------|---------------|
| La pregunta requiere conocimiento factual específico donde el modelo es propenso a la alucinación | Preguntas simples donde el prompting directo ya funciona de forma fiable |
| El dominio tiene una jerarquía clara de principios generales a instancias específicas (física, química, historia) | La pregunta abstracta es difícil de definir — tareas sin una distinción natural general/específico |
| El modelo responde preguntas específicas de forma inconsistente pero es fiable en principios generales | La latencia es crítica — dos llamadas al LLM duplican el tiempo de respuesta |
| Quieres reducir la alucinación en benchmarks intensivos en conocimiento sin RAG | La pregunta es puramente matemática o simbólica — CoT solo generalmente es suficiente |
| Hay ejemplos de pocos disparos disponibles para el dominio para enseñar al modelo cómo dar un paso atrás | El presupuesto de tokens es ajustado — la respuesta abstracta añade tokens al prompt final |

## Comparaciones

| Criterio | Prompting de paso atrás | Cadena de pensamiento (CoT) | Autoconsistencia |
|----------|------------------------|-----------------------------|-----------------|
| Número de llamadas al LLM | 2 (abstracta + final) | 1 | N (típicamente 10–40) |
| Mecanismo central | Abstracción a fundamentación a razonamiento | Razonamiento explícito paso a paso | Múltiples caminos independientes + voto mayoritario |
| Beneficio principal | Reduce la alucinación en preguntas intensivas en conocimiento | Mejora el razonamiento lógico de múltiples pasos | Reduce la varianza en los resultados de razonamiento |
| Costo | 2x línea base | 1x línea base | Nx línea base |
| Requiere ejemplos de pocos disparos | Sí — para enseñar el comportamiento de paso atrás | Sí — para mejores resultados | Sí — CoT de pocos disparos como prompt base |
| Mejor tipo de tarea | QA intensiva en conocimiento, ciencia, historia | Matemáticas, lógica, código | Matemáticas, razonamiento simbólico, QA factual |
| Componible con CoT | Sí — recomendado combinar ambos | N/A | Sí — el prompt base usa CoT |
| Nota | Complementario a la autoconsistencia; ambos pueden apilarse para ganancias adicionales | Línea base más simple — probar antes del paso atrás | Más costoso; usar cuando la alta precisión justifica el costo Nx |

## Ejemplos de código

### Prompting de paso atrás con OpenAI — implementación de dos llamadas

```python
# Step-back prompting: abstraction-then-answer, two API calls
# pip install openai

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

STEP_BACK_FEW_SHOT = """Help identify a broader abstract question underpinning a specific one.

Original: At what temperature does gallium arsenide melt?
Step-back: What are the thermodynamic properties of III-V semiconductors?

Original: What was the immediate cause of the US entering World War I?
Step-back: What geopolitical tensions shaped US foreign policy before WWI?

Original: Patient has peripheral edema, elevated JVP, orthopnea. Diagnosis?
Step-back: What are the hallmark signs of right-sided and left-sided heart failure?

Original: {question}
Step-back:"""

GROUNDED = """Using the background context below, answer the specific question step by step.

Background (general principles):
{background}

Specific question:
{question}

Let's think step by step:"""


def generate_step_back(question: str) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": STEP_BACK_FEW_SHOT.format(question=question)}],
        temperature=0, max_tokens=150,
    )
    return resp.choices[0].message.content.strip()


def answer_abstract(abstract_q: str) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Answer with accurate background principles (3-5 sentences)."},
            {"role": "user", "content": abstract_q},
        ],
        temperature=0, max_tokens=300,
    )
    return resp.choices[0].message.content.strip()


def answer_with_step_back(question: str) -> str:
    abstract_q = generate_step_back(question)
    background  = answer_abstract(abstract_q)
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": GROUNDED.format(
            background=background, question=question)}],
        temperature=0, max_tokens=500,
    )
    return resp.choices[0].message.content.strip()


if __name__ == "__main__":
    q = "Why did Soviet collectivization in the early 1930s lead to famine in Ukraine?"
    print(answer_with_step_back(q))
```

### Prompting de paso atrás con Anthropic — llamada única con salida estructurada

```python
# Step-back prompting in one Anthropic call: structured three-part format
# pip install anthropic

import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

SYSTEM = """You are an expert reasoning assistant. For each question, respond in three parts:

## Abstract question:
A broader, general question capturing the underlying principle.

## Background context:
Answer the abstract question with relevant principles and definitions (3-5 sentences).

## Final answer:
Use the background to reason step-by-step to the specific answer."""

EXAMPLE = [
    {"role": "user", "content": "Ideal gas: 2 mol, 300 K, 0.05 m^3. What is the pressure?"},
    {"role": "assistant", "content": """## Abstract question:
What is the ideal gas law and how does it relate P, V, n, and T?

## Background context:
PV = nRT, where P is pressure (Pa), V is volume (m^3), n is moles, R = 8.314 J/mol/K, T is Kelvin. Rearranged: P = nRT / V.

## Final answer:
P = (2 x 8.314 x 300) / 0.05 = 99,768 Pa (about 0.985 atm)."""},
]


def step_back(question: str) -> str:
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=800,
        system=SYSTEM,
        messages=EXAMPLE + [{"role": "user", "content": question}],
    )
    return response.content[0].text


if __name__ == "__main__":
    q = "A patient is given furosemide. How does it cause hypokalemia?"
    print(step_back(q))
```

## Recursos prácticos

- [Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models (Zheng et al., 2023)](https://arxiv.org/abs/2310.06117) — Artículo original de Google DeepMind con benchmarks en MMLU, TimeQA y MedQA.
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)](https://arxiv.org/abs/2201.11903) — El artículo de CoT sobre el que se construye y evalúa el prompting de paso atrás.
- [Anthropic — Visión general de ingeniería de prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Cubre la estructuración del prompt del sistema y el diseño de ejemplos de pocos disparos.
- [OpenAI — Guía de ingeniería de prompts](https://platform.openai.com/docs/guides/prompt-engineering) — Orientación práctica sobre prompting de pocos disparos, estrategias de razonamiento y estructura de salida.

## Ver también

- [Ingeniería de prompts](/docs/prompt-engineering)
- [Cadena de pensamiento (CoT)](/docs/reasoning-patterns/cot)
- [Autoconsistencia](/docs/prompt-engineering/self-consistency)
