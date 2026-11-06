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
    name: 'startdev-site-url',
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
      proxy: Object.fromEntries(
        proxiedPaths.map((path) => [path, { target: BACKEND_URL, changeOrigin: true }]),
      ),
    },
    build: {
      rollupOptions: { output: { manualChunks: vendorChunk } },
    },
  }
})
