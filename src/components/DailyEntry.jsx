/**
 * DailyEntry.jsx
 * Routes the daily lore entry to TerminalFrame or CodexPage based on style.
 * Owns the Numbers flash overlay and wires the FailSafeButton.
 */

import { useState, useEffect, useRef } from 'react';

import TerminalFrame  from './TerminalFrame.jsx';
import CodexPage      from './CodexPage.jsx';
import StationBadge   from './StationBadge.jsx';
import FailSafeButton from './FailSafeButton.jsx';

import { THE_NUMBERS } from '../logic/getNumbersMode.js';
import {
  ENTRY_STYLE,
  NUMBERS_FLASH_DELAY_MS,
  NUMBERS_FLASH_DURATION_MS,
} from '../constants/index.js';

// ─── Component ───────────────────────────────────────────────────────────────

const dharmaNumbers = [4, 8, 15, 16, 23, 42];

export default function DailyEntry({ entry, station, numbersConfig }) {
  const [numbersVisible, setNumbersVisible] = useState(false);
  const flashTimers = useRef([]);

  // Clear all pending flash timers on unmount or entry change
  useEffect(() => {
    return () => flashTimers.current.forEach(clearTimeout);
  }, [entry]);

  if (!entry) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="font-terminal text-phosphor-dim text-sm animate-pulse tracking-widest">
          LOADING ENTRY... PLEASE STAND BY
        </p>
      </div>
    );
  }

  const isTerminal = entry.style === ENTRY_STYLE.TERMINAL;

  function handleFailsafe() {
    if (!entry.numbers_flash) return;

    const show = setTimeout(() => setNumbersVisible(true),  NUMBERS_FLASH_DELAY_MS);
    const hide = setTimeout(() => setNumbersVisible(false), NUMBERS_FLASH_DELAY_MS + NUMBERS_FLASH_DURATION_MS);
    flashTimers.current = [show, hide];
  }

  function toggleNumbersOverlay() {
    setNumbersVisible((v) => !v);
  }

  return (
    <div className="w-full space-y-6">

      {/* Numbers flash overlay */}
      {numbersVisible && <NumbersOverlay />}

      {/* Station + entry meta row */}
      <EntryMeta
        entry={entry}
        station={station}
        isTerminal={isTerminal}
        numbersConfig={numbersConfig}
        numbersVisible={numbersVisible}
        onToggleNumbers={toggleNumbersOverlay}
      />

      {/* Entry content */}
      {isTerminal
        ? <TerminalFrame entry={entry} />
        : <CodexPage entry={entry} station={station} />
      }

      {/* Numbers sequence footer */}
      {numbersConfig?.shouldShow && <NumbersFooter />}

      {/* Failsafe */}
      <div
        className="flex justify-center py-4 animate-fade-in"
        style={{ animationDelay: '2s', opacity: 0 }}
      >
        <FailSafeButton onActivate={handleFailsafe} />
      </div>

    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NumbersOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.85)' }}
    >
      <div className="text-center animate-glitch">
        <div
          className="font-terminal text-5xl md:text-7xl tracking-[0.4em] mb-4"
          style={{ color: '#39ff14', textShadow: '0 0 30px #39ff14, 0 0 60px rgba(57,255,20,0.5)' }}
        >
          {THE_NUMBERS.join('  ')}
        </div>
        <p className="font-terminal text-xs text-phosphor-dim tracking-[0.3em] opacity-60 uppercase">
          ENTER THE SEQUENCE — PUSH THE BUTTON
        </p>
      </div>
    </div>
  );
}

function EntryMeta({ entry, station, isTerminal, numbersConfig, numbersVisible, onToggleNumbers }) {
  return (
    <div className="flex items-center gap-4 px-1">
      <StationBadge station={station} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <EntryTypeTag isTerminal={isTerminal} />
          <span className="font-terminal text-xs text-phosphor-dim opacity-40 tracking-widest">
            {entry.id}
          </span>
        </div>
        <p
          className="mt-1 text-sm tracking-wider opacity-60"
          style={
            isTerminal
              ? { fontFamily: "'Share Tech Mono', monospace", color: '#1a7a0a' }
              : { fontFamily: "'Crimson Text', serif", fontStyle: 'italic', color: '#8b6914' }
          }
        >
          {station?.description || 'Unknown Station'}
        </p>
      </div>

      {entry.numbers_flash && numbersConfig?.shouldShow && (
        <button
          onClick={onToggleNumbers}
          className="flex-shrink-0"
          title="View the Numbers"
        >
          <div
            className="font-terminal text-xs tracking-[0.3em] px-3 py-2 border transition-all duration-300"
            style={{
              color:       numbersVisible ? '#000'       : '#f5c842',
              borderColor: '#f5c84260',
              background:  numbersVisible ? '#f5c842'    : 'transparent',
            }}
          >
            {dharmaNumbers.join(' ')}
          </div>
        </button>
      )}
    </div>
  );
}

function EntryTypeTag({ isTerminal }) {
  return (
    <span
      className="font-terminal text-xs tracking-[0.25em] uppercase px-2 py-0.5 border"
      style={
        isTerminal
          ? { color: '#39ff14', borderColor: '#1a7a0a', background: '#0a1f05' }
          : { color: '#8b6914', borderColor: 'rgba(139,105,20,0.4)', background: 'rgba(44,24,16,0.1)' }
      }
    >
      {isTerminal ? '[ TERMINAL LOG ]' : '[ CODEX ENTRY ]'}
    </span>
  );
}

function NumbersFooter() {
  return (
    <div
      className="flex items-center justify-center gap-1 py-4 animate-fade-in"
      style={{ animationDelay: '1.5s', opacity: 0 }}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-phosphor-dim opacity-20" />
      <div className="flex gap-3 px-4">
        {THE_NUMBERS.map((n, i) => (
          <span
            key={i}
            className="font-terminal text-sm tabular-nums"
            style={{ color: '#f5c842', opacity: 0.35, textShadow: '0 0 6px rgba(245,200,66,0.2)' }}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-phosphor-dim opacity-20" />
    </div>
  );
}
