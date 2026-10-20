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
- Sites was not deployed. GitHub Pages is the selected publication target.

## Native browser acceptance check

1. Run the production build and preview server (README commands).
2. Open its URL in Safari or Chrome and wait for offline readiness.
3. Install, open the installed app while connected and wait for readiness again.
4. Save a favourite and change text size.
5. Disconnect from the network or stop the preview server. Close/reopen the installed app and reload.
6. Confirm all five languages, search, comparison and saved settings work.
7. Reconnect before testing an update. Clearing browser site data removes favourites and offline resources.

## Visual redesign — 21 October 2026

Kept the language rail layout. Added warm ivory surfaces, an olive C banner, complementary blue/terracotta/lavender/honey language banners, rounded reference cards, dark olive code panels and a decorative desktop banner. Production build passed. Rechecked language colour switching, keyword search and comparison controls in the embedded browser. Existing native offline verification limits still apply.

## Appearance settings — 21 October 2026

Colour Tabs is the default. The prototype design toolbar was replaced by five labelled radio options in Settings → Appearance. Appearance has its own local preference, separate from the earlier design-study choice. Checked initial default, switching to Field Notes, persistence after reload and restoring Colour Tabs. Keyboard Escape closes the settings dialog. Reference content is unchanged.

## Notebook sidebar — 21 October 2026

Replaced the dark rail with a warm paper binding and solid language-coloured dividers. Active tabs retain a visible marker and join the current page. Layout, settings, reference content and theme selection remain intact. Production build passed; inspected C/Python tab switching and page connections in the embedded browser.

## GitHub Pages preparation — 21 October 2026

Production build, 76 language syntax checks and offline worker tests at both `/` and `/syntax/` pass. The current Colour Tabs design and earlier paper sidebar are preserved. The GitHub Actions workflow publishes only the built app after checks pass; repository and live deployment verification follow separately.
