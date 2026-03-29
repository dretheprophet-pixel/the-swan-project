/**
 * TerminalFrame.jsx
 * CRT terminal wrapper for terminal-style lore entries.
 * Plays a boot sequence animation before revealing entry content.
 */

import { useState, useEffect, useRef } from 'react';

// Boot lines are static — defined outside the component to avoid recreation
const buildBootSequence = (entry) => [
  '>> DHARMA INITIATIVE SYSTEM v4.8.15',
  '>> INITIALIZING ARCHIVE MODULE...',
  `>> STATION: ${entry?.station?.toUpperCase() ?? 'UNKNOWN'}`,
  `>> CLASSIFICATION: ${entry?.classification ?? 'UNCLASSIFIED'}`,
  '>> DECRYPTION: COMPLETE',
  '>> LOADING ENTRY...',
  '---',
];

const BOOT_INTERVAL_MS = 120;
const BOOT_SETTLE_MS   = 300;

// ─── Component ───────────────────────────────────────────────────────────────

export default function TerminalFrame({ entry, children }) {
  const [booted,    setBooted]    = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const sequence = buildBootSequence(entry);
    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i < sequence.length) {
        setBootLines((prev) => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(intervalRef.current);
        setTimeout(() => setBooted(true), BOOT_SETTLE_MS);
      }
    }, BOOT_INTERVAL_MS);

    return () => clearInterval(intervalRef.current);
  }, [entry]);

  return (
    <div
      className="terminal-chrome crt-screen w-full animate-fade-in"
      style={{ animationDelay: '0.1s', opacity: 0 }}
    >
      <div className="scanline-sweep" />

      <TitleBar entry={entry} />

      <div className="p-6 min-h-64 bg-phosphor-dark relative overflow-hidden">
        <GridBackground />
        {booted
          ? <EntryContent entry={entry}>{children}</EntryContent>
          : <BootSequence lines={bootLines} />
        }
      </div>

      <StatusBar entry={entry} />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TitleBar({ entry }) {
  return (
    <div className="terminal-titlebar">
      <div className="terminal-dot bg-red-700" />
      <div className="terminal-dot bg-yellow-600" />
      <div className="terminal-dot bg-green-700" />
      <span className="font-terminal text-xs text-phosphor-dim tracking-widest ml-2 uppercase">
        DHARMA INIT — ARCHIVE TERMINAL — {entry?.station ?? 'UNKNOWN STATION'}
      </span>
      <div className="ml-auto flex items-center gap-3">
        <span className="font-terminal text-xs text-phosphor-dim opacity-50">
          PID: {entry?.id ?? '000'}
        </span>
        <div
          className="w-2 h-2 rounded-full bg-phosphor animate-pulse"
          style={{ boxShadow: '0 0 6px #39ff14' }}
        />
      </div>
    </div>
  );
}

function GridBackground() {
  return (
    <div
      className="absolute inset-0 opacity-5 pointer-events-none"
      style={{
        backgroundImage: [
          'linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '24px 24px',
      }}
    />
  );
}

function BootSequence({ lines }) {
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) =>
        line === '---'
          ? <div key={i} className="h-px bg-phosphor-dim opacity-30 my-2" />
          : <div key={i} className="font-terminal text-xs text-phosphor-dim tracking-wider opacity-70">{line}</div>
      )}
      <div className="font-terminal text-xs text-phosphor opacity-50 cursor mt-1" />
    </div>
  );
}

function EntryContent({ entry, children }) {
  return (
    <div className="animate-fade-in" style={{ animationDelay: '0s', opacity: 0 }}>
      <EntryHeader entry={entry} />

      <div className="dharma-divider terminal-divider mb-5">
        <span className="font-terminal text-xs text-phosphor-dim opacity-40">◈</span>
      </div>

      <EntryBody body={entry?.body} />

      <div className="mt-6 font-terminal text-sm text-phosphor cursor opacity-70" />

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

function EntryHeader({ entry }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-terminal text-xs text-phosphor opacity-50">&gt;&gt;</span>
        <span className="font-terminal text-xs text-phosphor-dim tracking-widest opacity-60 uppercase">
          {entry?.date_stamp ?? 'DATE UNKNOWN'}
        </span>
      </div>

      <h2
        className="font-terminal text-xl text-phosphor tracking-wider uppercase leading-tight"
        style={{ textShadow: '0 0 10px rgba(57,255,20,0.5)' }}
      >
        {entry?.title}
      </h2>

      {entry?.subtitle && (
        <p className="font-terminal text-sm text-phosphor-dim opacity-60 mt-2 tracking-wide">
          {entry.subtitle}
        </p>
      )}
    </div>
  );
}

function EntryBody({ body }) {
  if (!body) return null;

  return (
    <div className="space-y-3">
      {body.split('\n').map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-2" />;

        const isCommand = line.startsWith('>>');
        const isWarning = line.startsWith('!!');
        const isNumbers = /^\d+\s+\d+\s+\d/.test(line.trim());

        return (
          <p
            key={i}
            className={`font-terminal text-sm leading-relaxed tracking-wide ${lineClass(isCommand, isWarning, isNumbers)}`}
            style={lineStyle(isCommand, isWarning, isNumbers)}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

function lineClass(isCommand, isWarning, isNumbers) {
  if (isCommand) return 'text-phosphor-dim opacity-70';
  if (isWarning) return 'text-red-500 font-bold tracking-widest';
  if (isNumbers) return 'text-dharma-yellow text-lg tracking-[0.4em] font-bold';
  return 'text-phosphor opacity-90';
}

function lineStyle(isCommand, isWarning, isNumbers) {
  if (isNumbers) return { textShadow: '0 0 12px rgba(245,200,66,0.6)' };
  if (isCommand || isWarning) return {};
  return { textShadow: '0 0 4px rgba(57,255,20,0.2)' };
}

function StatusBar({ entry }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-t border-phosphor-dim border-opacity-20">
      <span className="font-terminal text-xs text-phosphor-dim opacity-40 tracking-wider">
        ARCHIVE.SYS READY
      </span>
      <div className="flex gap-4">
        {entry?.tags?.slice(0, 3).map((tag, i) => (
          <span key={i} className="font-terminal text-xs text-phosphor-dim opacity-30 tracking-wider">
            [{tag}]
          </span>
        ))}
      </div>
      <span className="font-terminal text-xs text-phosphor opacity-30">█</span>
    </div>
  );
}
