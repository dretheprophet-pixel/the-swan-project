# The Swan Project — CLAUDE.md

A LOST-themed daily lore reader. Every day the site shows one "transmission" from the DHARMA Initiative archive, rendered either as a green-phosphor **terminal** or an aged-paper **codex** page. This is Dre's passion project. LOST is his all-time favorite show, so lore accuracy and atmosphere matter as much as the code.

## Commands

```bash
npm install       # restore dependencies
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build to dist/; run before every PR
npm run preview   # serve the production build locally
```

There is no test suite or linter yet. `npm run build` passing is the minimum bar.

## Stack

React 18 + Vite 5 + TailwindCSS 3. Plain JavaScript (JSX), no TypeScript. All content lives in a JSON file; there is no backend. The deploy target is Vercel (not yet deployed; see #10).

## Layout

```
src/
  main.jsx                 entry point; imports src/index.css only
  App.jsx                  root: boot screen, daily entry state, PREV/NEXT archive nav
  index.css                the LIVE stylesheet (Tailwind layers + custom classes)
  components/
    DailyEntry.jsx         picks TerminalFrame vs CodexPage, runs the Numbers flash
    TerminalFrame.jsx      green CRT terminal presentation
    CodexPage.jsx          aged-paper codex presentation (locks out during Incident)
    Header.jsx / Footer.jsx
    StationBadge.jsx       octagonal DHARMA station badge
    FailSafeButton.jsx     the Fail-Safe Key interaction (#6)
  constants/index.js       shared constants: styles, timings, palettes, FAILSAFE_ENTRY
  data/lost_entries.json   the lore library (10 entries as of Oct 2026)
  logic/
    seededRandom.js        Mulberry32 PRNG + YYYYMMDD date seed
    getDailyEntry.js       today's entry; 0.5% chance of the Incident override
    getStationOfDay.js     STATIONS registry (8 stations) + lookups
    getNumbersMode.js      THE_NUMBERS + 5 rotating display modes
  styles/
    terminal.css, codex.css, animations.css
                           NOT IMPORTED anywhere. An earlier design-system draft;
                           components don't use its classes. Treat as reference
                           material for Phase 2.5, and don't wire it in wholesale.
```

## How the daily logic works

- Everything is **deterministic by date**: same date gives the same entry, station, and Numbers mode for every visitor. Never use `Math.random()` for anything that defines "today's" content. Use `createSeededRandom(dateSeed(date))`.
- Each feature uses its own **seed offset** so they don't move in lockstep: entry `+0`, Numbers mode `+42`, daily number `+108`, station of the day `+999`. Keep offsets unique when adding features, and Numbers-flavored values are encouraged.
- The **Dharma Incident**: if the first roll of the date's RNG is `< 0.005`, `getDailyEntry` returns `FAILSAFE_ENTRY` and the whole UI takes over (glitch mode, Swan station forced, codex locked, fail-safe button hidden). The next Incident dates are Jul 14 2027, Aug 27 2027, and Apr 26 2028. Use these to test the takeover.
- Adding or removing entries in `lost_entries.json` reshuffles which entry lands on which date. That's fine pre-launch; after launch, consider it a breaking change.
- `getStationOfDay()` exists but is **not called** yet. The app currently uses the station named on the entry itself. Wiring this up is part of #3.

## Entry schema (`lost_entries.json`)

```json
{
  "id": "entry_011",
  "day": 11,
  "station": "The Swan",
  "style": "terminal",
  "title": "SYSTEM WARNING — COUNTDOWN ANOMALY",
  "subtitle": null,
  "date_stamp": "DAY 011 — CYCLE RESET",
  "body": "Multi-line text. \\n for line breaks.",
  "footer": "CLASSIFIED — LEVEL 5 CLEARANCE REQUIRED",
  "numbers_flash": true,
  "classification": "LEVEL_5",
  "tags": ["swan", "protocol"]
}
```

- `id` must be unique and sequential (`entry_NNN`).
- `station` must match a `STATIONS` name: The Swan, Pearl, Flame, Arrow, Hydra, Orchid, Looking Glass, Staff.
- `style`: `terminal` (ALL-CAPS system logs, `>>` prompts) or `codex` (handwritten/field-journal prose, title case).
- `classification` is a key of `CLASSIFICATION_STYLES` in `constants/index.js`.
- Lore should feel like an in-world artifact from the DHARMA era, not a recap of the show.

## Design system (current vs. planned)

- **Current (live):** colors and fonts come from `tailwind.config.js`. The terminal palette is `phosphor` greens, the codex palette is `codex` paper/ink/sepia, and accents are `dharma` yellow/orange. Fonts: Share Tech Mono (terminal), IM Fell English (codex), Bebas Neue (DHARMA headings), Crimson Text (body). Extra classes live in `src/index.css`.
- **Planned (Phase 2.5):** move from "Matrix green terminal" to authentic DHARMA artifact. The source of truth is **`docs/design/DESIGN-BRIEF.md`** (palette, fonts, textures, anchors, motion), with a visual preview in `docs/design/specimen.html`. Build #13–17 against it; if a design question isn't answered there, update the brief first.
- Hex colors are also hardcoded in some places (`App.jsx` backgrounds, `STATIONS[].color`, `BADGE_COLORS`, `CLASSIFICATION_STYLES`). A palette change has to cover these, not just Tailwind.

## Roadmap and order of work

Issues live on GitHub with two milestones. The agreed order:

1. **Phase 2.5 — UI Identity Overhaul:** #12 design brief, then #13 amber CRT, #14 codex paper and glyphs, #15 LOST UI anchors, #16 hybrid mode logic, #17 micro-interactions.
2. **Phase 2 — Core Features & Lore Engine:** #2 more lore (top content gap), #3 station of the day, #5 Numbers mode (logic exists for #3 and #5, so mostly wire up and review), #7 polish, #8 audio, #10 deploy, #11 README.
3. **#9 Settings Panel last**, since it depends on audio and visual options existing.

## Working conventions

- Never push to `main` directly. Use one branch per issue (`feat/12-design-brief`, `fix/...`, `chore/...`) and open a PR for Dre to review.
- Reference the issue in commits and PRs (`Closes #13`).
- Put shared values in `constants/index.js`, not inline in components.
- Keep the date-seeded determinism intact; it's the core mechanic.
- Include clear test steps in PRs (dates to check, what to look for).
