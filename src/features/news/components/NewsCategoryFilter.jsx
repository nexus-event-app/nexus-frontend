import FilterLinks from '@/shared/components/FilterLinks'
import { newsCategories } from '@/shared/config/catalogs'

export default function NewsCategoryFilter({ category, buildHref }) {
  const options = [
    { key: 'all', label: 'Todas', href: buildHref(1, { categoria: '' }), active: category === '' },
    ...newsCategories.items.map((item) => ({
      key: item.value,
      label: item.label,
      href: buildHref(1, { categoria: item.slug }),
      active: category === item.value,
    })),
  ]

  return <FilterLinks label="Filtrar noticias por categoría" options={options} />
}
