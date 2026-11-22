import { ROUTE_SEGMENTS, ROUTE_SUBSEGMENTS } from './routeSegments'

export const DEFAULT_LANGUAGE = 'es'
export const LANGUAGES = ['es', 'ca', 'en']

export const LANGUAGE_META = {
  es: { name: 'Castellano', short: 'ES', locale: 'es-ES', og: 'es_ES' },
  ca: { name: 'Català', short: 'CA', locale: 'ca-ES', og: 'ca_ES' },
  en: { name: 'English', short: 'EN', locale: 'en-GB', og: 'en_GB' },
}

const PREFIXED = LANGUAGES.filter((language) => language !== DEFAULT_LANGUAGE)
const PREFIX_PATTERN = new RegExp(`^/(${PREFIXED.join('|')})(?=[/?#]|$)`)

const UNLOCALIZED = /^\/admin(?=[/?#]|$)/

function isLanguage(value) {
  return LANGUAGES.includes(value)
}

export function langFromPath(pathname = '/') {
  const match = PREFIX_PATTERN.exec(pathname)
  return match ? match[1] : DEFAULT_LANGUAGE
}

function splitPath(path) {
  const index = path.search(/[?#]/)
  return index === -1 ? [path, ''] : [path.slice(0, index), path.slice(index)]
}

function translateSegment(segment, fromLang, toLang, table) {
  if (!segment) return segment
  const esKey = Object.keys(table).find((key) => key === segment || table[key][fromLang] === segment) ?? null
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

export function stripLang(path = '/') {
  const lang = langFromPath(path)
  const [pathname, rest] = splitPath(path.replace(PREFIX_PATTERN, ''))
  const base = pathname === '' ? '/' : pathname
  return `${translateSegments(base, lang, DEFAULT_LANGUAGE)}${rest}`
}

export function localizePath(path, language = DEFAULT_LANGUAGE) {
  if (typeof path !== 'string' || !path.startsWith('/') || UNLOCALIZED.test(path)) return path
  const target = isLanguage(language) ? language : DEFAULT_LANGUAGE
  const [internal, rest] = splitPath(stripLang(path))
  if (target === DEFAULT_LANGUAGE) return `${internal}${rest}`
  const translated = translateSegments(internal, DEFAULT_LANGUAGE, target)
  return translated === '/' ? `/${target}${rest}` : `/${target}${translated}${rest}`
}

export function localizeTo(to, lang) {
  if (typeof to === 'string') return localizePath(to, lang)
  if (to && typeof to === 'object' && typeof to.pathname === 'string') {
    return { ...to, pathname: localizePath(to.pathname, lang) }
  }
  return to
}

export function routeSegment(esSegment, language) {
  return language === DEFAULT_LANGUAGE ? esSegment : (ROUTE_SEGMENTS[esSegment]?.[language] ?? esSegment)
}

export function routeSubsegment(esParent, esSegment, language) {
  return language === DEFAULT_LANGUAGE ? esSegment : (ROUTE_SUBSEGMENTS[esParent]?.[esSegment]?.[language] ?? esSegment)
}
