import defaultTheme from 'tailwindcss/defaultTheme'

const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          ink: '#2b1b68',
        },
        ink: {
          DEFAULT: token('ink'),
          soft: token('ink-soft'),
          muted: token('ink-muted'),
        },
        canvas: token('canvas'),
        surface: token('surface'),
        accent: {
          DEFAULT: token('accent'),
          strong: token('accent-strong'),
          soft: token('accent-soft'),
          tint: token('accent-tint'),
          line: token('accent-line'),
        },
        slate: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => [shade, token(`slate-${shade}`)]),
        ),
      },
      fontFamily: {
        sans: [
          'Ubuntu',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        control: '0.625rem',
        card: '1rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.05), 0 1px 3px 0 rgb(15 23 42 / 0.08)',
        pop: '0 10px 30px -8px rgb(15 23 42 / 0.25)',
      },
      maxWidth: {
        page: '80rem',
        prose: '44rem',
      },
      screens: {
        '3xl': '1920px',
      },
      keyframes: {
        'toast-in': {
          '0%': { transform: 'translateY(0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'rise-in': {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(4%, -6%) scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        nudge: {
          '0%, 55%, 100%': { transform: 'translateX(0) rotate(0)' },
          '10%': { transform: 'translateX(-6px) rotate(-2deg)' },
          '20%': { transform: 'translateX(6px) rotate(2deg)' },
          '30%': { transform: 'translateX(-4px) rotate(-1.5deg)' },
          '40%': { transform: 'translateX(3px) rotate(1deg)' },
        },
        heartbeat: {
          '0%, 40%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.05)' },
          '20%': { transform: 'scale(1.01)' },
          '30%': { transform: 'scale(1.04)' },
        },
        pop: {
          '0%, 100%': { transform: 'scale(1) rotate(0)' },
          '40%': { transform: 'scale(1.3) rotate(-12deg)' },
        },
        'toggle-down': {
          '0%, 15%': { transform: 'translateY(0)' },
          '45%, 70%': { transform: 'translateY(var(--toggle, 4.4rem))' },
          '100%': { transform: 'translateY(0)' },
        },
        chevron: {
          '0%, 100%': { opacity: '0.25', transform: 'translateY(-2px)' },
          '50%': { opacity: '1', transform: 'translateY(2px)' },
        },
        'stick-3d': {
          '0%': {
            opacity: '0',
            transform:
              'translate3d(0, -3rem, 22rem) rotateX(-55deg) rotateY(-14deg) rotateZ(calc(var(--tilt) + 22deg))',
          },
          '60%': {
            opacity: '1',
            transform:
              'translate3d(0, 0.3rem, var(--depth)) rotateX(16deg) rotateY(-14deg) rotateZ(calc(var(--tilt) - 3deg))',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, var(--depth)) rotateX(10deg) rotateY(-14deg) rotateZ(var(--tilt))',
          },
        },
        'sway-3d': {
          '0%, 100%': { transform: 'rotateY(-7deg) rotateX(3deg) translateY(0)' },
          '50%': { transform: 'rotateY(7deg) rotateX(-3deg) translateY(-4px)' },
        },
        stick: {
          '0%': { opacity: '0', transform: 'translateY(-1.5rem) scale(1.8) rotate(calc(var(--tilt) + 14deg))' },
          '55%': { opacity: '1', transform: 'translateY(0.15rem) scale(0.92) rotate(calc(var(--tilt) - 3deg))' },
          '80%': { transform: 'translateY(0) scale(1.04) rotate(calc(var(--tilt) + 1deg))' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotate(var(--tilt))' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
      animation: {
        'toast-in': 'toast-in 0.2s ease-out',
        pop: 'pop 0.4s ease-out',
        heartbeat: 'heartbeat 3.2s ease-in-out infinite',
        nudge: 'nudge 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.15s ease-out',
        'rise-in': 'rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 24s ease-in-out infinite',
        'drift-slow': 'drift 32s ease-in-out infinite reverse',
        'soft-pulse': 'soft-pulse 2.4s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
        float: 'float 7s ease-in-out infinite',
        'toggle-down': 'toggle-down 5s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        chevron: 'chevron 2.2s ease-in-out infinite',
        'stick-3d': 'stick-3d 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sway-3d': 'sway-3d 6s ease-in-out infinite',
        stick: 'stick 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
