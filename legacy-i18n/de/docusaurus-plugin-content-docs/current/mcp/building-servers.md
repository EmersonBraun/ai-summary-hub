---
title: Building MCP servers
description: How to build MCP servers that expose tools, resources, and prompts to any MCP-compatible AI application — covering server setup, capability registration, transport configuration, and the full server lifecycle.
keywords: [MCP server, Model Context Protocol, build MCP server, tools, resources, prompts, TypeScript, MCP SDK, tool schema, stdio transport, HTTP SSE]
tags: [advanced]
authors: [EmersonBraun]
---

# MCP-Server erstellen

## Definition

Ein **MCP-Server** ist ein Prozess, der Fähigkeiten für MCP-kompatible KI-Anwendungen über das Model Context Protocol bereitstellt. Er fungiert als Brücke zwischen einem KI-Modell und einem externen System – einem Dateisystem, einer REST-API, einer Datenbank, einem Code-Runner – indem er die Funktionalität dieses Systems in eine klar definierte, auffindbare Schnittstelle verpackt. Der Server besitzt die Implementierungsdetails; der Client muss nur das Protokoll kennen. Jeder MCP-konforme Client kann sich mit jedem MCP-Server verbinden und sofort seine Fähigkeiten entdecken und nutzen, ohne benutzerdefinierte Integrationsarbeit.

Ein MCP-Server kann drei Kategorien von Fähigkeiten bereitstellen. **Tools** sind aufrufbare Funktionen, die strukturierte Eingaben akzeptieren und Ausgaben zurückgeben – die KI ruft sie auf, um Aktionen durchzuführen oder dynamische Informationen abzurufen. **Ressourcen** sind schreibgeschützte, URI-adressierte Datenquellen, die die KI für den Kontext lesen kann – Dateien, Datenbankdatensätze, API-Schnappschüsse. **Prompts** sind wiederverwendbare, parametrisierte Prompt-Vorlagen, die auf dem Server gespeichert sind und die Clients Benutzern zugänglich machen oder in Gespräche einfügen können. Ein einzelner Server kann jede Kombination dieser Fähigkeiten anbieten; viele Server stellen nur Tools bereit.

Der **Server-Lebenszyklus** folgt einem vorhersehbaren Muster: Der Server startet und bindet sich an einen Transport (stdio oder HTTP/SSE), wartet auf einen Client, der sich verbindet, schließt den `initialize`-Handshake ab, um Protokollversionen und Fähigkeiten auszuhandeln, und tritt dann in seine Hauptschleife ein, die auf Anfragen antwortet. Wenn der Client die Verbindung trennt oder ein Shutdown-Signal sendet, führt der Server eine Bereinigung durch und beendet sich. Da das Protokoll innerhalb einer Sitzung zustandsbehaftet ist, kann der Server einen Verbindungszustand aufrechterhalten – zum Beispiel teure API-Antworten für die Dauer einer Sitzung cachen.

## Funktionsweise

### Server-Setup und Initialisierung

Das Einrichten eines MCP-Servers beginnt mit der Erstellung einer `McpServer`-Instanz (aus dem High-Level-SDK) oder einer `Server`-Instanz (aus dem Low-Level-SDK) mit einem Namen und einer Version. Name und Version werden dem Client während des `initialize`-Handshakes gesendet und helfen beim Debugging und Logging. Nach der Erstellung des Servers registrieren Sie Fähigkeiten – Tools, Ressourcen, Prompts – bevor Sie sich mit einem Transport verbinden. Die High-Level `McpServer`-Klasse des SDKs bietet ergonomische `server.tool()`-, `server.resource()`- und `server.prompt()`-Methoden, die Anfrage-Routing und Schema-Validierung intern handhaben. Der Verbindungsschritt (`server.connect(transport)`) startet die Ereignisschleife und blockiert, bis die Sitzung endet.

### Tools definieren

Tools sind die am häufigsten verwendete MCP-Fähigkeit. Jedes Tool hat drei erforderliche Elemente: einen **Namen** (ein kurzer, kleingeschriebener Bezeichner, der in `tools/call`-Anfragen verwendet wird), eine **Beschreibung** (eine natürlichsprachliche Erklärung, die die KI verwendet, um zu entscheiden, wann und wie das Tool aufgerufen werden soll) und ein **Eingabe-Schema** (ein Zod-Schema im TypeScript SDK, das in JSON-Schema für das Protokoll konvertiert wird). Wenn ein Client ein Tool aufruft, validiert das SDK die eingehenden Argumente gegen das Schema, bevor Ihre Handler-Funktion aufgerufen wird, sodass Sie typsichere, validierte Eingaben erhalten. Der Handler gibt ein `content`-Array von Content-Blöcken zurück – Text, Bilder oder eingebettete Ressourcen –, das der Client an das KI-Modell zurückgibt. Tools können auch `isError: true` in ihrer Antwort setzen, um einen behebbaren Fehler zu signalisieren, was es der KI ermöglicht, es erneut zu versuchen oder elegant zurückzufallen.

### Ressourcen definieren

Ressourcen stellen dateiähnliche Daten bereit, die die KI für den Kontext lesen kann. Eine Ressource wird durch eine URI identifiziert (z. B. `file:///path/to/data.json` oder `postgres://mydb/users/123`) und hat einen MIME-Typ, der dem Client mitteilt, wie der Inhalt zu behandeln ist. Ressourcen werden über `resources/list` entdeckt und über `resources/read` gelesen. Das SDK unterstützt sowohl **statische Ressourcen** (mit einer festen URI und Inhalt registriert) als auch **dynamische Ressourcen** (mit einem URI-Vorlagenmuster registriert, zur Lesezeit aufgelöst). Ressourcenvorlagen verwenden RFC 6570 URI-Vorlagensyntax – zum Beispiel entspricht `file:///{path}` jedem Dateipfad. Wenn der Client eine Ressourcen-URI liest, die einer Vorlage entspricht, empfängt Ihr Handler die extrahierten Vorlagenvariablen und gibt den Inhalt zurück. Ressourcen sollten für Daten verwendet werden, die die KI lesen, aber nicht ändern muss; für Schreiboperationen verwenden Sie ein Tool.

### Prompts definieren

Prompts sind wiederverwendbare Interaktionsvorlagen. Ein Prompt hat einen Namen, eine Beschreibung und eine optionale Liste von Argumenten (Name, Beschreibung, Pflichtfeld). Wenn ein Client einen Prompt über `prompts/get` anfordert, empfängt Ihr Handler die Argumentwerte und gibt eine Liste von Nachrichten zurück – typischerweise eine Mischung aus `user`- und `assistant`-Rollennachrichten –, die der Client in das Gespräch einfügt. Prompts ermöglichen es Server-Autoren, Domänenwissen darüber zu kodieren, wie mit den Fähigkeiten des Servers interagiert werden soll. Zum Beispiel könnte ein Datenbankserver einen `query_builder`-Prompt bereitstellen, der eine natürlichsprachliche Beschreibung einer Abfrage akzeptiert und einen strukturierten Prompt zurückgibt, der die KI dazu führt, sichere, parametrisierte SQL zu produzieren.

### Transport-Konfiguration

Die Transport-Schicht bestimmt, wie der Server mit Clients kommuniziert. **stdio-Transport** (`StdioServerTransport`) liest aus `process.stdin` und schreibt nach `process.stdout`. Er ist der Standard für lokale Tool-Server – die Host-Anwendung startet den Server als Kindprozess und kommuniziert über die Prozess-Streams. Es ist keine Netzwerkkonfiguration erforderlich, und der stderr des Servers ist für das Logging verfügbar, ohne das Protokoll zu stören. **HTTP mit SSE-Transport** (`SSEServerTransport`) akzeptiert HTTP-POST-Anfragen für Client-zu-Server-Nachrichten und streamt Server-zu-Client-Nachrichten über einen `/sse` Server-Sent Events-Endpunkt. Dies ist geeignet für gemeinsam genutzte Server, zu denen mehrere Clients gleichzeitig eine Verbindung herstellen können, oder für Server, die als langlebige Dienste statt als On-Demand-Prozesse laufen müssen.

```mermaid
flowchart TB
  Client["MCP-Client"]
  Server["MCP-Server-Prozess"]
  ToolReg["Tool-Registry\n(get_forecast, read_file, ...)"]
  ResourceReg["Ressourcen-Registry\n(file:///, db:///...)"]
  PromptReg["Prompt-Registry\n(query_builder, summarize, ...)"]
  External["Externe Systeme\n(APIs, DBs, Dateisystem)"]

  Client -->|"initialize Handshake"| Server
  Server -->|"Fähigkeitsantwort"| Client
  Client -->|"tools/list Anfrage"| Server
  Server -->|"Tool-Schemas"| Client
  Client -->|"tools/call Anfrage"| Server
  Server -->|"leitet Aufruf weiter"| ToolReg
  ToolReg -->|"ruft auf"| External
  External -->|"Rohergebnis"| ToolReg
  ToolReg -->|"Inhaltsantwort"| Server
  Server -->|"Tool-Ergebnis"| Client

  Client -->|"resources/read Anfrage"| Server
  Server -->|"leitet Lesen weiter"| ResourceReg
  ResourceReg -->|"ruft Daten ab"| External
  ResourceReg -->|"Ressourceninhalt"| Server

  Client -->|"prompts/get Anfrage"| Server
  Server -->|"leitet get weiter"| PromptReg
  PromptReg -->|"gerenderte Nachrichten"| Server
```

## Wann verwenden / Wann NICHT verwenden

| Szenario | MCP-Server erstellen | Alternativen erwägen |
|---|---|---|
| Eine bestehende API oder einen Dienst für mehrere KI-Anwendungen bereitstellen | Beste Wahl — ein Server, jeder Client kann ihn verwenden | Direkter Funktionsaufruf, wenn nur ein Anbieter und eine App wichtig sind |
| Ein Dateisystem, eine Datenbank oder eine interne Datenquelle für KI-Kontext verpacken | Beste Wahl — Ressourcen und Tools passen natürlich | Benutzerdefinierte RAG-Pipeline, wenn semantischer Abruf der primäre Bedarf ist |
| Domänenspezifische Prompt-Vorlagen für KI-Benutzer bereitstellen | Prompts-Fähigkeit ist dafür konzipiert | System-Prompt-Injektion, wenn Vorlagen einfach und statisch sind |
| Tooling für eine einzelne, interne KI-Anwendung mit einem Anbieter erstellen | MCP fügt nützliche Struktur hinzu, kann aber überdimensioniert sein | In-Prozess-Tool-Funktionen sind einfacher |
| Tools bereitstellen, die Echtzeit-Streaming-Ergebnisse benötigen | Über SSE-Transport unterstützt | WebSockets oder benutzerdefiniertes Streaming, wenn Protokoll-Overhead wichtig ist |
| Tools, die langlebigen Zustand pro Benutzer über Sitzungen hinweg aufrechterhalten müssen | Erfordert sorgfältiges Server-Design – Sitzungen sind 1:1 | Zustandsbehafteter Backend-Dienst mit einem dünnen MCP-Wrapper |

## Code-Beispiele

### Vollständiger MCP-Server mit Tools, Ressourcen und einem Prompt

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

const server = new McpServer({
  name: "file-and-weather-server",
  version: "1.0.0",
});

// -----------------------------------------------------------------------
// Tool 1: Wettervorhersage abrufen (Mock — durch eine echte Wetter-API ersetzen)
// -----------------------------------------------------------------------
server.tool(
  "get_weather",
  "Fetches the current weather forecast for a given city. Returns temperature, conditions, and humidity.",
  {
    city: z.string().describe("The city name, e.g. 'Tokyo' or 'Berlin'"),
    units: z
      .enum(["celsius", "fahrenheit"])
      .default("celsius")
      .describe("Temperature units"),
  },
  async ({ city, units }) => {
    // In der Produktion hier eine echte Wetter-API aufrufen (z.B. Open-Meteo, WeatherAPI)
    const mockData = {
      city,
      temperature: units === "celsius" ? 18 : 64,
      units,
      condition: "Partly cloudy",
      humidity_percent: 72,
      forecast: "Light rain expected in the evening",
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(mockData, null, 2),
        },
      ],
    };
  }
);

// -----------------------------------------------------------------------
// Tool 2: Verzeichnisinhalte auflisten
// -----------------------------------------------------------------------
server.tool(
  "list_directory",
  "Lists the files and subdirectories in a given directory path. Use this to explore file system structure.",
  {
    dir_path: z
      .string()
      .describe("Absolute path to the directory to list"),
  },
  async ({ dir_path }) => {
    try {
      const entries = await fs.readdir(dir_path, { withFileTypes: true });
      const listing = entries.map((e) => ({
        name: e.name,
        type: e.isDirectory() ? "directory" : "file",
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(listing, null, 2),
          },
        ],
      };
    } catch (err) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error listing directory: ${(err as Error).message}`,
          },
        ],
      };
    }
  }
);

// -----------------------------------------------------------------------
// Ressource: Beliebige Textdatei nach Pfad lesen (URI-Vorlage)
// -----------------------------------------------------------------------
server.resource(
  "text-file",
  new ResourceTemplate("file:///{file_path}", { list: undefined }),
  async (uri, { file_path }) => {
    const resolvedPath = path.resolve(String(file_path));

    try {
      const content = await fs.readFile(resolvedPath, "utf-8");
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: content,
          },
        ],
      };
    } catch (err) {
      throw new Error(`Cannot read file at ${resolvedPath}: ${(err as Error).message}`);
    }
  }
);

// -----------------------------------------------------------------------
// Prompt: Geführte Dateianalyse-Vorlage
// -----------------------------------------------------------------------
server.prompt(
  "analyze_file",
  "Generates a structured prompt that guides the AI to analyze a text file for issues, patterns, or summaries.",
  {
    file_path: z.string().describe("Path to the file to analyze"),
    focus: z
      .string()
      .optional()
      .describe("Optional: specific aspect to focus on, e.g. 'security issues' or 'performance'"),
  },
  async ({ file_path, focus }) => {
    const focusInstruction = focus
      ? `Focus specifically on: ${focus}.`
      : "Provide a general analysis.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please analyze the file at \`${file_path}\`.

${focusInstruction}

Use the \`read_file\` resource (URI: file:///${file_path}) to read its contents, then provide:
1. A brief summary of what the file contains
2. Key observations or findings
3. Any recommendations or concerns

Be concise and structured.`,
          },
        },
      ],
    };
  }
);

// -----------------------------------------------------------------------
// Den Server starten
// -----------------------------------------------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Nach stderr loggen, damit es das stdio-Protokoll nicht stört
  console.error("file-and-weather-server is running on stdio");
}

main().catch((err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
```

### HTTP/SSE-Transport (für gemeinsam genutzte Remote-Server)

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";

const app = express();
const server = new McpServer({ name: "remote-server", version: "1.0.0" });

// Ihre Tools, Ressourcen und Prompts hier registrieren (gleiche API wie stdio)
// server.tool(...), server.resource(...), server.prompt(...)

// SSE-Endpunkt: Clients verbinden sich hier, um Server-zu-Client-Nachrichten zu empfangen
app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

// POST-Endpunkt: Clients senden Nachrichten hier
app.post("/messages", express.json(), async (req, res) => {
  // Der SSEServerTransport handhabt das Routing von der aktiven Sitzung
  res.status(200).send("ok");
});

app.listen(3000, () => {
  console.log("MCP server listening on http://localhost:3000");
});
```

## Praktische Ressourcen

- [MCP TypeScript SDK — Server-API-Referenz](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/src/server) — Quellcode und Inline-Dokumentation für `McpServer`, Transporte und alle serverseitigen Typen.
- [Offizielle MCP-Server-Beispiele](https://github.com/modelcontextprotocol/servers) — Referenzimplementierungen einschließlich Dateisystem, GitHub, PostgreSQL, Slack und mehr — unschätzbar als Ausgangspunkte.
- [MCP-Transport-Dokumentation](https://spec.modelcontextprotocol.io/specification/architecture/) — Protokollspezifikationsabschnitt, der stdio, HTTP/SSE und Streamable HTTP-Transporte ausführlich abdeckt.
- [Zod-Dokumentation](https://zod.dev) — Die Schema-Bibliothek, die vom TypeScript SDK für die Eingabevalidierung verwendet wird; das Verständnis von Zod-Typen entspricht direkt Tool-Parameter-Schemas.

## Siehe auch

- [Model Context Protocol Übersicht](/docs/mcp)
- [MCP-Clients erstellen](/docs/mcp/building-clients)
- [Agent-Tools und -Aktionen](/docs/agents/tools-actions)
