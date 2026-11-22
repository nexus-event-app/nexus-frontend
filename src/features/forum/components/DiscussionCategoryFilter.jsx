import FilterLinks from '@/shared/components/FilterLinks'
import { categoryOptions } from '@/shared/utils/filters'
import { discussionCategories } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'

export default function DiscussionCategoryFilter({ category, buildHref, className }) {
  const { t } = useI18n()
  const options = categoryOptions({
    allLabel: t('forum.filter.all'),
    items: discussionCategories.items,
    category,
    buildHref,
  })
  return <FilterLinks label={t('forum.filter.label')} options={options} className={className} />
}
