/**
 * CodexPage.jsx
 * Aged paper wrapper for codex-style lore entries.
 * Renders as a weathered recovered document with ink and sepia aesthetics.
 */

import { useEffect, useState } from 'react';
import { CODEX_ORNAMENTS } from '../constants/index.js';

// ─── Component ───────────────────────────────────────────────────────────────

export default function CodexPage({ entry, station, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

 if (entry?.isFailsafe) {
  return (
    <div className="p-8 text-center font-terminal tracking-widest text-phosphor-dim">
      <h2 className="text-xl mb-4">ACCESS RESTRICTED</h2>
      <p>FAILSAFE PROTOCOL IN EFFECT</p>
      <p className="opacity-60 mt-2">REFER TO INCIDENT LOG 0001</p>
    </div>
  );
} 
  const ornament = CODEX_ORNAMENTS[entry?.day % CODEX_ORNAMENTS.length] ?? '◈';

  return (
    <div
      className={`w-full transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div style={{ boxShadow: '0 4px 24px rgba(44,24,16,0.5), 0 1px 4px rgba(0,0,0,0.8)' }}>
        <TornEdge direction="top" />

        <div
          className="codex-paper codex-border relative overflow-hidden"
          style={{ borderTop: 'none', borderRadius: '0 0 2px 2px' }}
        >
          <CornerStains />

          <div className="relative z-10 px-8 py-8 md:px-12 md:py-10">
            <OrnamentRow glyph={ornament} />
            <EntryStamp entry={entry} />
            <EntryTitle entry={entry} />
            <Divider glyph={ornament} />
            <EntryBody body={entry?.body} />
            <StationAttribution station={station} />
            <EntryFooter footer={entry?.footer} />
            <TagList tags={entry?.tags} />
            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>

        <TornEdge direction="bottom" />
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TornEdge({ direction }) {
  const isTop = direction === 'top';
  return (
    <div
      className="h-2 w-full"
      style={{
        background: isTop
          ? 'linear-gradient(180deg, #c8a870 0%, #f4ead5 100%)'
          : 'linear-gradient(0deg, #c8a870 0%, #f4ead5 100%)',
        clipPath: isTop
          ? 'polygon(0 0, 3% 100%, 6% 30%, 10% 90%, 15% 10%, 20% 80%, 25% 20%, 30% 100%, 35% 40%, 40% 90%, 45% 10%, 50% 70%, 55% 30%, 60% 95%, 65% 15%, 70% 80%, 75% 25%, 80% 90%, 85% 10%, 90% 75%, 95% 30%, 100% 100%, 100% 0)'
          : 'polygon(0 100%, 3% 0, 6% 70%, 10% 10%, 15% 90%, 20% 20%, 25% 80%, 30% 0, 35% 60%, 40% 10%, 45% 90%, 50% 30%, 55% 70%, 60% 5%, 65% 85%, 70% 20%, 75% 75%, 80% 10%, 85% 90%, 90% 25%, 95% 70%, 100% 0, 100% 100%)',
        opacity: 0.6,
      }}
    />
  );
}

function CornerStains() {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(139,105,20,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(100,60,20,0.12) 0%, transparent 70%)' }}
      />
    </>
  );
}

function OrnamentRow({ glyph }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="dharma-ornament flex-1 text-right text-base tracking-[0.4em]">· · ·</div>
      <div className="text-codex-sepia text-xl" style={{ opacity: 0.5 }}>{glyph}</div>
      <div className="dharma-ornament flex-1 text-left text-base tracking-[0.4em]">· · ·</div>
    </div>
  );
}

function EntryStamp({ entry }) {
  return (
    <div className="text-center mb-5">
      <p
        className="font-terminal text-xs tracking-[0.3em] uppercase mb-2"
        style={{ color: 'var(--codex-sepia)', opacity: 0.6 }}
      >
        {entry?.date_stamp ?? 'Date Unknown'}
      </p>
      <div
        className="inline-block px-3 py-0.5 border text-xs font-terminal tracking-widest uppercase"
        style={{
          borderColor: 'var(--codex-sepia)',
          color:       'var(--codex-sepia)',
          opacity:     0.5,
          background:  'rgba(139,105,20,0.08)',
        }}
      >
        {entry?.classification?.replace(/_/g, ' ') ?? 'UNCLASSIFIED'}
      </div>
    </div>
  );
}

function EntryTitle({ entry }) {
  return (
    <div className="text-center mb-4">
      <h2
        className="font-codex text-2xl md:text-3xl leading-tight"
        style={{ color: 'var(--codex-ink)', textShadow: '0 1px 2px rgba(44,24,16,0.2)' }}
      >
        {entry?.title}
      </h2>
      {entry?.subtitle && (
        <p
          className="font-codex italic text-base mt-3 leading-relaxed"
          style={{ color: 'var(--codex-shadow)', opacity: 0.7 }}
        >
          {entry.subtitle}
        </p>
      )}
    </div>
  );
}

function Divider({ glyph }) {
  return (
    <div className="dharma-divider codex-divider my-6">
      <span className="font-codex text-base" style={{ color: 'var(--codex-sepia)', opacity: 0.5 }}>
        {glyph}
      </span>
    </div>
  );
}

function EntryBody({ body }) {
  if (!body) return null;

  return (
    <div className="max-w-prose mx-auto">
      {body.split('\n\n').map((paragraph, i) => (
        <p
          key={i}
          className="font-body text-base md:text-lg leading-relaxed mb-4 last:mb-0"
          style={{
            color:      'var(--codex-ink)',
            textIndent: i === 0 ? '0' : '1.5rem',
            lineHeight: '1.85',
          }}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function StationAttribution({ station }) {
  if (!station) return null;

  return (
    <div className="mt-8 flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: 'var(--codex-sepia)', opacity: 0.2 }} />
      <span
        className="font-dharma text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--codex-sepia)', opacity: 0.5 }}
      >
        {station.name} — Station {station.number}
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--codex-sepia)', opacity: 0.2 }} />
    </div>
  );
}

function EntryFooter({ footer }) {
  if (!footer) return null;

  return (
    <div className="mt-4 text-center">
      <p className="font-codex italic text-sm" style={{ color: 'var(--codex-glyph)', opacity: 0.6 }}>
        {footer}
      </p>
    </div>
  );
}

function TagList({ tags }) {
  if (!tags?.length) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2 justify-center">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="font-terminal text-xs px-2 py-0.5 border tracking-wider uppercase"
          style={{ borderColor: 'var(--codex-sepia)', color: 'var(--codex-sepia)', opacity: 0.4 }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
