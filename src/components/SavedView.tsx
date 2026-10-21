import {Bookmark} from 'lucide-react';
import {allCards, cardKey, languages, type Card} from '../content/index.ts';
import {CardView, type CardActions} from './CardView.tsx';

type Props = {favourites: string[]; notes: Record<string, string>; actionsFor: (card: Card) => CardActions};

export function SavedView({favourites, notes, actionsFor}: Props) {
  const saved = new Set(favourites);
  const cards = allCards.filter(c => saved.has(cardKey(c)) || notes[cardKey(c)]);

  return (
    <>
      <header className="page-head compact">
        <h1>Saved</h1>
        <p className="page-description">Cards you've bookmarked or written a note on, across every language.</p>
      </header>
      {cards.length === 0 ? (
        <div className="empty">
          <Bookmark size={28} />
          <h2>Nothing saved yet</h2>
          <p>Use the bookmark or note button on any card to keep it here.</p>
        </div>
      ) : languages.map(language => {
        const mine = cards.filter(c => c.language === language.id);
        return mine.length > 0 && (
          <section key={language.id} className="section">
            <h2>{language.name}</h2>
            <div className="cards">
              {mine.map(card => <CardView key={card.id} card={card} {...actionsFor(card)} />)}
            </div>
          </section>
        );
      })}
    </>
  );
}
