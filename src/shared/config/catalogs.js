import { translate } from '@/shared/i18n/translate'

/**
 * Catálogo de valores del servidor. Las etiquetas se traducen al idioma activo con la clave
 * «catalogs.<nombre>.<VALOR>»; si no existe, se usa la etiqueta en castellano de aquí (p. ej. en el panel).
 */
function catalog(name, entries) {
  const base = entries.map(([value, label, tone]) => ({
    value,
    defaultLabel: label,
    tone: tone ?? 'slate',
    slug: value.toLowerCase().replaceAll('_', '-'),
  }))
  const byValue = Object.fromEntries(base.map((item) => [item.value, item]))
  const bySlug = Object.fromEntries(base.map((item) => [item.slug, item]))
  const labelOf = (value) => {
    const entry = byValue[value]
    if (!entry) return value ?? ''
    const key = `catalogs.${name}.${value}`
    const label = translate(key)
    return label === key ? entry.defaultLabel : label
  }

  return {
    get items() {
      return base.map((item) => ({ value: item.value, label: labelOf(item.value), tone: item.tone, slug: item.slug }))
    },
    labelOf,
    toneOf: (value) => byValue[value]?.tone ?? 'slate',
    fromSlug: (slug) => bySlug[slug]?.value ?? '',
  }
}

export const newsCategories = catalog('newsCategories', [
  ['DESARROLLO', 'Desarrollo', 'blue'],
  ['ENTREVISTAS', 'Entrevistas', 'violet'],
  ['NETWORKING', 'Networking', 'green'],
  ['RECURSOS', 'Recursos', 'indigo'],
  ['GENERAL', 'General', 'slate'],
])

export const discussionCategories = catalog('discussionCategories', [
  ['AYUDA_TECNICA', 'Ayuda técnica', 'blue'],
  ['RECURSOS', 'Recursos', 'green'],
  ['EXPERIENCIAS', 'Experiencias', 'violet'],
  ['NETWORKING', 'Networking', 'pink'],
  ['GENERAL', 'General', 'slate'],
])

export const jobLevels = catalog('jobLevels', [
  ['INTERN', 'Prácticas', 'amber'],
  ['JUNIOR', 'Junior', 'green'],
  ['MID', 'Intermedio', 'blue'],
])

export const workModes = catalog('workModes', [
  ['REMOTE', 'Remoto', 'green'],
  ['HYBRID', 'Híbrido', 'blue'],
  ['ONSITE', 'Presencial', 'slate'],
])

export const importSourceTypes = catalog('importSourceTypes', [
  ['RSS_NEWS', 'Noticias · RSS o Atom', 'blue'],
  ['GETONBRD_JOBS', 'Empleo · Get on Board', 'green'],
  ['REMOTIVE_JOBS', 'Empleo · Remotive', 'green'],
  ['JOBICY_JOBS', 'Empleo · Jobicy', 'green'],
  ['ARBEITNOW_JOBS', 'Empleo · Arbeitnow', 'green'],
])

export const isNewsSourceType = (type) => type === 'RSS_NEWS'

export const contractTypes = catalog('contractTypes', [
  ['FULL_TIME', 'Jornada completa'],
  ['PART_TIME', 'Media jornada'],
  ['INTERNSHIP', 'Prácticas'],
  ['FREELANCE', 'Freelance'],
  ['TEMPORARY', 'Temporal'],
])
