// ─────────────────────────────────────────────────────────────────────────────
// The Swan Project — Shared Constants
// Extracted from components to avoid redefinition on every render.
// ─────────────────────────────────────────────────────────────────────────────

// Entry display style identifiers
export const ENTRY_STYLE = {
  TERMINAL: 'terminal',
  CODEX: 'codex',
};

// Navigation directions
export const NAV = {
  PREV: 'prev',
  NEXT: 'next',
};

// Decorative ornament glyphs — rotated by entry day
export const CODEX_ORNAMENTS = ['✦', '◈', '⬡', '❋', '◉', '✿', '⊕', '⟶'];

// Failsafe transmission messages — shown on activation
export const FAILSAFE_MESSAGES = [
  'ELECTROMAGNETIC DISCHARGE INITIATED — THE ISLAND HAS BEEN MOVED',
  'FAILSAFE TRIGGERED — ALL MEMORY OF THIS LOCATION ERASED FROM SATELLITE RECORDS',
  'SYSTEM OVERRIDE COMPLETE — THE BUTTON NO LONGER MATTERS',
  'HATCH IMPLODED — TIMELINE VARIANCE DETECTED — RECALIBRATING',
  'THE NUMBERS HAVE BEEN RESET — NEW SEQUENCE BEGINS IN 108 MINUTES',
  '4   8   15   16   23   42 — IT WAS ALWAYS YOU',
  'TRANSMISSION RECEIVED: "WE ARE NOT ALONE ON THIS ISLAND"',
  'UNDO FUNCTION NOT AVAILABLE — THIS CANNOT BE UNDONE',
];

// Classification display config — text color, border color, label
export const CLASSIFICATION_STYLES = {
  LEVEL_5:     { text: '#ff4444', border: '#8b0000', label: '⬛ LEVEL 5 CLASSIFIED' },
  INTERNAL:    { text: '#f5c842', border: '#8b7000', label: '⬛ INTERNAL USE ONLY' },
  FIELD_OPS:   { text: '#39ff14', border: '#1a7a0a', label: '⬛ FIELD OPERATIONS' },
  RECOVERED:   { text: '#8b6914', border: '#5a4010', label: '⬛ RECOVERED DOCUMENT' },
  RESEARCH:    { text: '#00b4d8', border: '#005a6e', label: '⬛ RESEARCH DIVISION' },
  THEORETICAL: { text: '#9b5de5', border: '#4a2070', label: '⬛ THEORETICAL — UNVERIFIED' },
  MEDICAL:     { text: '#e8d5a3', border: '#6b5020', label: '⬛ MEDICAL — RESTRICTED' },
};

// Station badge color schemes keyed by colorMode
export const BADGE_COLORS = {
  terminal: {
    bg:     '#0a1f05',
    ring:   '#39ff14',
    symbol: '#39ff14',
    name:   '#1a7a0a',
    glow:   'rgba(57,255,20,0.4)',
  },
  codex: {
    bg:     '#2c1810',
    ring:   '#8b6914',
    symbol: '#f4ead5',
    name:   '#8b6914',
    glow:   'rgba(139,105,20,0.3)',
  },
};

// Station badge size presets
export const BADGE_SIZES = {
  sm: { outer: 64,  inner: 52,  symbol: 20, name: 8,  number: 7 },
  md: { outer: 96,  inner: 78,  symbol: 28, name: 9,  number: 8 },
  lg: { outer: 128, inner: 104, symbol: 38, name: 10, number: 9 },
};

// Dharma octagon clip-path — used in multiple components
export const OCTAGON_CLIP =
  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';

// Boot delay in ms before the terminal entry appears
export const BOOT_DELAY_MS = 600;

// Numbers flash display duration in ms
export const NUMBERS_FLASH_DURATION_MS = 5500;
export const NUMBERS_FLASH_DELAY_MS = 500;

// Failsafe phase auto-reset timings in ms
export const FAILSAFE_ACTIVE_DURATION_MS = 8000;
export const FAILSAFE_COOLDOWN_DURATION_MS = 2000;
