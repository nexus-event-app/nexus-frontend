const rawUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'

export const siteConfig = {
  name: 'Primer Commit',
  url: rawUrl.replace(/\/+$/, ''),
  defaultImage: '/og-default.png',
  logo: '/icon-512.png',
  beta: import.meta.env.VITE_BETA === 'true',
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
