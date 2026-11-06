const rawUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'

export const siteConfig = {
  name: 'Primer Commit',
  tagline: 'Tu carrera tech empieza aquí',
  description:
    'Primer Commit es la comunidad tech en español para quienes empiezan: noticias, ofertas de empleo junior y prácticas, foro y testimonios.',
  url: rawUrl.replace(/\/+$/, ''),
  locale: 'es_ES',
  defaultImage: '/og-default.png',
  defaultImageAlt: 'Primer Commit, tu carrera tech empieza aquí',
  logo: '/icon-512.png',
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
