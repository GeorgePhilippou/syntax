// Parses one language file from content/*.md. Kept free of imports so the
// Node test script can load it directly.
//
// File shape:
//
//   ---
//   name: Python
//   symbol: Py
//   ...
//   ---
//   # Category
//   ## Card title
//   @id shared-concept-id      (directives may appear anywhere in a card;
//                               @id defaults to a slug of the title)
//   @keywords extra search words
//   @diff One line shown in the compare view.
//   @check program | body | top | skip
//   @kind concept               (an explainer: the text comes first and is always shown)
//
//   First paragraph is the summary.
//
//   ```python optional caption
//   code
//   ```
//
//   Anything else is notes (Markdown subset: `code`, **bold**, - lists).

export type CheckMode = 'auto' | 'program' | 'body' | 'top' | 'skip';
export type CardKind = 'reference' | 'concept';

export type CodeBlock = {kind: 'code'; lang: string; caption: string; code: string};
export type TextBlock = {kind: 'text'; text: string};
export type Block = CodeBlock | TextBlock;

export type Card = {
  id: string;
  language: string;
  title: string;
  category: string;
  summary: string;
  keywords: string;
  diff: string;
  check: CheckMode;
  kind: CardKind;
  blocks: Block[];
};

export type Language = {
  id: string;
  name: string;
  symbol: string;
  color: string;
  version: string;
  description: string;
  highlight: string;
  order: number;
  categories: string[];
  cards: Card[];
};

const checkModes: CheckMode[] = ['auto', 'program', 'body', 'top', 'skip'];

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parseFrontMatter(lines: string[]): [Record<string, string>, number] {
  const meta: Record<string, string> = {};
  if (lines[0]?.trim() !== '---') return [meta, 0];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') return [meta, i + 1];
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) meta[match[1]] = match[2].trim();
  }
  throw new Error('Unclosed front matter');
}

export function parseLanguage(id: string, source: string): Language {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const [meta, start] = parseFrontMatter(lines);
  const language: Language = {
    id,
    name: meta.name ?? id,
    symbol: meta.symbol ?? id.slice(0, 2),
    color: meta.color ?? '#cccccc',
    version: meta.version ?? '',
    description: meta.description ?? '',
    highlight: meta.highlight ?? id,
    order: Number(meta.order ?? 99),
    categories: [],
    cards: [],
  };
  const defaultCheck = (meta.check as CheckMode) ?? 'auto';

  let category = 'General';
  let card: Card | null = null;
  let text: string[] = [];

  const flushText = () => {
    const joined = text.join('\n').trim();
    text = [];
    if (!card || !joined) return;
    // The first paragraph before any code is the card's summary.
    if (!card.summary && card.blocks.length === 0) {
      const [first, ...rest] = joined.split(/\n\s*\n/);
      card.summary = first.replace(/\s*\n\s*/g, ' ').trim();
      const remainder = rest.join('\n\n').trim();
      if (remainder) card.blocks.push({kind: 'text', text: remainder});
    } else {
      card.blocks.push({kind: 'text', text: joined});
    }
  };
  const finishCard = () => {
    flushText();
    if (!card) return;
    if (!card.summary) throw new Error(`${id}/${card.id}: missing summary paragraph`);
    if (language.cards.some(c => c.id === card!.id)) throw new Error(`${id}: duplicate card id "${card.id}"`);
    language.cards.push(card);
    card = null;
  };

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const heading = line.match(/^(#{1,2})\s+(.+?)\s*$/);
    if (heading) {
      finishCard();
      if (heading[1] === '#') {
        category = heading[2];
        if (!language.categories.includes(category)) language.categories.push(category);
      } else {
        card = {
          id: slugify(heading[2]), language: id, title: heading[2], category,
          summary: '', keywords: '', diff: '', check: defaultCheck, kind: 'reference', blocks: [],
        };
        if (!language.categories.includes(category)) language.categories.push(category);
      }
      continue;
    }
    if (!card) continue;

    const directive = line.match(/^@(\w+)\s+(.*)$/);
    if (directive) {
      const [, key, value] = directive;
      if (key === 'id') card.id = value.trim();
      else if (key === 'keywords') card.keywords = value.trim();
      else if (key === 'diff') card.diff = value.trim();
      else if (key === 'kind') {
        if (value.trim() !== 'concept' && value.trim() !== 'reference') throw new Error(`${id}/${card.id}: unknown kind "${value}"`);
        card.kind = value.trim() as CardKind;
      } else if (key === 'check') {
        if (!checkModes.includes(value.trim() as CheckMode)) throw new Error(`${id}/${card.id}: unknown check "${value}"`);
        card.check = value.trim() as CheckMode;
      } else throw new Error(`${id}/${card.id}: unknown directive @${key}`);
      continue;
    }
    const fence = line.match(/^```(\S*)\s*(.*)$/);
    if (fence) {
      flushText();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      if (i >= lines.length) throw new Error(`${id}/${card.id}: unclosed code block`);
      card.blocks.push({kind: 'code', lang: fence[1] || language.highlight, caption: fence[2], code: code.join('\n')});
      continue;
    }
    text.push(line);
  }
  finishCard();
  return language;
}

export function codeBlocks(card: Card): CodeBlock[] {
  return card.blocks.filter((b): b is CodeBlock => b.kind === 'code');
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(text: string): string {
  // Split on code spans first so their contents are never formatted.
  return text.split(/(`[^`]+`)/g).map(part => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
    return escapeHtml(part).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }).join('');
}

// Renders the small Markdown subset used in notes. Content is our own, and
// everything is escaped before formatting is applied.
export function renderMarkdown(text: string): string {
  return text.split(/\n\s*\n/).map(paragraph => {
    const lines = paragraph.split('\n');
    if (lines.every(l => /^\s*-\s+/.test(l))) {
      return `<ul>${lines.map(l => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`).join('')}</ul>`;
    }
    return `<p>${inline(lines.join(' '))}</p>`;
  }).join('');
}

export function renderInline(text: string): string {
  return inline(text);
}
