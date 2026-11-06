function catalog(entries) {
  const items = entries.map(([value, label, tone]) => ({
    value,
    label,
    tone: tone ?? 'slate',
    slug: value.toLowerCase().replaceAll('_', '-'),
  }))
  const byValue = Object.fromEntries(items.map((item) => [item.value, item]))
  const bySlug = Object.fromEntries(items.map((item) => [item.slug, item]))

  return {
    items,
    labelOf: (value) => byValue[value]?.label ?? value ?? '',
    toneOf: (value) => byValue[value]?.tone ?? 'slate',
    fromSlug: (slug) => bySlug[slug]?.value ?? '',
  }
}

export const newsCategories = catalog([
  ['DESARROLLO', 'Desarrollo', 'blue'],
  ['ENTREVISTAS', 'Entrevistas', 'violet'],
  ['NETWORKING', 'Networking', 'green'],
  ['RECURSOS', 'Recursos', 'indigo'],
  ['GENERAL', 'General', 'slate'],
])

export const discussionCategories = catalog([
  ['AYUDA_TECNICA', 'Ayuda técnica', 'blue'],
  ['RECURSOS', 'Recursos', 'green'],
  ['EXPERIENCIAS', 'Experiencias', 'violet'],
  ['NETWORKING', 'Networking', 'pink'],
  ['GENERAL', 'General', 'slate'],
])

export const jobLevels = catalog([
  ['INTERN', 'Prácticas', 'amber'],
  ['JUNIOR', 'Junior', 'green'],
  ['MID', 'Intermedio', 'blue'],
])

export const workModes = catalog([
  ['REMOTE', 'Remoto', 'green'],
  ['HYBRID', 'Híbrido', 'blue'],
  ['ONSITE', 'Presencial', 'slate'],
])

export const importSourceTypes = catalog([
  ['RSS_NEWS', 'Noticias · RSS o Atom', 'blue'],
  ['GETONBRD_JOBS', 'Empleo · Get on Board', 'green'],
  ['REMOTIVE_JOBS', 'Empleo · Remotive', 'green'],
  ['ARBEITNOW_JOBS', 'Empleo · Arbeitnow', 'green'],
])

export const isNewsSourceType = (type) => type === 'RSS_NEWS'

export const contractTypes = catalog([
  ['FULL_TIME', 'Jornada completa'],
  ['PART_TIME', 'Media jornada'],
  ['INTERNSHIP', 'Prácticas'],
  ['FREELANCE', 'Freelance'],
  ['TEMPORARY', 'Temporal'],
])
