import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties} from 'react';
import {ArrowLeftRight, Bookmark, Search, SlidersHorizontal, X} from 'lucide-react';
import {cardKey, languageById, languages, type Card} from './content/index.ts';
import {useStored} from './lib/storage.ts';
import {navigate, routeHref, useRoute} from './lib/route.ts';
import {search} from './lib/search.ts';
import {useOffline} from './lib/offline.ts';
import type {CardActions} from './components/CardView.tsx';
import {LanguagePage} from './components/LanguagePage.tsx';
import {SearchResults} from './components/SearchResults.tsx';
import {CompareView} from './components/CompareView.tsx';
import {SavedView} from './components/SavedView.tsx';
import {Settings, defaultPreferences, type Preferences} from './components/Settings.tsx';
import {Tooltip} from './components/Tooltip.tsx';

export function App() {
  const route = useRoute();
  const [lastLanguage, setLastLanguage] = useStored('syntax.language', languages[0].id);
  const [favourites, setFavourites] = useStored<string[]>('syntax.favourites', []);
  const [notes, setNotes] = useStored<Record<string, string>>('syntax.notes', {});
  const [storedPreferences, setPreferences] = useStored<Preferences>('syntax.preferences', defaultPreferences);
  const [compareLanguages, setCompareLanguages] = useStored<string[]>('syntax.compare', ['c', 'python', 'matlab']);
  const [query, setQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const main = useRef<HTMLElement>(null);
  const offline = useOffline(setStatus);
  const preferences = {...defaultPreferences, ...storedPreferences};

  const routeLanguage = route.view === 'language' && route.language && languageById.has(route.language) ? route.language : undefined;
  const languageId = routeLanguage ?? (languageById.has(lastLanguage) ? lastLanguage : languages[0].id);
  const language = languageById.get(languageId)!;

  useEffect(() => {
    if (routeLanguage) setLastLanguage(routeLanguage);
  }, [routeLanguage, setLastLanguage]);

  // On navigation: clear the search, then scroll to the focused card/row or the top.
  useEffect(() => {
    setQuery('');
    const target = route.view === 'language' && route.card ? `card-${languageId}-${route.card}`
      : route.view === 'compare' && route.concept ? `compare-${route.concept}` : null;
    requestAnimationFrame(() => {
      const element = target && document.getElementById(target);
      if (element) element.scrollIntoView({block: 'start'});
      else window.scrollTo({top: 0});
    });
  }, [route, languageId]);

  useEffect(() => {
    const root = document.documentElement;
    if (preferences.theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = preferences.theme;
    root.style.setProperty('--font-size', `${preferences.fontSize}px`);
    root.toggleAttribute('data-wrap', preferences.wrap);
    root.dataset.font = preferences.font;
    root.dataset.spacing = preferences.spacing;
  }, [preferences.theme, preferences.fontSize, preferences.wrap, preferences.font, preferences.spacing]);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(''), 2500);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = target.matches('input, textarea, select') || target.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInput.current?.focus();
        searchInput.current?.select();
      } else if (event.key === 'Escape' && target === searchInput.current) {
        setQuery('');
        searchInput.current?.blur();
      } else if (!typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        if (event.key === '/') {
          event.preventDefault();
          searchInput.current?.focus();
        } else if (/^[1-9]$/.test(event.key) && languages[Number(event.key) - 1]) {
          navigate({view: 'language', language: languages[Number(event.key) - 1].id});
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const result = useMemo(() => (query.trim() ? search(query, notes) : null), [query, notes]);

  const actionsFor = useCallback((card: Card): CardActions => {
    const key = cardKey(card);
    return {
      saved: favourites.includes(key),
      note: notes[key] ?? '',
      showNotes: preferences.showNotes,
      onToggleSave: () => setFavourites(list => (list.includes(key) ? list.filter(k => k !== key) : [...list, key])),
      onNoteChange: text => setNotes(all => {
        const next = {...all};
        if (text.trim()) next[key] = text;
        else delete next[key];
        return next;
      }),
      onStatus: setStatus,
    };
  }, [favourites, notes, preferences.showNotes, setFavourites, setNotes]);

  let content;
  if (result) content = <SearchResults query={query} result={result} current={languageId} actionsFor={actionsFor} />;
  else if (route.view === 'compare') content = <CompareView selected={compareLanguages} onSelectedChange={setCompareLanguages} focusConcept={route.concept} onStatus={setStatus} />;
  else if (route.view === 'saved') content = <SavedView favourites={favourites} notes={notes} actionsFor={actionsFor} />;
  else content = <LanguagePage key={languageId} language={language} focusCard={route.card} actionsFor={actionsFor} />;

  // Highlight the section nearest the top in the sidebar contents.
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    if (route.view !== 'language' || result) return;
    const sections = [...document.querySelectorAll<HTMLElement>('main [id^="card-"]')];
    const update = () => {
      let current = sections[0]?.id ?? '';
      for (const el of sections) if (el.getBoundingClientRect().top < 120) current = el.id;
      setActiveSection(current);
    };
    update();
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
  }, [route, result, languageId]);

  // Keep the active contents link visible in the sidebar.
  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    if (sidebar) sidebar.scrollTop = 0;
  }, [languageId]);

  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const link = document.querySelector<HTMLElement>('.contents a[aria-current]');
    if (!sidebar || !link || window.scrollY < 40) return;
    const box = link.getBoundingClientRect();
    if (box.top < 40 || box.bottom > window.innerHeight - 40) sidebar.scrollTop += box.top - window.innerHeight / 2;
  }, [activeSection]);

  const savedCount = new Set([...favourites, ...Object.keys(notes)]).size;

  const languageNav = (className: string) => (
    <nav className={className} aria-label="Languages">
      {languages.map((l, i) => (
        <a
          key={l.id}
          href={routeHref({view: 'language', language: l.id})}
          className="lang-link"
          aria-current={route.view === 'language' && !result && l.id === languageId ? 'page' : undefined}
          style={{'--lang': l.color} as CSSProperties}
          data-on={l.onPage}
          title={`${l.name} (${i + 1})`}
          onClick={() => setQuery('')}
        >
          <span className="lang-name">{l.name}</span>
          <span className="lang-count">{l.cards.length}</span>
        </a>
      ))}
    </nav>
  );

  const showContents = route.view === 'language' && !result;

  return (
    <div className="app" data-on={language.onPage} style={{'--lang': language.color} as CSSProperties}>
      <button className="skip-link" onClick={() => main.current?.focus()}>Skip to content</button>

      <aside className="sidebar">
        <a className="brand" href={routeHref({view: 'language', language: languageId})}>
          <span className="brand-mark" aria-hidden="true">{'{ }'}</span> Syntax
        </a>
        <p className="side-label">Languages</p>
        {languageNav('side-languages')}
        {showContents && (
          <nav className="contents" aria-label={`${language.name} contents`}>
            <p className="side-label">{language.name} contents</p>
            {language.categories.map(category => (
              <div key={category} className="contents-group">
                <p className="contents-category">{category}</p>
                {language.cards.filter(c => c.category === category).map(card => (
                  <a
                    key={card.id}
                    href={routeHref({view: 'language', language: language.id, card: card.id})}
                    aria-current={activeSection === `card-${language.id}-${card.id}` ? 'location' : undefined}
                  >
                    {card.title}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        )}
      </aside>

      <div className="workspace">
        <header className="topbar">
          <a className="brand mobile-only" href={routeHref({view: 'language', language: languageId})}>
            <span className="brand-mark" aria-hidden="true">{'{ }'}</span> Syntax
          </a>
          <label className="search">
            <Search size={16} aria-hidden="true" />
            <input
              ref={searchInput}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search syntax — e.g. py format float"
              aria-label="Search all languages"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button className="icon-button" onClick={() => { setQuery(''); searchInput.current?.focus(); }} aria-label="Clear search"><X size={15} /></button>
            ) : <kbd>/</kbd>}
          </label>
          <div className="top-links">
            <a className="top-link" href={routeHref({view: 'compare'})} onClick={() => setQuery('')} aria-current={route.view === 'compare' && !result ? 'page' : undefined} title="Compare languages">
              <ArrowLeftRight size={16} /><span>Compare</span>
            </a>
            <a className="top-link" href={routeHref({view: 'saved'})} onClick={() => setQuery('')} aria-current={route.view === 'saved' && !result ? 'page' : undefined} title="Saved">
              <Bookmark size={16} /><span>Saved</span>{savedCount > 0 && <em>{savedCount}</em>}
            </a>
            <button className="top-link" onClick={() => setSettingsOpen(true)} title="Settings">
              <SlidersHorizontal size={16} /><span>Settings</span>
            </button>
          </div>
          {languageNav('mobile-languages')}
        </header>
        <main id="main" ref={main} tabIndex={-1}>{content}</main>
        <footer>{offline.label}</footer>
      </div>

      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        onPreferencesChange={setPreferences}
        backup={{favourites, notes, preferences}}
        onRestore={backup => {
          setFavourites(backup.favourites);
          setNotes(backup.notes);
          setPreferences(backup.preferences);
          setStatus('Backup restored');
        }}
        offline={offline.label}
        installPrompt={offline.install}
      />
      <Tooltip />
      <div className={`toast${status ? ' visible' : ''}`} role="status" aria-live="polite">{status}</div>
    </div>
  );
}
