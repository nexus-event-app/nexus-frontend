import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      'no-console': 'error',
      // HTML semántico: nada de <div>. Usa la etiqueta con significado (main, section, article, aside, nav,
      // header, footer, ul/li, dl, figure, hgroup, fieldset, search, p...) o quita el contenedor y maqueta con CSS.
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name='div']",
          message: 'No uses <div>: elige una etiqueta semántica o maqueta sin contenedor (ver CLAUDE.md).',
        },
      ],
    },
  },
  {
    files: ['*.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      sourceType: 'module',
    },
  },
])
