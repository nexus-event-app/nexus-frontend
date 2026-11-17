import { paths } from '@/shared/config/paths'

/**
 * Orden del glosario: categorías y, dentro de cada una, términos de lo más básico a lo más concreto. Los textos
 * (término, definición y ejemplo) están en messages/glossary.js, en castellano, catalán e inglés.
 */
export const GLOSSARY = [
  {
    id: 'basics',
    icon: 'sparkles',
    terms: [
      'programar',
      'lenguaje',
      'algoritmo',
      'variable',
      'funcion',
      'bug',
      'depurar',
      'libreria',
      'framework',
      'editor',
    ],
  },
  {
    id: 'code',
    icon: 'code',
    terms: ['git', 'repositorio', 'commit', 'rama', 'pullRequest', 'merge', 'github', 'openSource'],
  },
  {
    id: 'web',
    icon: 'computer',
    terms: ['frontend', 'backend', 'fullStack', 'api', 'baseDeDatos', 'servidor', 'deploy', 'nube', 'responsive'],
  },
  { id: 'team', icon: 'users', terms: ['agile', 'scrum', 'sprint', 'daily', 'testing', 'codeReview', 'stack'] },
  { id: 'data', icon: 'chart', terms: ['ia', 'machineLearning', 'prompt', 'sql', 'analisisDatos'] },
  { id: 'jobs', icon: 'briefcase', terms: ['junior', 'portfolio', 'softSkills', 'onboarding', 'remoto', 'ats'] },
]

/** Los que se enseñan en el bloque de Rutas de aprendizaje, como muestra. */
export const FEATURED_TERMS = ['api', 'commit', 'deploy', 'framework', 'sprint', 'stack']

/** Ancla de un término en la página del glosario («#termino-api»), para enlazarlo desde cualquier sitio. */
export function termAnchor(id) {
  return `termino-${id}`
}

export function termPath(id) {
  return `${paths.glossary}#${termAnchor(id)}`
}

/** Minúsculas y sin tildes: «Depuración» encuentra «depurar», «API» encuentra «api». */
export function normalize(text) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
}

/** Término con sus textos en el idioma actual. */
export function glossaryTerm(id, category, t) {
  return {
    id,
    category,
    term: t(`glossary.terms.${id}.term`),
    definition: t(`glossary.terms.${id}.definition`),
    example: t(`glossary.terms.${id}.example`),
  }
}

/** Todos los términos, en el orden del glosario. */
export function allTerms(t) {
  return GLOSSARY.flatMap((category) => category.terms.map((id) => glossaryTerm(id, category.id, t)))
}

/**
 * Términos que encajan con la búsqueda: cuenta una palabra que empiece por el texto («base» encuentra «Base de
 * datos»; «rama» no encuentra «programar»). Primero los que la tienen en el nombre y después los que la tienen en la
 * definición o el ejemplo. Sin texto, todos.
 */
export function searchTerms(terms, query) {
  const text = normalize(query)
  if (!text) return terms
  const wordStart = new RegExp(`(^|[^\\p{L}\\p{N}])${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'u')
  const inName = terms.filter((item) => wordStart.test(normalize(item.term)))
  const inDefinition = terms.filter(
    (item) => !inName.includes(item) && wordStart.test(normalize(`${item.definition} ${item.example}`)),
  )
  return [...inName, ...inDefinition]
}

/** Grupo «Glosario» para el buscador global, con la misma forma que los que devuelve el backend. */
export function glossarySearchGroup(query, t, limit) {
  const matches = searchTerms(allTerms(t), query)
  return { items: matches.slice(0, limit), total: matches.length }
}
