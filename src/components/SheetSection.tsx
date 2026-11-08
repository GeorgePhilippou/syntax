import {useState, type CSSProperties} from 'react';
import {Bookmark, StickyNote} from 'lucide-react';
import {renderInline, type Card, type RowBlock} from '../content/parse.ts';
import {languageById} from '../content/index.ts';
import {routeHref} from '../lib/route.ts';
import {highlight} from '../lib/highlight.ts';
import type {CardActions} from './CardView.tsx';

function rowMatches(row: RowBlock, terms: string[]) {
  const text = `${row.label} ${row.code}`.toLowerCase();
  return terms.some(t => text.includes(t));
}

// The rows of a sheet section. With search terms, only matching rows are
// shown (all rows if none match, e.g. the hit came from the title).
export function SheetRows({card, terms, onStatus}: {card: Card; terms?: string[]; onStatus: (message: string) => void}) {
  const active = (terms ?? []).filter(t => t.length > 1);
  const matching = active.length ? card.blocks.filter(b => b.kind === 'row' && rowMatches(b, active)) : [];
  const blocks = matching.length ? matching : card.blocks;

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      onStatus('Copied');
    } catch {
      onStatus('Copy unavailable — select the code instead');
    }
  }

  return (
    <div className="rows">
      {blocks.map((block, i) => {
        if (block.kind === 'note') {
          return <p key={i} className="row-note" dangerouslySetInnerHTML={{__html: renderInline(block.text)}} />;
        }
        if (block.kind === 'text') {
          return <p key={i} className="row-note" dangerouslySetInnerHTML={{__html: renderInline(block.text)}} />;
        }
        if (block.kind !== 'row') return null;
        return (
          <div key={i} className={`row${block.multiline ? ' multiline' : ''}`}>
            <span className="row-label">{block.label}</span>
            <button className="row-code" onClick={() => copy(block.code)} title="Click to copy">
              <code dangerouslySetInnerHTML={{__html: highlight(block.code, block.lang)}} />
            </button>
          </div>
        );
      })}
      {matching.length > 0 && matching.length < card.blocks.length && (
        <a className="row-more" href={routeHref({view: 'language', language: card.language, card: card.id})}>
          Show all {card.blocks.filter(b => b.kind === 'row').length} rows
        </a>
      )}
    </div>
  );
}

type Props = CardActions & {card: Card; showLanguage?: boolean; highlighted?: boolean; terms?: string[]};

export function SheetSection({card, showLanguage, highlighted, terms, saved, note, onToggleSave, onNoteChange, onStatus}: Props) {
  const [editing, setEditing] = useState(false);
  const language = languageById.get(card.language)!;

  return (
    <article
      id={`card-${card.language}-${card.id}`}
      className={`sheet-section${highlighted ? ' highlighted' : ''}`}
      style={{'--lang': language.color} as CSSProperties}
    >
      <header className="sheet-head">
        <h3>
          {showLanguage && <span className="lang-badge">{language.name}</span>}
          <a href={routeHref({view: 'language', language: card.language, card: card.id})}>{card.title}</a>
        </h3>
        <div className="card-actions">
          <button className={`icon-button${note ? ' active' : ''}`} onClick={() => setEditing(e => !e)} title="Your note" aria-label={`${note ? 'Edit' : 'Add'} your note on ${card.title}`} aria-expanded={editing}>
            <StickyNote size={14} />
          </button>
          <button className={`icon-button${saved ? ' active' : ''}`} onClick={onToggleSave} title={saved ? 'Remove from saved' : 'Save'} aria-label={`${saved ? 'Remove' : 'Save'} ${card.title}`} aria-pressed={saved}>
            <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </header>
      <SheetRows card={card} terms={terms} onStatus={onStatus} />
      {editing ? (
        <textarea
          className="my-note-input"
          autoFocus
          value={note}
          placeholder="Your own note — saved on this device and included in search."
          onChange={e => onNoteChange(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); setEditing(false); } }}
          rows={3}
        />
      ) : note && (
        <button className="my-note" onClick={() => setEditing(true)} title="Edit your note">{note}</button>
      )}
    </article>
  );
}
