import { buildSlugPath } from '@/shared/utils/slug'

export const paths = {
  home: '/',
  news: '/noticias',
  newsDetail: (item) => buildSlugPath('/noticias', item),
  jobs: '/empleo',
  jobDetail: (item) => buildSlugPath('/empleo', item),
  forum: '/foro',
  forumNew: '/foro/nueva',
  discussionDetail: (item) => buildSlugPath('/foro', item),
  testimonials: '/testimonios',
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
