import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-makefile';
import {glossaries} from '../content/index.ts';
import {annotate} from '../content/terms.ts';

const aliases: Record<string, string> = {js: 'javascript', py: 'python', sh: 'bash', shell: 'bash', rs: 'rust', m: 'matlab'};
const cache = new Map<string, string>();

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// glossary: the language whose hover explanations apply (e.g. Git commands are
// highlighted as bash but explained with the Git glossary).
export function highlight(code: string, lang: string, glossary?: string): string {
  const key = `${lang}\u0000${glossary ?? ''}\u0000${code}`;
  let html = cache.get(key);
  if (html === undefined) {
    const name = aliases[lang] ?? lang;
    const grammar = Prism.languages[name];
    html = grammar ? Prism.highlight(code, grammar, name) : escapeHtml(code);
    if (glossary) html = annotate(html, glossaries.get(glossary));
    cache.set(key, html);
  }
  return html;
}
