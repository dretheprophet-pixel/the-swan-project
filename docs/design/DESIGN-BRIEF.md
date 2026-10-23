# The Swan Project: Visual Direction

**Issue #12 · Phase 2.5, UI Identity Overhaul**
Status: draft for review · Desktop first (mobile gets its own milestone later)

This brief defines what "LOST-authentic" means for the site. Issues #13–17 build against it. If a design question comes up during those issues, the answer should come from here. If it's not here, update this doc first.

---

## 1. The big idea

**Two eras, one archive.** Each daily transmission is something you found in the hatch.

| Mode | Era | Feels like | Condition |
|---|---|---|---|
| **Terminal** | The Swan, 2004 | The computer in the Swan station, decades after the Dharma Initiative left. Humming, warm, slightly unstable. | Worn: phosphor burn-in, flicker, dust on the glass |
| **Codex** | DHARMA, 1970s | Paperwork from the Initiative's prime: orientation materials, typed station reports, field notes in a manila folder. | Crisp: clean paper, fresh typewriter ink, rubber stamps |

The style of an entry already decides its mode (`terminal` or `codex`). Now it also decides its **era**. A terminal entry is someone reading the archive in 2004. A codex entry is the archive as it was written.

**What we're moving away from:** anything that reads as *The Matrix* or generic hacker sci-fi. That means no neon green, no digital rain, no cyberpunk glow, no futuristic fonts. Dharma tech is 1970s institutional: beige, analog, earnest, a little eerie.

## 2. Guiding principles

1. **Found artifact, not a website.** Every frame should look like an object: a monitor, a folder, a film card. Avoid flat web UI.
2. **Woven in, not stuck on.** LOST anchors (octagon, countdown, fail-safe key) are *structural*: they're the frame, the controls, the clock. A fan spots them instantly. Nobody else feels decorated at.
3. **Readable first.** Atmosphere never costs legibility. All body text meets WCAG AA contrast, and effects sit behind or around text, never on top of it.
4. **Restraint in motion.** One ambient effect per mode, plus one reaction per user action. Nothing flashes faster than 3 times per second, and everything respects `prefers-reduced-motion`.
5. **Original, not copied.** We draw our own marks *inspired by* the show's visual language (octagons, rings, station symbols, stencils). We don't trace or embed the show's actual logos, screenshots, or film frames.

## 3. Color palette

All contrast ratios are measured against the mode's own background.

### Terminal: Swan, 2004 (amber CRT)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `crt-bg` | `#0E0A04` | Screen background, a warm near-black (never pure black) | n/a |
| `crt-amber` | `#FFB000` | Primary text, prompts, cursor | 10.8 : 1 |
| `crt-amber-dim` | `#B87D00` | Secondary text, labels, metadata | 5.6 : 1 |
| `crt-amber-faint` | `#6E4A00` | Borders, scanlines, burn-in ghosts. **Not for text.** | 2.5 : 1 |
| `crt-offwhite` | `#F2E6D0` | **Accent only:** system warnings, the Numbers, the countdown | 16.0 : 1 |
| `crt-alert` | `#E0443A` | **Incident only:** failsafe takeover, countdown at zero | 4.8 : 1 |
| `bezel` | `#2B2620` / `#3A332A` | The monitor casing around the screen (dark putty plastic) | n/a |

Rule of thumb: **amber is the voice, off-white is the shout, red is the emergency.** If off-white appears more than once or twice per screen, it stops meaning anything.

Glow comes from amber `text-shadow` at low opacity (e.g. `0 0 4px #FFB00066`), not from a spread `box-shadow` on boxes.

### Codex: DHARMA, 1970s (paper and ink)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `paper` | `#F3ECDC` | Document page, a clean cream | n/a |
| `manila` | `#D9C49A` | Folder, tabs, index cards | n/a |
| `ink` | `#1F2430` | Typewriter text, a blue-black ribbon | 13.2 : 1 |
| `ink-faded` | `#4A4E57` | Captions, carbon copies, secondary text | 7.1 : 1 |
| `stamp-red` | `#A8352B` | Rubber stamps: CLASSIFIED, classification levels | 5.6 : 1 |
| `desk` | `#1A1410` | Background behind the folder (dark desk/felt) | n/a |

**Station accents** are a 1970s institutional set, used for station badges, folder tabs, and rule lines, and as text only where noted:

| Token | Hex | Text-safe on paper? |
|---|---|---|
| `dharma-blue` | `#2E5A88` | yes (6.1) |
| `dharma-teal` | `#2C6A6E` | yes (5.3) |
| `dharma-avocado` | `#5E6B2F` | yes (4.9) |
| `dharma-orange` | `#B5531A` | large text only (4.2) |
| `dharma-mustard` | `#C9971F` | **no**, fills and shapes only (2.3) |

Suggested station mapping, replacing the current neon `STATIONS[].color` values:
Swan → mustard · Pearl → teal · Flame → orange · Arrow → avocado · Hydra → blue · Orchid → avocado · Looking Glass → teal · Staff → blue.
Two stations sharing a color is fine; the symbol is what tells them apart.

### What gets retired

The entire `phosphor` green palette, `#39ff14` everywhere, the purple `#9b5de5`, and the bright cyans (`#00b4d8`, `#0077b6`). Per CLAUDE.md, the hardcoded hex values to update live in `tailwind.config.js`, `App.jsx` (page backgrounds and the TODAY indicator glow), `STATIONS[].color`, `BADGE_COLORS`, and `CLASSIFICATION_STYLES`.

## 4. Typography

Four families, all on Google Fonts:

| Role | Font | Why | Replaces |
|---|---|---|---|
| Terminal display: prompts, titles, the Numbers | **VT323** | Modeled on a real 1970s–80s DEC terminal font. Chunky and authentic. | Share Tech Mono (reads sci-fi) |
| Terminal body: long transmissions | **IBM Plex Mono** | Same era and feel, far more readable over several paragraphs | Share Tech Mono |
| Codex body: typed documents | **Courier Prime** | A typewriter face built for reading; looks like a 1970s typed report | Crimson Text / IM Fell English (IM Fell reads 1700s, wrong era) |
| DHARMA labels: station names, headings, stamps | **Jost** (Futura-style) | Geometric 1970s institutional sans, the "corporate optimism" of the Initiative | Bebas Neue (too modern) |

Guidelines:
- Terminal text is **ALL CAPS** for system lines and sentence case for transmitted messages. VT323 needs size: at least 20px on desktop.
- Codex headings use Jost, uppercase, letter-spaced (`0.15em`). Body is Courier Prime at 16–17px with a 1.6 line height.
- Stamps use Jost Bold uppercase in `stamp-red`, rotated −3° to 3°, at 85% opacity.
- *Optional, later:* a handwriting face (e.g. "Caveat") for margin notes on field-journal entries. Hold this until the codex looks right without it.

## 5. Texture library

Every texture is **generated in code** (CSS gradients and inline SVG `feTurbulence` noise), so there are no image files, nothing to tile, and no seams. That directly covers #14's "no tiling issues" criterion.

### Terminal (worn)
| Texture | How | Strength |
|---|---|---|
| Scanlines | `repeating-linear-gradient`, 1px dark lines every 3px | Subtle, ~8% opacity |
| Phosphor glow | Amber `text-shadow` | Light |
| Screen curvature and vignette | Radial gradient darkening the corners, plus a slightly rounded screen inset | Medium |
| Glass reflection | Faint diagonal light streak on the screen | Very subtle |
| Burn-in ghost | A static, barely visible "4 8 15 16 23 42" baked into the screen at ~4% | A fan-only detail |
| Flicker | Brightness wobble of 1–3%, slow | Ambient effect; off under reduced motion |

### Codex (crisp)
| Texture | How | Strength |
|---|---|---|
| Paper grain | SVG fractal noise, desaturated | Subtle, ~6% |
| Typewriter ink | 0.3px ink-colored `text-shadow` to suggest a ribbon impression | Barely there |
| Rubber stamps | Text with slight rotation and a noise mask for uneven ink | Medium |
| Manila folder | Tab with the station name; the page sits inside the folder | Structural |
| Desk vignette | Dark radial gradient around the folder | Medium |
| Paper-clip or punch holes | Small CSS shapes, decorative | Optional |

Coffee rings, water stains, and tears are **not** used: the 1970s codex is crisp. The worn look belongs to the terminal.

## 6. Iconography and LOST anchors

Our own versions, drawn as SVG, in the show's visual language:

| Anchor | Where it lives | Issue |
|---|---|---|
| **Octagon ring** | Frames every station badge: octagon inside a ring, with the station's own simple symbol in the center. Already partly built (`OCTAGON_CLIP`). | #15 |
| **Swan countdown clock** | Flip-clock digits in the header, styled after the Swan's counter, counting down to the *next transmission* (midnight). The last 4 minutes of the day switch to `crt-alert`. | #15 |
| **Fail-safe key** | The FailSafeButton becomes a key in a recessed panel behind a "lift to access" cover, instead of a plain button. | #15 |
| **QUARANTINE stencil** | Spray-stencil lettering on the boot screen, as if painted on the inside of the hatch door. | #15 |
| **Orientation film card** | Codex entries open with a short title card: film-leader numbers counting down, slight frame jitter, then the document. | #16 / #17 |
| **Blast door map** | Future easter egg: a hidden "UV light" mode that reveals glowing marginalia. Out of scope for 2.5; logged here so it isn't lost. | later |

**#15 commitment:** the first four (octagon ring, countdown, fail-safe key, QUARANTINE stencil). That covers the "2–3 anchors" acceptance criterion with one to spare.

Station symbols should stay simple, readable at 20px, single-color, and drawn with a consistent stroke weight. They replace the current Unicode glyphs (☯ ✦ ⚒ etc.).

## 7. Layout (desktop first)

- **Terminal entries:** the page is a monitor. A putty-colored bezel frames the screen, and the screen holds the transmission. The archive controls (PREV / NEXT / TODAY) become hardware-style buttons on the bezel's bottom edge.
- **Codex entries:** the page is a desk. A manila folder sits centered, its tab names the station, and the typed document is clipped inside. Stamps sit at the top.
- Content width stays near the current `max-w-3xl` (~768px of text) so line lengths remain readable. The frame extends beyond it.
- The header keeps the station badge (left) and gains the countdown (right).
- **Mobile:** not designed in this phase. Desktop layouts must not *break* on a phone (no horizontal scroll, text stays readable), but the real mobile design is its own milestone.

## 8. Motion and transitions (#16 / #17)

| Moment | Terminal | Codex |
|---|---|---|
| Load | CRT power-on: a horizontal line expands to the full screen (~400ms), then the text types in | Orientation film card (~1.2s, skippable on click), then the page fades in |
| Switching modes via PREV/NEXT | Terminal → codex: CRT power-off collapse, then folder slides in. Codex → terminal: folder slides out, then CRT power-on. | Same, reversed |
| Ambient | Slow flicker | None. Paper is still. |
| Incident | Existing glitch takeover, recolored to amber and `crt-alert` | Codex locks out (existing behavior) |

All of these become instant cuts under `prefers-reduced-motion`.

**Audio (#17, always opt-in and off by default):** a low hatch hum under terminal entries, a projector click when the film card starts, and a soft paper sound when a folder opens. Sound never autoplays before the user turns it on.

## 9. Accessibility checklist

- [ ] Body text is AA or better (4.5:1) in both modes. Every text color in section 3 is marked.
- [ ] Nothing flashes more than 3 times per second, including the Incident glitch.
- [ ] `prefers-reduced-motion` disables flicker, typing, film cards, and transitions.
- [ ] Decorative layers (scanlines, grain, burn-in) are `aria-hidden` and never intercept clicks.
- [ ] The typed-in terminal text is available to screen readers in full immediately, not letter by letter.

## 10. How the issues use this

| Issue | Takes from this brief |
|---|---|
| #13 Amber CRT | §3 terminal palette, §4 terminal fonts, §5 terminal textures |
| #14 Codex paper and glyphs | §3 codex palette and station accents, §4 codex fonts, §5 codex textures |
| #15 LOST anchors | §6, the four committed anchors |
| #16 Hybrid mode logic | §1 (style = era), §8 transitions |
| #17 Micro-interactions | §8 motion and audio |

Recommended order: **#13 and #14 first** (they set the palette tokens everything else uses), then #15, then #16, then #17.

## Open questions

1. Should the countdown target midnight in the viewer's local time (current behavior for the daily seed), or a fixed "island time" for everyone?
2. Should the Incident keep the codex fully locked, or show a burned/redacted version of the folder?
3. Should the station symbols be designed all at once as a set, or one station at a time as they appear in new lore?
