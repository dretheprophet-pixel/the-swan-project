/**
 * Header.jsx
 * Top navigation bar with DHARMA logo, live clock, and active station indicator.
 */

import { useState, useEffect } from 'react';
import { getDailyNumber } from '../logic/getNumbersMode.js';
import { OCTAGON_CLIP } from '../constants/index.js';

// Resolved once at module load — daily number doesn't change mid-session
const DAILY_NUMBER = getDailyNumber();

// ─── Component ───────────────────────────────────────────────────────────────

export default function Header({ station }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = time.toTimeString().slice(0, 8);
  const dateString = time
    .toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    .toUpperCase();

  return (
    <header className="relative w-full border-b border-phosphor-dim bg-phosphor-dark z-20">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-phosphor to-transparent opacity-60" />

      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <BrandLockup />
          {station && <StationIndicator station={station} />}
          <ClockDisplay time={timeString} date={dateString} dailyNumber={DAILY_NUMBER} />
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-phosphor-dim to-transparent opacity-40" />
    </header>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BrandLockup() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-dharma text-lg text-dharma-yellow animate-pulse-glow"
        style={{
          clipPath:  OCTAGON_CLIP,
          background: 'linear-gradient(135deg, #1a1a00, #2a2a00)',
          border:    '1px solid #f5c84250',
          boxShadow: '0 0 12px rgba(245,200,66,0.2)',
        }}
      >
        ☯
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="phosphor-text text-sm font-terminal font-bold tracking-widest uppercase">
            THE SWAN PROJECT
          </h1>
          <span className="text-xs font-terminal text-phosphor-dim opacity-60">v4.8.15</span>
        </div>
        <p className="text-xs font-terminal text-phosphor-dim tracking-wider opacity-70 mt-0.5">
          DHARMA INITIATIVE — ARCHIVE SYSTEM
        </p>
      </div>
    </div>
  );
}

function StationIndicator({ station }) {
  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-phosphor-dim rounded-sm bg-black/30">
      <span className="text-dharma-yellow font-dharma text-base leading-none">{station.symbol}</span>
      <div>
        <div className="text-xs font-terminal text-phosphor tracking-wider uppercase">{station.name}</div>
        <div className="text-xs font-terminal text-phosphor-dim tracking-wide opacity-60 text-nowrap">{station.status}</div>
      </div>
    </div>
  );
}

function ClockDisplay({ time, date, dailyNumber }) {
  return (
    <div className="text-right flex-shrink-0">
      <div className="font-terminal text-sm phosphor-text tracking-widest tabular-nums">{time}</div>
      <div className="font-terminal text-xs text-phosphor-dim tracking-wide opacity-60">{date}</div>
      <div className="font-terminal text-xs mt-0.5 opacity-40 text-dharma-yellow tracking-widest">
        #{String(dailyNumber).padStart(2, '0')}
      </div>
    </div>
  );
}
