# Syntax

A personal programming syntax reference built with React, TypeScript and Vite. No backend, API keys, accounts, external fonts, analytics or runtime dependencies on other services.

## Launch on macOS

Install Node.js 22.12+ (or a newer supported LTS) and npm. In Terminal:

```sh
cd /Users/georgephilippou/Developer/Syntax
npm ci
npm run dev
```

Open the Local URL printed by Vite (usually http://127.0.0.1:5173). The development server is for editing; offline caching is enabled only in production.

## Production and offline use

```sh
npm run build
npm run preview -- --port 4173
```

Open http://127.0.0.1:4173. Wait for **Ready for offline use** at the bottom. The service worker caches the entire application, reference collection, highlighting and icons. Disconnect or stop the server, then reload the same URL to verify offline access. First use requires a successful online load. HTTPS is required on a hosted domain; localhost is also a secure context.

For long-term use, serve the `dist/` folder from any static HTTPS host. No Node server is required in production. Relative asset URLs support a subdirectory deployment. Keep the URL and browser profile consistent: favourites and reading settings belong to that browser and origin. Clearing site data removes both stored preferences and offline resources. Browser storage eviction can also remove offline resources; reopen online to restore them.

## Install as a desktop app

- **Safari, macOS Sonoma or newer:** open the production URL, then use **File → Add to Dock** (or Share → Add to Dock). Open the new Dock app while online and wait for offline readiness. [Apple instructions](https://support.apple.com/en-ca/guide/safari/ibrw9e991864/mac).
- **Chrome:** use the install icon in the address bar, or the browser menu under **Cast, save and share → Install page as app**. The built-in Install app panel also exposes a direct install button when Chrome offers it.
- After installing, open it once while connected, then disconnect and reopen to confirm offline operation on your Mac. An installed Safari web app can have separate browser storage: favourites may need to be saved in the installed app.

A private Sites preview is provided separately. Its authentication layer requires connectivity when the host asks you to sign in. Use the local production build or your own static HTTPS deployment for offline use without a host sign-in gate.

## Verification status

The production build, 76 C/C++/Python/JavaScript parser checks, core interaction checks and offline service-worker harness pass. The embedded Codex browser did not render an offline reload after the preview server was stopped, despite a populated cache. Native Safari control was unavailable and a Chrome installation was not exercised. **Installed Safari/Chrome offline reopening remains unverified.** Use the installation steps above to verify on your Mac; see `VALIDATION.md` for the test record.

## Navigation

- Choose C, Python, MATLAB, C++ or JavaScript from the language rail.
- **⌘K / Ctrl+K** focuses search. Search all words in titles, aliases, descriptions and code. Escape clears and exits search.
- Category buttons narrow the selected language. Filters also apply to favourites.
- Bookmark a card to save it locally; the Favourites view shows saved cards in the selected language.
- Copy buttons copy exact code, including indentation. Syntax notes identify context, required headers, versions and common traps.
- Compare a card, or open Compare languages and choose a concept. Toggle any of the five languages. The accent block explains the important syntax differences.
- Reading preferences adjust font size and extra line spacing. All controls work with Tab, Shift+Tab, Enter and Space; dialogs trap focus, support Escape and restore focus.

## Source layout

- `src/data.ts`: language metadata, 18 shared concepts, language-specific examples and extra concepts (93 cards total: C 20, Python 18, MATLAB 18, C++ 19, JavaScript 18).
- `src/main.tsx`: reusable code, card and accessible dialog components; search, comparison, favourites and installation UI.
- `src/style.css`: responsive dark theme, local system fonts and reduced-motion support.
- `public/manifest.webmanifest`, `public/sw.js`: install metadata and same-origin offline caching.
- `tests/content.mjs`: collection completeness and compiler/parser checks.

To add a shared concept, add metadata to `concepts` and a matching example for each language. TypeScript checks coverage. Use `extras` for concepts specific to one language. Keep snippets short and put required context in `note`.

## Validation

```sh
npm run build
npm test
npm run test:offline
```

The content test needs `clang`, `clang++` (Xcode Command Line Tools) and Python 3.10+. Set `SYNTAX_PYTHON=/absolute/path/to/python3` if your default Python is older. It checks C17 and C++17 syntax using small harnesses, Python using `ast.parse`, and JavaScript using Node's parser. These are syntax checks, not proofs of runtime behavior. MATLAB examples were reviewed manually; no MATLAB runtime is bundled or available for automated verification.

Reference decisions were checked against [Python's compound statements](https://docs.python.org/3.10/reference/compound_stmts.html), [MATLAB for-loop behavior](https://www.mathworks.com/help/matlab/ref/for.html) and [MATLAB indexing](https://www.mathworks.com/help/matlab/math/array-indexing.html). Inline notes distinguish excerpts from complete programs. C/C++ control-flow excerpts need a containing function and stated headers. JavaScript imports demonstrate two separate files; browser file reading requires user selection.

Production builds automatically give the service-worker cache a version derived from the built HTML and its hashed asset references. The installer collects the hashed JS/CSS from the new HTML so the offline shell and assets belong to one build. Check offline reload after every deployment.
