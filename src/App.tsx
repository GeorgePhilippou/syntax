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
      if (element) element.scrollIntoView({block: 'center'});
      else window.scrollTo({top: 0});
    });
  }, [route, languageId]);

  useEffect(() => {
    const root = document.documentElement;
    if (preferences.theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = preferences.theme;
    root.style.setProperty('--font-size', `${preferences.fontSize}px`);
    root.toggleAttribute('data-wrap', preferences.wrap);
  }, [preferences.theme, preferences.fontSize, preferences.wrap]);

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

  const savedCount = new Set([...favourites, ...Object.keys(notes)]).size;

  return (
    <div className="app" style={{'--lang': language.color} as CSSProperties}>
      <button className="skip-link" onClick={() => main.current?.focus()}>Skip to content</button>
      <nav className="rail" aria-label="Languages">
        <a className="brand" href={routeHref({view: 'language', language: languageId})}>Syntax<span>.</span></a>
        <div className="tabs">
          {languages.map((l, i) => (
            <a
              key={l.id}
              href={routeHref({view: 'language', language: l.id})}
              className="tab"
              aria-current={route.view === 'language' && !result && l.id === languageId ? 'page' : undefined}
              style={{'--lang': l.color} as CSSProperties}
              title={`${l.name} (${i + 1})`}
              onClick={() => setQuery('')}
            >
              <span className="tab-symbol">{l.symbol}</span>
              <span className="tab-name">{l.name}</span>
            </a>
          ))}
        </div>
        <div className="rail-links">
          <a href={routeHref({view: 'compare'})} onClick={() => setQuery('')} aria-current={route.view === 'compare' && !result ? 'page' : undefined} title="Compare">
            <ArrowLeftRight size={18} /><span>Compare</span>
          </a>
          <a href={routeHref({view: 'saved'})} onClick={() => setQuery('')} aria-current={route.view === 'saved' && !result ? 'page' : undefined} title="Saved">
            <Bookmark size={18} /><span>Saved</span>{savedCount > 0 && <em>{savedCount}</em>}
          </a>
          <button onClick={() => setSettingsOpen(true)} title="Settings">
            <SlidersHorizontal size={18} /><span>Settings</span>
          </button>
        </div>
      </nav>

      <div className="workspace">
        <header className="topbar">
          <label className="search">
            <Search size={17} aria-hidden="true" />
            <input
              ref={searchInput}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search — try “rust hashmap”"
              aria-label="Search all languages"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button className="icon-button" onClick={() => { setQuery(''); searchInput.current?.focus(); }} aria-label="Clear search"><X size={15} /></button>
            ) : <kbd>/</kbd>}
          </label>
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
      <div className={`toast${status ? ' visible' : ''}`} role="status" aria-live="polite">{status}</div>
    </div>
  );
}
