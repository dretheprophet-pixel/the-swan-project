/**
 * getNumbersMode.js
 * Controls how and whether the Numbers (4 8 15 16 23 42) appear
 * in today's UI. Supports multiple display modes that rotate daily.
 */

import { createSeededRandom, dateSeed, seededPick, seededInt } from './seededRandom.js';

/** The Numbers, as they have always been. */
export const THE_NUMBERS = [4, 8, 15, 16, 23, 42];

/**
 * All available display modes for the Numbers panel.
 * Each mode changes how the numbers are rendered in the UI.
 */
export const NUMBER_MODES = [
  {
    id: 'countdown',
    label: 'COUNTDOWN',
    description: 'Numbers appear as countdown indicators',
    pulse: true,
    separated: false,
    prefix: '',
    separator: ' :: ',
    suffix: '',
  },
  {
    id: 'sequence',
    label: 'TRANSMISSION',
    description: 'Numbers displayed as a radio transmission sequence',
    pulse: false,
    separated: true,
    prefix: '[ ',
    separator: ' — ',
    suffix: ' ]',
  },
  {
    id: 'coordinates',
    label: 'COORDINATES',
    description: 'Numbers displayed as island coordinates',
    pulse: false,
    separated: true,
    prefix: '',
    separator: '°  ',
    suffix: '°',
  },
  {
    id: 'code',
    label: 'ENTRY CODE',
    description: 'Numbers displayed as a lock/safe entry sequence',
    pulse: true,
    separated: true,
    prefix: '>> ',
    separator: '-',
    suffix: ' <<',
  },
  {
    id: 'plain',
    label: 'BROADCAST',
    description: 'Numbers displayed as raw broadcast signal',
    pulse: false,
    separated: false,
    prefix: '',
    separator: '   ',
    suffix: '',
  },
];

/**
 * Returns the Numbers display configuration for a given date.
 * The mode rotates daily using the seeded RNG.
 *
 * @param {Date} [date=new Date()]
 * @returns {{ mode: Object, numbers: number[], formatted: string, shouldShow: boolean }}
 */
export function getNumbersMode(date = new Date()) {
  const seed = dateSeed(date);
  const rng = createSeededRandom(seed + 42); // Offset to avoid collisions

  const mode = seededPick(rng, NUMBER_MODES);

  // Some days the numbers are "hidden" — visible only as a subtle footer
  const shouldShow = rng() > 0.2; // 80% of days show numbers prominently

  // Optionally shuffle the order slightly on some days (but never the real answer)
  const ordered = [...THE_NUMBERS];

  const formatted =
    mode.prefix +
    ordered.join(mode.separator) +
    mode.suffix;

  return {
    mode,
    numbers: ordered,
    formatted,
    shouldShow,
  };
}

/**
 * Formats the Numbers array with a custom separator for inline use.
 *
 * @param {string} [separator='   ']
 * @returns {string}
 */
export function formatNumbers(separator = '   ') {
  return THE_NUMBERS.join(separator);
}

/**
 * Returns a random single Number from the sequence (seeded to date).
 * Used for decorative accent displays.
 *
 * @param {Date} [date=new Date()]
 * @returns {number}
 */
export function getDailyNumber(date = new Date()) {
  const seed = dateSeed(date);
  const rng = createSeededRandom(seed + 108);
  return THE_NUMBERS[seededInt(rng, THE_NUMBERS.length)];
}
