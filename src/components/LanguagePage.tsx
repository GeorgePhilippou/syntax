import type {Card, Language} from '../content/index.ts';
import {CardView, type CardActions} from './CardView.tsx';

type Props = {language: Language; focusCard?: string; actionsFor: (card: Card) => CardActions};

export function LanguagePage({language, focusCard, actionsFor}: Props) {
  const sheet = language.layout === 'sheet';
  const jump = (category: string) =>
    document.getElementById(`section-${category}`)?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <>
      <header className="page-head">
        <div className="page-title">
          <h1>{language.name}</h1>
          <span className="version">{language.version}</span>
          <span className="page-description">{language.description}</span>
        </div>
        <nav className="jump" aria-label={`${language.name} sections`}>
          {language.categories.map(category => (
            <button key={category} onClick={() => jump(category)}>{category}</button>
          ))}
        </nav>
      </header>
      {language.categories.map(category => (
        <section key={category} id={`section-${category}`} className="section" aria-label={category}>
          <h2>{category}</h2>
          <div className={sheet ? 'sheet-grid' : 'cards'}>
            {language.cards.filter(c => c.category === category).map(card => (
              <CardView key={card.id} card={card} highlighted={card.id === focusCard} {...actionsFor(card)} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
