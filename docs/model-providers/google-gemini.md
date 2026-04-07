---
title: Google Gemini
description: Google's multimodal AI platform — the Gemini model family, AI Studio, and Vertex AI integration for enterprise-grade generative AI.
keywords: [Google Gemini, Vertex AI, AI Studio, multimodal AI, Gemini Pro, Gemini Flash, Gemini Ultra, generative AI, Google AI]
tags: [beginner]
authors: [EmersonBraun]
---

# Google Gemini

## Definition

Google Gemini is Google's flagship family of multimodal large language models and the platform surrounding them. Announced in late 2023 and succeeding the PaLM 2 family, Gemini was designed from the ground up to reason across text, images, video, audio, and code within a single unified model architecture. Unlike systems that bolt on vision through separate pipelines, Gemini's native multimodality means the model processes all modalities jointly during training and inference, allowing richer cross-modal reasoning.

The Gemini family spans four tiers tuned for different use-cases: **Gemini Ultra** (the most capable, targeted at complex enterprise and research tasks), **Gemini Pro** (the balanced workhorse for broad commercial use), **Gemini Flash** (optimized for low-latency, high-throughput applications at reduced cost), and **Gemini Nano** (on-device inference for Android and edge hardware). Each tier is versioned (e.g., Gemini 1.5 Pro, Gemini 2.0 Flash), and Google releases new versions on a rolling basis.

Developers access Gemini through two complementary surfaces. **Google AI Studio** is a free, browser-based prototyping environment that provides API keys and lets you experiment with prompts, system instructions, and multimodal inputs without any infrastructure setup. **Vertex AI** is Google Cloud's managed ML platform and the recommended path for production workloads — it adds enterprise controls like VPC Service Controls, IAM, audit logging, fine-tuning pipelines, and SLA-backed endpoints. Both surfaces consume the same underlying Gemini models via the Generative Language API.

## How it works

### Generative Language API

The Generative Language API (`generativelanguage.googleapis.com`) is the unified REST interface for all Gemini models. Requests are structured as a `contents` array — each item has a `role` (`user` or `model`) and one or more `parts` (text, inline data, or file URIs). The API returns a `candidates` array with `content`, `finishReason`, and `safetyRatings`. Token counts, grounding metadata, and function-call responses are returned in the same envelope. API keys from AI Studio work for development; production workloads use service-account credentials through Vertex AI.

### Multimodal inputs — image, video, and audio

Gemini accepts images (JPEG, PNG, WebP, HEIC), video (MP4, MOV, AVI up to several hours), and audio (MP3, WAV, FLAC) directly alongside text in a single request. Images can be sent as inline base64 data or via Cloud Storage URIs. For long videos, the File API uploads the asset asynchronously and returns a file URI that can be referenced in subsequent `generateContent` calls. The model internally tokenizes non-text modalities so the same context-window accounting and attention mechanisms apply uniformly, enabling tasks like "summarize the audio track of this video and identify when the speaker changes topic."

### Grounding with Google Search

Gemini supports retrieval-grounded generation through an optional `tools` parameter that enables `google_search_retrieval`. When this tool is active, the model can issue search queries mid-generation, retrieve real-time web results, and synthesize them into its response — returning citations alongside the generated text. This is especially valuable for factually dense or time-sensitive queries where a static parametric model would hallucinate or return stale information. Grounding is available in both AI Studio and Vertex AI and can be combined with other tools.

### Vertex AI integration

On Vertex AI, Gemini is accessed through the `vertexai` Python SDK (`aiplatform`). Vertex adds fine-tuning (supervised fine-tuning and RLHF pipelines), model evaluation datasets, model gardens for comparing models, deployment to dedicated endpoints with autoscaling, and Vertex AI Pipelines for orchestrating end-to-end ML workflows. Enterprise customers benefit from data residency guarantees, private networking via VPC Service Controls, and Cloud Audit Logs for every API call — features not available in AI Studio.

```mermaid
flowchart LR
    Dev[Developer / Application] -->|"API key or service account"| GLAPI["Generative Language API\ngenerativelanguage.googleapis.com"]

    GLAPI -->|"routes to model tier"| Ultra[Gemini Ultra\nhigh-capability tasks]
    GLAPI -->|"routes to model tier"| Pro[Gemini Pro\nbalanced / production]
    GLAPI -->|"routes to model tier"| Flash[Gemini Flash\nlow-latency / high-throughput]
    GLAPI -->|"on-device"| Nano[Gemini Nano\nAndroid / edge]

    Dev -->|"upload assets"| FileAPI[File API\nvideo & audio URIs]
    FileAPI -->|"file URI in request"| GLAPI

    GLAPI -->|"search retrieval tool"| GSearch[Google Search\nreal-time grounding]
    GSearch -->|"grounded results"| GLAPI

    AIStudio[Google AI Studio\nprototyping] -->|"generates"| GLAPI
    VertexAI[Vertex AI\nenterprise production] -->|"managed endpoint"| GLAPI
    VertexAI -->|"fine-tuning pipeline"| FT[Fine-tuned model\ndeployed on Vertex]
```

## When to use / When NOT to use

| Use when | Avoid when |
|----------|------------|
| You need native multimodal reasoning over images, video, or audio alongside text | Your workload is text-only and you prefer a provider with a longer public API track record |
| You are already on Google Cloud and want deep Vertex AI / GCP integration (IAM, VPC, Audit Logs) | You have strict data residency requirements in regions where Vertex AI is not yet available |
| You require real-time grounding through Google Search | Your application needs deterministic, reproducible outputs (grounding introduces variability from live search) |
| Cost efficiency at scale matters — Gemini Flash is highly competitive on price-per-token | You need an extensively documented open-weights model you can run on-premise |
| You want a free, frictionless prototyping environment with no credit card (AI Studio free tier) | Your team is already deeply invested in the OpenAI API surface and migration cost is high |

## Comparisons

| Criterion | Google Gemini | OpenAI GPT-4o | Anthropic Claude 3.5 |
|-----------|--------------|--------------|----------------------|
| Multimodal capability | Native — text, image, video, audio in one model | Text + image (GPT-4V); audio via separate Whisper/TTS APIs | Text + image (Claude 3); no native video/audio |
| Enterprise / cloud integration | Deep GCP integration via Vertex AI — IAM, VPC, Audit Logs, fine-tuning | Azure OpenAI Service for enterprise; limited non-Azure cloud portability | AWS Bedrock and direct API; no native GCP integration |
| Grounding / real-time retrieval | Built-in Google Search grounding tool | Web browsing plugin (ChatGPT); no native API grounding | No built-in search; relies on user-provided RAG |
| Context window | Up to 1M tokens (Gemini 1.5 Pro) | 128k tokens (GPT-4o) | 200k tokens (Claude 3.5 Sonnet) |
| Open-weights availability | Closed API only | Closed API only | Closed API only |
| Pricing model | Per-token; Flash tier very competitive | Per-token; GPT-4o mid-range | Per-token; comparable to GPT-4o |
| Fine-tuning | Supervised fine-tuning on Vertex AI | Fine-tuning API for GPT-3.5/4o-mini | No public fine-tuning API |

## Code examples

```python
# google_gemini_examples.py
# Demonstrates text generation, multimodal image input, and embeddings
# using the google-generativeai SDK.
# pip install google-generativeai pillow

import google.generativeai as genai
import pathlib

# ── Configuration ─────────────────────────────────────────────────────────────
# Set your API key from https://aistudio.google.com/app/apikey
genai.configure(api_key="YOUR_API_KEY")


# ── 1. Text generation ────────────────────────────────────────────────────────
def text_generation_example():
    """Simple single-turn text completion with Gemini Flash."""
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction="You are a concise technical writer.",
    )

    response = model.generate_content(
        "Explain the difference between supervised and unsupervised learning "
        "in three sentences.",
        generation_config=genai.GenerationConfig(
            temperature=0.4,
            max_output_tokens=256,
        ),
    )

    print("=== Text Generation ===")
    print(response.text)
    print(f"Finish reason : {response.candidates[0].finish_reason}")
    print(f"Total tokens  : {response.usage_metadata.total_token_count}")


# ── 2. Multimodal — image input ───────────────────────────────────────────────
def multimodal_image_example(image_path: str):
    """
    Send a local image alongside a text prompt to Gemini Pro.
    The model reasons over both modalities jointly.
    """
    model = genai.GenerativeModel("gemini-1.5-pro")

    image_data = pathlib.Path(image_path).read_bytes()
    # Inline image part
    image_part = {
        "mime_type": "image/jpeg",  # adjust to image/png, image/webp as needed
        "data": image_data,
    }

    response = model.generate_content(
        [image_part, "Describe this image and identify any text present in it."]
    )

    print("\n=== Multimodal Image Input ===")
    print(response.text)


# ── 3. Embeddings ─────────────────────────────────────────────────────────────
def embeddings_example(texts: list[str]):
    """
    Generate text embeddings using the text-embedding-004 model.
    Embeddings can be used for semantic search, clustering, and classification.
    """
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=texts,
        task_type="retrieval_document",  # or retrieval_query, semantic_similarity
    )

    print("\n=== Embeddings ===")
    for text, embedding in zip(texts, result["embedding"]):
        print(f"Text    : {text[:60]}...")
        print(f"Dims    : {len(embedding)}")
        print(f"First 5 : {embedding[:5]}\n")


# ── 4. Multi-turn chat ────────────────────────────────────────────────────────
def multi_turn_chat_example():
    """Maintain conversational context using the chat interface."""
    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(history=[])

    turns = [
        "What is gradient descent?",
        "How does the learning rate affect it?",
        "What is Adam optimizer and how does it improve on basic gradient descent?",
    ]

    print("\n=== Multi-turn Chat ===")
    for user_message in turns:
        response = chat.send_message(user_message)
        print(f"User  : {user_message}")
        print(f"Model : {response.text}\n")


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    text_generation_example()

    # Provide a path to a local JPEG/PNG for multimodal demo
    # multimodal_image_example("path/to/your/image.jpg")

    embeddings_example([
        "Machine learning is a subset of artificial intelligence.",
        "Deep learning uses neural networks with many layers.",
        "Reinforcement learning trains agents through reward signals.",
    ])

    multi_turn_chat_example()
```

## Practical resources

- [Google AI Studio](https://aistudio.google.com/) — Free browser-based environment for prototyping with Gemini; generates API keys and lets you tune prompts interactively with no infrastructure required.
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs) — Official reference covering all models, endpoints, multimodal input formats, grounding, function calling, and the File API.
- [Vertex AI — Generative AI documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/overview) — Enterprise path: fine-tuning, model evaluation, deployment, and GCP security controls.
- [google-generativeai Python SDK on PyPI](https://pypi.org/project/google-generativeai/) — SDK source, changelog, and usage examples.

## See also

- [Model Providers](/docs/model-providers)
- [Multimodal AI](/docs/multimodal-ai)
- [Case Studies — Gemini](/docs/case-studies/gemini)
