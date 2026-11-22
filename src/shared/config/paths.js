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
  profile: (person) =>
    buildSlugPath('/perfil', { id: person.id ?? person.authorId, slug: slugify(person.name ?? person.authorName) }),
  profileEdit: '/perfil/editar',
  search: '/buscar',
  about: '/sobre-el-proyecto',
  notifications: '/notificaciones',
  learning: '/rutas',
  learningPath: (id) => `/rutas/${id}`,
  glossary: '/glosario',
  events: '/eventos',
  eventsNew: '/eventos/nuevo',
  legalNotice: '/aviso-legal',
  privacy: '/privacidad',
  cookies: '/cookies',
  login: '/login',
  forgotPassword: '/recuperar-contrasena',
  resetPassword: '/restablecer-contrasena',
  verifyEmail: '/verificar-email',
  register: '/registro',
  googleReturn: '/registro/google',
  admin: '/admin',
  adminNews: '/admin/noticias',
  adminJobs: '/admin/empleo',
  adminForum: '/admin/foro',
  adminTestimonials: '/admin/testimonios',
  adminUsers: '/admin/usuarios',
  adminUserProfile: (id) => `/admin/usuarios/${id}/perfil`,
  adminImport: '/admin/importacion',
  adminReports: '/admin/reportes',
  adminEvents: '/admin/eventos',
}

export function loginPath(redirectTo) {
  if (!redirectTo || redirectTo === paths.home) return paths.login
  return `${paths.login}?redirect=${encodeURIComponent(redirectTo)}`
}

export function registerPath(redirectTo) {
  if (!redirectTo || redirectTo === paths.home) return paths.register
  return `${paths.register}?redirect=${encodeURIComponent(redirectTo)}`
}

export function searchPath(query) {
  const text = query?.trim()
  return text ? `${paths.search}?q=${encodeURIComponent(text)}` : paths.search
}

export function withQuery(path, query) {
  return `${path}?q=${encodeURIComponent(query.trim())}`
}
