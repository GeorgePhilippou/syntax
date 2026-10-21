import {useEffect, useState} from 'react';

type InstallEvent = Event & {prompt: () => Promise<void>};

// Registers the service worker (production only) and reports offline readiness.
export function useOffline(onStatus: (message: string) => void) {
  const [ready, setReady] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    const connection = () => setOnline(navigator.onLine);
    const beforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
    };
    window.addEventListener('online', connection);
    window.addEventListener('offline', connection);
    window.addEventListener('beforeinstallprompt', beforeInstall);

    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      const hadController = Boolean(navigator.serviceWorker.controller);
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (hadController) onStatus('Syntax was updated — reload to see the latest version');
      });
      navigator.serviceWorker.register('./sw.js')
        .then(() => navigator.serviceWorker.ready)
        .then(async () => setReady((await caches.keys()).some(k => k.startsWith('syntax-v'))))
        .catch(() => onStatus('Offline setup failed. Reload while connected to try again.'));
    }
    return () => {
      window.removeEventListener('online', connection);
      window.removeEventListener('offline', connection);
      window.removeEventListener('beforeinstallprompt', beforeInstall);
    };
  }, [onStatus]);

  const label = import.meta.env.DEV ? 'Development preview — offline caching is off'
    : !ready ? 'Preparing offline access…'
    : online ? 'Ready for offline use' : 'Working offline';

  return {
    label,
    install: installEvent ? () => { installEvent.prompt().finally(() => setInstallEvent(null)); } : null,
  };
}
