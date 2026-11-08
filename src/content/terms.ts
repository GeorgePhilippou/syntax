// Hover explanations for code. Each content/terms/<language>.md file has one
// term per line ("term :: short explanation"); lines starting with # are notes.
// Kept free of imports so the Node test script can load it directly.

export type Glossary = Map<string, string>;

export function parseTerms(source: string): Glossary {
  const terms: Glossary = new Map();
  for (const raw of source.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('# ')) continue;
    const match = line.match(/^(.+?) :: (.+)$/);
    if (!match) throw new Error(`Bad glossary line: ${line}`);
    if (terms.has(match[1])) throw new Error(`Duplicate glossary term: ${match[1]}`);
    terms.set(match[1], match[2]);
  }
  return terms;
}

function escapeAttribute(text: string) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function unescape(text: string) {
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}
function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const isWord = (term: string) => /^-{0,2}[A-Za-z_][\w-]*$/.test(term);
const patterns = new WeakMap<Glossary, RegExp | null>();

function wordPattern(terms: Glossary): RegExp | null {
  if (!patterns.has(terms)) {
    const words = [...terms.keys()].filter(isWord).sort((a, b) => b.length - a.length);
    // Not preceded by a word character, & (HTML entities) or -; not followed by a word character or -.
    patterns.set(terms, words.length ? new RegExp(`(?<![\\w&-])(${words.map(escapeRegExp).join('|')})(?![\\w-])`, 'g') : null);
  }
  return patterns.get(terms)!;
}

function wrap(term: string, shown: string, terms: Glossary) {
  return `<span class="term" data-term="${escapeAttribute(term)}" data-tip="${escapeAttribute(terms.get(term)!)}">${shown}</span>`;
}

// Marks known terms in Prism's HTML output. Text inside strings and comments
// is left alone; operators are matched only when they are a whole token.
export function annotate(html: string, terms: Glossary | undefined): string {
  if (!terms || terms.size === 0) return html;
  const pattern = wordPattern(terms);
  const skip: boolean[] = [];
  return html.split(/(<[^>]+>)/).map(part => {
    if (part.startsWith('</')) { skip.pop(); return part; }
    if (part.startsWith('<')) { skip.push(/\b(string|comment|char|template-string|regex)\b/.test(part)); return part; }
    if (!part || skip.some(Boolean)) return part;
    const plain = unescape(part).trim();
    if (!isWord(plain) && terms.has(plain)) return wrap(plain, part, terms);
    return pattern ? part.replace(pattern, word => wrap(word, word, terms)) : part;
  }).join('');
}
