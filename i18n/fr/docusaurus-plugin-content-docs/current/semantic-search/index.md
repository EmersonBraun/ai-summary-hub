---
title: Recherche sémantique
description: Recherche par sens en utilisant des embeddings et la similarité.
keywords: [semantic search, embeddings, similarity]
tags: [intermediate]
authors: [EmersonBraun]
---

# Recherche sémantique

## Définition

La recherche sémantique est un paradigme de récupération qui retourne des résultats basés sur le sens et l'intention plutôt que sur la correspondance exacte de mots-clés. Une requête utilisateur et les documents du corpus sont tous deux encodés en représentations vectorielles denses (embeddings), et la récupération est effectuée en trouvant les documents dont les vecteurs sont les plus similaires au vecteur de requête — typiquement en utilisant la similarité cosinus ou le produit scalaire. Parce que l'espace d'embedding est appris sur de grands corpus, des requêtes comme « hébergement abordable » récupèrent correctement les documents contenant « hôtels bon marché » même s'ils ne partagent aucun mot-clé.

L'idée centrale est qu'un modèle d'embedding bien entraîné mappe le texte sémantiquement similaire vers des points proches dans un espace vectoriel à haute dimensionnalité. Cela est atteint via des objectifs d'entraînement contrastif : les phrases similaires sont rapprochées et les dissemblables éloignées. Des modèles comme Sentence-BERT, OpenAI Ada et Cohere Embed sont entraînés spécifiquement pour les tâches de récupération, apprenant à distinguer des différences subtiles de sens qu'un modèle bag-of-words manquerait. La dimensionnalité de l'embedding (communément 768 à 3072) détermine l'expressivité de la représentation, tandis que le choix de la fonction de similarité et de l'index de plus proche voisin approché (ANN) détermine la vitesse et la précision de récupération.

La recherche sémantique est la colonne vertébrale de récupération de [RAG (Génération Augmentée par Récupération)](/docs/rag) : les requêtes utilisateur sont intégrées et mises en correspondance avec une bibliothèque de chunks de documents pré-indexés, et les meilleurs résultats sont injectés dans la fenêtre de contexte du LLM. Elle sous-tend également les systèmes de recommandation (« éléments similaires »), les pipelines de déduplication et le clustering. La recherche hybride — combinant la récupération sémantique (dense) avec la récupération par mots-clés (sparse, BM25) et le re-classement des résultats combinés — surpasse souvent l'une ou l'autre des approches seule, en particulier pour les requêtes qui mélangent l'intention en langage naturel avec des termes techniques spécifiques ou des identifiants.

## Comment ça fonctionne

### Embedding et indexation

Les documents sont fragmentés (pour le contenu de forme longue), intégrés en utilisant un modèle bi-encodeur, et stockés dans un index vectoriel. L'index peut être un index de force brute plat (pour les petits corpus), ou un index de plus proche voisin approché tel que HNSW (Hierarchical Navigable Small World) ou IVF (Index de Fichier Inversé) pour la récupération à grande échelle.

### Exécution de requête

```mermaid
flowchart LR
  Query[Requête utilisateur] -->|embed avec le même modèle| QueryVec[Vecteur de requête]
  Corpus[Corpus de documents] -->|chunk + embed hors ligne| VectorIndex[Index vectoriel : HNSW / IVF]
  QueryVec -->|recherche k-NN approchée| VectorIndex
  VectorIndex -->|top-k candidats| Reranker[Re-classeur optionnel]
  Reranker -->|résultats scorés| RankedDocs[Documents classés]
  RankedDocs -->|injecter dans le contexte| LLM[LLM ou tâche en aval]
```

### Recherche hybride et re-classement

La recherche sémantique pure peut manquer des résultats où les termes exacts comptent (codes de produit, noms, identifiants techniques). La recherche hybride exécute à la fois la récupération dense (sémantique) et sparse (BM25 par mots-clés) et fusionne les résultats en utilisant la Fusion de Rang Réciproque ou une combinaison apprise. Un re-classeur cross-encodeur score ensuite les meilleurs candidats en encodant conjointement la requête et chaque document — plus précis mais plus lent que l'étape de récupération bi-encodeur.

## Quand utiliser / Quand NE PAS utiliser

| Utiliser quand | Éviter quand |
|----------|------------|
| Les utilisateurs expriment leur intention en langage naturel et la correspondance exacte de mots-clés produit un faible rappel | Les utilisateurs cherchent toujours avec des codes de produit exacts, des IDs ou des filtres structurés |
| Le corpus contient des formulations paraphrasées ou diverses pour les mêmes concepts | Le corpus est suffisamment petit pour que la recherche plein-texte avec une bonne tokenisation suffise |
| Construction de pipelines RAG nécessitant une récupération de contexte pertinent | Les exigences de latence ne peuvent pas accommoder la recherche dans un index vectoriel |
| Fonctionnalités de recommandation et « élément similaire » dans les produits orientés utilisateur | Les contraintes de confidentialité empêchent d'intégrer des documents dans des modèles tiers |

## Comparaisons

| Méthode | Stratégie de correspondance | Forces | Limites |
|--------|------------------|-----------|-------------|
| Mots-clés (BM25) | Fréquence exacte des termes | Rapide, interprétable, gère les termes rares | Manque les synonymes et les paraphrases |
| Sémantique (dense) | Similarité d'embedding | Gère la synonymie, l'intention, le contexte | Manque les termes rares à correspondance exacte ; nécessite un modèle d'embedding |
| Hybride (BM25 + dense) | Classement combiné | Le meilleur des deux mondes | Plus de complexité d'infrastructure |
| Re-classeur cross-encodeur | Scoring conjoint requête-doc | Précision la plus élevée | Lent ; utilisé seulement pour les top-k candidats |

## Avantages et inconvénients

| Avantages | Inconvénients |
|------|------|
| Gère les requêtes en langage naturel de façon robuste | Nécessite un modèle d'embedding et une infrastructure d'index vectoriel |
| Fonctionne entre les langues si un modèle multilingue est utilisé | La qualité de l'embedding détermine le plafond de récupération ; les mauvais modèles produisent de mauvais résultats |
| S'adapte à des millions de documents avec des index ANN | Les index ANN introduisent des compromis rappel-latence |
| Permet de puissants systèmes RAG et de recommandation | La stratégie de fragmentation et la granularité d'embedding nécessitent un réglage soigneux |

## Exemples de code

### Recherche sémantique avec Sentence-BERT et FAISS (Python)

```python
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

# Indexer un petit corpus
corpus = [
    "Comment affiner un modèle de transformateur sur un ensemble de données personnalisé",
    "Introduction au reinforcement learning à partir du retour humain",
    "Meilleures pratiques pour le déploiement de modèles d'apprentissage automatique en production",
    "Comprendre les mécanismes d'attention dans les réseaux de neurones",
    "Techniques d'augmentation de données pour les tâches de vision par ordinateur",
]

corpus_embeddings = model.encode(corpus, convert_to_numpy=True)
corpus_embeddings = corpus_embeddings / np.linalg.norm(corpus_embeddings, axis=1, keepdims=True)

# Construire un index FAISS (produit scalaire = similarité cosinus sur vecteurs normalisés)
index = faiss.IndexFlatIP(corpus_embeddings.shape[1])
index.add(corpus_embeddings.astype(np.float32))

# Requête
query = "comment déployer des modèles ML"
query_embedding = model.encode([query], convert_to_numpy=True)
query_embedding = query_embedding / np.linalg.norm(query_embedding)

scores, indices = index.search(query_embedding.astype(np.float32), k=3)

print(f"Requête : {query}\nMeilleurs résultats :")
for rank, (score, idx) in enumerate(zip(scores[0], indices[0])):
    print(f"  {rank + 1}. [{score:.3f}] {corpus[idx]}")
```

## Ressources pratiques

- [Sentence-BERT (SBERT)](https://www.sbert.net/) — Modèles de récupération dense, documentation et points de contrôle pré-entraînés
- [Documentation FAISS (Meta AI)](https://faiss.ai/) — Bibliothèque de recherche de similarité et de clustering efficace
- [LangChain – Magasins vectoriels](https://python.langchain.com/docs/concepts/vectorstores/) — Intégration de la recherche sémantique dans les pipelines RAG
- [Pinecone – Qu'est-ce que la recherche sémantique ?](https://www.pinecone.io/learn/semantic-search/) — Explication pratique avec des exemples
- [Cohere – API Embed](https://docs.cohere.com/reference/embed) — Embeddings multilingues pour la récupération

## Voir aussi

- [Embeddings](/docs/rag/embeddings)
- [Bases de données vectorielles](/docs/rag/vector-databases)
- [RAG](/docs/rag)
