---
title: Gestión de contexto
description: Cómo Claude Code gestiona la ventana de contexto en sesiones largas — compresión automática, estrategias de historial de conversación y técnicas prácticas para mantener las sesiones efectivas a escala.
keywords: [gestión de contexto, ventana de contexto, historial de conversación, /clear, compresión de contexto, límites de tokens, sesiones de Claude Code, sesiones largas]
tags: [intermediate]
authors: [EmersonBraun]
---

# Gestión de contexto

## Definición

La gestión de contexto se refiere a las estrategias y mecanismos que Claude Code usa para mantener las conversaciones efectivas dentro de los límites finitos de la ventana de contexto del modelo. Cada modelo tiene una ventana de contexto máxima — el número total de tokens que puede procesar en una sola solicitud — y esa ventana debe acomodar el prompt del sistema, definiciones de herramientas, el historial completo de conversación (mensajes de usuario, respuestas del asistente, llamadas a herramientas y resultados de herramientas) y cualquier contenido de archivo cargado durante la sesión. Cuando el contexto acumulado se acerca al límite, algo debe ceder: o el contenido antiguo se comprime o descarta, o la sesión debe reiniciarse.

Comprender la gestión de contexto es particularmente importante para sesiones largas de Claude Code. Una sesión de depuración directa puede consumir toda la ventana de contexto después de 30-50 turnos, especialmente si Claude lee múltiples archivos grandes, ejecuta comandos con salida verbosa, o acumula muchas rondas de llamadas a herramientas. Los desarrolladores que desconocen los límites de contexto pueden notar que Claude comienza a "olvidar" decisiones anteriores, dar respuestas inconsistentes o parecer confundido sobre el contexto previo — estos son síntomas de presión de contexto, no fallo del modelo.

Claude Code aborda los límites de contexto a través de una combinación de mecanismos automáticos (compresión de contexto, carga selectiva de archivos) y estrategias controladas por el usuario (el comando `/clear`, enfoque en tareas específicas, CLAUDE.md para convenciones persistentes). La gestión efectiva del contexto no consiste solo en evitar errores — se trata de diseñar sesiones que se mantengan precisas y exactas de principio a fin manteniendo la información más relevante en la ventana activa en todo momento.

## Cómo funciona

### Estructura de la ventana de contexto

La ventana de contexto está dividida en varias zonas, cada una contribuyendo al recuento total de tokens. La **zona del prompt del sistema** contiene instrucciones de CLAUDE.md y definiciones de herramientas — estas son relativamente estables y pueden almacenarse en caché (ver caché de prompts). La **zona del historial de conversación** crece con cada turno: cada mensaje de usuario, respuesta del asistente, llamada a herramienta y resultado de herramienta agrega tokens. La **zona de contenido de archivos** contiene el código fuente real y el contenido de archivos que Claude ha leído durante la sesión. A medida que avanza la sesión, las zonas de historial de conversación y contenido de archivos crecen hasta que se acercan al límite del modelo.

### Compresión automática de contexto

Cuando Claude Code detecta que la ventana de contexto se está acercando a su límite, aplica compresión automática al historial de conversación. El algoritmo de compresión identifica los turnos más antiguos que tienen menos probabilidades de ser necesarios para la tarea actual y los resume o trunca. Los resultados de herramientas — especialmente los grandes como listados de directorios o contenidos largos de archivos — se comprimen preferentemente porque contienen datos en bruto que el modelo ya ha procesado. El objetivo es preservar el hilo lógico de la conversación mientras se elimina el contenido literal de los turnos más antiguos. Los usuarios pueden notar resúmenes comprimidos apareciendo en lugar de intercambios detallados anteriores.

### Carga selectiva de archivos

Claude Code no precarga todos los archivos del proyecto en el contexto al inicio de la sesión. En cambio, usa una estrategia de carga justo a tiempo: los archivos se leen con la herramienta `Read` o `Glob` solo cuando Claude determina que son relevantes para la tarea actual. Esto mantiene el contexto inicial pequeño y enfocado. Sin embargo, a medida que avanza la sesión y Claude lee más archivos, los contenidos de archivos se acumulan en el contexto. Para bases de código muy grandes, Claude puede necesitar releer archivos específicos en lugar de mantener todos los archivos leídos anteriormente en la ventana activa.

### El comando /clear

El comando `/clear` descarta todo el historial de conversación e inicia una sesión nueva. Es la forma más agresiva de gestión de contexto — equivalente a cerrar y reabrir la terminal. Úsalo entre tareas no relacionadas, después de completar una función importante, o cuando la deriva del contexto (información contradictoria o desactualizada en el historial) esté causando comportamiento confuso. Las instrucciones de CLAUDE.md y la configuración del proyecto sobreviven a `/clear` porque se recargan desde el sistema de archivos al inicio de cada sesión.

```mermaid
flowchart LR
  UserMsg[User message] -->|appended to history| History[Conversation history]
  History -->|within limit| Assemble[Context assembled]
  ToolCall[Tool calls + results] -->|appended to history| History
  FileRead[File contents loaded] -->|appended to history| History
  Assemble -->|sent to| Model[Claude model]
  Model -->|response + new tool calls| History
  History -->|approaching limit| Compress[Auto-compression\nold turns summarized]
  Compress -->|trimmed history| Assemble
  Clear[/clear command] -->|resets| History
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|---|---|
| Iniciando una tarea nueva y no relacionada — usar `/clear` para comenzar con un contexto limpio | El historial de conversación contiene decisiones o descubrimientos críticos que aún necesitas |
| La sesión ha estado ejecutándose durante muchos turnos y Claude parece confundido — la deriva del contexto es una señal | Estás en medio de una tarea de múltiples pasos donde el contexto previo es activamente necesario |
| Estás cargando archivos muy grandes — considera `/clear` primero y carga solo lo que la tarea actual necesita | La sesión es corta y la presión de contexto aún no es una preocupación |
| Quieres evaluar la calidad de las respuestas — un contexto fresco proporciona una línea base limpia | Dependes de CLAUDE.md para el contexto del proyecto — `/clear` lo preserva, pero el contexto específico de la sesión se pierde |
| Estás escribiendo un CLAUDE.md que capture el contexto importante del proyecto para que sobreviva a `/clear` | La "confusión" es en realidad una limitación del modelo no relacionada con el contexto — más contexto no ayudará |

## Ejemplos de código

```bash
# Context management strategies in a Claude Code session

# Strategy 1: Use /clear between unrelated tasks
# Working on feature A...
claude
> Implement the user registration endpoint in src/routes/auth.ts
> Add validation for email format and password strength
> Write the unit tests for the new endpoint

# Feature A is done. Switch to a completely different task.
> /clear    # Reset context — start fresh for unrelated work
> Refactor the logging module in src/utils/logger.ts to use structured JSON output

# ---

# Strategy 2: Scope tasks narrowly to avoid loading unnecessary files
# BAD: Loads everything, inflates context early
> Read all files in the src/ directory and tell me how authentication works

# GOOD: Targeted question that loads only relevant files
> How does authentication work? Start by reading src/routes/auth.ts and src/middleware/auth.ts

# ---

# Strategy 3: Summarize before /clear to preserve key decisions
> Before I run /clear, summarize the architectural decisions we made in this session
  so I can paste them into CLAUDE.md

# Paste the summary into CLAUDE.md, then:
> /clear    # Now the decisions persist via CLAUDE.md across future sessions

# ---

# Strategy 4: Use focused sessions for large codebases
# Instead of one giant session, break work into focused chunks
# Session 1: Understand the data model
claude
> Read src/models/ and explain the database schema and entity relationships
> /exit

# Session 2: Implement a specific feature
claude
> Given our Prisma schema in prisma/schema.prisma, add a 'tags' relation to Post
```

```bash
# Monitoring context usage (verbose mode)
claude --verbose

# Look for token count indicators in the verbose output:
# "Context: 45,231 / 200,000 tokens (22%)"
# When this approaches 80-90%, consider /clear or wrapping up the session

# The model will also proactively warn you when context is getting full:
# "Note: This session is using a significant portion of the context window.
#  Consider using /clear before starting unrelated tasks."
```

```markdown
# CLAUDE.md pattern: capturing session context for future sessions
# This lets important discoveries survive /clear

## Current architecture decisions (updated 2026-04-01)
- Authentication uses JWT with 24h access tokens and 30d refresh tokens stored in httpOnly cookies
- All database queries go through the repository layer in src/repositories/ — never call Prisma directly from routes
- We decided against Redis for session storage in favor of stateless JWT (revisit if auth rate-limiting is needed)
- The `UserService` was split into `UserAuthService` and `UserProfileService` in the April 2026 refactor

## Known complexity areas (read these files before touching related code)
- `src/services/billing.ts` — complex subscription state machine, read the inline comments carefully
- `src/middleware/rateLimit.ts` — custom sliding window implementation, not a standard library
```

## Recursos prácticos

- [Contexto y memoria de Claude Code](https://docs.anthropic.com/en/docs/claude-code/memory) — Guía oficial sobre cómo Claude Code gestiona el contexto, incluyendo /clear y CLAUDE.md para memoria persistente.
- [Ventanas de contexto del modelo Claude](https://docs.anthropic.com/en/docs/about-claude/models) — Límites de tokens para cada variante del modelo Claude.
- [Documentación de caché de prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — Cómo cachear porciones de contexto estables para reducir el costo y la latencia en sesiones largas.
- [Referencia de CLI de Claude Code](https://docs.anthropic.com/en/docs/claude-code/cli-reference) — Lista completa de comandos slash incluyendo /clear y /compact.

## Ver también

- [Descripción general de Claude Code](/docs/claude-code)
- [Caché de prompts](/docs/claude-code/prompt-caching)
- [Configuración CLAUDE.md](/docs/claude-code/claude-md)
