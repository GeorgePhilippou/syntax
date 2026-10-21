import type {Card} from '../content/parse.ts';
import {allCards, languages} from '../content/index.ts';

type Fields = {title: string; keywords: string; summary: string; body: string};
const fieldCache = new Map<Card, Fields>();

function fields(card: Card): Fields {
  let cached = fieldCache.get(card);
  if (!cached) {
    cached = {
      title: card.title.toLowerCase(),
      keywords: `${card.keywords} ${card.id.replace(/-/g, ' ')} ${card.category}`.toLowerCase(),
      summary: `${card.summary} ${card.diff}`.toLowerCase(),
      body: card.blocks.map(b => (b.kind === 'code' ? b.code : b.text)).join('\n').toLowerCase(),
    };
    fieldCache.set(card, cached);
  }
  return cached;
}

// Words that pick a language rather than match text: "rust hashmap", "py slicing".
const languageAliases = new Map<string, string>();
for (const language of languages) {
  languageAliases.set(language.id, language.id);
  languageAliases.set(language.name.toLowerCase(), language.id);
}
for (const [alias, id] of [['py', 'python'], ['js', 'javascript'], ['c++', 'cpp'], ['rs', 'rust'], ['sh', 'bash'], ['shell', 'bash'], ['m', 'matlab']]) {
  if (languages.some(l => l.id === id)) languageAliases.set(alias, id);
}

export type SearchResult = {terms: string[]; language?: string; hits: Card[]};

export function search(query: string, notes: Record<string, string>): SearchResult {
  let terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let language: string | undefined;
  if (terms.length > 1) {
    const index = terms.findIndex(t => languageAliases.has(t));
    if (index >= 0) {
      language = languageAliases.get(terms[index]);
      terms = terms.filter((_, i) => i !== index);
    }
  }
  const pool = language ? allCards.filter(c => c.language === language) : allCards;
  const scored: {card: Card; score: number}[] = [];
  for (const card of pool) {
    const f = fields(card);
    const note = (notes[`${card.language}:${card.id}`] ?? '').toLowerCase();
    let score = 0;
    for (const term of terms) {
      let s = 0;
      if (f.title.includes(term)) s += f.title.split(/\W+/).some(w => w.startsWith(term)) ? 12 : 8;
      if (f.keywords.includes(term)) s += 5;
      if (f.summary.includes(term)) s += 3;
      if (note.includes(term)) s += 3;
      if (f.body.includes(term)) s += 1;
      if (s === 0) { score = 0; break; }
      score += s;
    }
    if (score > 0) scored.push({card, score});
  }
  scored.sort((a, b) => b.score - a.score);
  return {terms, language, hits: scored.map(s => s.card)};
}

