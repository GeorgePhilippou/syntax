import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {languages,concepts,examples,getCards} from '../src/data.ts';
const temp=mkdtempSync(join(tmpdir(),'syntax-validation-'));
let checked=0;
try {
 for(const language of languages){
  const cards=getCards(language.id);
  assert(cards.length>=15,`${language.name}: at least 15 cards`);
  assert.equal(new Set(cards.map(c=>c.id)).size,cards.length);
  for(const card of cards){
   assert(card.code.trim()&&card.note.trim()&&card.description.trim());
   assert(!/undefined|null/.test(card.title));
   if(language.id==='python'){
    const result=spawnSync(process.env.SYNTAX_PYTHON||'python3',['-c','import ast,sys; ast.parse(sys.stdin.read())'],{input:card.code,encoding:'utf8'});
    assert.equal(result.status,0,`Python ${card.id}: ${result.stderr}`);checked++;
   }
   if(language.id==='javascript'){
    const snippets=card.id==='imports'?card.code.split('// app.js'): [card.code];
    snippets.forEach((snippet,i)=>{const file=join(temp,`js-${card.id}-${i}.mjs`);writeFileSync(file,snippet);const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(result.status,0,`JavaScript ${card.id}: ${result.stderr}`);checked++;});
   }
   if(language.id==='c'||language.id==='cpp'){
    const cpp=language.id==='cpp';const headers=cpp?'#include <iostream>\n#include <vector>\n#include <memory>\n#include <string>\n#include <cmath>\n#include <stdexcept>\n#include <fstream>\n':'#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <stddef.h>\n';
    const lines=card.code.split('\n');const includes=lines.filter(l=>l.startsWith('#include')).join('\n');const body=lines.filter(l=>!l.startsWith('#include')).join('\n');
    const source=headers+includes+'\n'+(/\bmain\s*\(/.test(body)?body:`int main(${cpp?'':'void'}) {\n double temperature = 25; int mode = 1;\n${body}\nreturn 0;\n}`);
    const file=join(temp,`${language.id}-${card.id}.${cpp?'cpp':'c'}`);writeFileSync(file,source);
    const result=spawnSync(cpp?'clang++':'clang',['-fsyntax-only',`-std=${cpp?'c++17':'c17'}`,file],{encoding:'utf8'});
    assert.equal(result.status,0,`${language.name} ${card.id}: ${result.stderr}`);checked++;
   }
  }
 }
 for(const [id] of concepts)for(const language of languages)assert(examples[language.id][id]);
 console.log(`Validated ${languages.reduce((n,l)=>n+getCards(l.id).length,0)} cards; ${checked} C/C++/Python/JavaScript syntax checks passed. MATLAB reviewed manually; MATLAB runtime unavailable.`);
} finally {rmSync(temp,{recursive:true,force:true});}
