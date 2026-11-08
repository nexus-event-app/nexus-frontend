import FilterLinks from '@/shared/components/FilterLinks'
import { discussionCategories } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'

export default function DiscussionCategoryFilter({ category, buildHref }) {
  const { t } = useI18n()
  const options = [
    { key: 'all', label: t('forum.filter.all'), href: buildHref(1, { categoria: '' }), active: category === '' },
    ...discussionCategories.items.map((item) => ({
      key: item.value,
      label: item.label,
      href: buildHref(1, { categoria: item.slug }),
      active: category === item.value,
    })),
  ]

  return <FilterLinks label={t('forum.filter.label')} options={options} />
}
