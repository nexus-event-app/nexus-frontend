export const GUIDE_CATEGORIES = [
  { value: 'PRIMEROS_PASOS', slug: 'primeros-pasos', icon: 'rocket', adminLabel: 'Primeros pasos' },
  { value: 'EMPLEO', slug: 'empleo', icon: 'briefcase', adminLabel: 'Empleo' },
  { value: 'HERRAMIENTAS', slug: 'herramientas', icon: 'wrench', adminLabel: 'Herramientas' },
  { value: 'COMUNIDAD', slug: 'comunidad', icon: 'users', adminLabel: 'Comunidad' },
]

export function categoryOf(value) {
  return GUIDE_CATEGORIES.find((category) => category.value === value) ?? GUIDE_CATEGORIES[0]
}

export function categoryFromSlug(slug) {
  return GUIDE_CATEGORIES.find((category) => category.slug === slug) ?? null
}
