import { ROUTE_SEGMENTS, ROUTE_SUBSEGMENTS } from './routeSegments'

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

/** Separa «/en/news/3-x?page=2#top» en ruta («/en/news/3-x») y resto («?page=2#top»). */
function splitPath(path) {
  const index = path.search(/[?#]/)
  return index === -1 ? [path, ''] : [path.slice(0, index), path.slice(index)]
}

/** Traduce el nombre de una sección entre idiomas. Acepta también el nombre en castellano (direcciones antiguas). */
function translateSegment(segment, fromLang, toLang, table) {
  if (!segment) return segment
  const esKey =
    Object.keys(table).find((key) => key === segment || table[key][fromLang] === segment) ?? null
  if (esKey === null) return segment
  return toLang === DEFAULT_LANGUAGE ? esKey : table[esKey][toLang]
}

function translateSegments(path, fromLang, toLang) {
  const parts = path.split('/')
  const first = parts[1]
  const esFirst = translateSegment(first, fromLang, DEFAULT_LANGUAGE, ROUTE_SEGMENTS)
  parts[1] = translateSegment(first, fromLang, toLang, ROUTE_SEGMENTS)
  const subTable = ROUTE_SUBSEGMENTS[esFirst]
  if (subTable && parts.length > 2) parts[2] = translateSegment(parts[2], fromLang, toLang, subTable)
  return parts.join('/')
}

/**
 * Ruta interna (en castellano y sin prefijo de idioma) de cualquier dirección: «/en/news/3-x?page=2» pasa a
 * «/noticias/3-x?page=2». Acepta direcciones traducidas, sin traducir y sin prefijo.
 */
export function stripLang(path = '/') {
  const lang = langFromPath(path)
  const [pathname, rest] = splitPath(path.replace(PREFIX_PATTERN, ''))
  const base = pathname === '' ? '/' : pathname
  return `${translateSegments(base, lang, DEFAULT_LANGUAGE)}${rest}`
}

/**
 * Devuelve la ruta en el idioma indicado, con el prefijo y las secciones traducidas: «/noticias» → «/en/news».
 * Es idempotente: acepta rutas que ya llevan prefijo o están traducidas a cualquier idioma.
 */
export function localizePath(path, language = DEFAULT_LANGUAGE) {
  if (typeof path !== 'string' || !path.startsWith('/') || UNLOCALIZED.test(path)) return path
  const target = isLanguage(language) ? language : DEFAULT_LANGUAGE
  const [internal, rest] = splitPath(stripLang(path))
  if (target === DEFAULT_LANGUAGE) return `${internal}${rest}`
  const translated = translateSegments(internal, DEFAULT_LANGUAGE, target)
  return translated === '/' ? `/${target}${rest}` : `/${target}${translated}${rest}`
}

/** Aplica el idioma actual a un destino. Los destinos relativos (como «?page=2») no se tocan. */
export function localizeTo(to, lang) {
  if (typeof to === 'string') return localizePath(to, lang)
  if (to && typeof to === 'object' && typeof to.pathname === 'string') {
    return { ...to, pathname: localizePath(to.pathname, lang) }
  }
  return to
}

/** Nombre de una sección en un idioma, para declarar las rutas del router: routeSegment('noticias', 'en') → 'news'. */
export function routeSegment(esSegment, language) {
  return language === DEFAULT_LANGUAGE ? esSegment : (ROUTE_SEGMENTS[esSegment]?.[language] ?? esSegment)
}

export function routeSubsegment(esParent, esSegment, language) {
  return language === DEFAULT_LANGUAGE ? esSegment : (ROUTE_SUBSEGMENTS[esParent]?.[esSegment]?.[language] ?? esSegment)
}
