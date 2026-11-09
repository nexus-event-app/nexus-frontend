export const DEFAULT_LANGUAGE = 'es'
export const LANGUAGES = ['es', 'ca', 'en']

/** Datos de cada idioma: nombre en su propio idioma, código para Intl y para Open Graph. */
export const LANGUAGE_META = {
  es: { name: 'Castellano', short: 'ES', locale: 'es-ES', og: 'es_ES' },
  ca: { name: 'Català', short: 'CA', locale: 'ca-ES', og: 'ca_ES' },
  en: { name: 'English', short: 'EN', locale: 'en-GB', og: 'en_GB' },
}

const PREFIXED = LANGUAGES.filter((language) => language !== DEFAULT_LANGUAGE)
const PREFIX_PATTERN = new RegExp(`^/(${PREFIXED.join('|')})(?=[/?#]|$)`)

/** Rutas que no se traducen: el panel de administración solo existe en castellano. */
const UNLOCALIZED = /^\/admin(?=[/?#]|$)/

function isLanguage(value) {
  return LANGUAGES.includes(value)
}

/** El idioma sale del primer segmento de la dirección; sin prefijo es castellano. */
export function langFromPath(pathname = '/') {
  const match = PREFIX_PATTERN.exec(pathname)
  return match ? match[1] : DEFAULT_LANGUAGE
}

/** Quita el prefijo de idioma: «/ca/empleo?page=2» pasa a «/empleo?page=2». */
export function stripLang(path = '/') {
  const stripped = path.replace(PREFIX_PATTERN, '')
  if (stripped === '' || stripped.startsWith('?') || stripped.startsWith('#')) return `/${stripped}`
  return stripped
}

/** Devuelve la ruta en el idioma indicado. Es idempotente: se puede aplicar a una ruta que ya lleva prefijo. */
export function localizePath(path, language = DEFAULT_LANGUAGE) {
  if (typeof path !== 'string' || !path.startsWith('/') || UNLOCALIZED.test(path)) return path
  const base = stripLang(path)
  if (language === DEFAULT_LANGUAGE || !isLanguage(language)) return base
  return base.startsWith('/?') || base.startsWith('/#') || base === '/'
    ? `/${language}${base === '/' ? '' : base.slice(1)}`
    : `/${language}${base}`
}

/** Aplica el idioma actual a un destino. Los destinos relativos (como «?page=2») no se tocan. */
export function localizeTo(to, lang) {
  if (typeof to === 'string') return localizePath(to, lang)
  if (to && typeof to === 'object' && typeof to.pathname === 'string') {
    return { ...to, pathname: localizePath(to.pathname, lang) }
  }
  return to
}
