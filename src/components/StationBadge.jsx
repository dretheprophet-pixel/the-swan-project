/**
 * StationBadge.jsx
 * Octagonal DHARMA station badge with symbol, name, and number.
 * Color scheme adapts to the station's colorMode (terminal or codex).
 */

import { BADGE_COLORS, BADGE_SIZES, OCTAGON_CLIP } from '../constants/index.js';

// Spin keyframes injected once at module level — avoids per-mount style blocks
const SPIN_STYLE = document.createElement('style');
SPIN_STYLE.textContent = '@keyframes badge-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(SPIN_STYLE);

// ─── Component ───────────────────────────────────────────────────────────────

export default function StationBadge({ station, size = 'md' }) {
  if (!station) return null;

  const s      = BADGE_SIZES[size] ?? BADGE_SIZES.md;
  const colors = BADGE_COLORS[station.colorMode] ?? BADGE_COLORS.terminal;

  return (
    <div className="relative flex-shrink-0 group" style={{ width: s.outer, height: s.outer }}>
      {/* Main octagon body */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{
          clipPath:  OCTAGON_CLIP,
          background: `radial-gradient(ellipse at 30% 30%, ${colors.bg}ee, #000)`,
          border:    `2px solid ${colors.ring}`,
          boxShadow: `0 0 0 2px #000, 0 0 0 4px ${colors.ring}40, 0 0 20px ${colors.glow}`,
        }}
      >
        <BadgeContent station={station} colors={colors} s={s} />
      </div>

      {/* Rotating conic ring */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          clipPath:   OCTAGON_CLIP,
          background: `conic-gradient(from 0deg, ${colors.ring}00, ${colors.ring}40, ${colors.ring}00)`,
          animation:  'badge-spin 20s linear infinite',
        }}
      />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          clipPath:   OCTAGON_CLIP,
          background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function BadgeContent({ station, colors, s }) {
  const isTerminal = station.colorMode === 'terminal';

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: s.inner, height: s.inner }}>
      <div
        className="leading-none font-dharma transition-all duration-300 group-hover:scale-110"
        style={{
          fontSize:   s.symbol,
          color:      colors.symbol,
          textShadow: isTerminal
            ? `0 0 10px ${colors.symbol}, 0 0 20px ${colors.glow}`
            : `0 0 6px ${colors.glow}`,
        }}
      >
        {station.symbol}
      </div>

      <div
        className="font-dharma tracking-widest text-center mt-1 leading-tight uppercase"
        style={{ fontSize: s.name, color: colors.name, maxWidth: s.inner - 8, lineHeight: 1.1 }}
      >
        {station.name.replace('The ', '')}
      </div>

      <div className="font-terminal opacity-50 mt-0.5" style={{ fontSize: s.number, color: colors.name }}>
        #{station.number}
      </div>
    </div>
  );
}
