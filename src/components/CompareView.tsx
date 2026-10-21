import type {CSSProperties} from 'react';
import {ArrowLeftRight} from 'lucide-react';
import {codeBlocks, renderInline, type Card} from '../content/parse.ts';
import {conceptLanguages, findCard, languageById, languages} from '../content/index.ts';
import {routeHref} from '../lib/route.ts';
import {CodeBlock} from './CodeBlock.tsx';

type Props = {
  selected: string[];
  onSelectedChange: (ids: string[]) => void;
  focusConcept?: string;
  onStatus: (message: string) => void;
};

export function CompareView({selected, onSelectedChange, focusConcept, onStatus}: Props) {
  const columns = languages.filter(l => selected.includes(l.id));
  const minimum = Math.min(2, columns.length);

  // Rows follow the order of the first selected language, then the others.
  const rows: string[] = [];
  for (const language of columns) {
    for (const card of language.cards) {
      if (rows.includes(card.id)) continue;
      const present = (conceptLanguages.get(card.id) ?? []).filter(id => selected.includes(id)).length;
      if (present >= minimum) rows.push(card.id);
    }
  }

  const toggle = (id: string) =>
    onSelectedChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);

  return (
    <>
      <header className="page-head compact">
        <h1>Compare</h1>
        <p className="page-description">The same idea, side by side. Pick the languages to line up.</p>
        <div className="toggles" role="group" aria-label="Languages to compare">
          {languages.map(l => (
            <button key={l.id} aria-pressed={selected.includes(l.id)} onClick={() => toggle(l.id)} style={{'--lang': l.color} as CSSProperties}>
              {l.name}
            </button>
          ))}
        </div>
      </header>
      {columns.length === 0 ? (
        <div className="empty">
          <ArrowLeftRight size={28} />
          <h2>Choose some languages</h2>
          <p>Select two or more above to line them up.</p>
        </div>
      ) : (
        <div className="compare" style={{'--columns': columns.length} as CSSProperties}>
          <div className="compare-row compare-header" aria-hidden="true">
            <div />
            {columns.map(l => <div key={l.id} className="compare-lang" style={{'--lang': l.color} as CSSProperties}>{l.name}</div>)}
          </div>
          {rows.map(id => {
            const first = columns.map(l => findCard(l.id, id)).find(Boolean) as Card;
            return (
              <section key={id} id={`compare-${id}`} className={`compare-row${id === focusConcept ? ' highlighted' : ''}`} aria-label={first.title}>
                <div className="compare-concept">
                  <h2>{first.title}</h2>
                  <p dangerouslySetInnerHTML={{__html: renderInline(first.summary)}} />
                </div>
                {columns.map(l => {
                  const card = findCard(l.id, id);
                  return (
                    <div key={l.id} className="compare-cell" style={{'--lang': l.color} as CSSProperties}>
                      <a className="compare-cell-lang" href={card ? routeHref({view: 'language', language: l.id, card: id}) : undefined}>
                        {languageById.get(l.id)!.name}
                      </a>
                      {card ? (
                        <>
                          {card.diff && <p className="diff" dangerouslySetInnerHTML={{__html: renderInline(card.diff)}} />}
                          {codeBlocks(card).map((block, i) => <CodeBlock key={i} block={block} onCopied={onStatus} />)}
                        </>
                      ) : <p className="missing">No direct equivalent.</p>}
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
