---
title: Modos de pensamiento y esfuerzo
description: Pensamiento extendido en Claude Code — qué es, cómo los niveles de esfuerzo afectan la profundidad del razonamiento frente a la velocidad, y cómo configurar el comportamiento de pensamiento para diferentes tipos de tareas.
keywords: [pensamiento extendido, modos de pensamiento, niveles de esfuerzo, razonamiento de Claude, tokens de presupuesto, tokens de pensamiento, razonamiento profundo, Claude Code]
tags: [intermediate]
authors: [EmersonBraun]
---

# Modos de pensamiento y esfuerzo

## Definición

El pensamiento extendido es una característica de los modelos Claude que permite al modelo razonar a través de un problema paso a paso en un bloc de notas interno dedicado antes de producir su respuesta final. A diferencia de la salida visible, este proceso de razonamiento está diseñado para la deliberación interna del modelo — saca conclusiones intermedias, evalúa alternativas, detecta sus propios errores y construye hacia una respuesta bien considerada. El resultado son respuestas más precisas en tareas complejas, mejor razonadas en problemas ambiguos y menos susceptibles a errores superficiales de coincidencia de patrones.

En Claude Code, el pensamiento extendido se manifiesta como una configuración de **nivel de esfuerzo** que controla cuánto trabajo computacional realiza el modelo antes de responder. Las respuestas de bajo esfuerzo son rápidas y apropiadas para tareas simples e inequívocas (formatear código, explicar una función corta). Las respuestas de alto esfuerzo invierten más presupuesto de razonamiento y son más adecuadas para decisiones arquitectónicas complejas, sesiones de depuración difíciles, o tareas donde los errores son costosos. La compensación siempre es velocidad versus profundidad: más pensamiento toma más tiempo y consume más tokens.

Es importante distinguir el pensamiento extendido del prompting de cadena de pensamiento. La cadena de pensamiento le pide al modelo que muestre su trabajo en la salida — el razonamiento es parte del texto de respuesta. El pensamiento extendido, por el contrario, ocurre en un bloque `thinking` separado que el modelo procesa internamente. En las sesiones de Claude Code, a veces puedes observar bloques `<thinking>` en la salida raw de la API, aunque la UI de Claude Code normalmente solo muestra la respuesta final. El pensamiento interno no está sujeto a las mismas restricciones que la salida y está optimizado para la calidad del razonamiento en lugar de la legibilidad.

## Cómo funciona

### Bloques de pensamiento y tokens de presupuesto

Cuando el pensamiento extendido está habilitado, el modelo recibe un parámetro adicional: `budget_tokens`. Este entero especifica el número máximo de tokens que el modelo puede usar para su razonamiento interno antes de producir la respuesta final. Un presupuesto de 1.000 tokens permite una breve deliberación; un presupuesto de 10.000 tokens permite un análisis profundo y de múltiples pasos. El modelo no siempre usa su presupuesto completo — deja de pensar cuando llega a una conclusión satisfactoria. Establecer el presupuesto más alto de lo necesario agrega latencia sin ganancias de calidad proporcionales; el presupuesto correcto depende de la complejidad de la tarea.

### Niveles de esfuerzo en Claude Code

Claude Code traduce el concepto abstracto de tokens de presupuesto en niveles de esfuerzo con nombre que son más fáciles de razonar:

- **Bajo esfuerzo (predeterminado para tareas simples)**: presupuesto mínimo de pensamiento, respuestas rápidas, apropiado para formateo de código, explicaciones simples, ediciones de un solo archivo y operaciones de búsqueda.
- **Esfuerzo medio**: presupuesto de pensamiento moderado, el predeterminado para la mayoría de las sesiones de codificación interactivas; equilibra velocidad y calidad para las tareas de desarrollo típicas.
- **Alto esfuerzo / máximo**: gran presupuesto de pensamiento, reservado para tareas complejas — depuración de problemas difíciles de reproducir, diseño de sistemas, análisis de implicaciones de seguridad, o cualquier tarea donde una respuesta incorrecta sería costosa de corregir.

### Cuándo piensa el modelo

No cada respuesta activa el pensamiento extendido. Claude Code usa heurísticas para determinar cuándo se justifica razonamiento adicional basado en señales de complejidad de la tarea: la longitud y ambigüedad de la solicitud, el número de archivos involucrados, si la tarea implica hacer cambios irreversibles, y si el usuario ha solicitado explícitamente un análisis cuidadoso. Los usuarios también pueden señalar el esfuerzo deseado explícitamente añadiendo frases como "piensa cuidadosamente en esto" o "tómate tu tiempo" en sus solicitudes — estas son reconocidas por el modelo como señales para invertir más presupuesto de razonamiento.

### Streaming y latencia

El pensamiento extendido interactúa con el streaming de manera predecible: el modelo comienza a transmitir su salida visible solo después de completar su razonamiento interno. Esto significa que las solicitudes de alto esfuerzo tienen una pausa inicial más larga antes de que comience la salida, pero el primer token de contenido real llega completamente formado en lugar de incrementalmente incierto. En la CLI de Claude Code y las integraciones de IDE, esto aparece como un breve indicador "pensando..." antes de que comience la respuesta. Para las sesiones interactivas, este retraso generalmente vale la pena para tareas complejas; para bucles de retroalimentación ajustados, mantener el esfuerzo bajo es preferible.

```mermaid
flowchart LR
  Request[User request] -->|complexity signals| Effort[Effort level selected]
  Effort -->|budget_tokens set| Think[Internal thinking block]
  Think -->|reasoning complete| Draft[Draft response]
  Draft -->|self-review| Final[Final response streamed]
  Final -->|delivered to| User[Developer]
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|---|---|
| Depurando un error complejo y difícil de reproducir con muchas posibles causas raíz | Pediendo un simple one-liner o una corrección de sintaxis rápida — el bajo esfuerzo es más rápido y suficiente |
| Diseñando o revisando una arquitectura de sistema con compensaciones significativas | Sesiones interactivas de ida y vuelta donde cada turno es un pequeño paso — la latencia se acumula |
| Analizando las implicaciones de seguridad de un cambio de código antes de fusionarlo | Generando boilerplate o scaffolding que sigue patrones bien establecidos |
| Tareas donde una respuesta incorrecta requeriría un retrabajo significativo | Ejecutando en pipelines de CI donde el determinismo y la velocidad importan más que la profundidad del razonamiento |
| Cualquier tarea que le darías a un ingeniero senior conocido por "pensar antes de programar" | Estás trabajando bajo restricciones de presupuesto de tokens ajustadas — los tokens de pensamiento cuentan contra tu uso |

## Pros y contras

| | Pros | Contras |
|---|---|---|
| **Alto esfuerzo** | Mejor precisión en tareas complejas; detecta casos límite; produce explicaciones bien razonadas | Mayor latencia; más tokens consumidos; pausa más larga antes del primer token de salida |
| **Bajo esfuerzo** | Respuestas rápidas; bueno para bucles interactivos ajustados; menor costo de tokens | Puede perder casos límite en tareas complejas; puede producir análisis superficial en problemas ambiguos |
| **Esfuerzo automático** | No se necesita configuración; el modelo se calibra a la complejidad de la tarea | Comportamiento menos predecible; puede sub-invertir en tareas genuinamente difíciles que parecen simples |

## Ejemplos de código

```bash
# Claude Code CLI — signaling desired effort level through natural language

# Low effort (fast): simple, well-defined tasks
> Format this function to match our Prettier config

# Medium effort (default): typical coding tasks
> Refactor the UserService class to use dependency injection

# High effort: complex tasks — add "think carefully", "take your time", or "analyze deeply"
> Think carefully: this WebSocket handler occasionally drops messages under high load.
  Analyze all the possible race conditions and ordering issues in src/ws/handler.ts
  before suggesting a fix.

# High effort: architectural decisions
> Take your time to analyze the trade-offs between using Redis Pub/Sub versus
  a message queue like RabbitMQ for our notification service. Consider our
  current scale (10k concurrent users) and the team's operational experience.

# High effort: security review
> Analyze src/auth/jwt.ts carefully for security vulnerabilities. Think through
  all the attack vectors — token forgery, replay attacks, expiry bypass —
  before giving me your assessment.
```

```json
// Claude Code settings.json — configuring default thinking behavior
// Located at: ~/.claude/settings.json or .claude/settings.json in project root
{
  "thinking": {
    "defaultEffort": "medium",
    "maxBudgetTokens": 8000,
    "enableForComplexTasks": true
  }
}
```

```python
# Using extended thinking directly via the Anthropic API (for custom integrations)
import anthropic

client = anthropic.Anthropic()

# High-effort request: complex architectural question
response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=16000,
    # thinking block enables extended reasoning; budget_tokens controls depth
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # allow up to 10k tokens of internal reasoning
    },
    messages=[{
        "role": "user",
        "content": (
            "Analyze the following database schema for potential performance issues "
            "at 1M+ rows. Consider indexing strategies, query patterns, and normalization "
            "trade-offs. Schema: [paste schema here]"
        )
    }]
)

# The response content may include both thinking blocks and text blocks
for block in response.content:
    if block.type == "thinking":
        # Internal reasoning — useful for debugging model behavior
        print(f"[THINKING]: {block.thinking[:200]}...")
    elif block.type == "text":
        # Final response — the part to show the user
        print(f"[RESPONSE]: {block.text}")

# Low-effort request: simple, fast task (thinking disabled or minimal budget)
quick_response = client.messages.create(
    model="claude-haiku-4-5",  # Haiku for fast, simple tasks
    max_tokens=1024,
    # No thinking block for simple requests — faster and cheaper
    messages=[{
        "role": "user",
        "content": "Convert this array of objects to a Map keyed by id: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]"
    }]
)
print(quick_response.content[0].text)
```

## Recursos prácticos

- [Documentación de pensamiento extendido — Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) — Referencia completa sobre bloques de pensamiento, tokens de presupuesto, comportamiento de streaming y parámetros de la API.
- [Cookbook de pensamiento extendido](https://github.com/anthropics/anthropic-cookbook/tree/main/extended_thinking) — Notebooks prácticos que demuestran el pensamiento extendido para tareas de razonamiento complejas.
- [Comparación de modelos Claude](https://docs.anthropic.com/en/docs/about-claude/models) — Detalles de la tarjeta de modelo incluyendo qué modelos soportan el pensamiento extendido y sus capacidades relativas.
- [Referencia de configuración de Claude Code](https://docs.anthropic.com/en/docs/claude-code/settings) — Dónde configurar los niveles de esfuerzo predeterminados y el comportamiento de pensamiento en Claude Code.

## Ver también

- [Descripción general de Claude Code](/docs/claude-code)
- [Caché de prompts](/docs/claude-code/prompt-caching)
- [Gestión de contexto](/docs/claude-code/context-management)
