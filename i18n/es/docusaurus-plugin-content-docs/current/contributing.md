---
title: Contributing
description: How to add topics, improve examples, and translate content.
keywords: [contributing, template, PR]
authors: [EmersonBraun]
---

# Contribuir a AI Summary Hub

Gracias por ayudar a mejorar este wiki. Así es como puede contribuir.

## Plantilla de artículo

Cada artículo sigue una plantilla estructurada diseñada para hacer de AI Summary Hub un oráculo de conocimiento completo. Las secciones se dividen en **obligatorias** y **opcionales**.

### Secciones obligatorias

Cada artículo **debe** incluir estas secciones en este orden exacto:

1. **Frontmatter** — Bloque de metadatos al principio del archivo (ver [Especificación de Frontmatter](#especificacion-de-frontmatter) abajo)
2. **Definición** — Qué es, contexto y por qué importa. Mínimo 2–3 párrafos.
3. **Cómo funciona** — Explicación técnica. Use subsecciones H3 para temas complejos. Incluya al menos un diagrama Mermaid con **aristas etiquetadas** (no solo cajas). Mínimo 3–5 oraciones por subsección.
4. **Cuándo usar / Cuándo NO usar** — Una tabla de dos columnas con orientación práctica. Mínimo 3 filas.
5. **Ejemplos de código** — Al menos un fragmento **funcional** (no pseudocódigo). El lenguaje queda a criterio del autor: Python es el estándar para temas de ML/MLOps; TypeScript para temas de MCP/Claude Code; use lo que sea más natural para el tema.
6. **Recursos prácticos** — 2–5 enlaces externos curados. Tipos aceptados: documentación oficial, cursos (gratuitos o de pago), repositorios de GitHub, papers de arXiv, publicaciones de blogs de empresas (p. ej. blog de OpenAI, blog de Anthropic).
7. **Ver también** — Enlaces internos a documentos relacionados dentro de este wiki.

### Secciones opcionales

Incluya estas **solo cuando sea relevante**. Cuando una sección no aplique, simplemente omítala por completo — no agregue el encabezado con "N/A" o un marcador de posición.

- **Comparaciones** — Una tabla de comparación rápida con 3–5 criterios (p. ej. facilidad de uso, comunidad, rendimiento). **Regla de reciprocidad**: si el artículo A incluye una comparación con el artículo B, entonces el artículo B también debe incluir una comparación con el artículo A.
- **Pros y contras** — Formato de tabla con dos columnas.
- **Benchmarks** — Enlaces a benchmarks, tablas de clasificación o papers con datos cuantitativos.

### Orden de las secciones

El orden completo cuando todas las secciones están presentes:

```
1. Definición
2. Cómo funciona
3. Cuándo usar / Cuándo NO usar
4. Comparaciones (opcional)
5. Pros y contras (opcional)
6. Benchmarks (opcional)
7. Ejemplos de código
8. Recursos prácticos
9. Ver también
```

### Directrices de profundidad

| Sección | Profundidad mínima |
|---------|-------------------|
| Definición | 2–3 párrafos que cubran qué es, contexto y por qué importa |
| Cómo funciona | Subsecciones H3 para temas complejos; 1+ diagrama Mermaid con aristas etiquetadas; 3–5 oraciones por subsección |
| Cuándo usar / Cuándo NO usar | Tabla con 3+ filas |
| Ejemplos de código | 1+ fragmento funcional con comentarios; debe ser ejecutable o claramente anotado |
| Recursos prácticos | 2–5 enlaces curados |
| Comparaciones (si se incluyen) | Tabla con 3–5 criterios |

### Especificación de Frontmatter

Cada documento debe incluir este bloque de frontmatter:

```yaml
---
title: "Título completo del artículo"
description: "Descripción de una línea para SEO y búsqueda"
keywords: [keyword1, keyword2, keyword3]
tags: [intermediate]  # exactamente uno de: beginner, intermediate, advanced
authors: [NombreUsuarioGitHub]  # nombre(s) de usuario de GitHub del/los autor(es)
---
```

**Campos obligatorios:**

| Campo | Descripción |
|-------|-------------|
| `title` | Título completo del artículo |
| `description` | Descripción de una línea (usada para SEO y búsqueda) |
| `keywords` | Array de palabras clave relevantes |
| `tags` | Array que contiene **exactamente una** etiqueta de nivel: `beginner`, `intermediate` o `advanced` |
| `authors` | Array de nombres de usuario de GitHub que escribieron el artículo |

**Campos opcionales:**

| Campo | Descripción | Cuándo usar |
|-------|-------------|-------------|
| `sidebar_label` | Etiqueta corta para la barra lateral | Solo cuando el título excede ~30 caracteres |

**Nota:** `last_updated` es gestionado automáticamente por Docusaurus a través del historial de git. No lo agregue manualmente.

### Ejemplo completo de plantilla

```markdown
---
title: "Tema de Ejemplo"
description: "Una breve descripción del tema."
keywords: [tema, ejemplo, ia]
tags: [intermediate]
authors: [SuNombreDeUsuarioGitHub]
---

# Tema de Ejemplo

## Definición

Párrafo 1: Qué es.

Párrafo 2: Contexto y relación con otros conceptos.

Párrafo 3: Por qué importa.

## Cómo funciona

### Subsección A

Explicación con 3–5 oraciones.

### Subsección B

Explicación con diagrama:

(Diagrama Mermaid aquí con aristas etiquetadas)

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|-------------|--------------|
| Escenario A | Contra-escenario A |
| Escenario B | Contra-escenario B |
| Escenario C | Contra-escenario C |

## Comparaciones

(Opcional — solo si existen alternativas)

| Criterio | Este tema | Alternativa |
|----------|-----------|-------------|
| Criterio 1 | ... | ... |
| Criterio 2 | ... | ... |
| Criterio 3 | ... | ... |

## Pros y contras

(Opcional)

| Pros | Contras |
|------|---------|
| Pro 1 | Contra 1 |
| Pro 2 | Contra 2 |

## Benchmarks

(Opcional — enlace a papers o tablas de clasificación)

## Ejemplos de código

(Fragmento de código funcional aquí)

## Recursos prácticos

- [Documentación oficial](https://example.com) — Descripción
- [Tutorial o curso](https://example.com) — Descripción
- [Repositorio GitHub](https://example.com) — Descripción

## Ver también

- [Documento relacionado 1](/docs/ruta)
- [Documento relacionado 2](/docs/ruta)
```

## Agregar nuevos temas

1. Cree un nuevo archivo bajo `docs/` en la categoría correcta (p. ej. `docs/tools/mi-herramienta.md`).
2. Use la plantilla anterior y asegure un ID de documento único (basado en la ruta).
3. Incluya **todas las secciones obligatorias** y las secciones opcionales relevantes.
4. Agregue el documento a `sidebars.ts` en la categoría correcta.
5. Si su artículo incluye una **Comparación** con otro artículo, actualice ese artículo con una comparación recíproca.
6. Abra un PR con una breve descripción.

## Mejorar ejemplos

- Prefiera código ejecutable; agregue comentarios si las dependencias o la configuración no son obvias.
- Use lenguajes soportados por Prism (Python, JavaScript, TypeScript, bash, yaml, docker).
- Enlace a documentación oficial o repositorios donde sea relevante.

## Diagramas (Mermaid)

Los diagramas en los docs están escritos en [Mermaid](https://mermaid.js.org/intro/getting-started.html) y son renderizados por el sitio a través de Docusaurus. Directrices:

- Use sintaxis válida de Mermaid.js — pruebe en el [Mermaid Live Editor](https://mermaid.live/) antes de enviar.
- **Etiquete las aristas** para describir relaciones (no solo cajas conectadas por flechas).
- Use subgráficos para agrupar componentes relacionados cuando los diagramas tienen 5+ nodos.
- Prefiera `flowchart LR` o `flowchart TD` para arquitectura; `sequenceDiagram` para interacciones.

## Traducciones

El sitio está localizado para **español (es), portugués (pt-BR), alemán (de), francés (fr) y chino simplificado (zh-Hans)**. El contenido predeterminado está en inglés.

Los nuevos artículos se producen **solo en inglés**. Las traducciones se manejan en una fase separada.

**Dónde viven los archivos de traducción:**

- **Etiquetas de barra lateral y documentos:** `i18n/<locale>/docusaurus-plugin-content-docs/current.json` (etiquetas de categoría de barra lateral). Los títulos de los documentos vienen del frontmatter de cada documento traducido en `i18n/<locale>/docusaurus-plugin-content-docs/current/`.
- **Barra de navegación:** `i18n/<locale>/docusaurus-theme-classic/navbar.json`
- **Pie de página:** `i18n/<locale>/docusaurus-theme-classic/footer.json`
- **UI del tema y páginas personalizadas (home, all-topics):** `i18n/<locale>/code.json`
- **Contenido de documentos:** Refleje el árbol `docs/` bajo `i18n/<locale>/docusaurus-plugin-content-docs/current/` y traduzca cada `.md` (frontmatter `title`, `description` y cuerpo). Mantenga los enlaces internos como `/docs/...` para que funcionen con el prefijo de locale.

**Agregar una nueva lengua:** Agregue la lengua a `i18n.locales` en `docusaurus.config.ts`, luego ejecute `npm run write-translations` (opcionalmente con `--locale <locale>`) para generar la estructura JSON. Complete las traducciones para la barra de navegación, el pie de página, `code.json`, la barra lateral y el contenido de los documentos.

**Cuándo ejecutar `write-translations`:** Ejecute `npm run write-translations` cuando agregue nuevos elementos de barra lateral, cadenas de tema o claves de páginas personalizadas para que los nuevos claves aparezcan en los archivos JSON de cada locale para los traductores.

## Estilo de código y commits

- Siga el formato existente (p. ej. 2 espacios, nueva línea al final).
- Use mensajes de commit claros (p. ej. "Add doc: X", "Fix link in Y").

## Versionado

Cuando la base de contenido sea estable, los mantenedores pueden ejecutar `npm run docusaurus docs:version 1.0.0` para crear instantáneas versionadas. El selector de versión aparecerá en la barra de navegación. Vea [Versionado de Docusaurus](https://docusaurus.io/docs/versioning) para más detalles.

---

¿Preguntas? Abra un issue o PR en [GitHub](https://github.com/EmersonBraun/ai-summary-hub).
