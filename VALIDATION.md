# Syntax v1 validation — 21 October 2026

## Passing

- `npm run build`: TypeScript compilation and Vite production build, with local hashed assets.
- `npm test`: 93 cards, required metadata and unique concept IDs; 76 C17/C++17/Python/JavaScript compiler/parser checks. C/C++ fragments use minimal harnesses and required headers. Python uses a 3.11 runtime; JavaScript import examples are checked as two separate modules.
- `npm run test:offline`: production service worker installs; discovers and caches hashed assets; caches manifest/icons; claims clients; deletes only its own obsolete caches; serves HTML and every required cached asset with a failed network. This is a deterministic worker harness, not an installed-browser test.
- Embedded-browser visual inspection at its narrow pane width: readable single-column layout, persistent language rail, no overlapping card controls.
- Browser interactions: switch language; search `for loop` and `integer`; save a card; copy feedback; expand/collapse notes; reload and check saved favourites; select comparison concept; toggle a fourth comparison language; adjust font size and line spacing, reload and check persistence; reset reading preferences; Escape closes dialog and restores focus; Command-K focuses search; installation guidance opens/closes.

## Limits and unresolved verification

- The embedded browser showed a blank page when reloading after the local server was stopped. This happened with both network-first and cache-first service-worker navigation. Online reload restored the app. Native installed-PWA offline reopening has not passed a browser test; the worker harness alone is insufficient proof.
- Native Safari control was not approved. Native Safari and Chrome compatibility, installation and disconnected reopening still need on-device verification.
- MATLAB was manually reviewed against MathWorks documentation. No MATLAB runtime was available, so no MATLAB execution claim is made.
- No private hosted deployment or source synchronization completed. Automatic approval review rejected external source upload as outside the explicit local-build authorization. A private, unpublished Sites record exists, but contains no uploaded source or deployed version.

## Native browser acceptance check

1. Run the production build and preview server (README commands).
2. Open its URL in Safari or Chrome and wait for offline readiness.
3. Install, open the installed app while connected and wait for readiness again.
4. Save a favourite and change text size.
5. Disconnect from the network or stop the preview server. Close/reopen the installed app and reload.
6. Confirm all five languages, search, comparison and saved settings work.
7. Reconnect before testing an update. Clearing browser site data removes favourites and offline resources.
