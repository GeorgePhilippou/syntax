import {useState, type CSSProperties} from 'react';
import {ArrowLeftRight, Bookmark, Link2, StickyNote} from 'lucide-react';
import {renderInline, renderMarkdown} from '../content/parse.ts';
import {isComparable, languageById, type Card} from '../content/index.ts';
import {routeHref} from '../lib/route.ts';
import {CodeBlock} from './CodeBlock.tsx';

export type CardActions = {
  saved: boolean;
  note: string;
  showNotes: boolean;
  onToggleSave: () => void;
  onNoteChange: (note: string) => void;
  onStatus: (message: string) => void;
};

type Props = CardActions & {card: Card; showLanguage?: boolean; highlighted?: boolean; terms?: string[]};

function markTerms(title: string, terms: string[] = []) {
  const escaped = renderInline(title);
  const words = terms.filter(t => t.length > 1).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return words.length ? escaped.replace(new RegExp(`(${words.join('|')})`, 'gi'), '<mark>$1</mark>') : escaped;
}

export function CardView({card, showLanguage, highlighted, terms, saved, note, showNotes, onToggleSave, onNoteChange, onStatus}: Props) {
  const [editing, setEditing] = useState(false);
  const language = languageById.get(card.language)!;
  const href = routeHref({view: 'language', language: card.language, card: card.id});

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(new URL(href, location.href).href);
      onStatus('Link copied');
    } catch {
      onStatus('Copy unavailable');
    }
  }

  return (
    <article
      id={`card-${card.language}-${card.id}`}
      className={`card${card.kind === 'concept' ? ' concept' : ''}${highlighted ? ' highlighted' : ''}`}
      style={{'--lang': language.color} as CSSProperties}
    >
      <header className="card-head">
        <h3>
          {showLanguage && <span className="lang-badge">{language.name}</span>}
          {card.kind === 'concept' && <span className="concept-badge">Explainer</span>}
          <a href={href} dangerouslySetInnerHTML={{__html: markTerms(card.title, terms)}} />
        </h3>
        <div className="card-actions">
          {isComparable(card) && (
            <a className="icon-button" href={routeHref({view: 'compare', concept: card.id})} title="Compare across languages" aria-label={`Compare ${card.title} across languages`}>
              <ArrowLeftRight size={15} />
            </a>
          )}
          <button className="icon-button" onClick={copyLink} title="Copy link" aria-label={`Copy link to ${card.title}`}>
            <Link2 size={15} />
          </button>
          <button className={`icon-button${note ? ' active' : ''}`} onClick={() => setEditing(e => !e)} title="Your note" aria-label={`${note ? 'Edit' : 'Add'} your note on ${card.title}`} aria-expanded={editing}>
            <StickyNote size={15} />
          </button>
          <button className={`icon-button${saved ? ' active' : ''}`} onClick={onToggleSave} title={saved ? 'Remove from saved' : 'Save'} aria-label={`${saved ? 'Remove' : 'Save'} ${card.title}`} aria-pressed={saved}>
            <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </header>
      <p className="summary" dangerouslySetInnerHTML={{__html: renderInline(card.summary)}} />
      {card.blocks.map((block, i) =>
        block.kind === 'code'
          ? <CodeBlock key={i} block={block} onCopied={onStatus} />
          : (showNotes || card.kind === 'concept') && <div key={i} className="notes" dangerouslySetInnerHTML={{__html: renderMarkdown(block.text)}} />,
      )}
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
