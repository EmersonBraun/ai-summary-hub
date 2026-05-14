---
title: Máximo de tokens y secuencias de parada
description: Cómo el máximo de tokens, las secuencias de parada y las penalizaciones de repetición controlan la longitud, los límites y la calidad del texto generado por los LLM.
keywords: [max tokens, stop sequences, repetition penalty, frequency penalty, presence penalty, generation length, LLM configuration]
tags: [beginner]
authors: [EmersonBraun]
---

# Máximo de tokens y secuencias de parada

## Definición

El máximo de tokens, las secuencias de parada y las penalizaciones de repetición son parámetros de control de generación que determinan cuándo el modelo deja de generar y cómo maneja el contenido repetido. Mientras que los parámetros de muestreo como la temperatura determinan *qué* dice el modelo, los parámetros de control de generación determinan *cuánto* dice, *dónde* se detiene y *qué tan variado* se mantiene a lo largo de una respuesta larga. Cada API de LLM expone alguna versión de estos controles, y comprenderlos es esencial para construir pipelines fiables y rentables.

El **máximo de tokens** establece un límite superior estricto sobre el número de tokens que el modelo puede generar en una sola respuesta. Actúa como un techo de seguridad: el modelo se detiene en el momento en que emitiría un token que excede este presupuesto. No es una longitud objetivo —el modelo puede detenerse antes si genera de forma natural un token de fin de secuencia. Elegir un valor apropiado de máximo de tokens importa tanto para el costo (generalmente se cobra por token de salida) como para la corrección (una respuesta truncada puede dejar objetos JSON abiertos, cortar una cadena de razonamiento a la mitad o entregar resultados parciales a sistemas posteriores).

Las **secuencias de parada** proporcionan condiciones de parada semánticas: una o más cadenas que, cuando se generan, hacen que el modelo se detenga inmediatamente (la propia cadena de parada se excluye de la salida). Son indispensables para la generación estructurada —envolver la salida del LLM en un delimitador conocido y usar el delimitador de cierre como secuencia de parada hace que la extracción sea trivial y robusta. Las **penalizaciones de repetición** (penalización de frecuencia y penalización de presencia en OpenAI; no expuestas de forma nativa en la API de mensajes de Anthropic) reducen la probabilidad de regenerar tokens que ya han aparecido, desalentando el bucle y el texto de relleno que puede surgir en generaciones largas.

## Cómo funciona

```mermaid
flowchart TD
  START([Start generation]) --> LOOP[Generate next token]
  LOOP --> EOS{End-of-sequence\ntoken?}
  EOS -->|yes| DONE([Return output])
  EOS -->|no| MAXT{Tokens generated\n≥ max_tokens?}
  MAXT -->|yes| DONE
  MAXT -->|no| STOP{Output ends with\na stop sequence?}
  STOP -->|yes| DONE
  STOP -->|no| REP[Apply repetition\npenalty to logits]
  REP --> LOOP
```

Cada token generado pasa por tres puntos de control en secuencia: detección de fin de secuencia, aplicación del presupuesto máximo de tokens y coincidencia de secuencias de parada. Si ninguna de las condiciones de parada se activa, la penalización de repetición se aplica a los logits del siguiente token antes de que se reanude el muestreo.

### Máximo de tokens

El parámetro `max_tokens` (llamado `max_tokens_to_sample` en los SDK de Anthropic más antiguos, ahora `max_tokens`) es un campo requerido o altamente recomendado en la mayoría de las APIs de LLM. Establecerlo demasiado bajo arriesga una salida truncada; establecerlo innecesariamente alto desperdicia cómputo y aumenta la latencia en los endpoints de transmisión en flujo. Una heurística práctica: estimar la longitud de salida esperada y luego establecer `max_tokens` en 1.5–2× esa estimación como techo de seguridad. Para salidas estructuradas como JSON, perfilar el recuento máximo de tokens de su esquema y agregar un búfer del 20%.

### Secuencias de parada

Las secuencias de parada se definen como una lista de cadenas. El modelo escanea su salida después de cada token y se detiene tan pronto como el texto generado termine con cualquier entrada de la lista. Los patrones comunes incluyen `["###", "\n\n", "</answer>", "```"]` para plantillas de prompts estructurados, `["\nHuman:", "\nUser:"]` para simuladores de chat que no deben generar el siguiente turno del usuario, y delimitadores de cierre como `["</json>"]` para extracción etiquetada. Las secuencias de parada se comparan con el texto generado sin procesar, no con los límites tokenizados, por lo que las cadenas de múltiples tokens funcionan correctamente. Un aspecto a tener en cuenta: la secuencia de parada *no* se incluye en el texto devuelto, por lo que la lógica de análisis debe tener en cuenta su ausencia.

### Penalizaciones de repetición

La API de OpenAI expone dos parámetros de penalización distintos. La **penalización de frecuencia** (`frequency_penalty`, rango de −2.0 a 2.0) reduce el logit de un token en proporción a cuántas veces ya ha aparecido en el texto generado, desalentando la repetición de palabras usadas con frecuencia. La **penalización de presencia** (`presence_penalty`, rango de −2.0 a 2.0) aplica una reducción plana de logit a cualquier token que ya haya aparecido al menos una vez, independientemente de la frecuencia, desalentando la reutilización de cualquier token ya visto. Los valores positivos reducen la repetición; los valores negativos la fomentan. Los valores en el rango de 0.1–0.5 generalmente son suficientes para suprimir los bucles sin degradar significativamente la calidad de la salida. Los valores por encima de 1.0 pueden hacer que el modelo evite palabras de conexión útiles y degradar la coherencia.

## Cuándo usar / Cuándo NO usar

| Escenario | Configuración recomendada | Evitar |
|-----------|---------------------------|--------|
| Respuestas factuales cortas o clasificaciones | `max_tokens=50–150`; no se necesitan secuencias de parada | `max_tokens` muy alto; desperdicia presupuesto y puede invitar a relleno |
| Extracción JSON estructurada o etiquetada | Parar en el delimitador de cierre (p. ej., `["</json>"]`); `max_tokens` dimensionado al esquema del peor caso | Omitir secuencias de parada; el modelo puede agregar prosa después de la llave de cierre |
| Simulación de chat multiturno | Secuencias de parada `["\nHuman:", "\nUser:"]` para evitar que el modelo genere el siguiente turno del usuario | Sin secuencias de parada; el modelo alucinará el siguiente turno de conversación |
| Generación de formato largo (ensayos, informes) | `max_tokens` alto (2048–4096+); `frequency_penalty=0.2` suave para evitar frases repetitivas | `frequency_penalty > 1.0`; rompe la coherencia estilística y evita términos repetidos legítimos |
| Generación de código | Parar en delimitadores apropiados para el lenguaje (p. ej., triple acento invertido); `max_tokens` dimensionado a la longitud de la función | `presence_penalty > 0.5`; los nombres de variables y palabras clave necesitan repetirse — las penalizaciones perjudican la corrección |
| Inferencia en lote sensible al costo | Establecer `max_tokens` ajustadamente al percentil 95 de la longitud de salida esperada | Dejar `max_tokens` en el máximo de la API (p. ej., 4096) cuando la salida típica es de 100 tokens |

## Ejemplos de código

### OpenAI — max_tokens, stop y frequency_penalty

```python
# OpenAI SDK: max_tokens, stop sequences, and repetition penalties
# pip install openai

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def extract_with_controls(
    text: str,
    max_tokens: int = 512,
    stop: list[str] | None = None,
    frequency_penalty: float = 0.0,
    presence_penalty: float = 0.0,
) -> str:
    """Call the chat API with full generation-control parameters."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a structured data extractor. "
                    "Output only valid JSON between <json> and </json> tags."
                ),
            },
            {"role": "user", "content": f"Extract key facts from:\n\n{text}"},
        ],
        max_tokens=max_tokens,
        stop=stop or ["</json>"],
        frequency_penalty=frequency_penalty,
        presence_penalty=presence_penalty,
        temperature=0,
    )
    raw = response.choices[0].message.content
    # Strip the opening tag; closing tag was consumed by stop sequence
    return raw.replace("<json>", "").strip()


if __name__ == "__main__":
    article = (
        "SpaceX launched its Starship rocket on March 14, 2024. "
        "The vehicle reached an altitude of 210 km before completing a controlled reentry. "
        "It was the third integrated flight test of the system."
    )

    # Tight budget extraction
    result = extract_with_controls(
        article,
        max_tokens=256,
        stop=["</json>"],
        frequency_penalty=0.1,
    )
    print(result)

    # Long-form summary with anti-repetition penalty
    summary_resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": f"Write a 3-paragraph summary of: {article}"}],
        max_tokens=600,
        frequency_penalty=0.4,
        presence_penalty=0.1,
        temperature=0.6,
    )
    print(summary_resp.choices[0].message.content)
```

### Anthropic — max_tokens y stop_sequences

```python
# Anthropic SDK: max_tokens and stop_sequences
# pip install anthropic

import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def generate_with_controls(
    prompt: str,
    max_tokens: int = 512,
    stop_sequences: list[str] | None = None,
) -> tuple[str, str]:
    """
    Returns (text_content, stop_reason).
    stop_reason is 'end_turn', 'max_tokens', or 'stop_sequence'.
    """
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=max_tokens,
        stop_sequences=stop_sequences or [],
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )
    text = "".join(block.text for block in message.content if hasattr(block, "text"))
    return text, message.stop_reason


if __name__ == "__main__":
    # JSON extraction with stop sequence on closing delimiter
    json_prompt = (
        "Extract the event name, date, and location from the following text as JSON "
        "between <json> and </json> tags:\n\n"
        "The annual PyCon US conference will be held in Pittsburgh, PA on May 14-22, 2025."
    )
    output, reason = generate_with_controls(
        json_prompt,
        max_tokens=256,
        stop_sequences=["</json>"],
    )
    print(f"Stop reason: {reason}")
    print(output)

    # Constrained generation — stop before model generates a second answer
    answer_prompt = "Answer in one sentence: What is gradient descent?"
    answer, reason = generate_with_controls(
        answer_prompt,
        max_tokens=100,
        stop_sequences=["\n\n"],
    )
    print(f"Stop reason: {reason}")
    print(answer)
```

## Recursos prácticos

- [OpenAI — Referencia de API: chat completions](https://platform.openai.com/docs/api-reference/chat/create) — Referencia completa de parámetros para `max_tokens`, `stop`, `frequency_penalty` y `presence_penalty`
- [Anthropic — Referencia de API: messages](https://docs.anthropic.com/en/api/messages) — Referencia para `max_tokens` y `stop_sequences` en la API de Messages
- [OpenAI — Gestión de tokens](https://platform.openai.com/docs/guides/text-generation/managing-tokens) — Guía para contar tokens, comprender ventanas de contexto y dimensionar `max_tokens` apropiadamente
- [Hugging Face — Control de generación de texto](https://huggingface.co/docs/transformers/main_classes/text_generation) — Documentación de bajo nivel sobre `max_new_tokens`, `eos_token_id`, `repetition_penalty` y parámetros relacionados en la biblioteca Transformers
- [tiktoken (tokenizador de OpenAI)](https://github.com/openai/tiktoken) — Biblioteca de conteo de tokens para estimar presupuestos de tokens de salida antes de realizar llamadas a la API

## Ver también

- [Ingeniería de prompts](/docs/prompt-engineering)
- [Temperatura, Top-K, Top-P](/docs/prompt-engineering/temperature-top-k-top-p)
- [Salidas estructuradas](/docs/prompt-engineering/structured-outputs)
- [Autoconsistencia](/docs/prompt-engineering/self-consistency)
- [LLMs](/docs/llms)
- [Cadena de pensamiento](/docs/reasoning-patterns/cot)
