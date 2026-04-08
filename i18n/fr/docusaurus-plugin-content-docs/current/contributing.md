---
title: Contributing
description: How to add topics, improve examples, and translate content.
keywords: [contributing, template, PR]
authors: [EmersonBraun]
---

# Contribuer à AI Summary Hub

Merci d'aider à améliorer ce wiki. Voici comment contribuer.

## Modèle d'article

Chaque article suit un modèle structuré conçu pour faire d'AI Summary Hub un oracle de connaissance complet. Les sections sont divisées en **obligatoires** et **optionnelles**.

### Sections obligatoires

Chaque article **doit** inclure ces sections dans cet ordre exact :

1. **Frontmatter** — Bloc de métadonnées au début du fichier (voir [Spécification du Frontmatter](#specification-du-frontmatter) ci-dessous)
2. **Définition** — Ce que c'est, le contexte et pourquoi c'est important. Minimum 2–3 paragraphes.
3. **Comment ça fonctionne** — Explication technique. Utilisez des sous-sections H3 pour les sujets complexes. Incluez au moins un diagramme Mermaid avec des **arêtes étiquetées** (pas seulement des boîtes). Minimum 3–5 phrases par sous-section.
4. **Quand utiliser / Quand NE PAS utiliser** — Un tableau à deux colonnes avec des conseils pratiques. Minimum 3 lignes.
5. **Exemples de code** — Au moins un extrait **fonctionnel** (pas de pseudocode). Le langage est laissé à la discrétion de l'auteur : Python est la norme pour les sujets ML/MLOps ; TypeScript pour les sujets MCP/Claude Code ; utilisez ce qui est le plus naturel pour le sujet.
6. **Ressources pratiques** — 2–5 liens externes curatés. Types acceptés : documentation officielle, cours (gratuits ou payants), dépôts GitHub, articles arXiv, billets de blog d'entreprises (p. ex. blog OpenAI, blog Anthropic).
7. **Voir aussi** — Liens internes vers des documents connexes dans ce wiki.

### Sections optionnelles

Incluez-les **uniquement lorsque pertinent**. Quand une section ne s'applique pas, omettez-la entièrement — n'ajoutez pas le titre avec « N/A » ou un espace réservé.

- **Comparaisons** — Un tableau de comparaison rapide avec 3–5 critères (p. ex. facilité d'utilisation, communauté, performance). **Règle de réciprocité** : si l'article A inclut une comparaison avec l'article B, alors l'article B doit aussi inclure une comparaison avec l'article A.
- **Avantages et inconvénients** — Format tableau à deux colonnes.
- **Benchmarks** — Liens vers des benchmarks, des classements ou des articles avec des données quantitatives.

### Ordre des sections

L'ordre complet lorsque toutes les sections sont présentes :

```
1. Définition
2. Comment ça fonctionne
3. Quand utiliser / Quand NE PAS utiliser
4. Comparaisons (optionnel)
5. Avantages et inconvénients (optionnel)
6. Benchmarks (optionnel)
7. Exemples de code
8. Ressources pratiques
9. Voir aussi
```

### Directives de profondeur

| Section | Profondeur minimale |
|---------|---------------------|
| Définition | 2–3 paragraphes couvrant ce que c'est, le contexte et pourquoi c'est important |
| Comment ça fonctionne | Sous-sections H3 pour les sujets complexes ; 1+ diagramme Mermaid avec arêtes étiquetées ; 3–5 phrases par sous-section |
| Quand utiliser / Quand NE PAS utiliser | Tableau avec 3+ lignes |
| Exemples de code | 1+ extrait fonctionnel avec commentaires ; doit être exécutable ou clairement annoté |
| Ressources pratiques | 2–5 liens curatés |
| Comparaisons (si incluses) | Tableau avec 3–5 critères |

### Spécification du Frontmatter

Chaque document doit inclure ce bloc de frontmatter :

```yaml
---
title: "Titre complet de l'article"
description: "Description d'une ligne pour le SEO et la recherche"
keywords: [keyword1, keyword2, keyword3]
tags: [intermediate]  # exactement un parmi : beginner, intermediate, advanced
authors: [NomUtilisateurGitHub]  # nom(s) d'utilisateur GitHub du/des auteur(s)
---
```

**Champs obligatoires :**

| Champ | Description |
|-------|-------------|
| `title` | Titre complet de l'article |
| `description` | Description d'une ligne (utilisée pour le SEO et la recherche) |
| `keywords` | Tableau de mots-clés pertinents |
| `tags` | Tableau contenant **exactement une** étiquette de niveau : `beginner`, `intermediate` ou `advanced` |
| `authors` | Tableau des noms d'utilisateur GitHub qui ont écrit l'article |

**Champs optionnels :**

| Champ | Description | Quand utiliser |
|-------|-------------|----------------|
| `sidebar_label` | Étiquette courte pour la barre latérale | Uniquement quand le titre dépasse ~30 caractères |

**Remarque :** `last_updated` est géré automatiquement par Docusaurus via l'historique git. Ne l'ajoutez pas manuellement.

### Exemple complet de modèle

```markdown
---
title: "Sujet Exemple"
description: "Une brève description du sujet."
keywords: [sujet, exemple, ia]
tags: [intermediate]
authors: [VotreNomUtilisateurGitHub]
---

# Sujet Exemple

## Définition

Paragraphe 1 : Ce que c'est.

Paragraphe 2 : Contexte et relation avec d'autres concepts.

Paragraphe 3 : Pourquoi c'est important.

## Comment ça fonctionne

### Sous-section A

Explication avec 3–5 phrases.

### Sous-section B

Explication avec diagramme :

(Diagramme Mermaid ici avec arêtes étiquetées)

## Quand utiliser / Quand NE PAS utiliser

| Utiliser quand | Éviter quand |
|----------------|--------------|
| Scénario A | Contre-scénario A |
| Scénario B | Contre-scénario B |
| Scénario C | Contre-scénario C |

## Comparaisons

(Optionnel — uniquement si des alternatives existent)

| Critère | Ce sujet | Alternative |
|---------|----------|-------------|
| Critère 1 | ... | ... |
| Critère 2 | ... | ... |
| Critère 3 | ... | ... |

## Avantages et inconvénients

(Optionnel)

| Avantages | Inconvénients |
|-----------|---------------|
| Avantage 1 | Inconvénient 1 |
| Avantage 2 | Inconvénient 2 |

## Benchmarks

(Optionnel — lien vers des articles ou des classements)

## Exemples de code

(Extrait de code fonctionnel ici)

## Ressources pratiques

- [Documentation officielle](https://example.com) — Description
- [Tutoriel ou cours](https://example.com) — Description
- [Dépôt GitHub](https://example.com) — Description

## Voir aussi

- [Document connexe 1](/docs/chemin)
- [Document connexe 2](/docs/chemin)
```

## Ajouter de nouveaux sujets

1. Créez un nouveau fichier sous `docs/` dans la bonne catégorie (p. ex. `docs/tools/mon-outil.md`).
2. Utilisez le modèle ci-dessus et assurez-vous d'un ID de document unique (basé sur le chemin).
3. Incluez **toutes les sections obligatoires** et les sections optionnelles pertinentes.
4. Ajoutez le document à `sidebars.ts` dans la bonne catégorie.
5. Si votre article inclut une **Comparaison** avec un autre article, mettez à jour cet article avec une comparaison réciproque.
6. Ouvrez un PR avec une courte description.

## Améliorer les exemples

- Préférez le code exécutable ; ajoutez des commentaires si les dépendances ou la configuration ne sont pas évidentes.
- Utilisez des langages supportés par Prism (Python, JavaScript, TypeScript, bash, yaml, docker).
- Liez vers la documentation officielle ou les dépôts où c'est pertinent.

## Diagrammes (Mermaid)

Les diagrammes dans les docs sont écrits en [Mermaid](https://mermaid.js.org/intro/getting-started.html) et rendus par le site via Docusaurus. Directives :

- Utilisez une syntaxe Mermaid.js valide — testez dans le [Mermaid Live Editor](https://mermaid.live/) avant de soumettre.
- **Étiquetez les arêtes** pour décrire les relations (pas seulement des boîtes connectées par des flèches).
- Utilisez des sous-graphes pour regrouper les composants liés quand les diagrammes ont 5+ nœuds.
- Préférez `flowchart LR` ou `flowchart TD` pour l'architecture ; `sequenceDiagram` pour les interactions.

## Traductions

Le site est localisé pour **l'espagnol (es), le portugais (pt-BR), l'allemand (de), le français (fr) et le chinois simplifié (zh-Hans)**. Le contenu par défaut est en anglais.

Les nouveaux articles sont produits **uniquement en anglais**. Les traductions sont gérées dans une phase séparée.

**Où vivent les fichiers de traduction :**

- **Étiquettes de barre latérale et de document :** `i18n/<locale>/docusaurus-plugin-content-docs/current.json` (étiquettes de catégorie de barre latérale). Les titres des documents viennent du frontmatter de chaque document traduit dans `i18n/<locale>/docusaurus-plugin-content-docs/current/`.
- **Barre de navigation :** `i18n/<locale>/docusaurus-theme-classic/navbar.json`
- **Pied de page :** `i18n/<locale>/docusaurus-theme-classic/footer.json`
- **UI du thème et pages personnalisées (home, all-topics) :** `i18n/<locale>/code.json`
- **Contenu des documents :** Reflétez l'arborescence `docs/` sous `i18n/<locale>/docusaurus-plugin-content-docs/current/` et traduisez chaque `.md` (frontmatter `title`, `description` et corps). Gardez les liens internes comme `/docs/...` pour qu'ils fonctionnent avec le préfixe de locale.

**Ajouter une nouvelle langue :** Ajoutez la langue à `i18n.locales` dans `docusaurus.config.ts`, puis exécutez `npm run write-translations` (optionnellement avec `--locale <locale>`) pour générer la structure JSON. Remplissez les traductions pour la barre de navigation, le pied de page, `code.json`, la barre latérale et le contenu des documents.

**Quand exécuter `write-translations` :** Exécutez `npm run write-translations` lorsque vous ajoutez de nouveaux éléments de barre latérale, des chaînes de thème ou des clés de pages personnalisées afin que les nouvelles clés apparaissent dans les fichiers JSON de chaque locale pour les traducteurs.

## Style de code et commits

- Suivez le formatage existant (p. ex. 2 espaces, nouvelle ligne finale).
- Utilisez des messages de commit clairs (p. ex. "Add doc: X", "Fix link in Y").

## Gestion des versions

Lorsque la base de contenu est stable, les mainteneurs peuvent exécuter `npm run docusaurus docs:version 1.0.0` pour créer des instantanés versionnés. Le sélecteur de version apparaîtra dans la barre de navigation. Voir [Gestion des versions Docusaurus](https://docusaurus.io/docs/versioning) pour plus de détails.

---

Des questions ? Ouvrez un issue ou un PR sur [GitHub](https://github.com/EmersonBraun/ai-summary-hub).
