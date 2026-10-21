// Parses every content file and checks each code example with a real
// compiler or parser. Set SYNTAX_STRICT=1 (as CI does) to fail when a
// toolchain is missing instead of skipping that language.
import assert from 'node:assert/strict';
import {spawn, spawnSync} from 'node:child_process';
import {mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {cpus, tmpdir} from 'node:os';
import {basename, join} from 'node:path';
import {parseLanguage, codeBlocks} from '../src/content/parse.ts';

const strict = process.env.SYNTAX_STRICT === '1';
const python = process.env.SYNTAX_PYTHON || 'python3';
const temp = mkdtempSync(join(tmpdir(), 'syntax-validation-'));

const cHeaders = ['stdio.h', 'stdlib.h', 'string.h', 'stdbool.h', 'stddef.h', 'stdint.h', 'math.h', 'ctype.h', 'time.h', 'errno.h', 'assert.h'];
const cppHeaders = ['iostream', 'vector', 'string', 'string_view', 'map', 'unordered_map', 'set', 'unordered_set', 'algorithm', 'numeric',
  'memory', 'optional', 'variant', 'stdexcept', 'fstream', 'sstream', 'cmath', 'functional', 'utility', 'tuple', 'array', 'chrono',
  'thread', 'random', 'regex', 'cstdlib', 'cassert', 'iomanip', 'cctype', 'filesystem'];

function available(command, args = ['--version']) {
  return spawnSync(command, args, {encoding: 'utf8'}).status === 0;
}

// Wraps a snippet according to its check mode and returns [extension, source].
function cFamily(code, mode, cpp) {
  const lines = code.split('\n');
  // Feature-test macros must come before every #include, including ours.
  const features = lines.filter(l => /^#define _\w+_SOURCE\b/.test(l)).join('\n');
  const includes = lines.filter(l => l.startsWith('#include')).join('\n');
  const body = lines.filter(l => !l.startsWith('#include') && !/^#define _\w+_SOURCE\b/.test(l)).join('\n');
  const prelude = features + '\n' + (cpp ? cppHeaders : cHeaders).map(h => `#include <${h}>`).join('\n') + '\n' + includes + '\n';
  const main = cpp ? 'int main()' : 'int main(void)';
  if (mode === 'auto') mode = /\bmain\s*\(/.test(body) ? 'program' : 'body';
  if (mode === 'program') return prelude + body;
  if (mode === 'top') return `${prelude}${body}\n${main} { return 0; }\n`;
  return `${prelude}${main} {\n${body}\nreturn 0;\n}\n`;
}

function rust(code, mode) {
  if (mode === 'auto') mode = /\bfn\s+main\s*\(/.test(code) ? 'program' : 'body';
  if (mode === 'program') return code;
  if (mode === 'top') return `${code}\nfn main() {}\n`;
  return `fn main() {\n${code}\n}\n`;
}

const checkers = {
  c: {tool: ['clang'], build: (code, mode) => ['c', cFamily(code, mode, false)], run: f => ['clang', ['-fsyntax-only', '-std=c17', f]]},
  cpp: {tool: ['clang++'], build: (code, mode) => ['cpp', cFamily(code, mode, true)], run: f => ['clang++', ['-fsyntax-only', '-std=c++17', f]]},
  rust: {tool: ['rustc'], build: (code, mode) => ['rs', rust(code, mode)],
    run: f => ['rustc', ['--edition', '2021', '--emit=metadata', '-A', 'warnings', '-o', f + '.rmeta', f]]},
  python: {tool: [python], build: code => ['py', code], run: f => [python, ['-c', 'import ast,sys; ast.parse(open(sys.argv[1]).read())', f]]},
  javascript: {tool: [process.execPath], build: code => ['mjs', code], run: f => [process.execPath, ['--check', f]]},
  bash: {tool: ['bash'], build: code => ['sh', code], run: f => ['bash', ['-n', f]]},
};

function exec(command, args) {
  return new Promise(resolve => {
    const child = spawn(command, args);
    let output = '';
    child.stdout.on('data', d => output += d);
    child.stderr.on('data', d => output += d);
    child.on('close', status => resolve({status, output}));
    child.on('error', error => resolve({status: -1, output: String(error)}));
  });
}

async function pool(tasks, limit) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({length: limit}, async () => {
    while (next < tasks.length) { const i = next++; results[i] = await tasks[i](); }
  }));
  return results;
}

try {
  const files = readdirSync('content').filter(f => f.endsWith('.md'));
  const languages = files.map(f => parseLanguage(basename(f, '.md'), readFileSync(join('content', f), 'utf8')));
  const tasks = [];
  const skipped = new Set();
  let total = 0;

  for (const language of languages) {
    assert(language.cards.length >= 20, `${language.name}: expected at least 20 cards`);
    const checker = checkers[language.id];
    const ready = checker && available(checker.tool[0], checker.tool[0] === 'bash' ? ['-c', 'true'] : ['--version']);
    if (checker && !ready) {
      if (strict) throw new Error(`${language.name}: ${checker.tool[0]} is not installed`);
      skipped.add(language.name);
    }
    for (const card of language.cards) {
      total++;
      assert(card.summary, `${language.id}/${card.id}: summary`);
      assert(codeBlocks(card).length > 0, `${language.id}/${card.id}: needs at least one code block`);
      if (!ready || card.check === 'skip') continue;
      // Blocks captioned with C/C++ file names form a small project: write
      // them side by side and compile each source file against the headers.
      const projectFile = /^[\w./-]+\.(c|h|cpp|hpp)$/;
      const project = codeBlocks(card).filter(b => b.lang === language.highlight && projectFile.test(b.caption));
      if (project.length && (language.id === 'c' || language.id === 'cpp')) {
        const dir = join(temp, `${language.id}-${card.id}`);
        mkdirSync(dir);
        for (const block of project) writeFileSync(join(dir, block.caption), block.code);
        for (const block of project.filter(b => /\.(c|cpp)$/.test(b.caption))) {
          const [command, args] = checker.run(join(dir, block.caption));
          tasks.push(async () => ({label: `${language.name} › ${card.title} (${block.caption})`, ...(await exec(command, [...args, '-I', dir]))}));
        }
      }
      codeBlocks(card).forEach((block, index) => {
        if (block.lang !== language.highlight) return; // e.g. shell commands inside a Rust card
        if (project.includes(block)) return;
        const [extension, source] = checker.build(block.code, card.check);
        const file = join(temp, `${language.id}-${card.id}-${index}.${extension}`);
        writeFileSync(file, source);
        tasks.push(async () => ({label: `${language.name} › ${card.title}${block.caption ? ` (${block.caption})` : ''}`, ...(await exec(...checker.run(file)))}));
      });
    }
  }

  const results = await pool(tasks, Math.max(2, cpus().length));
  const failures = results.filter(r => r.status !== 0);
  for (const failure of failures) console.error(`\n✗ ${failure.label}\n${failure.output.trim()}`);
  assert.equal(failures.length, 0, `${failures.length} example(s) failed to compile or parse`);

  const shared = new Map();
  for (const language of languages) for (const card of language.cards) shared.set(card.id, (shared.get(card.id) ?? 0) + 1);
  console.log(`Validated ${total} cards in ${languages.length} languages; ${results.length} code blocks compiled or parsed; ` +
    `${[...shared.values()].filter(n => n > 1).length} concepts are comparable across languages.`);
  if (skipped.size) console.warn(`Skipped (toolchain missing): ${[...skipped].join(', ')}. Set SYNTAX_STRICT=1 to make this an error.`);
  console.log('Not machine-checked: MATLAB (no runtime) and Git (commands).');
} finally {
  rmSync(temp, {recursive: true, force: true});
}
