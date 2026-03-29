/**
 * getDailyEntry.js
 * Returns the lore entry assigned to today's date.
 * Uses a seeded random selection so each day has one consistent entry.
 */

import entries from '../data/lost_entries.json';
import { createSeededRandom, dateSeed, seededInt } from './seededRandom.js';

/**
 * Returns today's lore entry.
 * If `date` is provided, returns the entry for that specific date (for testing).
 *
 * @param {Date} [date=new Date()]
 * @returns {Object} A single entry object from lost_entries.json
 */
export function getDailyEntry(date = new Date()) {
  const seed = dateSeed(date);
  const rng = createSeededRandom(seed);
  const index = seededInt(rng, entries.length);
  return entries[index];
}

/**
 * Returns the entry at a specific index (for debugging / navigation).
 *
 * @param {number} index
 * @returns {Object}
 */
export function getEntryByIndex(index) {
  const i = Math.abs(index) % entries.length;
  return entries[i];
}

/**
 * Returns all entries (useful for a codex index view).
 *
 * @returns {Array}
 */
export function getAllEntries() {
  return entries;
}

/**
 * Returns how many total entries exist.
 *
 * @returns {number}
 */
export function getEntryCount() {
  return entries.length;
}
