import {SearchX} from 'lucide-react';
import {languageById, type Card} from '../content/index.ts';
import type {SearchResult} from '../lib/search.ts';
import {CardView, type CardActions} from './CardView.tsx';

type Props = {query: string; result: SearchResult; current: string; actionsFor: (card: Card) => CardActions};

const LIMIT = 120;

export function SearchResults({query, result, current, actionsFor}: Props) {
  const hits = result.hits.slice(0, LIMIT);
  // Group by language: the current language first, then by best match.
  const groups = new Map<string, Card[]>();
  if (hits.some(h => h.language === current)) groups.set(current, []);
  for (const card of hits) {
    if (!groups.has(card.language)) groups.set(card.language, []);
    groups.get(card.language)!.push(card);
  }

  if (!hits.length) {
    return (
      <div className="empty">
        <SearchX size={28} />
        <h2>Nothing matches “{query}”</h2>
        <p>Try fewer words, or a language name plus a concept, like <em>rust hashmap</em> or <em>git undo</em>.</p>
      </div>
    );
  }

  return (
    <>
      <header className="page-head compact">
        <h1 className="results-title">
          {result.hits.length} {result.hits.length === 1 ? 'match' : 'matches'}
          {result.language && <> in {languageById.get(result.language)!.name}</>}
        </h1>
        {groups.size > 1 && (
          <nav className="jump" aria-label="Results by language">
            {[...groups.keys()].map(id => (
              <button key={id} onClick={() => document.getElementById(`results-${id}`)?.scrollIntoView({behavior: 'smooth'})}>
                {languageById.get(id)!.name} <span>{groups.get(id)!.length}</span>
              </button>
            ))}
          </nav>
        )}
      </header>
      {[...groups].map(([id, cards]) => (
        <section key={id} id={`results-${id}`} className="section">
          <h2>{languageById.get(id)!.name}</h2>
          <div className="cards">
            {cards.map(card => <CardView key={card.id} card={card} showLanguage terms={result.terms} {...actionsFor(card)} />)}
          </div>
        </section>
      ))}
      {result.hits.length > LIMIT && <p className="more">Showing the best {LIMIT}. Add a word to narrow it down.</p>}
    </>
  );
}
