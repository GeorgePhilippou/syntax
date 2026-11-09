import {parseLanguage, type Card, type Language} from './parse.ts';
import {parseTerms, type Glossary} from './terms.ts';

// Every content/*.md file becomes a language, bundled at build time.
const sources = import.meta.glob('../../content/*.md', {query: '?raw', import: 'default', eager: true}) as Record<string, string>;

export const languages: Language[] = Object.entries(sources)
  .map(([path, source]) => parseLanguage(path.match(/([\w-]+)\.md$/)![1], source))
  .sort((a, b) => a.order - b.order);

export const languageById = new Map(languages.map(l => [l.id, l]));

// Hover explanations, one glossary per language (content/terms/<id>.md).
const termSources = import.meta.glob('../../content/terms/*.md', {query: '?raw', import: 'default', eager: true}) as Record<string, string>;
const ownGlossaries = new Map<string, Glossary>(
  Object.entries(termSources).map(([path, source]) => [path.match(/([\w-]+)\.md$/)![1], parseTerms(source)]),
);
// A library page also explains its parents' terms (NumPy pages still explain
// print, for, len…); its own entries win.
export const glossaries = new Map<string, Glossary>(
  languages.map(l => {
    const merged: Glossary = new Map();
    for (const id of [...l.parents, l.id]) for (const [k, v] of ownGlossaries.get(id) ?? []) merged.set(k, v);
    return [l.id, merged];
  }),
);

export const allCards: Card[] = languages.flatMap(l => l.cards);

export const cardKey = (card: Card) => `${card.language}:${card.id}`;

// Concept id -> languages that have a card with that id, in language order.
export const conceptLanguages = new Map<string, string[]>();
for (const card of allCards) {
  const list = conceptLanguages.get(card.id) ?? [];
  list.push(card.language);
  conceptLanguages.set(card.id, list);
}

export function isComparable(card: Card): boolean {
  return (conceptLanguages.get(card.id)?.length ?? 0) > 1;
}

export function findCard(language: string, id: string): Card | undefined {
  return languageById.get(language)?.cards.find(c => c.id === id);
}

export type {Card, Language};
