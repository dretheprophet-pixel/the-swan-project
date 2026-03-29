/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terminal palette
        phosphor: {
          DEFAULT: '#39ff14',
          dim: '#1a7a0a',
          glow: '#7fff5f',
          dark: '#0a1f05',
        },
        // Codex palette
        codex: {
          paper: '#f4ead5',
          aged: '#e8d5a3',
          ink: '#2c1810',
          sepia: '#8b6914',
          shadow: '#3d2b1f',
          glyph: '#6b4c2a',
        },
        // Shared
        dharma: {
          black: '#0d0d0d',
          yellow: '#f5c842',
          orange: '#d4730a',
        }
      },
      fontFamily: {
        terminal: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
        codex: ['"IM Fell English"', '"Palatino Linotype"', 'serif'],
        dharma: ['"Bebas Neue"', '"Impact"', 'sans-serif'],
        body: ['"Crimson Text"', 'Georgia', 'serif'],
      },
      animation: {
        blink: 'blink 1.2s step-start infinite',
        scanline: 'scanline 8s linear infinite',
        flicker: 'flicker 0.15s infinite',
        fadeIn: 'fadeIn 1.2s ease-out forwards',
        typeIn: 'typeIn 0.05s steps(1) forwards',
        glitch: 'glitch 3s infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        countdown: 'countdown 1s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.94' },
          '25%': { opacity: '0.98' },
          '75%': { opacity: '0.96' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glitch: {
          '0%, 93%, 100%': { transform: 'translate(0)' },
          '94%': { transform: 'translate(-2px, 1px)' },
          '95%': { transform: 'translate(2px, -1px)' },
          '96%': { transform: 'translate(-1px, 2px)' },
          '97%': { transform: 'translate(1px, -2px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px #39ff14, 0 0 20px #39ff1440' },
          '50%': { boxShadow: '0 0 16px #39ff14, 0 0 40px #39ff1460, 0 0 60px #39ff1420' },
        },
        countdown: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        'crt-overlay': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        'vignette': 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
      },
    },
  },
  plugins: [],
}
