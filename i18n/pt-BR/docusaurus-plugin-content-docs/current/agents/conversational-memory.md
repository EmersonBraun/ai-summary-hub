---
title: "Memória conversacional"
description: Padrões de memória para agentes de chat — buffer, resumo, vetor e memória de entidades.
keywords: [memória conversacional, buffer memory, summary memory, vector memory, entity memory, LangChain, histórico de chat]
---

# Memória conversacional

## Definição

Memória conversacional refere-se ao conjunto de técnicas que permitem que um agente de chat retenha e utilize informações de turnos anteriores em um diálogo. Ao contrário da geração aumentada por recuperação, que busca documentos externos, a memória conversacional está exclusivamente relacionada ao que já foi dito entre o usuário e o agente. Acertar isso é o que separa um chatbot frustrante que pede para você se repetir de um agente que parece genuinamente atento.

Existem várias estratégias distintas para gerenciar o histórico de conversa, cada uma com diferentes trade-offs entre custo, fidelidade e escalabilidade. A abordagem mais simples — manter cada mensagem literalmente — funciona bem para conversas curtas, mas rapidamente esgota a janela de contexto do modelo. Padrões mais sofisticados usam sumarização ou indexação semântica para comprimir ou recuperar seletivamente o histórico mais relevante para o turno atual.

Escolher o padrão de memória correto depende muito do comprimento esperado da conversa, da importância das palavras exatas versus o significado semântico e das restrições de custo do deployment. Na prática, agentes de chat de produção geralmente combinam dois ou mais padrões: um buffer verbatim de curto prazo para coerência imediata e uma camada de resumo ou vetor para recall de longo horizonte.

## Como funciona

### Buffer memory

Buffer memory é o padrão mais simples: o agente mantém uma lista ordenada dos últimos N pares de mensagens e os prefixa em cada nova janela de contexto. Quando o buffer atinge a capacidade, o par mais antigo é descartado (FIFO). Isso garante que o agente sempre tenha acesso às trocas mais recentes sem qualquer transformação ou compressão com perda. Buffer memory é ideal para conversas curtas a médias onde a recência é o sinal primário, e não incorre em chamadas extras ao LLM. Sua principal fraqueza é que o contexto mais antigo é perdido silenciosamente sem nenhum resumo.

### Summary memory

Summary memory aborda o problema de esquecimento usando um LLM para gerar periodicamente um resumo corrente da conversa até o momento. Quando o buffer fica muito grande, o agente o condensa em uma narrativa compacta — capturando fatos-chave, decisões e sentimentos — e depois descarta as mensagens brutas. O resumo ocupa muito menos tokens do que os turnos originais, tornando conversas longas viáveis. O trade-off é uma chamada secundária ao LLM para cada etapa de sumarização, o que adiciona latência e custo, e algumas informações são inevitavelmente perdidas na compressão.

### Vector memory

Vector memory embute cada turno da conversa e o armazena em um banco de dados vetorial. Em cada novo turno, as trocas passadas mais semanticamente relevantes são recuperadas por busca de similaridade e injetadas na janela de contexto junto com as mensagens recentes do buffer. Esse padrão se destaca quando as conversas são muito longas ou quando a pergunta atual se relaciona com algo dito muitos turnos atrás. Vector memory é a abordagem de maior fidelidade para recall de longo horizonte, mas requer infraestrutura de embedding e introduz latência de recuperação.

### Entity memory

Entity memory extrai entidades nomeadas — pessoas, lugares, produtos, preferências — da conversa e mantém um registro estruturado do que o agente sabe sobre cada entidade. Quando uma entidade é mencionada novamente, seu perfil armazenado é injetado no contexto. Entity memory é ideal para casos de uso de assistente pessoal onde lembrar que "Alice prefere reuniões pela manhã" ou "o prazo do projeto é 10 de junho" é mais valioso do que lembrar as palavras exatas de mensagens passadas.

```mermaid
flowchart TD
  Msg[New User Message] -->|"add to"| Buffer[Buffer Memory\nlast N turns]
  Msg -->|"embed query"| VectorDB[(Vector Memory\nembedding store)]
  VectorDB -->|"retrieve similar turns"| Merge[Context Assembly]
  Buffer -->|"recent verbatim turns"| Merge
  Summary[Summary Memory\nrunning narrative] -->|"inject summary"| Merge
  Entities[Entity Memory\nkey facts / profiles] -->|"relevant entities"| Merge
  Merge -->|"assembled context"| LLM[LLM Inference]
  LLM -->|"response"| Out[Agent Output]
  LLM -->|"trigger summarize"| Summarizer[Summarizer LLM]
  Summarizer -->|"update"| Summary
  LLM -->|"extract entities"| Extractor[Entity Extractor]
  Extractor -->|"update"| Entities
```

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|---|---|
| As conversas se estendem por mais de alguns turnos | A tarefa é de turno único sem necessidade de histórico |
| Os usuários esperam que o agente se lembre do que disseram antes | Os dados de conversa não podem ser armazenados por razões de privacidade ou conformidade |
| Os custos de janela de contexto são significativos e o histórico é longo | A conversa é sempre curta o suficiente para caber completamente na janela de contexto |
| Os usuários discutem múltiplas entidades ou tópicos ao longo da sessão | A latência de sumarização é inaceitável para o caso de uso |
| É necessário recall entre sessões (padrões vetor/entidade) | A complexidade adicional de infraestrutura supera o benefício de fidelidade |

## Comparações

| Critério | Buffer memory | Summary memory | Vector memory |
|---|---|---|---|
| Custo por turno | Baixo (sem chamada extra ao LLM) | Médio (chamada ocasional ao sumarizador) | Médio (chamada de embedding + consulta ao BD) |
| Fidelidade do recall | Exata, mas limitada aos últimos N turnos | Compressão com perda de turnos mais antigos | Alta para conteúdo semanticamente relevante |
| Tratamento de comprimento de contexto | Ruim — turnos mais antigos são descartados silenciosamente | Bom — resumo comprime turnos antigos | Excelente — recupera apenas os trechos relevantes |
| Latência | Mínima | Moderada (sumarização adiciona uma etapa) | Moderada (embedding + busca por vizinho mais próximo) |
| Recall entre sessões | Não (buffer em memória) | Possível se o resumo for persistido | Sim (o vetor store é persistente) |
| Complexidade de implementação | Muito baixa | Baixa–média | Média–alta |

## Exemplos de código

```python
"""
Conversational memory patterns using LangChain.

Demonstrates:
1. ConversationBufferMemory  — keep verbatim last N messages
2. ConversationSummaryMemory — compress history into a running summary
3. ConversationBufferWindowMemory — sliding window variant
"""
# pip install langchain langchain-openai openai
from langchain.memory import (
    ConversationBufferMemory,
    ConversationSummaryMemory,
    ConversationBufferWindowMemory,
)
from langchain.chains import ConversationChain
from langchain_openai import ChatOpenAI


# ---------------------------------------------------------------------------
# 1. Buffer memory — keeps ALL messages (use for short conversations)
# ---------------------------------------------------------------------------
def demo_buffer_memory():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    memory = ConversationBufferMemory(return_messages=True)
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)

    reply1 = chain.predict(input="My name is Alice. I enjoy hiking.")
    reply2 = chain.predict(input="What outdoor activities would you recommend for me?")

    # The second call has access to the first turn verbatim
    print("Buffer memory — reply 2:", reply2)
    print("History length:", len(memory.chat_memory.messages), "messages\n")


# ---------------------------------------------------------------------------
# 2. Summary memory — LLM compresses history on each turn
# ---------------------------------------------------------------------------
def demo_summary_memory():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    # The same LLM is used to generate summaries; you can use a cheaper model here
    memory = ConversationSummaryMemory(llm=llm, return_messages=True)
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)

    chain.predict(input="I'm planning a trip to Japan next spring.")
    chain.predict(input="I'm most interested in traditional temples and local food.")
    reply3 = chain.predict(input="Can you suggest a one-week itinerary?")

    print("Summary memory — reply 3:", reply3)
    # The buffer contains only the latest summary, not all past raw messages
    print("Summary:", memory.moving_summary_buffer[:200], "...\n")


# ---------------------------------------------------------------------------
# 3. Window memory — keeps only the last k turns (sliding window)
# ---------------------------------------------------------------------------
def demo_window_memory(k: int = 3):
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    # k=3 means only the last 3 HumanMessage+AIMessage pairs are retained
    memory = ConversationBufferWindowMemory(k=k, return_messages=True)
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)

    for i in range(6):
        reply = chain.predict(input=f"This is message number {i + 1}.")
        print(f"Turn {i + 1}: {reply[:80]}")

    print(
        f"\nWindow memory keeps {len(memory.chat_memory.messages)} messages "
        f"(max {k * 2} for k={k} turn pairs)\n"
    )


# ---------------------------------------------------------------------------
# Manual entity-style memory (illustrative, no extra dependency)
# ---------------------------------------------------------------------------
def demo_entity_memory_manual():
    """
    Minimal entity memory: parse key facts from each turn and inject them.
    In production, use LangChain's ConversationEntityMemory or a dedicated NER model.
    """
    entity_store: dict[str, str] = {}

    def extract_entities_mock(text: str) -> dict[str, str]:
        """Mock extraction — real impl would call an LLM or NER model."""
        entities = {}
        if "my name is" in text.lower():
            name = text.lower().split("my name is")[-1].strip().split()[0].rstrip(".,")
            entities["user_name"] = name.capitalize()
        if "deadline" in text.lower():
            entities["deadline"] = "mentioned but not parsed in this mock"
        return entities

    turns = [
        ("user", "My name is Bob and my project deadline is end of July."),
        ("user", "Can you help me prioritize my tasks?"),
    ]
    for role, msg in turns:
        entity_store.update(extract_entities_mock(msg))
        entity_context = "; ".join(f"{k}={v}" for k, v in entity_store.items())
        print(f"[{role}] {msg}")
        print(f"  Entity context injected: {entity_context}\n")


if __name__ == "__main__":
    import os

    if os.getenv("OPENAI_API_KEY"):
        demo_buffer_memory()
        demo_summary_memory()
        demo_window_memory()
    else:
        print("Set OPENAI_API_KEY to run LangChain demos.")
    demo_entity_memory_manual()
```

## Recursos práticos

- [Documentação de Memória do LangChain](https://python.langchain.com/docs/concepts/memory/) — Referência abrangente para todas as classes de memória do LangChain com exemplos de uso.
- [Repensando a Memória em IA Conversacional (Lilian Weng)](https://lilianweng.github.io/posts/2023-06-23-agent/#memory) — Post de blog aprofundado cobrindo taxonomia de memória e trade-offs de design em sistemas de agentes.
- [MemoryOS: Sistema Operacional Baseado em Memória para Agentes LLM](https://arxiv.org/abs/2506.06326) — Pesquisa sobre gerenciamento hierárquico de memória inspirado no design de sistemas operacionais.
- [Gerenciamento de Threads de Assistentes OpenAI](https://platform.openai.com/docs/assistants/how-it-works/managing-threads) — Como a API gerenciada da OpenAI lida com threads de conversa persistentes.

## Veja também

- [Memória de agentes](/docs/agents/memory)
- [Agentes de IA](/docs/agents)
- [Embeddings RAG](/docs/rag/embeddings)
