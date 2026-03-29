/**
 * FailSafeButton.jsx
 * Two-phase emergency protocol button.
 * Requires confirmation before triggering, then displays a random transmission.
 * Auto-resets after activation.
 */

import { useState, useEffect, useRef } from 'react';
import {
  FAILSAFE_MESSAGES,
  FAILSAFE_ACTIVE_DURATION_MS,
  FAILSAFE_COOLDOWN_DURATION_MS,
} from '../constants/index.js';

// Button label by phase
const PHASE_LABEL = {
  idle:      '[ FAILSAFE KEY ]',
  confirm:   '⚠ CONFIRM TURN ⚠',
  activated: '>> TRIGGERED <<',
  cooldown:  '... RESETTING ...',
};

function pickMessage() {
  return FAILSAFE_MESSAGES[Math.floor(Math.random() * FAILSAFE_MESSAGES.length)];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FailSafeButton({ onActivate }) {
  const [phase,   setPhase]   = useState('idle');
  const [message, setMessage] = useState(null);
  const timers = useRef([]);

  // Clean up all pending timers on unmount
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function scheduleReset() {
    const toActive   = setTimeout(() => setPhase('cooldown'), FAILSAFE_ACTIVE_DURATION_MS);
    const toCooldown = setTimeout(() => {
      setPhase('idle');
      setMessage(null);
    }, FAILSAFE_ACTIVE_DURATION_MS + FAILSAFE_COOLDOWN_DURATION_MS);

    timers.current = [toActive, toCooldown];
  }

  function handleClick() {
    if (phase === 'idle') {
      setPhase('confirm');
      return;
    }
    if (phase === 'confirm') {
      setMessage(pickMessage());
      setPhase('activated');
      onActivate?.();
      scheduleReset();
    }
  }

  function handleCancel() {
    setPhase('idle');
    setMessage(null);
  }

  const isDisabled = phase === 'activated' || phase === 'cooldown';

  return (
    <div className="flex flex-col items-center gap-3">
      <WarningLabel />

      <div className="relative">
        <ButtonCasing phase={phase}>
          <button
            onClick={handleClick}
            disabled={isDisabled}
            className="failsafe-btn relative z-10 min-w-32"
            style={{ opacity: isDisabled ? 0.5 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          >
            {PHASE_LABEL[phase]}
          </button>
        </ButtonCasing>

        {phase === 'confirm' && (
          <ConfirmControls onConfirm={handleClick} onCancel={handleCancel} />
        )}
      </div>

      {message && phase === 'activated' && <TransmissionMessage message={message} />}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WarningLabel() {
  return (
    <div className="flex items-center gap-2 opacity-50">
      <div className="h-px w-8 bg-red-800" />
      <span className="font-terminal text-xs text-red-700 tracking-widest uppercase">
        Emergency Protocol
      </span>
      <div className="h-px w-8 bg-red-800" />
    </div>
  );
}

function ButtonCasing({ phase, children }) {
  return (
    <div
      className="relative p-1 border border-red-900/60"
      style={{
        background: 'linear-gradient(180deg, #1a0000, #0d0000)',
        boxShadow:  phase === 'activated'
          ? '0 0 30px rgba(255,0,0,0.6), 0 0 60px rgba(255,0,0,0.3)'
          : '0 2px 8px rgba(0,0,0,0.8)',
      }}
    >
      {/* Hazard stripe overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(-45deg, #ff000020, #ff000020 4px, transparent 4px, transparent 12px)' }}
      />
      {children}
    </div>
  );
}

function ConfirmControls({ onConfirm, onCancel }) {
  return (
    <div className="absolute -bottom-10 left-0 right-0 flex gap-2 justify-center">
      <button
        onClick={onConfirm}
        className="font-terminal text-xs text-red-400 border border-red-800 px-3 py-1 bg-black hover:bg-red-950 transition-colors"
      >
        YES — TURN
      </button>
      <button
        onClick={onCancel}
        className="font-terminal text-xs text-phosphor-dim border border-phosphor-dim px-3 py-1 bg-black hover:bg-phosphor-dark transition-colors"
      >
        ABORT
      </button>
    </div>
  );
}

function TransmissionMessage({ message }) {
  return (
    <div
      className="mt-4 max-w-sm text-center animate-fade-in"
      style={{ animationDelay: '0.3s', opacity: 0 }}
    >
      <div className="border border-red-900 bg-black/80 px-4 py-3">
        <p
          className="font-terminal text-xs tracking-wider leading-relaxed animate-glitch"
          style={{ color: '#ff4444', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
