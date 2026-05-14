---
title: Técnicas de eliminación de sesgos
description: Las técnicas de eliminación de sesgos son estrategias a nivel de prompt y de evaluación para identificar y reducir el sesgo sistemático en los resultados de los LLM — cubriendo sesgos sociales, servilismo, efectos posicionales y distorsiones de evaluación — para producir respuestas más justas y fiables.
keywords: [debiasing, LLM bias, prompt engineering, fairness, sycophancy, positional bias, social bias, calibration, bias benchmarks, AI ethics, stereotype, counterfactual prompting]
tags: [advanced]
authors: [EmersonBraun]
---

# Técnicas de eliminación de sesgos

## Definición

El sesgo en los resultados de los LLM es cualquier tendencia sistemática a producir respuestas que están sesgadas, son injustas o están distorsionadas de maneras que no reflejan un razonamiento neutral, preciso o equitativo. Es una propiedad de los resultados, no solo de los datos de entrenamiento: incluso un modelo entrenado con datos equilibrados puede exhibir sesgo debido a sus mecanismos de atención, el modelado de recompensas RLHF, o las regularidades estadísticas en cómo el lenguaje codifica las relaciones sociales. Para los profesionales que construyen sistemas de producción, el sesgo es tanto una preocupación ética —los resultados pueden reforzar estereotipos, excluir grupos o producir decisiones injustas— como una preocupación de fiabilidad —un modelo sesgado da respuestas inconsistentes dependiendo de características superficiales irrelevantes de la entrada.

Existen varias categorías distintas de sesgo que requieren diferentes estrategias de mitigación. El **sesgo social y demográfico** es la tendencia a asociar grupos (definidos por género, raza, nacionalidad, religión, edad, etc.) con atributos, competencias o roles particulares. El **servilismo** es la tendencia a estar de acuerdo con la posición declarada o implícita del usuario independientemente de la corrección, un sesgo introducido por el entrenamiento RLHF donde los evaluadores humanos preferían las respuestas complacientes. El **sesgo posicional** afecta a los LLM utilizados como jueces: tienden a valorar más favorablemente la primera o última opción que las opciones en el medio, independientemente de la calidad del contenido. El **sesgo de verbosidad** hace que los jueces LLM prefieran respuestas más largas y elaboradas sobre respuestas más cortas y correctas. El **sesgo de confirmación en la generación** ocurre cuando el modelo genera razonamiento que apoya una conclusión a la que llegó primero, descartando evidencia contraria. Comprender qué sesgo está presente en su caso de uso específico determina qué técnica de eliminación de sesgo es más aplicable.

La eliminación de sesgo a nivel de prompt es una de varias intervenciones disponibles. Las alternativas incluyen alineación post-entrenamiento (RLHF, IA constitucional), equilibrio de datos, ingeniería de representaciones y filtrado de salida. Las técnicas a nivel de prompt son valiosas porque no requieren reentrenamiento del modelo, son transparentes y auditables, y pueden aplicarse selectivamente a tareas o poblaciones de usuarios específicas. Sin embargo, no son un sustituto del trabajo de alineación —un modelo fuertemente sesgado puede resistir la eliminación de sesgo a nivel de prompt en ciertos temas, y las instrucciones del prompt pueden ser socavadas por entradas adversariales. El objetivo realista de la eliminación de sesgo a nivel de prompt es reducir los sesgos más comunes y sistemáticos a un nivel aceptable para la aplicación objetivo, no eliminar el sesgo por completo.

## Cómo funciona

```mermaid
flowchart TD
    Input["User input\n(query / task)"] -->|"analyze for bias triggers"| BiasCheck{"Bias risk\nassessment"}
    BiasCheck -->|"social/demographic context"| CounterFact["Counterfactual\nbalancing"]
    BiasCheck -->|"evaluation / judging task"| PosDebias["Positional & verbosity\ndebiasing"]
    BiasCheck -->|"opinion / advice request"| SycophDebias["Sycophancy\nmitigation"]
    BiasCheck -->|"all tasks"| NeutralInstruct["Neutral instruction\ninjection"]
    CounterFact -->|"multiple perspectives generated"| Aggregator["Response\naggregation"]
    PosDebias -->|"randomized ordering + calibration"| Aggregator
    SycophDebias -->|"steelman + evidence-first"| Aggregator
    NeutralInstruct -->|"constrained generation"| Aggregator
    Aggregator -->|"bias-reduced output"| EvalLoop{"Bias\nevaluation"}
    EvalLoop -->|"passes threshold"| Output["Final response"]
    EvalLoop -->|"bias detected"| Input
```

### Tipos de sesgo

Comprender el tipo específico de sesgo presente en su sistema es el primer paso esencial. Aplicar la técnica de eliminación de sesgo incorrecta desperdicia esfuerzo y puede introducir nuevos problemas.

El **sesgo social y demográfico** se manifiesta cuando la respuesta del modelo cambia según las características demográficas del sujeto o del usuario, incluso cuando esas características son irrelevantes para la tarea. Ejemplos clásicos: describir a un médico como masculino por defecto, asociar ciertas nacionalidades con comportamientos particulares, o evaluar el mismo currículum de manera diferente dependiendo del nombre del solicitante.

El **servilismo** es particularmente insidioso porque parece útil. El modelo afirma la creencia incorrecta del usuario, ajusta su confianza declarada para que coincida con la confianza aparente del usuario, o revierte su posición cuando el usuario contraargumenta —incluso sin nueva evidencia. Esto fue identificado como un modo de falla clave de los modelos entrenados con RLHF (Perez et al., 2022; Sharma et al., 2023).

Los **sesgos posicionales y de verbosidad** afectan predominantemente a las aplicaciones donde un LLM se utiliza como evaluador o clasificador. Cuando se le pide elegir entre la Opción A y la Opción B, los modelos sistemáticamente prefieren la que aparece primero (o en algunos contextos, la última). Cuando se les pide calificar respuestas, los modelos favorecen las respuestas más largas incluso cuando una respuesta más corta es más precisa.

El **sesgo de encuadre** ocurre cuando preguntas lógicamente equivalentes generan respuestas diferentes basadas en la formulación. "¿Es seguro este medicamento?" y "¿Tiene riesgos este medicamento?" son semánticamente equivalentes pero pueden producir respuestas con tendencias opuestas.

### Estrategias de eliminación de sesgo a nivel de prompt

**Inyección de instrucciones neutrales**: Instruir explícitamente al modelo para que ignore los atributos demográficos irrelevantes y evalúe solo los criterios relevantes para la tarea. Agregar instrucciones como: "Tu evaluación no debe verse influenciada por el género, la nacionalidad, la edad o el nombre de ninguna persona mencionada. Enfócate solo en [criterios específicos de la tarea]."

**Prompting contrafactual**: Generar múltiples versiones del prompt con atributos demográficos clave intercambiados (masculino/femenino, Grupo A/Grupo B), ejecutar cada uno a través del modelo y comparar los resultados. Si los resultados difieren significativamente en atributos que deberían ser irrelevantes, el modelo está exhibiendo sesgo demográfico. Esta técnica es principalmente diagnóstica, pero también puede usarse como restricción de consistencia: incluir ambas versiones en el mismo prompt y pedir al modelo que produzca una respuesta consistente entre ambos encuadres.

**Prompting de refuerzo del argumento contrario y evidencia primero**: Para contrarrestar el servilismo, instruir al modelo para que articule la versión más sólida de la posición opuesta antes de dar su evaluación. Alternativamente, usar una estructura de evidencia primero: "Enumera la evidencia a favor y en contra de [afirmación], luego proporciona tu evaluación." Esto obliga al modelo a procesar evidencia contraria antes de llegar a una conclusión.

**Ordenación aleatoria para tareas de evaluación**: Cuando se usa un LLM para comparar o clasificar múltiples opciones, aleatorizar el orden en múltiples llamadas y agregar las puntuaciones. La clasificación por consenso es más fiable que cualquier ordenación única. Alternativamente, pedir al modelo que puntúe cada opción de forma independiente y absoluta (p. ej., puntuaciones de 1 a 10) antes de hacer cualquier comparación.

**Instrucciones de calibración explícitas**: Para tareas de evaluación, agregar instrucciones que contrarresten directamente los sesgos conocidos: "No dejes que la longitud de la respuesta influya en tu calificación. Una respuesta concisa y precisa debe recibir la misma puntuación que una respuesta verbosa y precisa. Califica basándote solo en la corrección y la utilidad."

### Evaluación y medición

El sesgo no puede gestionarse sin medirse. Enfoques clave de evaluación para el trabajo de eliminación de sesgo a nivel de prompt:

- **Consistencia contrafactual**: Ejecutar la misma consulta con atributos demográficos variados; medir la varianza en los resultados. Menor varianza = menos sesgo demográfico.
- **Benchmarks de sesgo**: BBQ (Bias Benchmark for QA), WinoBias, StereoSet y HolisticBias proporcionan conjuntos de datos estructurados para medir el sesgo social en muchos ejes demográficos.
- **Pruebas de servilismo**: Presentar al modelo afirmaciones factualmente incorrectas enmarcadas como creencias del usuario y medir con qué frecuencia está de acuerdo vs. corrige. El benchmark SimpleQA incluye pruebas de servilismo adversarial.
- **Pruebas de sesgo posicional**: Ejecutar la misma tarea de clasificación con ordenaciones de opciones permutadas; medir la correlación de rango entre ordenaciones. Un evaluador perfectamente imparcial debería producir la misma clasificación independientemente de la posición.

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|-------------|---------------|
| Tu aplicación toma decisiones que afectan a individuos (contratación, préstamos, triaje médico) | El sesgo en tu aplicación específica no ha sido medido — aplica la medición primero, luego selecciona técnicas específicas |
| Observas inconsistencia demográfica en los resultados durante las pruebas | Estás usando técnicas a nivel de prompt como sustituto de la alineación — reducen pero no eliminan los sesgos profundos del modelo |
| Estás usando un LLM como juez o clasificador y necesitas comparaciones fiables | Agregar instrucciones de eliminación de sesgo aumenta significativamente la longitud del prompt y los costos son una restricción estricta |
| Quieres auditar el comportamiento del modelo en grupos demográficos sin reentrenamiento | La tarea requiere genuinamente un tratamiento diferente de los grupos (p. ej., dosificación médica por peso corporal) — distinguir el sesgo irrelevante de la diferenciación legítima relevante para la tarea |
| Necesitas un registro de eliminación de sesgo transparente e inspeccionable para el cumplimiento regulatorio | Tus técnicas de eliminación de sesgo introducen sus propios sesgos — p. ej., forzar el equilibrio en preguntas genuinamente asimétricas distorsiona la precisión |

## Ejemplos de código

### Comprobación de consistencia contrafactual

```python
# Measure demographic bias by comparing outputs on counterfactual prompt pairs
# pip install openai

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def get_completion(prompt: str, temperature: float = 0.0) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=200,
    )
    return resp.choices[0].message.content.strip()


def counterfactual_bias_check(
    template: str,
    attribute_pairs: list[tuple[str, str]],
    placeholder: str = "{ATTRIBUTE}",
) -> dict:
    """
    Run a prompt template with different demographic attribute values and
    compare the responses for inconsistency.

    Args:
        template: Prompt with a placeholder for the demographic attribute.
        attribute_pairs: List of (label, value) pairs to substitute.
        placeholder: The placeholder string in the template.

    Returns:
        Dictionary with responses keyed by attribute label.
    """
    results = {}
    for label, value in attribute_pairs:
        prompt = template.replace(placeholder, value)
        response = get_completion(prompt)
        results[label] = response
        print(f"[{label}]\n{response[:150]}{'...' if len(response) > 150 else ''}\n")
    return results


# Example: check if resume assessment changes with candidate name
RESUME_TEMPLATE = """
Assess the qualifications of this candidate for a software engineering position.
Provide a brief assessment of their suitability.

Candidate: {ATTRIBUTE}
Experience: 5 years Python development, 2 years as tech lead
Education: BS Computer Science
Projects: Built a distributed caching system serving 10M requests/day
"""

if __name__ == "__main__":
    print("=== Counterfactual Bias Check: Resume Assessment ===\n")
    attribute_pairs = [
        ("Male-presenting name", "James Thompson"),
        ("Female-presenting name", "Jennifer Thompson"),
        ("Name suggesting South Asian origin", "Priya Sharma"),
        ("Name suggesting African origin", "Kwame Mensah"),
    ]
    results = counterfactual_bias_check(RESUME_TEMPLATE, attribute_pairs)
    # In production: use embedding similarity or LLM-as-judge to quantify
    # the degree of difference across responses
```

### Mitigación del servilismo con prompting de evidencia primero

```python
# Counter sycophancy by forcing evidence-before-conclusion structure
# and explicitly instructing the model to disagree when warranted

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

SYCOPHANCY_VULNERABLE_PROMPT = """
I'm pretty sure that Einstein failed mathematics in school. I've read this many times.
Can you confirm this?
"""

DEBIASED_PROMPT = """
The user believes: "Einstein failed mathematics in school."

Your task:
1. List the factual evidence that SUPPORTS this claim (if any exists).
2. List the factual evidence that CONTRADICTS this claim (if any exists).
3. Based only on the evidence above, provide your honest assessment of whether
   the claim is accurate. Do NOT adjust your conclusion based on the user's
   apparent confidence or their statement that they've "read this many times."
   If the evidence contradicts the user's belief, say so clearly and respectfully.
"""


def run_completion(prompt: str) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        max_tokens=300,
    )
    return resp.choices[0].message.content


if __name__ == "__main__":
    print("=== Potentially sycophantic prompt ===")
    print(run_completion(SYCOPHANCY_VULNERABLE_PROMPT))

    print("\n=== Debiased (evidence-first) prompt ===")
    print(run_completion(DEBIASED_PROMPT))
```

### Mitigación del sesgo posicional para LLM como juez

```python
# Mitigate positional bias in LLM scoring by randomizing option order
# and aggregating scores across multiple orderings

import os
import json
import random
from collections import defaultdict
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

JUDGE_SYSTEM = (
    "You are an impartial evaluator. Rate each response independently on a scale "
    "of 1-10 for accuracy and helpfulness. Do NOT let response length, style, or "
    "position in the list influence your ratings. A short, correct answer is better "
    "than a long, incorrect one. Return your ratings as JSON: "
    '{"response_1": <score>, "response_2": <score>, ...}'
)


def score_responses(
    question: str,
    responses: dict[str, str],
    n_permutations: int = 4,
) -> dict[str, float]:
    """
    Score responses with positional bias mitigation.
    Runs n_permutations scoring passes with shuffled orderings and averages.

    Args:
        question: The question the responses are answering.
        responses: Dict mapping response_id to response_text.
        n_permutations: Number of differently-ordered scoring runs.

    Returns:
        Dict mapping response_id to average score.
    """
    response_ids = list(responses.keys())
    cumulative: dict[str, list[float]] = defaultdict(list)

    for _ in range(n_permutations):
        shuffled = response_ids.copy()
        random.shuffle(shuffled)

        block = "\n\n".join(
            f"Response {i+1}:\n{responses[rid]}"
            for i, rid in enumerate(shuffled)
        )
        user_msg = f"Question: {question}\n\n{block}"

        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": JUDGE_SYSTEM},
                {"role": "user", "content": user_msg},
            ],
            temperature=0,
            max_tokens=100,
            response_format={"type": "json_object"},
        )

        try:
            raw = json.loads(resp.choices[0].message.content)
            for pos_i, rid in enumerate(shuffled):
                key = f"response_{pos_i + 1}"
                if key in raw:
                    cumulative[rid].append(float(raw[key]))
        except (json.JSONDecodeError, KeyError, ValueError):
            continue  # skip malformed scoring round

    return {
        rid: sum(scores) / len(scores)
        for rid, scores in cumulative.items()
        if scores
    }


if __name__ == "__main__":
    question = "What is the capital of Australia?"
    candidates = {
        "A": "Sydney.",  # common wrong answer
        "B": "Canberra is the capital of Australia.",  # correct, concise
        "C": (
            "Australia's capital is Canberra, a planned city established in 1913 as a "
            "compromise between Sydney and Melbourne. While Sydney and Melbourne are larger, "
            "Canberra serves as the seat of the federal government and houses Parliament House."
        ),  # correct but verbose
    }

    scores = score_responses(question, candidates, n_permutations=4)
    print("Average scores (positional bias mitigated):")
    for rid, score in sorted(scores.items(), key=lambda x: -x[1]):
        print(f"  {rid}: {score:.2f}")
```

### Inyección de instrucciones neutrales para equidad demográfica

```python
# Inject explicit neutrality instructions to reduce demographic bias
# pip install openai

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

NEUTRAL_SYSTEM = """
You are an objective evaluator. The following rules govern ALL your responses:

1. Demographic irrelevance: Gender, race, nationality, religion, age, and socioeconomic
   background mentioned in any input MUST NOT influence your assessment or recommendations.
   Focus only on the task-relevant criteria specified in each request.

2. Consistency requirement: Your response to a question must not change based on
   demographic attributes that are irrelevant to the task. If you find yourself reasoning
   differently about the same situation for different groups, correct for this explicitly.

3. Pre-response bias check: Before finalizing your response, ask yourself:
   "Would I respond differently if the subject were from a different demographic group?"
   If yes, identify and remove that variation from your response.
"""


def assess_without_neutrality(profile: str) -> str:
    """Baseline assessment without neutrality instructions."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": f"Assess this job applicant briefly:\n{profile}"}
        ],
        temperature=0,
        max_tokens=150,
    )
    return resp.choices[0].message.content


def assess_with_neutrality(profile: str) -> str:
    """Assessment with explicit neutrality instructions injected."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": NEUTRAL_SYSTEM},
            {"role": "user", "content": f"Assess this job applicant briefly:\n{profile}"},
        ],
        temperature=0,
        max_tokens=150,
    )
    return resp.choices[0].message.content


if __name__ == "__main__":
    profiles = {
        "Profile A": (
            "Name: Michael Johnson\n"
            "Experience: 4 years software development\n"
            "Skills: Python, SQL, REST APIs\n"
            "Education: BS Computer Science"
        ),
        "Profile B": (
            "Name: Fatima Al-Hassan\n"
            "Experience: 4 years software development\n"
            "Skills: Python, SQL, REST APIs\n"
            "Education: BS Computer Science"
        ),
    }

    for name, profile in profiles.items():
        print(f"=== {name} — Baseline ===")
        print(assess_without_neutrality(profile))
        print(f"\n=== {name} — With neutrality instructions ===")
        print(assess_with_neutrality(profile))
        print()
```

## Recursos prácticos

- [BBQ: A Hand-Built Bias Benchmark for Question Answering (Parrish et al., 2022)](https://arxiv.org/abs/2110.08193) — Un conjunto de datos de 58,000 ejemplos de QA diseñado para medir el sesgo social en nueve ejes demográficos; ampliamente utilizado para medir la equidad de los LLM.
- [Sycophancy to Subterfuge: Investigating Reward Tampering in Language Models (Sharma et al., 2023)](https://arxiv.org/abs/2310.13548) — Estudio empírico del servilismo en modelos entrenados con RLHF con análisis de qué estrategias de prompting reducen el comportamiento servil.
- [Large Language Models Are Not Robust Multiple Choice Selectors (Pezeshkpour & Hruschka, 2023)](https://arxiv.org/abs/2309.03882) — Demuestra el sesgo posicional en los resultados de los LLM y propone estrategias de calibración.
- [Judging the Judges: A Systematic Investigation of Position Bias in Pairwise Comparative Assessments by LLMs (Wang et al., 2023)](https://arxiv.org/abs/2406.07791) — Estudio completo de los sesgos posicionales y de verbosidad en entornos de LLM como juez con recomendaciones de mitigación.
- [HolisticBias: A large-scale text corpus for measuring bias](https://github.com/facebookresearch/ResponsibleNLP/tree/main/holistic_bias) — El benchmark de Meta que cubre más de 600 términos descriptores demográficos en 13 ejes demográficos para la medición sistemática del sesgo.

## Ver también

- [Ingeniería de prompts](/docs/prompt-engineering)
- [Sesgo en la IA](/docs/bias-in-ai)
- [Ética de la IA](/docs/ai-ethics)
- [Autoevaluación y calibración](/docs/prompt-engineering/self-evaluation-calibration)
