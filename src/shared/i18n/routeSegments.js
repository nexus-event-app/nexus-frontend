/**
 * Nombre de cada sección de la web en cada idioma. En el código las rutas se escriben siempre en castellano
 * (`paths.news` → «/noticias») y `localizePath` las traduce: «/en/news», «/ca/noticies».
 *
 * Si cambias o añades una sección, actualiza también `Languages.java` en el backend (sitemap, robots y emails).
 * `npm run check:routes` comprueba esta tabla.
 */
export const ROUTE_SEGMENTS = {
  noticias: { ca: 'noticies', en: 'news' },
  empleo: { ca: 'feina', en: 'jobs' },
  foro: { ca: 'forum', en: 'forum' },
  testimonios: { ca: 'testimonis', en: 'testimonials' },
  'aviso-legal': { ca: 'avis-legal', en: 'legal-notice' },
  privacidad: { ca: 'privacitat', en: 'privacy' },
  cookies: { ca: 'galetes', en: 'cookies' },
  login: { ca: 'inicia-sessio', en: 'login' },
  registro: { ca: 'registre', en: 'sign-up' },
  'recuperar-contrasena': { ca: 'recupera-contrasenya', en: 'forgot-password' },
  'restablecer-contrasena': { ca: 'restableix-contrasenya', en: 'reset-password' },
  'verificar-email': { ca: 'verifica-correu', en: 'verify-email' },
  perfil: { ca: 'perfil', en: 'profile' },
  buscar: { ca: 'cerca', en: 'search' },
  'sobre-el-proyecto': { ca: 'sobre-el-projecte', en: 'about' },
  notificaciones: { ca: 'notificacions', en: 'notifications' },
}

/** Subsecciones fijas (el resto de segundos segmentos son identificadores como «12-mi-duda» y no se traducen). */
export const ROUTE_SUBSEGMENTS = {
  foro: { nueva: { ca: 'nova', en: 'new' } },
  empleo: { guardadas: { ca: 'desades', en: 'saved' } },
  perfil: { editar: { ca: 'edita', en: 'edit' } },
}
