import defaultTheme from 'tailwindcss/defaultTheme'

/** Color definido como variable CSS (canal RGB) para que admita opacidad: `bg-surface/95`. */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
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
        },
        // Colores que cambian con el tema: sus valores claro y oscuro están en src/index.css (:root y .dark).
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
        // Los grises neutros se adaptan al tema; para algo que deba verse igual en los dos (p. ej. bloques de
        // código), usa la paleta `gray`.
        slate: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => [shade, token(`slate-${shade}`)]),
        ),
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', ...defaultTheme.fontFamily.sans],
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
      },
      animation: {
        'toast-in': 'toast-in 0.2s ease-out',
        'fade-in': 'fade-in 0.15s ease-out',
      },
    },
  },
  plugins: [],
}
