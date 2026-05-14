---
title: Meta Llama
description: Metas Open-Weights-Llama-Modellfamilie — lokale Bereitstellung, API-Hosting durch Drittanbieter, Fine-Tuning und die Debatte offen vs. geschlossen.
keywords: [Meta Llama, Llama 3, offene Gewichte, lokale Inferenz, llama.cpp, vLLM, Together AI, Groq, Fireworks AI, Fine-Tuning, Open-Source-LLM]
tags: [intermediate]
authors: [EmersonBraun]
---

# Meta Llama

## Definition

Metas Llama (Large Language Model Meta AI) ist eine Familie von Open-Weights-Sprachmodellen, die von Meta AI Research veröffentlicht wurden. Anders als vollständig proprietäre Modelle, die nur über eine kostenpflichtige API vertrieben werden, werden Llama-Modelle mit Gewichten veröffentlicht, die Entwickler herunterladen, inspizieren, modifizieren und weiterverbreiten können, und zwar unter Metas benutzerdefinierter Community-Lizenz. Das bedeutet, dass Organisationen Inferenz vollständig innerhalb ihrer eigenen Infrastruktur ausführen können, ohne Daten über einen Drittanbieter-Cloud-Dienst zu leiten — ein erheblicher Vorteil für datenschutzsensible Workloads. Die Serie begann 2023 mit Llama 1 und Llama 2 und erreichte einen bedeutenden Meilenstein mit der **Llama-3**-Generation.

Die **Llama-3-Familie** umfasst mehrere Größen und Spezialisierungen. Die Basis-Llama-3-Version enthielt 8-Milliarden- und 70-Milliarden-Parameter instruct-optimierte und Basis-Varianten. Spätere Versionen führten **Llama 3.1** (mit 405 Milliarden Parametern, erweitertem 128.000-Token-Kontextfenster und mehrsprachigen Verbesserungen), **Llama 3.2** (leichtgewichtige 1-Milliarden- und 3-Milliarden-Modelle für On-Device-Nutzung sowie 11-Milliarden- und 90-Milliarden-multimodale Vision-Varianten) und **Llama 3.3** (ein 70-Milliarden-Modell mit deutlich verbesserter mehrsprachiger und Schlussfolgerfähigkeit) ein. Zusammen decken sie ein breites Spektrum von der Edge-Bereitstellung bis hin zu nahezu führender Leistung ab.

Der Open-Weights-Modellbereich liegt an der Schnittstelle einer philosophischen und praktischen Debatte: **offen vs. geschlossen**. Befürworter offener Gewichte argumentieren, dass Transparenz, Überprüfbarkeit, Innovation der Community und Kostenkontrolle den Komfort einer verwalteten API überwiegen. Kritiker weisen darauf hin, dass große Open-Weights-Modelle im großen Maßstab teuer zu betreiben sind, technisches Fachwissen für Deployment und Absicherung erfordern, und dass „offene Gewichte" nicht dasselbe ist wie „Open Source" — die Trainingsdaten und die vollständige Methodik bleiben proprietär. In der Praxis enden die meisten Organisationen in einem Hybridmodell: Open-Weights-Modelle für sensible oder kostensensitive Workloads, während sie für modernste Fähigkeiten weiterhin auf geschlossene API-Anbieter setzen.

## Funktionsweise

### Lokale Bereitstellung — Transformers, llama.cpp, vLLM

Der direkteste Weg, Llama-Modelle auszuführen, ist lokal mit Hugging Face **Transformers**, das eine einheitliche Python-Schnittstelle für Hunderte von Modellarchitekturen bietet. Für kleinere Modelle (7B–13B) auf Consumer-Hardware ist **llama.cpp** der Goldstandard: Es ist eine reine C/C++-Inferenz-Engine mit GGUF-Quantisierungsunterstützung, die Llama 3 8B in 4-Bit-Quantisierung auf einer Laptop-CPU oder einer bescheidenen GPU mit akzeptabler Latenz ausführen kann. Für die Produktionsbereitstellung im großen Maßstab ist **vLLM** die empfohlene Lösung — es implementiert PagedAttention für effizientes KV-Cache-Management, ermöglicht kontinuierliches Batching und stellt eine OpenAI-kompatible REST-API bereit, sodass es einfach ist, Llama für jede GPT-4-Integration mit minimalen Codeänderungen auszutauschen. Jede Option belegt einen anderen Punkt auf der Latenz/Durchsatz/Hardware-Kompromissskala.

### Drittanbieter-API-Anbieter — Together AI, Groq, Fireworks AI

Für Teams, die die Flexibilität von Open-Weights-Modellen ohne den Infrastrukturaufwand wünschen, hosten mehrere spezialisierte Anbieter Llama-Modelle über verwaltete APIs. **Together AI** bietet Llama-3.x-Modelle mit wettbewerbsfähigen Pro-Token-Preisen und einem Python-SDK, das die OpenAI-Schnittstelle widerspiegelt. **Groq** betreibt Llama-Modelle auf angepasster LPU-Hardware (Language Processing Unit) und liefert extrem niedrige Latenz (oft einstellige Millisekunden pro Token) für interaktive Anwendungen. **Fireworks AI** konzentriert sich auf Fine-Tuned und serverlose Modell-Deployments mit starkem Fokus auf die Entwicklererfahrung. Diese Anbieter sind besonders wertvoll für Proof-of-Concept-Arbeit, Burst-Workloads oder Teams ohne GPU-Infrastruktur.

### Fine-Tuning offener Gewichte

Einer der überzeugendsten Vorteile von Open-Weights-Modellen ist der vollständige Fine-Tuning-Zugang. Organisationen können Llama an domänenspezifische Aufgaben, Stilanforderungen oder Sicherheitsprofile anpassen, indem sie Supervised Fine-Tuning (SFT) und Reinforcement Learning from Human Feedback (RLHF) einsetzen. In der Praxis verwenden die meisten Praktiker parametereffizientes Fine-Tuning über **LoRA** (Low-Rank Adaptation) oder **QLoRA** (LoRA auf quantisierten Gewichten), was den GPU-Speicherbedarf um den Faktor 4–10 reduziert. Die Fine-Tuned-Adapter-Gewichte sind im Vergleich zum Basismodell winzig und können zusammengeführt oder separat geladen werden. Tools wie **Hugging Face TRL**, **Axolotl** und **LLaMA-Factory** bieten High-Level-Trainingsschleifen für Llama-Fine-Tuning mit minimalem Boilerplate.

```mermaid
flowchart TD
    Source["Meta model weights\n(Hugging Face Hub / Meta.ai)"] -->|"download weights"| Local

    subgraph Local["Local / Self-hosted inference"]
        direction LR
        TF["Hugging Face Transformers\n(GPU server)"]
        LCPP["llama.cpp\n(CPU or consumer GPU)"]
        vLLM["vLLM\n(production serving, OpenAI-compatible API)"]
    end

    Source -->|"weights available for fine-tuning"| FT["Fine-tuning\n(LoRA / QLoRA / SFT)"]
    FT -->|"merged or adapter weights"| Local

    Source -->|"hosted by provider"| Providers

    subgraph Providers["Third-party API providers"]
        direction LR
        Together["Together AI\n(Llama 3.x, competitive pricing)"]
        Groq["Groq\n(LPU hardware, ultra-low latency)"]
        Fireworks["Fireworks AI\n(serverless, fine-tuned models)"]
    end

    Local -->|"inference request"| App["Your Application"]
    Providers -->|"REST API response"| App
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|----------|------------|
| Datenschutz von höchster Bedeutung ist — regulierte Branchen, personenbezogene Daten, vertrauliches geistiges Eigentum, das die Infrastruktur nicht verlassen darf | Modernste Frontier-Fähigkeiten benötigt werden (GPT-4o / Claude 3.5 übertreffen Llama 3 bei vielen komplexen Schlussfolgerbenchmarks noch) |
| Kostenkontrolle bei hohem Volumen — Pro-Token-API-Kosten summieren sich schnell; Self-Hosting großer Modelle kann ab bestimmten QPS-Schwellenwerten deutlich günstiger sein | ML-Engineering-Kapazität fehlt, um GPU-Infrastruktur zu verwalten, Modelle aktuell zu halten und Sicherheits-Patches einzuspielen |
| Das Modell auf proprietären Daten fine-getuned werden soll, um das Verhalten oder den Stil tiefgehend anzupassen | Eine produktionsreife verwaltete API mit SLAs, Auto-Scaling und keinerlei Betriebsaufwand sofort benötigt wird |
| Vollständige Überprüfbarkeit und die Möglichkeit gewünscht wird, Modellgewichte für Compliance- oder Red-Teaming-Zwecke zu inspizieren | Der Workload Echtzeit-Web-Grounding oder natives multimodales Video/Audio erfordert (Llama 3.2 fügt Vision hinzu, ist aber nicht auf dem Niveau von Gemini 1.5) |
| Inferenz On-Device ohne Netzwerkabhängigkeit gewünscht wird (Llama 3.2 1B/3B, llama.cpp) | Das Team Modelle schnell evaluiert und Iterationsgeschwindigkeit wichtiger ist als Datenkontrolle |

## Vergleiche

| Kriterium | Meta Llama 3.x | OpenAI GPT-4o | Mistral (Open-Weights) |
|-----------|---------------|--------------|------------------------|
| Gewichts-Verfügbarkeit | Open-Weights-Download (Community-Lizenz) | Nur geschlossene API | Open-Weights für 7B / Mixtral; geschlossen für Mistral Large |
| Größtes Modell | 405B (Llama 3.1) | Nicht offengelegt | ~141B effektiv (Mixtral 8x22B) |
| Self-Hosting | Vollständig unterstützt; llama.cpp, vLLM, Transformers | Nicht möglich | Vollständig unterstützt; dieselbe Toolchain wie Llama |
| Verwaltete API-Optionen | Together AI, Groq, Fireworks, AWS Bedrock, Azure AI | OpenAI direkt, Azure OpenAI | La Plateforme (mistral.ai), Together AI |
| Fine-Tuning | Ja — LoRA, QLoRA, SFT auf vollständigen Gewichten | Fine-Tuning-API nur für GPT-3.5/4o-mini | Ja — dieselbe Open-Weights-Toolchain |
| Multimodal | Llama 3.2 (11B/90B Vision) | GPT-4o (Text + Bild, Audio nativ) | Nur Text für offene Modelle; Pixtral über API |
| Europäische Datensouveränität | Möglich mit EU-Regionen-Self-Hosting | Begrenzt (nur Azure EU-Regionen) | Nativer EU-basierter Anbieter (Hauptsitz Paris) |

## Code-Beispiele

```python
# meta_llama_examples.py
# Demonstrates two deployment paths:
#   1. Local inference with Hugging Face Transformers
#   2. Third-party API via Together AI (OpenAI-compatible interface)
#
# pip install transformers accelerate torch together

# ─────────────────────────────────────────────────────────────────────────────
# Path 1: Local inference with Hugging Face Transformers
# Requires a GPU with enough VRAM (e.g. RTX 3090 for 8B in bfloat16,
# or use load_in_4bit=True with bitsandbytes for lower VRAM).
# ─────────────────────────────────────────────────────────────────────────────
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


def local_llama_inference(prompt: str, model_id: str = "meta-llama/Meta-Llama-3.1-8B-Instruct"):
    """
    Run Llama 3.1 8B Instruct locally.
    Requires a Hugging Face token with access granted at meta-llama/Meta-Llama-3.1-8B-Instruct.
    Set HF_TOKEN environment variable or pass token= to from_pretrained.
    """
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        torch_dtype=torch.bfloat16,
        device_map="auto",          # automatically distribute across available GPUs
        # load_in_4bit=True,        # uncomment for QLoRA / low VRAM inference
    )

    # Llama 3 instruct models use a chat template
    messages = [
        {"role": "system", "content": "You are a helpful data science assistant."},
        {"role": "user", "content": prompt},
    ]
    input_ids = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        return_tensors="pt",
    ).to(model.device)

    outputs = model.generate(
        input_ids,
        max_new_tokens=512,
        temperature=0.6,
        top_p=0.9,
        do_sample=True,
        eos_token_id=tokenizer.eos_token_id,
    )

    # Decode only the generated tokens (skip the input)
    generated = outputs[0][input_ids.shape[-1]:]
    return tokenizer.decode(generated, skip_special_tokens=True)


# ─────────────────────────────────────────────────────────────────────────────
# Path 2: Together AI — managed Llama API (OpenAI-compatible)
# Requires a Together AI account: https://api.together.ai
# pip install together
# ─────────────────────────────────────────────────────────────────────────────
from together import Together


def together_ai_inference(prompt: str):
    """
    Call Llama 3.1 405B via Together AI's managed inference API.
    Together AI uses an OpenAI-compatible interface, so the openai SDK
    also works — just point base_url at https://api.together.xyz/v1.
    """
    client = Together(api_key="YOUR_TOGETHER_API_KEY")

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
        messages=[
            {"role": "system", "content": "You are a helpful data science assistant."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=512,
        temperature=0.6,
        top_p=0.9,
    )

    return response.choices[0].message.content


# ─────────────────────────────────────────────────────────────────────────────
# Path 3: vLLM — production-grade OpenAI-compatible server (run separately)
# Start server: vllm serve meta-llama/Meta-Llama-3.1-8B-Instruct --port 8000
# Then query it as if it were the OpenAI API:
# ─────────────────────────────────────────────────────────────────────────────
from openai import OpenAI


def vllm_server_inference(prompt: str, base_url: str = "http://localhost:8000/v1"):
    """
    Query a locally running vLLM server.
    vLLM exposes an OpenAI-compatible API at /v1/chat/completions.
    """
    client = OpenAI(api_key="not-needed-for-local", base_url=base_url)

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=256,
        temperature=0.7,
    )
    return response.choices[0].message.content


# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    test_prompt = "Explain the bias-variance tradeoff in machine learning."

    # Uncomment to run local inference (requires GPU + HF access)
    # print("=== Local (Transformers) ===")
    # print(local_llama_inference(test_prompt))

    print("=== Together AI ===")
    print(together_ai_inference(test_prompt))

    # Uncomment if you have a vLLM server running
    # print("=== vLLM Server ===")
    # print(vllm_server_inference(test_prompt))
```

## Praktische Ressourcen

- [Llama GitHub-Repository (Meta)](https://github.com/meta-llama/llama-models) — Offizielle Modellkarten, Download-Anweisungen und die Community-Lizenz für die gesamte Llama-3-Familie.
- [Llama 3 auf Hugging Face](https://huggingface.co/meta-llama) — Modellgewichte, Tokenizer-Dateien und Community-Fine-Tunes; erfordert ein Hugging-Face-Konto mit erteiltem Zugang.
- [llama.cpp](https://github.com/ggerganov/llama.cpp) — Leichtgewichtige C/C++-Inferenz-Engine mit GGUF-Quantisierung; das bevorzugte Tool für CPU- und Consumer-GPU-Bereitstellung.
- [Together AI-Dokumentation](https://docs.together.ai/) — Verwaltete Llama-API-Referenz, Preise und Fine-Tuning-Leitfäden für gehostete Open-Weights-Modelle.
- [vLLM-Dokumentation](https://docs.vllm.ai/) — Produktionsbereitstellungs-Framework mit PagedAttention, kontinuierlichem Batching und OpenAI-kompatiblem Server.

## Siehe auch

- [Modellanbieter](/docs/model-providers)
- [Lokale Inferenz](/docs/local-inference)
- [Infrastruktur](/docs/infrastructure)
- [LLMs — Fine-Tuning](/docs/llms/fine-tuning)
- [Meta Llama → Mistral-Vergleich](/docs/model-providers/mistral)
