import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
// Precache the woff2 fonts Vite emitted (browsers that read woff2 never ask for .woff).
const fonts = readdirSync('dist/assets').filter(f => f.endsWith('.woff2')).map(f => `./assets/${f}`);
const path = 'dist/sw.js';
let worker = readFileSync(path, 'utf8').replace('const FONTS = [];', `const FONTS = ${JSON.stringify(fonts)};`);
const version = createHash('sha256').update(readFileSync('dist/index.html')).update(worker).digest('hex').slice(0, 12);
writeFileSync(path, worker.replace("'syntax-v1'", `'syntax-v${version}'`));
console.log(`Offline cache: syntax-v${version} (${fonts.length} fonts)`);
