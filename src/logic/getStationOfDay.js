/**
 * getStationOfDay.js
 * Returns the active DHARMA station for today, with full metadata.
 * Derived from the same seed as the daily entry so they always align.
 */

import { createSeededRandom, dateSeed, seededPick } from './seededRandom.js';

/**
 * Complete registry of known DHARMA Initiative stations.
 * Each station has display data, a glyph symbol, and a color mood.
 */
export const STATIONS = [
  {
    id: 'swan',
    name: 'The Swan',
    number: 3,
    symbol: '☯',
    glyph: '⌘',
    description: 'Electromagnetic containment & the button protocol',
    color: '#39ff14',
    colorMode: 'terminal',
    classification: 'LEVEL 5',
    status: 'ACTIVE — COUNTDOWN IN PROGRESS',
  },
  {
    id: 'pearl',
    name: 'The Pearl',
    number: 5,
    symbol: '◎',
    glyph: '◉',
    description: 'Behavioral observation & psychological research',
    color: '#f4ead5',
    colorMode: 'codex',
    classification: 'INTERNAL',
    status: 'MONITORS ACTIVE',
  },
  {
    id: 'flame',
    name: 'The Flame',
    number: 4,
    symbol: '✦',
    glyph: '❋',
    description: 'Communications relay & external contact',
    color: '#ff6b35',
    colorMode: 'terminal',
    classification: 'FIELD OPS',
    status: 'SIGNAL DEGRADED',
  },
  {
    id: 'arrow',
    name: 'The Arrow',
    number: 2,
    symbol: '→',
    glyph: '⟶',
    description: 'Storage, supply, and tactical resources',
    color: '#8b6914',
    colorMode: 'codex',
    classification: 'RECOVERED',
    status: 'ABANDONED',
  },
  {
    id: 'hydra',
    name: 'The Hydra',
    number: 1,
    symbol: '⚒',
    glyph: '⊞',
    description: 'Marine biology & specimen containment',
    color: '#0077b6',
    colorMode: 'terminal',
    classification: 'RESEARCH',
    status: 'OCCUPIED — OTHER ACTIVITY DETECTED',
  },
  {
    id: 'orchid',
    name: 'The Orchid',
    number: 6,
    symbol: '✿',
    glyph: '❁',
    description: 'Time & space research — classified',
    color: '#9b5de5',
    colorMode: 'codex',
    classification: 'THEORETICAL',
    status: 'ACCESS RESTRICTED',
  },
  {
    id: 'looking-glass',
    name: 'The Looking Glass',
    number: 7,
    symbol: '◫',
    glyph: '⬡',
    description: 'Underwater signal jamming facility',
    color: '#00b4d8',
    colorMode: 'terminal',
    classification: 'FIELD OPS',
    status: 'JAMMING SIGNAL ACTIVE',
  },
  {
    id: 'staff',
    name: 'The Staff',
    number: 8,
    symbol: '✚',
    glyph: '⊕',
    description: 'Medical research & clinical operations',
    color: '#e8d5a3',
    colorMode: 'codex',
    classification: 'MEDICAL',
    status: 'INACTIVE — FILES RECOVERED',
  },
];

/**
 * Returns the station that corresponds to today's date.
 * Uses the same date seed so it stays in sync with the daily entry.
 *
 * @param {Date} [date=new Date()]
 * @returns {Object} Station object
 */
export function getStationOfDay(date = new Date()) {
  const seed = dateSeed(date);
  const rng = createSeededRandom(seed + 999); // Offset seed from entry picker
  return seededPick(rng, STATIONS);
}

/**
 * Returns a station by its string ID.
 *
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getStationById(id) {
  return STATIONS.find((s) => s.id === id);
}

/**
 * Returns a station matched to an entry's station field (case-insensitive).
 *
 * @param {string} entryStation - e.g. "The Swan"
 * @returns {Object|undefined}
 */
export function getStationForEntry(entryStation) {
  const normalized = entryStation?.toLowerCase().replace(/^the\s+/, '');
  return STATIONS.find((s) => s.id === normalized) || STATIONS[0];
}
