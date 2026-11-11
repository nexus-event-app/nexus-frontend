import { buildSlugPath, slugify } from '@/shared/utils/slug'

export const paths = {
  home: '/',
  news: '/noticias',
  newsDetail: (item) => buildSlugPath('/noticias', item),
  jobs: '/empleo',
  jobDetail: (item) => buildSlugPath('/empleo', item),
  savedJobs: '/empleo/guardadas',
  forum: '/foro',
  forumNew: '/foro/nueva',
  discussionDetail: (item) => buildSlugPath('/foro', item),
  testimonials: '/testimonios',
  /** Perfil público a partir de un usuario ({ id, name }) o de un autor ({ authorId, authorName }). */
  profile: (person) =>
    buildSlugPath('/perfil', { id: person.id ?? person.authorId, slug: slugify(person.name ?? person.authorName) }),
  profileEdit: '/perfil/editar',
  search: '/buscar',
  about: '/sobre-el-proyecto',
  notifications: '/notificaciones',
  legalNotice: '/aviso-legal',
  privacy: '/privacidad',
  cookies: '/cookies',
  login: '/login',
  forgotPassword: '/recuperar-contrasena',
  resetPassword: '/restablecer-contrasena',
  verifyEmail: '/verificar-email',
  register: '/registro',
  admin: '/admin',
  adminNews: '/admin/noticias',
  adminJobs: '/admin/empleo',
  adminForum: '/admin/foro',
  adminTestimonials: '/admin/testimonios',
  adminUsers: '/admin/usuarios',
  adminImport: '/admin/importacion',
}

export function loginPath(redirectTo) {
  if (!redirectTo || redirectTo === paths.home) return paths.login
  return `${paths.login}?redirect=${encodeURIComponent(redirectTo)}`
}

export function registerPath(redirectTo) {
  if (!redirectTo || redirectTo === paths.home) return paths.register
  return `${paths.register}?redirect=${encodeURIComponent(redirectTo)}`
}

/** Página de resultados de la búsqueda global. */
export function searchPath(query) {
  const text = query?.trim()
  return text ? `${paths.search}?q=${encodeURIComponent(text)}` : paths.search
}

/** Lista de una sección con la búsqueda aplicada (p. ej. «/noticias?q=react»). */
export function withQuery(path, query) {
  return `${path}?q=${encodeURIComponent(query.trim())}`
}
