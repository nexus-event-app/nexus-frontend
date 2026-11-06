import FilterLinks from '@/shared/components/FilterLinks'
import { discussionCategories } from '@/shared/config/catalogs'

export default function DiscussionCategoryFilter({ category, buildHref }) {
  const options = [
    { key: 'all', label: 'Todas', href: buildHref(1, { categoria: '' }), active: category === '' },
    ...discussionCategories.items.map((item) => ({
      key: item.value,
      label: item.label,
      href: buildHref(1, { categoria: item.slug }),
      active: category === item.value,
    })),
  ]

  return <FilterLinks label="Filtrar discusiones por categoría" options={options} />
}
