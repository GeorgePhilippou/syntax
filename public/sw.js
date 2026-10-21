/* All runtime resources are same-origin. Cached shell works without a network. */
const CACHE = 'syntax-v1';
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const root = new URL('./', self.location.href);
    const response = await fetch(root, { cache: 'reload' });
    if (!response.ok) throw new Error('Cannot cache app shell');
    const html = await response.clone().text();
    const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map(match => new URL(match[1], root))
      .filter(url => url.origin === root.origin && /\.(js|css)$/.test(url.pathname));
    const cache = await caches.open(CACHE);
    await cache.addAll([...assets.map(url => url.href), './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png']);
    await cache.put(root, response);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('syntax-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (event.request.mode === 'navigate') {
      // Network first, so a new deploy shows on the first load; the cached
      // shell is the fallback when offline or the network is very slow.
      const shell = await cache.match(new URL('./', self.location.href));
      try {
        const network = fetch(event.request);
        if (!shell) return await network;
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
        const response = await Promise.race([network, timeout]);
        if (response.ok) return response;
        return shell;
      } catch {
        return shell ?? Response.error();
      }
    }
    return await cache.match(event.request) || fetch(event.request);
  })());
});
