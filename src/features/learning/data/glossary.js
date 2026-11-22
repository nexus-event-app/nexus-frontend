import { paths } from '@/shared/config/paths'

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
    terms: [
      'controlVersiones',
      'git',
      'github',
      'repositorio',
      'localRemoto',
      'rama',
      'merge',
      'pullRequest',
      'gitflow',
      'readme',
      'openSource',
    ],
  },
  {
    id: 'gitCommands',
    icon: 'computer',
    terms: ['clone', 'status', 'staging', 'commit', 'push', 'pull', 'fetch', 'checkout', 'log', 'stash'],
  },
  {
    id: 'web',
    icon: 'newspaper',
    terms: ['frontend', 'backend', 'fullStack', 'api', 'baseDeDatos', 'servidor', 'deploy', 'nube', 'responsive'],
  },
  { id: 'team', icon: 'users', terms: ['agile', 'scrum', 'sprint', 'daily', 'testing', 'codeReview', 'stack'] },
  { id: 'data', icon: 'chart', terms: ['ia', 'machineLearning', 'prompt', 'sql', 'analisisDatos'] },
  { id: 'jobs', icon: 'briefcase', terms: ['junior', 'portfolio', 'softSkills', 'onboarding', 'remoto', 'ats'] },
]

export const FEATURED_TERMS = ['api', 'commit', 'deploy', 'framework', 'sprint', 'stack']

export function termAnchor(id) {
  return `termino-${id}`
}

export function termPath(id) {
  return `${paths.glossary}#${termAnchor(id)}`
}

export function normalize(text) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
}

export function plainText(text) {
  return text.replaceAll('`', '')
}

export function splitCode(text) {
  return text
    .split('`')
    .map((part, index) => ({ text: part, code: index % 2 === 1 }))
    .filter((part) => part.text)
}

function glossaryTerm(id, category, t) {
  return {
    id,
    category,
    term: t(`glossary.terms.${id}.term`),
    definition: t(`glossary.terms.${id}.definition`),
    example: t(`glossary.terms.${id}.example`),
  }
}

export function allTerms(t) {
  return GLOSSARY.flatMap((category) => category.terms.map((id) => glossaryTerm(id, category.id, t)))
}

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

export function glossarySearchGroup(query, t, limit) {
  const matches = searchTerms(allTerms(t), query).map((item) => ({ ...item, definition: plainText(item.definition) }))
  return { items: matches.slice(0, limit), total: matches.length }
}
