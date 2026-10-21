import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-makefile';

const aliases: Record<string, string> = {js: 'javascript', py: 'python', sh: 'bash', shell: 'bash', rs: 'rust', m: 'matlab'};
const cache = new Map<string, string>();

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlight(code: string, lang: string): string {
  const key = `${lang}\u0000${code}`;
  let html = cache.get(key);
  if (html === undefined) {
    const name = aliases[lang] ?? lang;
    const grammar = Prism.languages[name];
    html = grammar ? Prism.highlight(code, grammar, name) : escapeHtml(code);
    cache.set(key, html);
  }
  return html;
}
