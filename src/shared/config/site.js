const rawUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'

export const siteConfig = {
  name: 'StartDev',
  tagline: 'Comunidad tech para juniors',
  description:
    'Noticias tech, ofertas de empleo junior, foro y testimonios en español. StartDev es la comunidad para quienes empiezan en tecnología.',
  url: rawUrl.replace(/\/+$/, ''),
  locale: 'es_ES',
  defaultImage: '/og-default.png',
  defaultImageAlt: 'StartDev, comunidad tech para juniors',
  logo: '/icon-512.png',
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
