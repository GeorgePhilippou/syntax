# Syntax design studies

Open the local development preview at http://localhost:5173/ (`npm run dev -- --port 5173`). Open Settings → Appearance to select a look. Colour Tabs is the default; your selected look persists locally. Language tabs recolour the entire page and connect the active index tab to it.

1. **Field Notes:** dark olive field-guide framing, cream ink, square cards and fine dividers.
2. **Spiral Journal:** lighter solid language colours, binding details, a notebook margin and soft paper panels.
3. **Pixel Quest:** 8-bit handheld notebook framing, thick square borders, hard shadows and monospace headings. Body text keeps its readable system font.
4. **Adventure Codex:** dark game-journal colours, double-line frames, bookish headings and gold-toned ink.
5. **Colour Tabs:** bold stationery framing, outlined rounded cards, hard shadows and complementary coloured category tabs.

Reference content and existing interactions are shared across all five designs. Colour Tabs is the selected default. The other four designs remain available as personal appearance options. Screenshots are in `preview/designs/`. The production build passes; all five selectors and a whole-page Python colour change were inspected in the embedded browser. Selection persistence was checked after reload.
