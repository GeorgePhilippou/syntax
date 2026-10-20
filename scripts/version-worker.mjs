import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const version=createHash('sha256').update(readFileSync('dist/index.html')).update(readFileSync('dist/sw.js')).digest('hex').slice(0,12);
const path='dist/sw.js';
writeFileSync(path,readFileSync(path,'utf8').replace("'syntax-v1'",`'syntax-v${version}'`));
console.log(`Offline cache: syntax-v${version}`);
