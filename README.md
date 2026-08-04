# Dominou

*Dominou* est mon blog consacré au jeu de cartes [Dominion](https://fr.wikipedia.org/wiki/Dominion_(jeu)), de Donald X. Vaccarino.
Cela fait plusieurs mois que ce jeu m'obsède et j'ai décidé de tenir un blog où je pouvais partager mes idées, mes conseils (sans prétention !) et plus généralement mon expérience.

**Lien du site : https://0hdeadbeaf.github.io/dominou/**

## Choix techniques

Ce blog a été réalisé à l'aide d'[Astro](https://astro.build) et est déployé automatiquement sur GitHub Pages à chaque *push* sur la branche `main`.

## Développement

Voici les commandes à utiliser pour développer le blog :

```sh
pnpm install   # Pour installer les dépendances du projet
pnpm dev       # Fait tourner un serveur local pour visualiser le blog
pnpm build     # Produit le build de production dans le dossier dist
```

### Écrire un article

Pour créer un nouvel article, il suffit d'ajouter un fichier Markdown dans `src/content/blog/` avec l'en-tête suivante :

```markdown
---
title: 'Titre'
description: 'Description courte qui est utilisée pour le référencement.'
pubDate: '2026-08-04'
tags: ['stratégie', 'base', 'intrigue']
---
```

### Mentionner une carte

Au sein d'un article, il est possible de mentionner une carte en utilisant la syntaxe `[[ID_de_la_carte]]`, par exemple : `[[Village]]`. Mentionner une carte de cette manière permet de créer un lien vers cette dernière ainsi que d'afficher un aperçu de la carte au survol.
Il est également possible d'utiliser la syntaxe `[[ID_de_la_carte|text_à_afficher]]` afin d'afficher un autre texte que le nom de la
carte.
Les IDs acceptés (français, anglais ou *slug*) sont définis dans `src/data/cards.json`. Si l'ID d'une carte ne peut pas être résolu, le *build* échoue.

### Ajouter de nouvelles cartes

Le blog possède une galerie de cartes, permettant aux utilisateurs de voir les cartes sur lesquelles j'ai émis un avis. L'organisation des cartes est la suivante :

- `src/data/cards.json` — données des cartes (noms, types, coût, texte français)
- `public/images/cartes/` — scans français des cartes
- `scripts/download-cards.mjs` — script de téléchargement des images (à relancer seulement pour ajouter de nouvelles cartes)

## Mentions légales

Dominion est un jeu de Donald X. Vaccarino édité par Rio Grande Games. Ce blog n'est pas affilié aux éditeurs ; les images de cartes sont utilisées à titre illustratif.
