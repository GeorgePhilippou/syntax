import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
for (const base of ['/', '/syntax/']) {
const origin=`https://syntax.test${base}`;
const handlers={};const stores=new Map();let offline=false;let claimed=false;
const key=input=>new URL(input.url??input,origin).href;
async function network(input){if(offline)throw new TypeError('Network unavailable');const url=new URL(key(input));const relative=url.pathname.slice(base.length);const path=resolve('dist',relative||'index.html');return existsSync(path)?new Response(readFileSync(path)):new Response('Missing',{status:404});}
const caches={
 async open(name){if(!stores.has(name))stores.set(name,new Map());const store=stores.get(name);return {
 async addAll(urls){const results=await Promise.all(urls.map(async url=>{const response=await network(url);if(!response.ok)throw new Error('Precache failed');return [key(url),response];}));for(const [url,response]of results)store.set(url,response.clone());},
 async put(url,response){store.set(key(url),response.clone());},async match(url){return store.get(key(url))?.clone();}};},
 async keys(){return [...stores.keys()];},async delete(name){return stores.delete(name);}
};
vm.runInNewContext(readFileSync('dist/sw.js','utf8'),{self:{location:{href:origin+'sw.js',origin:new URL(origin).origin},addEventListener:(type,handler)=>handlers[type]=handler,skipWaiting:async()=>{},clients:{claim:async()=>{claimed=true;}}},caches,fetch:network,URL,Response});
let pending;handlers.install({waitUntil:p=>pending=p});await pending;
await caches.open('syntax-obsolete');await caches.open('other-app');handlers.activate({waitUntil:p=>pending=p});await pending;
assert(claimed);assert(!stores.has('syntax-obsolete'));assert(stores.has('other-app'));
offline=true;
async function request(path,mode){let result;handlers.fetch({request:{url:new URL(path,origin).href,method:'GET',mode},respondWith:p=>result=p});return await result;}
const shell=await request(base,'navigate');assert.equal(shell.status,200);const html=await shell.text();assert(html.includes('<div id="root">'));
const assets=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(x=>x[1]).filter(x=>/\.(js|css)$/.test(x));assert(assets.length>=2);
for(const asset of [...assets,'manifest.webmanifest','icon-192.png','icon-512.png']){const response=await request(asset,'same-origin');assert(response?.ok,`Cached ${asset}`);assert((await response.arrayBuffer()).byteLength>0);}
const manifest=JSON.parse(readFileSync('dist/manifest.webmanifest','utf8'));assert.equal(manifest.display,'standalone');for(const icon of manifest.icons)assert(existsSync(resolve('dist',icon.src)));
console.log(`${base}: offline worker harness passed: install, asset precache, activation, scope-safe cleanup, navigation fallback and all resources with a failed network. This does not replace an installed-browser offline test.`);
}
