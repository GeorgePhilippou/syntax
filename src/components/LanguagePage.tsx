import type {Card, Language} from '../content/index.ts';
import {CardView, type CardActions} from './CardView.tsx';

type Props = {language: Language; focusCard?: string; actionsFor: (card: Card) => CardActions};

export function LanguagePage({language, focusCard, actionsFor}: Props) {
  const jump = (category: string) =>
    document.getElementById(`section-${category}`)?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <>
      <header className="page-head">
        <div className="page-title">
          <span className="page-symbol">{language.symbol}</span>
          <h1>{language.name}</h1>
          <span className="version">{language.version}</span>
        </div>
        <p className="page-description">{language.description} <span>{language.cards.length} cards</span></p>
        <nav className="jump" aria-label={`${language.name} sections`}>
          {language.categories.map(category => (
            <button key={category} onClick={() => jump(category)}>{category}</button>
          ))}
        </nav>
      </header>
      {language.categories.map(category => (
        <section key={category} id={`section-${category}`} className="section" aria-label={category}>
          <h2>{category}</h2>
          <div className="cards">
            {language.cards.filter(c => c.category === category).map(card => (
              <CardView key={card.id} card={card} highlighted={card.id === focusCard} {...actionsFor(card)} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
