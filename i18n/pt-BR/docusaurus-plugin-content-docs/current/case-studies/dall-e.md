---
title: Case study — DALL·E
description: Geração de imagens a partir de texto com difusão e linguagem.
keywords: [DALL-E, text-to-image, diffusion]
tags: [beginner]
authors: [EmersonBraun]
---

# Case study: DALL·E

## Definição

DALL·E (e DALL·E 2) são modelos de texto para imagem da OpenAI. Eles geram imagens a partir de prompts de texto usando [modelos de difusão](/docs/diffusion-models) e alinhamento linguagem-imagem.

São um exemplo de destaque de geração [multimodal](/docs/multimodal-ai): texto de entrada, imagem de saída. As mesmas ideias de [difusão](/docs/diffusion-models) e condicionamento aparecem no Stable Diffusion e em outros modelos abertos. Caso de uso: imagens criativas e de produto a partir da linguagem natural; políticas de segurança e conteúdo se aplicam.

## Como funciona

O **texto** é codificado com um codificador de linguagem ou [multimodal](/docs/multimodal-ai) (p. ex., codificador de texto CLIP, T5) em um **embedding de texto**. Um modelo de **difusão** (p. ex., UNet) é **condicionado** sobre esse embedding: o processo de remoção de ruído é guiado para que a imagem gerada corresponda ao texto. O treinamento usa grandes conjuntos de dados de imagens com legendas; o modelo aprende a associar conteúdo de texto e imagem. **Amostragem**: partir do ruído, executar o processo de difusão inversa com o embedding de texto como condição e decodificar para uma imagem. **Filtros de segurança** (p. ex., classificador, política) limitam saídas prejudiciais ou restritas antes da entrega. As variantes (inpainting, edição) condicionam tanto sobre texto quanto sobre uma imagem ou máscara existente.

## Casos de uso

Os modelos de texto para imagem como DALL·E são usados onde quer que seja necessário gerar ou editar imagens a partir da linguagem natural (criativo, produto, UI).

- Geração de ativos criativos e de marketing a partir de prompts de texto
- Arte conceitual, ilustração e exploração de design
- Maquetes de produtos e interfaces a partir de descrições em linguagem natural

## Documentação externa

- [OpenAI – DALL·E](https://openai.com/dall-e-2)
- [Hierarchical Text-Conditional Image Generation (Ramesh et al.)](https://arxiv.org/abs/2204.06125) — DALL·E 2

## Veja também

- [Modelos de difusão](/docs/diffusion-models)
- [IA multimodal](/docs/multimodal-ai)
