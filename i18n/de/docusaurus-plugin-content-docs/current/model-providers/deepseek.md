---
title: DeepSeek
description: Chinese AI lab offering open-weights models with state-of-the-art reasoning and coding capabilities at significantly lower cost than proprietary alternatives.
keywords: [deepseek, DeepSeek-V3, DeepSeek-R1, reasoning model, chain-of-thought, open weights, code generation, cost-efficient LLM, Chinese AI]
tags: [intermediate]
authors: [EmersonBraun]
---

# DeepSeek

## Definition

**DeepSeek** ist ein chinesisches KI-Forschungslabor und eine kommerzielle Plattform, die international erhebliche Aufmerksamkeit erlangt hat, indem sie Modelle produziert, die mit den besten proprietären Modellen konkurrenzfähig sind, die Gewichte offen veröffentlicht und zu einem Bruchteil der Kosten betrieben werden. DeepSeek wurde 2023 als Tochtergesellschaft von High-Flyer (einem quantitativen Hedgefonds) gegründet und zeichnet sich durch rigorose Forschung zur Trainingseffizienz aus — einschließlich Innovationen in Mixture-of-Experts (MoE)-Architekturen, Reinforcement Learning from Human Feedback und neuartigen Ansätzen zum Reasoning, die nicht auf massive Rechenbudgets angewiesen sind.

Die Modellpalette umfasst drei Hauptfähigkeitsbereiche. **DeepSeek-V3** ist ein Allzweck-Chat- und Instruktionsfolgemodell, das GPT-4o und Claude 3.5 Sonnet auf Standard-Benchmarks annähernd erreicht, während es über die API dramatisch günstiger zugänglich ist. **DeepSeek-R1** ist ein dediziertes Reasoning-Modell, das erweitertes Chain-of-Thought (CoT) verwendet — das Modell generiert explizite Reasoning-Traces vor der endgültigen Antwort — was es besonders stark in Mathematik, logischer Deduktion und mehrstufiger Problemlösung macht. **DeepSeek-Coder** (und seine Nachfolgervarianten, die in V3/R1 integriert sind) spezialisiert sich auf Code-Generierung, -Vervollständigung und Debugging in einer Vielzahl von Programmiersprachen.

DeepSeeks Open-Weights-Ansatz bedeutet, dass alle wichtigen Modelle auf Hugging Face unter permissiven Lizenzen verfügbar sind und auf eigener Infrastruktur selbst gehostet werden können — eine kritische Fähigkeit für Organisationen mit Datensouveränitätsanforderungen oder solche, die API-Kosten pro Token bei großem Volumen vermeiden möchten. Die DeepSeek-Plattform stellt auch eine API bereit, die wire-kompatibel mit dem OpenAI-API-Format ist, was bedeutet, dass jede mit dem OpenAI-Python-SDK erstellte Anwendung durch Änderung der `base_url` und des API-Schlüssels ohne sonstige Codeänderungen auf DeepSeek-Modelle umstellen kann.

## Funktionsweise

### API-Plattform

DeepSeek hostet eine Cloud-Inferenz-API unter `api.deepseek.com`, die Anfragen im OpenAI-Chat-Completions-Format akzeptiert. Diese Kompatibilitätsschicht bedeutet, dass der Integrationsaufwand minimal ist — mit dem OpenAI-SDK vertraute Entwickler können DeepSeek-Modelle in Minuten migrieren oder testen. Die Plattform unterstützt Streaming-Antworten, Funktionsaufruf und System-Prompts. Die Preise sind tokenbasiert und öffentlich gelistet, mit Tarifen, die typischerweise 90–95% niedriger als gleichwertige OpenAI-Modelle sind, was hochvolumige Produktionsbereitstellungen erheblich günstiger macht.

### Reasoning-Modelle (DeepSeek-R1)

DeepSeek-R1 wird mit einem mehrstufigen Prozess trainiert, der Reinforcement Learning einsetzt, um das Modell für die Produktion korrekter endgültiger Antworten zu belohnen — entscheidend, ohne auf überwachte Chain-of-Thought-Daten in der Kerntrain-Phase zu setzen. Das Modell generiert einen `<think>`-Block mit seinem Reasoning-Trace vor der endgültigen Antwort. Dieser explizite Notizblock ermöglicht es dem Modell, mehrstufige Deduktion durchzuführen, seine Arbeit zu überprüfen und von falschen Pfaden zurückzukehren — Verhaltensweisen, die die Leistung bei Mathematik-Olympiade-Problemen, formaler Logik und komplexen Codierungsaufgaben, die eine Planung über viele Schritte erfordern, dramatisch verbessern.

### Code-Modelle und DeepSeek-Coder

DeepSeeks code-spezialisierte Modelle werden auf großen Korpora von Quellcode (GitHub, Wettbewerbsprogrammierungsplattformen, Dokumentation) vortrainiert und für das Befolgen von Codierungsaufgaben feinabgestimmt. Sie unterstützen Fill-in-the-Middle (FIM)-Vervollständigung, das Standardformat für IDE-Autovervollständigungs-Tools wie Copilot. DeepSeek-Coder erzielt Top-Leistungen auf HumanEval, MBPP und SWE-bench und übertrifft häufig Modelle, die von anderen Anbietern mehrfach größer sind. Die Codierungsfähigkeiten sind auch in DeepSeek-V3 und R1 integriert, sodass Allzweckmodelle auch bei Code-Aufgaben gut abschneiden.

### Open-Weights-Bereitstellung

Alle wichtigen DeepSeek-Modelle haben ihre Gewichte auf Hugging Face unter permissiven Lizenzen veröffentlicht, was selbst gehostete Inferenz auf Consumer- oder Enterprise-GPU-Hardware ermöglicht. DeepSeek-V3 verwendet eine Mixture-of-Experts-Architektur, bei der nur eine Teilmenge der Parameter pro Token aktiviert wird, was die Inferenzkosten im Vergleich zu dichten Modellen vergleichbarer Leistungsfähigkeit erheblich reduziert. Beliebte Bereitstellungsoptionen sind vLLM, Ollama (für quantisierte Versionen) und NVIDIA NIM-Container. Die selbst gehostete Bereitstellung ist besonders attraktiv für groß angelegte Batch-Workloads, Feinabstimmung auf proprietären Daten oder Szenarien, in denen alle Daten On-Premises bleiben müssen.

```mermaid
flowchart TD
  U[User / Application] -->|OpenAI-compatible request| API[DeepSeek API\napi.deepseek.com]
  U -->|self-hosted request| SH[Self-Hosted Inference\nvLLM / Ollama / NIM]

  API -->|general chat / code| V3[DeepSeek-V3]
  API -->|reasoning tasks| R1[DeepSeek-R1]
  SH -->|open weights| HF[Hugging Face\nModel Weights]

  R1 -->|generates reasoning trace| THINK["\<think\> block\n(chain-of-thought)"]
  THINK -->|produces| ANS[Final Answer]
  V3 -->|direct response| ANS
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|----------------|----------------|
| Kosten eine primäre Einschränkung sind — DeepSeek-API ist 90%+ günstiger als GPT-4o bei vergleichbarer Qualität | Sie einen Anbieter mit etabliertem Enterprise-SLA, Compliance-Zertifizierungen (SOC 2, HIPAA) oder US-basierter Datenverarbeitung benötigen |
| Aufgaben tiefes mehrstufiges Reasoning erfordern: Mathematik, Logik, formale Beweise, komplexe Codierung | Ihre Aufgabe primär multimodal ist — DeepSeek-V3/R1 sind nur-Text-Modelle |
| Sie Open-Weight-Modelle für Datensouveränität oder benutzerdefinierte Feinabstimmung selbst hosten möchten | Sie das breitestmögliche Plugin-/Tool-Ökosystem und Drittanbieter-Integrationen benötigen |
| Hochvolumige Batch-Pipelines aufgebaut werden, bei denen sich die Reduzierung der Pro-Token-Kosten erheblich ansammelt | Latenz-kritische Consumer-Anwendungen, bei denen R1s Reasoning-Trace die Antwortzeit verlängert |
| Code-Generierung, Code-Review oder Debugging Ihre primären Anwendungsfälle sind | Sie sich in einer Jurisdiktion mit regulatorischen Anforderungen bezüglich der Herkunft von KI-Modellen befinden |

## Vergleiche

| Kriterium | DeepSeek (V3 / R1) | OpenAI (GPT-4o / o1) | Meta / Llama |
|-----------|--------------------|----------------------|--------------|
| Reasoning-Leistung | R1 konkurrenzfähig mit o1 bei Mathematik-/Logik-Benchmarks | o1 ist erstklassig; GPT-4o stark beim allgemeinen Reasoning | Llama 3.x konkurrenzfähig, aber unterhalb R1/o1 bei hartem Reasoning |
| Allgemeine Chat-Qualität | V3 konkurrenzfähig mit GPT-4o | GPT-4o beste allgemeine Qualität | Llama 3.3 70B konkurrenzfähig für seine Größe |
| Open Weights | Ja (alle Modelle auf Hugging Face) | Nein (nur proprietär) | Ja (Meta Open-Sources Llama) |
| API-Kosten | Sehr niedrig (~$0,27/M Eingabe-Token für V3) | Hoch (~$2,50/M für GPT-4o-Eingabe) | Kostenlos (selbst gehostet); Fireworks/Together API erschwinglich |
| Ökosystem & Integrationen | Wachsend; OpenAI-kompatible API erleichtert Adoption | Größtes Ökosystem, meiste Integrationen | Großes Open-Source-Ökosystem |
| Datensouveränität | Selbst-Host möglich; API-Daten in China verarbeitet | Azure OpenAI für US-Regionsverarbeitung | Vollständiges Selbst-Hosting möglich |
| Multimodal | Nur Text (V3/R1) | Ja (GPT-4o, DALL-E) | Llama 3.2 hat Vision-Fähigkeiten |

## Vor- und Nachteile

| Vorteile | Nachteile |
|----------|-----------|
| Dramatisch niedrigere API-Kosten als OpenAI/Anthropic | API-Daten werden über chinesische Server geleitet — Bedenken für einige regulierte Branchen |
| R1 liefert frontier-level Reasoning-Leistung | R1-Reasoning-Traces fügen Latenz und Token-Nutzung hinzu |
| OpenAI-kompatible API — nahezu null Wechselkosten | Geringere Vertrauens-/Markenbekanntheit in westlichen Enterprise-Verkaufszyklen |
| Open Weights ermöglichen Self-Hosting und Feinabstimmung | V3/R1 sind nur-Text; keine nativen Bild- oder Audiofähigkeiten |
| Starke Code-Generierung in den meisten gängigen Programmiersprachen | Community und Dokumentation primär auf Chinesisch; englische Ressourcen holen noch auf |

## Codebeispiele

### Chat-Vervollständigung mit DeepSeek-V3 (OpenAI-kompatibel)

```python
from openai import OpenAI

# DeepSeek uses the OpenAI SDK with a custom base_url
client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",  # maps to DeepSeek-V3
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "Explain the difference between MoE and dense transformer architectures."},
    ],
    temperature=0.7,
    max_tokens=1024,
)

print(response.choices[0].message.content)
```

### Reasoning mit DeepSeek-R1 (Chain-of-Thought)

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-reasoner",  # maps to DeepSeek-R1
    messages=[
        {
            "role": "user",
            "content": (
                "A train leaves City A at 08:00 and travels at 120 km/h. "
                "Another train leaves City B (300 km away) at 09:00 and travels "
                "toward City A at 80 km/h. At what time do they meet?"
            ),
        }
    ],
)

# R1 exposes the reasoning trace in reasoning_content
message = response.choices[0].message
if hasattr(message, "reasoning_content") and message.reasoning_content:
    print("=== Reasoning trace ===")
    print(message.reasoning_content)
    print()

print("=== Final answer ===")
print(message.content)
```

### Streaming-Antwort mit DeepSeek-V3

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

stream = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Write a Python function that implements binary search."},
    ],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta
    if delta.content:
        print(delta.content, end="", flush=True)
print()
```

### Selbst gehostete Inferenz mit vLLM

```python
# Start vLLM server (run in terminal):
# vllm serve deepseek-ai/DeepSeek-V3 --tensor-parallel-size 4 --port 8000

from openai import OpenAI

# Point to your local vLLM server instead of DeepSeek cloud
client = OpenAI(
    api_key="not-needed",  # vLLM does not require a real key
    base_url="http://localhost:8000/v1",
)

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3",
    messages=[
        {"role": "user", "content": "Summarize the key advantages of mixture-of-experts models."},
    ],
)

print(response.choices[0].message.content)
```

## Praktische Ressourcen

- [DeepSeek-API-Dokumentation](https://platform.deepseek.com/api-docs/) — Offizielle Referenz für die DeepSeek-Plattform-API einschließlich Modellen, Parametern und Preisen
- [DeepSeek GitHub](https://github.com/deepseek-ai) — Open-Source-Repositories für DeepSeek-Modelle, Trainingscode und Forschungsarbeiten
- [DeepSeek-R1 auf Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-R1) — Modellkarte mit Gewichten, Benchmark-Ergebnissen und Bereitstellungsanweisungen
- [DeepSeek-V3 technischer Bericht](https://arxiv.org/abs/2412.19437) — Forschungsarbeit zur V3-Architektur, Trainingsansatz und Benchmark-Vergleichen
- [vLLM DeepSeek Bereitstellungsleitfaden](https://docs.vllm.ai/en/latest/models/supported_models.html) — Anweisungen für das Selbst-Hosten von DeepSeek-Modellen mit vLLM für Produktionsinferenz

## Siehe auch

- [Modellanbieter](/docs/model-providers)
- [DeepSeek Fallstudie](/docs/case-studies/deepseek)
- [Reasoning-Muster](/docs/reasoning-patterns)
