# The Swan Project: Visual Direction

**Issue #12 · Phase 2.5, UI Identity Overhaul**
Status: approved for build, revision 3 · Desktop first (mobile is its own milestone)

This brief defines what "LOST-authentic" means for the site. Issues #13–17 build against it. If a design question comes up during those issues, the answer should come from here. If it's not here, update this doc first.

---

## 1. The big idea

**Two eras, one archive.** Each daily transmission is something you found in the hatch.

| Mode | Era | Feels like | Condition |
|---|---|---|---|
| **Terminal** | The Swan, 2004 | The station computer decades after the Dharma Initiative left: a beige 1970s chassis in a cold concrete bunker, lit by caged work lights. | Worn: phosphor burn-in, flicker, dust on the glass |
| **Codex** | DHARMA, 1970s | Paperwork from the Initiative's prime: orientation title cards, typed station reports, a khaki folder. | Crisp: clean paper, fresh typewriter ink, rubber stamps |

The style of an entry already decides its mode (`terminal` or `codex`). Now it also decides its **era**.

**What we're moving away from:** anything that reads as *The Matrix* or generic hacker sci-fi. That means no neon green, no digital rain, no cyberpunk glow, no futuristic fonts. Dharma tech is 1970s institutional: beige, analog, earnest, a little eerie.

## 2. Guiding principles

1. **Found artifact, not a website.** Every frame should look like an object: a monitor, a folder, a film card. Avoid flat web UI.
2. **Woven in, not stuck on.** LOST anchors (octagon, countdown, fail-safe key) are *structural*: they're the frame, the controls, the clock. A fan spots them instantly. Nobody else feels decorated at.
3. **Readable first.** Atmosphere never costs legibility. All body text meets WCAG AA contrast, and effects sit behind or around text, never on top of it.
4. **Restraint in motion.** One ambient effect per mode, plus one reaction per user action. Nothing flashes faster than 3 times per second, and everything respects `prefers-reduced-motion`.
5. **Original, not copied.** We draw our own marks *inspired by* the show's visual language (octagons, rings, station symbols, stencils). We don't trace or embed the show's actual logos, screenshots, or film frames.

## 3. Color palette

Built from Dre's Swan / DHARMA / Island palette. All contrast ratios are measured against the color the text actually sits on.

### Swan station: structure and terminal (2004)

| Token | Name | Hex | Use | Contrast |
|---|---|---|---|---|
| `bunker` | Swan Bunker Charcoal | `#121517` | Page background, the screen, the room. Cold concrete, never pure black. | n/a |
| `slate-card` | Bunker Card | `#1E2327` | Raised panels and cards on the charcoal | n/a |
| `blast-door` | Blast Door Slate | `#3A4146` | Bulkheads, frame edges, dividers, rivets. **Structural only, not text.** | 1.8 : 1 |
| `chassis` | Weathered Plastic Beige | `#D4CEB8` | The monitor casing, hardware buttons, tape-reel details | n/a |
| `amber` | Sub-Level Hazard Amber | `#FFAA00` | Terminal text, prompts, cursor; the glow of caged work lights | 9.6 : 1 |
| `amber-dim` | | `#B87A00` | Secondary terminal text, labels, metadata | 5.1 : 1 |
| `amber-faint` | | `#6E4A00` | Scanlines, burn-in ghosts. **Not for text.** | n/a |
| `ivory` | Orientation Film Ivory | `#EAE6DF` | **Accent only on the terminal:** system warnings, the Numbers, the countdown | 14.7 : 1 |
| `hieroglyph` | System Failure Red | `#D62828` | Fills, borders and pulses: countdown under 4:00, the Incident | 3.7 : 1, so not for text |
| `hieroglyph-text` | | `#FF1E27` | Red *text* on charcoal (countdown digits, Incident lines) | 4.8 : 1 |

Rule of thumb: **amber is the voice, ivory is the shout, red is the emergency.** If ivory appears more than once or twice per screen, it stops meaning anything.

Glow comes from amber `text-shadow` at low opacity (e.g. `0 0 4px #FFAA0066`), not from a spread `box-shadow` on boxes.

### DHARMA identity: codex and paperwork (1970s)

| Token | Name | Hex | Use | Contrast |
|---|---|---|---|---|
| `ivory` | Orientation Film Ivory | `#EAE6DF` | The document page; title cards | n/a |
| `khaki` | Jumpsuit Khaki | `#C4A47C` | The folder, tabs, index cards | n/a |
| `khaki-dark` | Jumpsuit Tan | `#B8976C` | Folder edges, tab shadows, the folder's back flap | n/a |
| `ink` | Typewriter Ink | `#1F2430` | Typed text, a blue-black ribbon | 12.5 : 1 |
| `ink-faded` | | `#4A4E57` | Captions, carbon copies | 6.7 : 1 |
| `safety-blue` | Industrial Safety Blue | `#1D3557` | Signage-style labels, station headers, rule lines | 9.9 : 1 |
| `stamp-red` | | `#A8352B` | Rubber stamps (CLASSIFIED, levels) | 5.3 : 1 |
| `desk` | | `#121517` | Behind the folder: same bunker charcoal, so both modes live in one world | n/a |

`stamp-red` stays separate from `hieroglyph`. The bright failure red is the Swan's alarm, and a 1970s rubber stamp should be a duller, inkier red.

### Station accents

Used for station badges and symbols, folder tab rules, and the header station indicator.

| Station | Accent | Hex | Text-safe on ivory? |
|---|---|---|---|
| Swan | Hazard Amber | `#FFAA00` | no, fills and shapes only |
| Pearl | Dharma Teal | `#2C6A6E` | yes (5.0) |
| Flame | Burnt Orange | `#B5531A` | large text only (4.0) |
| Arrow | Jumpsuit Tan | `#B8976C` | no, fills only |
| Hydra | Oceanic Blue | `#0F4C81` | yes (7.1) |
| Orchid | Avocado | `#5E6B2F` | yes (4.7) |
| Looking Glass | Deep Water Teal | `#2C6A6E` | yes (5.0) |
| Staff | Industrial Safety Blue | `#1D3557` | yes (9.9) |

Two stations sharing a color is fine; the symbol is what tells them apart.

### The Island: mystery accents (reserved)

| Token | Name | Hex | Reserved for |
|---|---|---|---|
| `jungle-deep` / `jungle` | Black Rock Jungle Canopy | `#182B1E` → `#24422D` | Character-quote and flashback lore, "outside the hatch" moments, the boot screen's world before you descend |
| `oceanic` | Oceanic Flight Blue | `#0F4C81` | Crash and survivor lore, flashback markers |

These colors are **not used in Phase 2.5 UI chrome.** They're held for the lore engine: when entries gain types like `flashback` or `character` (Phase 2, #2), these become those types' accents. Keeping them out of the hatch UI preserves the feeling that the jungle is *outside*.

### What gets retired

The entire `phosphor` green palette, `#39ff14` everywhere, the purple `#9b5de5`, and the bright cyans (`#00b4d8`, `#0077b6`). The hardcoded hex values to update live in `tailwind.config.js`, `App.jsx` (page backgrounds and the TODAY indicator glow), `STATIONS[].color`, `BADGE_COLORS`, and `CLASSIFICATION_STYLES`.

## 4. Typography

Four families, all on Google Fonts:

| Role | Font | Why | Replaces |
|---|---|---|---|
| Terminal display: prompts, titles, the Numbers, the countdown | **VT323** | Modeled on a real 1970s–80s terminal font. Chunky and authentic. | Share Tech Mono (reads sci-fi) |
| Terminal body: long transmissions | **IBM Plex Mono** | Same era and feel, far more readable over several paragraphs | Share Tech Mono |
| Codex body: typed documents | **Courier Prime** | A typewriter face built for reading; looks like a 1970s typed report | Crimson Text / IM Fell English (IM Fell reads 1700s, wrong era) |
| DHARMA labels: station names, headings, stamps, stencils | **Jost** (Futura-style) | Geometric mid-century sans, the "corporate optimism" of the Initiative | Bebas Neue (too modern) |

Guidelines:
- Terminal text is **ALL CAPS** for system lines and sentence case for transmitted messages. VT323 needs size: at least 20px on desktop.
- Codex headings use Jost, uppercase, letter-spaced (`0.15em`). Body is Courier Prime at 16–17px with a 1.6 line height.
- Stamps use Jost Bold uppercase in `stamp-red`, rotated −3° to 3°, at 85% opacity.
- *Optional, later:* a handwriting face for margin notes on field-journal entries. Hold this until the codex looks right without it.

## 5. Texture library

Every texture is **generated in code** (CSS gradients and inline SVG `feTurbulence` noise), so there are no image files, nothing to tile, and no seams. That directly covers #14's "no tiling issues" criterion.

### Bunker and terminal (worn)
| Texture | How | Strength |
|---|---|---|
| Concrete | Very faint large-scale noise on the `bunker` background | Barely there |
| Scanlines | `repeating-linear-gradient`, 1px dark lines every 3px | Subtle, ~8% opacity |
| Phosphor glow | Amber `text-shadow` | Light |
| Screen curvature and vignette | Radial gradient darkening the corners, plus a rounded screen inset in the beige chassis | Medium |
| Glass reflection | Faint diagonal light streak on the screen | Very subtle |
| Burn-in ghost | A static, barely visible "4 8 15 16 23 42" baked into the screen at ~5% | A fan-only detail |
| Work-light falloff | Warm amber radial glow from the top of the page, as if from a caged lamp | Subtle |
| Flicker | Brightness wobble of 1–3%, slow | Ambient effect; off under reduced motion |

### Codex (crisp)
| Texture | How | Strength |
|---|---|---|
| Paper grain | SVG fractal noise, desaturated | Subtle, ~6% |
| Typewriter ink | 0.3px ink-colored `text-shadow` to suggest a ribbon impression | Barely there |
| Rubber stamps | Text with slight rotation and a noise mask for uneven ink | Medium |
| Khaki folder | Tab with the station name; the page sits inside the folder | Structural |
| Desk vignette | Dark radial gradient around the folder | Medium |
| Paper-clip or punch holes | Small CSS shapes, decorative | Optional |

Coffee rings, water stains, and tears are **not** used in normal codex entries; the 1970s codex is crisp. Damage only appears in the Incident's burned folder (§8).

## 6. Iconography and LOST anchors

Our own versions, drawn as SVG, in the show's visual language:

| Anchor | Where it lives | Issue |
|---|---|---|
| **Octagon ring** | Frames every station badge: octagon inside a ring, with the station's symbol in the center | #15 |
| **Swan countdown clock** | Flip-clock digits in the header, counting down to the next transmission at **island midnight** (§7). Ivory digits normally; under 4:00 they switch to `hieroglyph-text` with a slow red pulse on the frame. | #15 |
| **Fail-safe key** | The FailSafeButton becomes a key in a recessed panel behind a "lift to access" cover, instead of a plain button | #15 |
| **QUARANTINE stencil** | Spray-stencil lettering on the boot screen, as if painted on the inside of the hatch door | #15 |
| **Orientation film card** | Codex entries open with a short title card: ivory card, film-leader numbers counting down, slight frame jitter, then the document | #16 / #17 |
| **Blast door map** | Future easter egg: a hidden "UV light" mode that reveals glowing marginalia. Out of scope for 2.5; logged so it isn't lost. | later |

**#15 commitment:** the first four. That covers the "2–3 anchors" acceptance criterion with one to spare.

### Station symbol set (designed together)

All eight station symbols are designed **as one set, up front**, before #15 builds the badges. They're tracked in #20. Rules for the set:
- Original marks inspired by the show's station-logo language; not traced from it.
- One weight and one grid: a 24×24 grid, 2px stroke at 24px, round caps. They must read at 20px.
- Single color: they take the station accent, or ivory on dark.
- They sit inside the octagon ring but also work on their own (folder tabs, the header).
- They replace the current Unicode glyphs (☯ ✦ ⚒ ✿ etc.).
- Delivered as one SVG sprite or a small React component set, with a preview sheet like `specimen.html`.

## 7. Island time

Everyone shares the same day on the island. The daily transmission changes at **island midnight**, a single fixed time zone for every visitor, instead of each visitor's local midnight.

- The countdown, the date seed for the daily entry, the station, the Numbers mode, and the Incident roll **all** use island time, so they can never drift out of sync with each other.
- Implementation note: `dateSeed()` currently uses the visitor's local date. Island time means computing the date in a fixed UTC offset instead. This belongs to whichever issue builds the countdown (#15), and it changes which entry each visitor sees on the switchover day. That's fine pre-launch.
- **Island time is fixed UTC+10 (Sydney standard time),** a nod to Oceanic 815's departure city. It's a fixed offset, not the `Australia/Sydney` zone: the island doesn't observe daylight saving, so there's no hour jump twice a year.
- For a US Eastern visitor, the new transmission arrives at **10am EDT in summer and 9am EST in winter**.

## 8. Layout (desktop first)

- **The room:** the whole page is the bunker: charcoal, with a faint concrete grain and warm work-light falloff at the top. Blast-door slate forms the header and footer bulkheads.
- **Terminal entries:** a weathered-beige 1970s monitor sits in the room. The screen holds the transmission. The archive controls (PREV / NEXT / TODAY) are hardware-style beige buttons on the chassis.
- **Codex entries:** a khaki folder lies on the desk. Its tab names the station, and the ivory typed document is clipped inside. Stamps sit at the top.
- Content width stays near the current `max-w-3xl` (~768px of text) so line lengths remain readable. The frame extends beyond it.
- The header keeps the station badge (left) and gains the countdown (right).
- **Mobile:** not designed in this phase ([Phase 3 — Mobile Design](https://github.com/dretheprophet-pixel/the-swan-project/milestone/3)). Desktop layouts must not *break* on a phone (no horizontal scroll, readable text), but the real mobile design comes later.

## 9. Motion, transitions and the Incident (#16 / #17)

| Moment | Terminal | Codex |
|---|---|---|
| Load | CRT power-on: a horizontal line expands to the full screen (~400ms), then the text types in | Orientation film card (~1.2s, skippable on click), then the page fades in |
| Switching modes via PREV/NEXT | Terminal → codex: CRT power-off collapse, then folder slides in. Codex → terminal: the reverse. | |
| Ambient | Slow flicker | None. Paper is still. |
| Countdown under 4:00 | Digits turn red; slow pulse on the clock frame (about 1 per second) | |

### The Incident

When the 0.5% Incident day hits:
- **Terminal:** the existing glitch takeover, recolored to amber and hieroglyph red, with the Swan station forced.
- **Codex: the burned, redacted folder.** Instead of locking out, codex views show the folder *after* the discharge: scorched, darkened edges eating into the khaki and ivory, black redaction bars across most lines, a few words surviving, and an `INCIDENT` stamp in stamp-red over the top. The scorch is generated with gradients and noise masks, like every other texture. This replaces today's codex lockout.

All motion becomes an instant cut under `prefers-reduced-motion`. The Incident still shows its burned and red states, just without the glitch animation.

**Audio (#17, always opt-in and off by default):** a low hatch hum under terminal entries, a projector click when the film card starts, and a soft paper sound when a folder opens. Sound never autoplays before the user turns it on.

## 10. Accessibility checklist

- [ ] Body text is AA or better (4.5:1) in both modes. Every text color in §3 is marked.
- [ ] Red text uses `hieroglyph-text` (#FF1E27), never `hieroglyph` (#D62828), on charcoal.
- [ ] Nothing flashes more than 3 times per second, including the Incident glitch and the countdown pulse.
- [ ] `prefers-reduced-motion` disables flicker, typing, film cards, and transitions.
- [ ] Decorative layers (scanlines, grain, burn-in, scorch) are `aria-hidden` and never intercept clicks.
- [ ] The typed-in terminal text is available to screen readers in full immediately, not letter by letter.
- [ ] Redacted Incident text has a screen-reader label (e.g. "Document redacted").

## 11. How the issues use this

| Issue | Takes from this brief |
|---|---|
| #20 Station symbol set | §6 symbol-set rules |
| #13 Amber CRT | §3 Swan palette, §4 terminal fonts, §5 bunker and terminal textures, §8 room and monitor |
| #14 Codex paper and glyphs | §3 DHARMA palette and station accents, §4 codex fonts, §5 codex textures, §8 folder |
| #15 LOST anchors | §6 anchors (uses the symbol set), §7 island time |
| #16 Hybrid mode logic | §1 (style = era), §9 transitions, the burned Incident folder |
| #17 Micro-interactions | §9 motion and audio |

Recommended order: **#20 (station symbols) and #13 first** (they don't depend on each other), then #14, #15, #16, #17.

## Open questions

None. All decisions for Phase 2.5 are recorded above.
