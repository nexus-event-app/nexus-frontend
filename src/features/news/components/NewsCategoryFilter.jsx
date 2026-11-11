import FilterLinks from '@/shared/components/FilterLinks'
import { newsCategories } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'

export default function NewsCategoryFilter({ category, buildHref, className }) {
  const { t } = useI18n()
  const options = [
    { key: 'all', label: t('news.filter.all'), href: buildHref(1, { categoria: '' }), active: category === '' },
    ...newsCategories.items.map((item) => ({
      key: item.value,
      label: item.label,
      href: buildHref(1, { categoria: item.slug }),
      active: category === item.value,
    })),
  ]

  return <FilterLinks label={t('news.filter.label')} options={options} className={className} />
}
