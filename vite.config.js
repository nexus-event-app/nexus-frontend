import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND_URL = 'http://localhost:8080'

const proxiedPaths = ['/api', '/uploads', '/sitemap.xml', '/robots.txt']

function vendorChunk(id) {
  if (!id.includes('node_modules')) return undefined
  if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react'
  if (/node_modules\/(react-router|react-router-dom|cookie|set-cookie-parser)\//.test(id)) return 'vendor-router'
  if (id.includes('node_modules/axios')) return 'vendor-http'
  return undefined
}

function siteUrlPlugin(siteUrl) {
  return {
    name: 'primercommit-site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/+$/, '')

  return {
    plugins: [react(), siteUrlPlugin(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      // Prepara al arrancar los módulos de la primera pantalla para que la primera carga no espere a compilarlos.
      warmup: {
        clientFiles: [
          './src/main.jsx',
          './src/app/App.jsx',
          './src/app/AppRoutes.jsx',
          './src/features/home/pages/HomePage.jsx',
        ],
      },
      proxy: Object.fromEntries(proxiedPaths.map((path) => [path, { target: BACKEND_URL, changeOrigin: true }])),
    },
    build: {
      rollupOptions: { output: { manualChunks: vendorChunk } },
    },
    // Pruebas unitarias y de componentes (Vitest + Testing Library). Las de extremo a extremo están en e2e/.
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
      include: ['src/**/*.test.{js,jsx}'],
      css: false,
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        reporter: ['text-summary', 'html'],
        include: ['src/**/*.{js,jsx}'],
        exclude: ['src/test/**', 'src/**/*.test.{js,jsx}', 'src/main.jsx', 'src/shared/i18n/messages/**'],
      },
    },
  }
})
