import { DEFAULT_LANGUAGE, LANGUAGES } from './languages'
import messages from './messages'

function flatten(object, prefix = '', target = {}) {
  Object.entries(object).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object') flatten(value, path, target)
    else target[path] = value
  })
  return target
}

const dictionaries = Object.fromEntries(LANGUAGES.map((language) => [language, flatten(messages[language])]))
const pluralRules = Object.fromEntries(LANGUAGES.map((language) => [language, new Intl.PluralRules(language)]))

let currentLanguage = DEFAULT_LANGUAGE

/** El proveedor de idioma lo fija antes de pintar, para que el código fuera de React también traduzca bien. */
export function setCurrentLanguage(language) {
  currentLanguage = language
}

export function getCurrentLanguage() {
  return currentLanguage
}

function lookup(key, language, count) {
  const dictionary = dictionaries[language]
  if (typeof count === 'number') {
    const plural = dictionary[`${key}_${pluralRules[language].select(count)}`] ?? dictionary[`${key}_other`]
    if (plural !== undefined) return plural
  }
  return dictionary[key]
}

/**
 * Traduce una clave. Admite variables con {nombre} y plurales con las claves «clave_one» y «clave_other»
 * cuando se pasa {count}. Si falta la clave en el idioma pedido usa el castellano.
 */
export function translate(key, params = {}, language = currentLanguage) {
  const template = lookup(key, language, params.count) ?? lookup(key, DEFAULT_LANGUAGE, params.count) ?? key
  return template.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match))
}
