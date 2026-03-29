/**
 * seededRandom.js
 * Deterministic pseudo-random number generator using a numeric seed.
 * Ensures that all daily values are consistent for any given seed (date).
 *
 * Uses the Mulberry32 algorithm — fast, simple, good distribution.
 */

/**
 * Creates a seeded random number generator.
 * Returns a function that generates numbers in [0, 1) deterministically.
 *
 * @param {number} seed - Integer seed value
 * @returns {() => number} Seeded random function
 */
export function createSeededRandom(seed) {
  let state = seed >>> 0; // Ensure unsigned 32-bit integer

  return function () {
    state += 0x6d2b79f5;
    let z = state;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Converts a Date object to a numeric seed.
 * Uses YYYYMMDD format for stable daily seeds.
 *
 * @param {Date} date
 * @returns {number}
 */
export function dateSeed(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return parseInt(`${y}${m}${d}`, 10);
}

/**
 * Picks a random integer in [0, max) using a seeded RNG.
 *
 * @param {() => number} rng - Seeded random function
 * @param {number} max
 * @returns {number}
 */
export function seededInt(rng, max) {
  return Math.floor(rng() * max);
}

/**
 * Picks a random element from an array using a seeded RNG.
 *
 * @param {() => number} rng - Seeded random function
 * @param {Array} arr
 * @returns {*}
 */
export function seededPick(rng, arr) {
  return arr[seededInt(rng, arr.length)];
}
