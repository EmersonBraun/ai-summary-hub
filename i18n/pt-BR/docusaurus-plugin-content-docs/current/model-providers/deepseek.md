---
title: DeepSeek
description: Laboratório de IA chinês que oferece modelos de pesos abertos com capacidades de raciocínio e codificação de última geração a um custo significativamente menor que as alternativas proprietárias.
keywords: [deepseek, DeepSeek-V3, DeepSeek-R1, modelo de raciocínio, chain-of-thought, pesos abertos, geração de código, LLM econômico, IA chinesa]
---

# DeepSeek

## Definição

**DeepSeek** é um laboratório de pesquisa em IA chinês e plataforma comercial que ganhou atenção internacional significativa por produzir modelos com desempenho competitivo com os melhores modelos proprietários, enquanto disponibiliza os pesos abertamente e opera a uma fração do custo. Fundada em 2023 como subsidiária da High-Flyer (um fundo de hedge quantitativo), a abordagem da DeepSeek é caracterizada por pesquisa rigorosa em eficiência de treinamento — incluindo inovações em arquiteturas mixture-of-experts (MoE), aprendizado por reforço a partir de feedback humano e novas abordagens de raciocínio que não dependem de grandes orçamentos de computação.

A linha de modelos abrange três grandes áreas de capacidade. **DeepSeek-V3** é um modelo de chat e seguimento de instruções de propósito geral que rivaliza com GPT-4o e Claude 3.5 Sonnet em benchmarks padrão, sendo dramaticamente mais barato de acessar via API. **DeepSeek-R1** é um modelo de raciocínio dedicado que usa chain-of-thought (CoT) estendida — o modelo gera rastreamentos de raciocínio explícitos antes de produzir uma resposta final — sendo particularmente forte em matemática, dedução lógica e resolução de problemas em múltiplas etapas. **DeepSeek-Coder** (e suas variantes sucessoras integradas ao V3/R1) é especializado em geração de código, completação e depuração em uma ampla gama de linguagens de programação.

A abordagem de pesos abertos da DeepSeek significa que todos os principais modelos estão disponíveis no Hugging Face e podem ser auto-hospedados em sua própria infraestrutura — uma capacidade crítica para organizações com requisitos de soberania de dados ou que buscam evitar custos de API por token em escala. A plataforma DeepSeek também expõe uma API compatível com o formato da API da OpenAI, o que significa que qualquer aplicação construída com o SDK Python da OpenAI pode trocar para modelos DeepSeek alterando apenas a `base_url` e a chave de API, sem outras mudanças no código.

## Como funciona

### Plataforma de API

A DeepSeek hospeda uma API de inferência em nuvem em `api.deepseek.com` que aceita requisições no formato OpenAI Chat Completions. Essa camada de compatibilidade significa que o overhead de integração é mínimo — desenvolvedores familiarizados com o SDK da OpenAI podem migrar ou testar modelos DeepSeek em minutos. A plataforma suporta respostas em streaming, function calling e prompts de sistema. Os preços são baseados em tokens e listados publicamente, com taxas tipicamente 90-95% mais baixas que modelos de nível equivalente da OpenAI, tornando implantações em produção de alto volume substancialmente mais baratas.

### Modelos de raciocínio (DeepSeek-R1)

O DeepSeek-R1 é treinado usando um processo de múltiplos estágios que incorpora aprendizado por reforço para recompensar o modelo por produzir respostas finais corretas — crucialmente, sem depender de dados supervisionados de chain-of-thought no estágio central de treinamento. O modelo gera um bloco `<think>` contendo seu rastreamento de raciocínio antes da resposta final. Esse rascunho explícito permite ao modelo realizar deduções em múltiplas etapas, verificar seu trabalho e retroceder de caminhos incorretos — comportamentos que melhoram drasticamente o desempenho em problemas de olimpíadas de matemática, lógica formal e tarefas complexas de codificação que exigem planejamento ao longo de muitas etapas.

### Modelos de código e DeepSeek-Coder

Os modelos especializados em código da DeepSeek são pré-treinados em grandes corpora de código-fonte (GitHub, plataformas de programação competitiva, documentação) e ajustados para seguimento de instruções em tarefas de codificação. Eles suportam completação fill-in-the-middle (FIM), que é o formato padrão usado por ferramentas de autocompletar em IDEs como o Copilot. O DeepSeek-Coder alcança desempenho de topo no HumanEval, MBPP e SWE-bench, frequentemente superando modelos várias vezes maiores de outros provedores. As capacidades de codificação também estão integradas ao DeepSeek-V3 e R1, portanto modelos de propósito geral também apresentam bom desempenho em tarefas de código.

### Implantação de pesos abertos

Todos os principais modelos da DeepSeek têm seus pesos disponibilizados no Hugging Face sob licenças permissivas, habilitando inferência auto-hospedada em hardware GPU de consumo ou empresarial. O DeepSeek-V3 usa uma arquitetura mixture-of-experts onde apenas um subconjunto de parâmetros é ativado por token, reduzindo significativamente o custo de inferência em comparação com modelos densos de capacidade comparável. As opções de implantação populares incluem vLLM, Ollama (para versões quantizadas) e containers NVIDIA NIM. A implantação auto-hospedada é particularmente atraente para cargas de trabalho em lote de grande escala, fine-tuning em dados proprietários ou cenários onde todos os dados devem permanecer on-premises.

```mermaid
flowchart TD
  U[User / Application] -->|OpenAI-compatible request| API[DeepSeek API\napi.deepseek.com]
  U -->|self-hosted request| SH[Self-Hosted Inference\nvLLM / Ollama / NIM]

  API -->|general chat / code| V3[DeepSeek-V3]
  API -->|reasoning tasks| R1[DeepSeek-R1]
  SH -->|open weights| HF[Hugging Face\nModel Weights]

  R1 -->|generates reasoning trace| THINK["&lt;think&gt; block\n(chain-of-thought)"]
  THINK -->|produces| ANS[Final Answer]
  V3 -->|direct response| ANS
```

## Quando usar / Quando NÃO usar

| Use quando | Evite quando |
|----------|------------|
| O custo é uma restrição principal — a API DeepSeek é 90%+ mais barata que o GPT-4o com qualidade comparável | Você precisa de um provedor com SLA empresarial estabelecido, certificações de conformidade (SOC 2, HIPAA) ou processamento de dados baseado nos EUA |
| As tarefas exigem raciocínio profundo em múltiplas etapas: matemática, lógica, provas formais, codificação complexa | Sua tarefa é principalmente multimodal — DeepSeek-V3/R1 são modelos apenas de texto |
| Você quer auto-hospedar modelos de pesos abertos para soberania de dados ou fine-tuning personalizado | Você precisa do ecossistema mais amplo possível de plugins/ferramentas e integrações de terceiros |
| Construindo pipelines de lote de alto volume onde a redução de custo por token se acumula significativamente | Aplicações de consumo críticas em latência onde o rastreamento de raciocínio do R1 adiciona tempo de resposta |
| Geração de código, revisão de código ou depuração são seus principais casos de uso | Você está em uma jurisdição com requisitos regulatórios sobre a origem de modelos de IA |

## Comparações

| Critério | DeepSeek (V3 / R1) | OpenAI (GPT-4o / o1) | Meta / Llama |
|----------|--------------------|----------------------|--------------|
| Desempenho de raciocínio | R1 competitivo com o1 em benchmarks de matemática/lógica | o1 é de primeira linha; GPT-4o forte em raciocínio geral | Llama 3.x competitivo, mas abaixo de R1/o1 em raciocínio difícil |
| Qualidade geral de chat | V3 competitivo com GPT-4o | GPT-4o melhor da categoria em qualidade geral | Llama 3.3 70B competitivo para o tamanho |
| Pesos abertos | Sim (todos os modelos no Hugging Face) | Não (apenas proprietário) | Sim (Meta disponibiliza Llama abertamente) |
| Custo de API | Muito baixo (~$0.27/M tokens de entrada para V3) | Alto (~$2.50/M para entrada GPT-4o) | Gratuito (auto-hospedar); APIs Fireworks/Together acessíveis |
| Ecossistema e integrações | Crescendo; API compatível com OpenAI facilita adoção | Maior ecossistema, mais integrações | Grande ecossistema open-source |
| Soberania de dados | Auto-hospedagem possível; dados da API processados na China | Azure OpenAI para processamento em região dos EUA | Auto-hospedagem completa possível |
| Multimodal | Apenas texto (V3/R1) | Sim (GPT-4o, DALL-E) | Llama 3.2 tem capacidades de visão |

## Prós e contras

| Prós | Contras |
|------|------|
| Custo de API dramaticamente menor que OpenAI/Anthropic | Dados da API roteados por servidores chineses — preocupação para algumas indústrias regulamentadas |
| R1 oferece desempenho de raciocínio de nível de fronteira | Rastreamentos de raciocínio do R1 adicionam latência e uso de tokens |
| API compatível com OpenAI — custo de migração quase zero | Menor reconhecimento de marca/confiança em ciclos de vendas empresariais ocidentais |
| Pesos abertos permitem auto-hospedagem e fine-tuning | V3/R1 são apenas texto; sem capacidades nativas de imagem ou áudio |
| Forte geração de código na maioria das linguagens mainstream | Comunidade e documentação principalmente em chinês; recursos em inglês ainda em recuperação |

## Exemplos de código

### Completação de chat com DeepSeek-V3 (compatível com OpenAI)

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

### Raciocínio com DeepSeek-R1 (chain-of-thought)

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

### Resposta em streaming com DeepSeek-V3

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

### Inferência auto-hospedada com vLLM

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

## Recursos práticos

- [Documentação da API DeepSeek](https://platform.deepseek.com/api-docs/) — Referência oficial da API da plataforma DeepSeek incluindo modelos, parâmetros e preços
- [GitHub da DeepSeek](https://github.com/deepseek-ai) — Repositórios open-source para modelos DeepSeek, código de treinamento e artigos de pesquisa
- [DeepSeek-R1 no Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-R1) — Cartão do modelo com pesos, resultados de benchmark e instruções de implantação
- [Relatório técnico do DeepSeek-V3](https://arxiv.org/abs/2412.19437) — Artigo de pesquisa detalhando a arquitetura V3, abordagem de treinamento e comparações de benchmark
- [Guia de implantação DeepSeek no vLLM](https://docs.vllm.ai/en/latest/models/supported_models.html) — Instruções para auto-hospedar modelos DeepSeek com vLLM para inferência em produção

## Veja também

- [Provedores de modelos](/docs/model-providers)
- [Estudo de caso DeepSeek](/docs/case-studies/deepseek)
- [Padrões de raciocínio](/docs/reasoning-patterns)
