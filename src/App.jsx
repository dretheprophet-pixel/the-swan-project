/**
 * App.jsx
 * Root application component for The Swan Project.
 * Manages daily entry state, archive navigation, and top-level layout.
 */

import { useState, useEffect } from 'react';

import Header     from './components/Header.jsx';
import Footer     from './components/Footer.jsx';
import DailyEntry from './components/DailyEntry.jsx';

import { getDailyEntry, getEntryByIndex, getEntryCount } from './logic/getDailyEntry.js';
import { getStationForEntry, getStationById } from './logic/getStationOfDay.js';
import { getNumbersMode }     from './logic/getNumbersMode.js';

import { BOOT_DELAY_MS, ENTRY_STYLE, NAV, OCTAGON_CLIP } from './constants/index.js';

// ─── Helpers ────────────────────────────────────────────────────────────────

function resolveEntry(index) {
  const entry   = getEntryByIndex(index);
  const station = getStationForEntry(entry.station);
  return { entry, station };
}

function findDailyIndex(dailyEntry) {
  const total = getEntryCount();
  for (let i = 0; i < total; i++) {
    if (getEntryByIndex(i).id === dailyEntry.id) return i;
  }
  return 0;
}

function stepIndex(current, direction) {
  const total = getEntryCount();
  return direction === NAV.NEXT
    ? (current + 1) % total
    : (current - 1 + total) % total;
}

// ─── Root Component ──────────────────────────────────────────────────────────

export default function App() {
  const [entry,         setEntry]         = useState(null);
  const [station,       setStation]       = useState(null);
  const [numbersConfig, setNumbersConfig] = useState(null);
  const [currentIndex,  setCurrentIndex]  = useState(null);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dailyEntry   = getDailyEntry();
      const entryStation = getStationForEntry(dailyEntry.station);
      const numbers      = getNumbersMode();

      setEntry(dailyEntry);
      setStation(entryStation);
      setNumbersConfig(numbers);
      setLoading(false);
    }, BOOT_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  function navigateEntry(direction) {
    const baseIndex = currentIndex ?? findDailyIndex(entry);
    const nextIndex = stepIndex(baseIndex, direction);
    const { entry: nextEntry, station: nextStation } = resolveEntry(nextIndex);

    setEntry(nextEntry);
    setStation(nextStation);
    setCurrentIndex(nextIndex);
  }

  function resetToDaily() {
    const dailyEntry   = getDailyEntry();
    const entryStation = getStationForEntry(dailyEntry.station);

    setEntry(dailyEntry);
    setStation(entryStation);
    setCurrentIndex(null);
  }

  const isTerminal = entry?.style === ENTRY_STYLE.TERMINAL;
  const isFailsafe = entry?.isFailsafe === true;
  const effectiveStation = isFailsafe ? getStationById('swan') : station;

  return (
    <div
      className={`min-h-screen flex flex-col ${isFailsafe ? 'failsafe-active' : ''}`}
      style={{
        background: isTerminal
          ? 'radial-gradient(ellipse at center, #0a1f05 0%, #050a02 100%)'
          : 'radial-gradient(ellipse at center, #1a0e08 0%, #0d0604 100%)',
        transition: 'background 1s ease',
      }}
    >
      {loading && <BootScreen />}

      <Header station={effectiveStation} />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
        {!loading && (
          <>
            <ArchiveBar
              currentIndex={currentIndex}
              totalCount={getEntryCount()}
              onPrev={() => navigateEntry(NAV.PREV)}
              onNext={() => navigateEntry(NAV.NEXT)}
              onReset={resetToDaily}
            />
            <DailyEntry
             entry={entry}
             station={effectiveStation}
             numbersConfig={numbersConfig}
            />
          </>
        )}
      </main>

      {!loading && <Footer entry={entry} />}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function BootScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div
          className="w-20 h-20 mx-auto flex items-center justify-center font-dharma text-2xl text-dharma-yellow animate-pulse"
          style={{
            clipPath:  OCTAGON_CLIP,
            background: 'linear-gradient(135deg, #1a1a00, #2a2a00)',
            border:    '1px solid #f5c84240',
            boxShadow: '0 0 30px rgba(245,200,66,0.2)',
          }}
        >
          ☯
        </div>
        <p className="font-terminal text-xs text-phosphor-dim tracking-[0.3em] uppercase animate-pulse">
          INITIALIZING DHARMA ARCHIVE...
        </p>
        <p className="font-terminal text-xs text-phosphor-dim opacity-30 tracking-widest">
          4  8  15  16  23  42
        </p>
      </div>
    </div>
  );
}

function ArchiveBar({ currentIndex, totalCount, onPrev, onNext, onReset }) {
  const isDailyMode = currentIndex === null;
  const label = isDailyMode
    ? 'Daily Transmission'
    : `Archive Entry ${currentIndex + 1} / ${totalCount}`;

  return (
    <div
      className="flex items-center justify-between animate-fade-in"
      style={{ animationDelay: '0.3s', opacity: 0 }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full bg-phosphor animate-pulse"
          style={{ boxShadow: '0 0 6px #39ff14' }}
        />
        <span className="font-terminal text-xs text-phosphor-dim tracking-widest opacity-60 uppercase">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {!isDailyMode && (
          <button
            onClick={onReset}
            className="font-terminal text-xs text-dharma-yellow opacity-50 hover:opacity-100 transition-opacity tracking-wider border border-dharma-yellow/30 px-2 py-1 hover:border-dharma-yellow/60"
          >
            [ TODAY ]
          </button>
        )}
        <button
          onClick={onPrev}
          className="font-terminal text-xs text-phosphor-dim opacity-40 hover:opacity-80 transition-opacity tracking-wider px-2 py-1 border border-phosphor-dim/20 hover:border-phosphor-dim/50"
        >
          ← PREV
        </button>
        <button
          onClick={onNext}
          className="font-terminal text-xs text-phosphor-dim opacity-40 hover:opacity-80 transition-opacity tracking-wider px-2 py-1 border border-phosphor-dim/20 hover:border-phosphor-dim/50"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
