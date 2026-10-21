import {useEffect, useRef, type ChangeEvent} from 'react';
import {Download, Upload, X} from 'lucide-react';

export type Theme = 'system' | 'light' | 'dark';
export type Preferences = {theme: Theme; fontSize: number; showNotes: boolean; wrap: boolean};
export const defaultPreferences: Preferences = {theme: 'system', fontSize: 15, showNotes: true, wrap: false};

export type Backup = {favourites: string[]; notes: Record<string, string>; preferences: Preferences};

type Props = {
  open: boolean;
  onClose: () => void;
  preferences: Preferences;
  onPreferencesChange: (p: Preferences) => void;
  backup: Backup;
  onRestore: (b: Backup) => void;
  offline: string;
  installPrompt: (() => void) | null;
};

const shortcuts: [string, string][] = [
  ['/  or  ⌘K', 'Search'],
  ['Esc', 'Clear search'],
  ['1 – 8', 'Switch language'],
];

export function Settings({open, onClose, preferences, onPreferencesChange, backup, onRestore, offline, installPrompt}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const set = (patch: Partial<Preferences>) => onPreferencesChange({...preferences, ...patch});

  function download() {
    const blob = new Blob([JSON.stringify({app: 'syntax', version: 2, ...backup}, null, 2)], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `syntax-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function restore(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data.favourites) || typeof data.notes !== 'object') throw new Error('Not a Syntax backup');
      onRestore({favourites: data.favourites, notes: data.notes, preferences: {...defaultPreferences, ...data.preferences}});
    } catch (error) {
      alert(`Couldn't restore: ${(error as Error).message}`);
    }
  }

  return (
    <dialog ref={dialog} className="settings" onClose={onClose} onClick={e => { if (e.target === dialog.current) onClose(); }} aria-labelledby="settings-title">
      <div className="settings-body">
        <header>
          <h2 id="settings-title">Settings</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close settings"><X size={18} /></button>
        </header>

        <fieldset>
          <legend>Theme</legend>
          <div className="segmented">
            {(['system', 'light', 'dark'] as const).map(theme => (
              <label key={theme}>
                <input type="radio" name="theme" checked={preferences.theme === theme} onChange={() => set({theme})} />
                <span>{theme[0].toUpperCase() + theme.slice(1)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Reading</legend>
          <label className="row">
            <span>Text size <strong>{preferences.fontSize}px</strong></span>
            <input type="range" min={13} max={20} value={preferences.fontSize} onChange={e => set({fontSize: Number(e.target.value)})} />
          </label>
          <label className="row">
            <span>Show explanations under code</span>
            <input type="checkbox" checked={preferences.showNotes} onChange={e => set({showNotes: e.target.checked})} />
          </label>
          <label className="row">
            <span>Wrap long code lines</span>
            <input type="checkbox" checked={preferences.wrap} onChange={e => set({wrap: e.target.checked})} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Your data</legend>
          <p className="hint">Saved cards and notes live in this browser only. Keep a backup file in case site data is cleared.</p>
          <div className="buttons">
            <button onClick={download}><Download size={15} /> Download backup</button>
            <label className="button">
              <Upload size={15} /> Restore backup
              <input type="file" accept="application/json,.json" onChange={restore} hidden />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Keyboard</legend>
          <dl className="shortcuts">
            {shortcuts.map(([keys, action]) => <div key={keys}><dt><kbd>{keys}</kbd></dt><dd>{action}</dd></div>)}
          </dl>
        </fieldset>

        <fieldset>
          <legend>Offline & install</legend>
          <p className="hint">{offline}</p>
          <p className="hint">Safari: <strong>File → Add to Dock</strong>. Chrome: the install icon in the address bar.</p>
          {installPrompt && <div className="buttons"><button onClick={installPrompt}><Download size={15} /> Install Syntax</button></div>}
        </fieldset>
      </div>
    </dialog>
  );
}
