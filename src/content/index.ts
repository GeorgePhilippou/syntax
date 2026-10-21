import {parseLanguage, type Card, type Language} from './parse.ts';

// Every content/*.md file becomes a language, bundled at build time.
const sources = import.meta.glob('../../content/*.md', {query: '?raw', import: 'default', eager: true}) as Record<string, string>;

export const languages: Language[] = Object.entries(sources)
  .map(([path, source]) => parseLanguage(path.match(/([\w-]+)\.md$/)![1], source))
  .sort((a, b) => a.order - b.order);

export const languageById = new Map(languages.map(l => [l.id, l]));

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
