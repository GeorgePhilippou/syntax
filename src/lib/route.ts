import {useEffect, useState} from 'react';

// Hash routes, so every view can be bookmarked and the back button works:
//   #/python             a language
//   #/python/slicing     a language, scrolled to one card
//   #/compare            the compare grid
//   #/compare/for        the compare grid, scrolled to one concept
//   #/saved              favourites and notes
export type Route =
  | {view: 'language'; language?: string; card?: string}
  | {view: 'compare'; concept?: string}
  | {view: 'saved'};

export function parseRoute(hash: string): Route {
  const [first, second] = hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  if (first === 'compare') return {view: 'compare', concept: second || undefined};
  if (first === 'saved') return {view: 'saved'};
  return {view: 'language', language: first || undefined, card: second || undefined};
}

export function routeHref(route: Route): string {
  if (route.view === 'compare') return route.concept ? `#/compare/${route.concept}` : '#/compare';
  if (route.view === 'saved') return '#/saved';
  return `#/${route.language ?? ''}${route.card ? `/${route.card}` : ''}`;
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  useEffect(() => {
    const update = () => setRoute(parseRoute(location.hash));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return route;
}

export function navigate(route: Route) {
  location.hash = routeHref(route);
}
