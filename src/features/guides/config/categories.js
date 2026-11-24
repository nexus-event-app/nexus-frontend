export const GUIDE_CATEGORIES = [
  { value: 'PRIMEROS_PASOS', slug: 'primeros-pasos', emoji: '🚀', adminLabel: 'Primeros pasos' },
  { value: 'EMPLEO', slug: 'empleo', emoji: '💼', adminLabel: 'Empleo' },
  { value: 'HERRAMIENTAS', slug: 'herramientas', emoji: '🛠️', adminLabel: 'Herramientas' },
  { value: 'COMUNIDAD', slug: 'comunidad', emoji: '🤝', adminLabel: 'Comunidad' },
]

export function categoryOf(value) {
  return GUIDE_CATEGORIES.find((category) => category.value === value) ?? GUIDE_CATEGORIES[0]
}

export function categoryFromSlug(slug) {
  return GUIDE_CATEGORIES.find((category) => category.slug === slug) ?? null
}
