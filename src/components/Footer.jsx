/**
 * Footer.jsx
 * Bottom bar with the Numbers sequence, classification stamp, and copyright.
 */

import { THE_NUMBERS } from '../logic/getNumbersMode.js';
import { CLASSIFICATION_STYLES } from '../constants/index.js';

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer({ entry }) {
  const classStyle =
    CLASSIFICATION_STYLES[entry?.classification] ?? CLASSIFICATION_STYLES.INTERNAL;

  return (
    <footer className="relative w-full border-t border-phosphor-dim bg-phosphor-dark mt-auto z-20">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-phosphor-dim to-transparent opacity-30" />

      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <NumbersSequence />
          <ClassificationStamp style={classStyle} />
          <Copyright />
        </div>

        {entry?.footer && <EntryFooterLine text={entry.footer} />}
      </div>
    </footer>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NumbersSequence() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-terminal text-xs text-phosphor-dim tracking-widest opacity-50 uppercase">
        SEQUENCE:
      </span>
      <div className="flex gap-2">
        {THE_NUMBERS.map((n, i) => (
          <span
            key={i}
            className="font-terminal text-sm text-dharma-yellow tabular-nums"
            style={{ textShadow: '0 0 8px rgba(245,200,66,0.4)' }}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function ClassificationStamp({ style }) {
  return (
    <div
      className="px-3 py-1 border font-terminal text-xs tracking-widest uppercase"
      style={{
        color:       style.text,
        borderColor: style.border,
        background:  `${style.border}20`,
        boxShadow:   `0 0 8px ${style.border}40`,
      }}
    >
      {style.label}
    </div>
  );
}

function Copyright() {
  return (
    <div className="text-right">
      <div className="font-terminal text-xs text-phosphor-dim opacity-50 tracking-wider">
        © DHARMA INITIATIVE
      </div>
      <div className="font-terminal text-xs text-phosphor-dim opacity-30 tracking-wider">
        ALL RIGHTS RESERVED — THE ISLAND
      </div>
    </div>
  );
}

function EntryFooterLine({ text }) {
  return (
    <div className="mt-3 pt-3 border-t border-phosphor-dim border-opacity-20 text-center">
      <p className="font-terminal text-xs text-phosphor-dim opacity-40 tracking-wider italic">
        {text}
      </p>
    </div>
  );
}
