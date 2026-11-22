import FilterLinks from '@/shared/components/FilterLinks'
import { categoryOptions } from '@/shared/utils/filters'
import { newsCategories } from '@/shared/config/catalogs'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { newsService } from '../services/newsService'

export default function NewsCategoryFilter({ category, language = '', buildHref, className }) {
  const { t } = useI18n()
  const published = useRequest(`news:categories:${language}`, ({ signal }) =>
    newsService.categories(language || undefined, { signal }),
  )
  const visible = published.data ? new Set(published.data) : null

  const options = categoryOptions({
    allLabel: t('news.filter.all'),
    items: newsCategories.items.filter((item) => !visible || visible.has(item.value) || item.value === category),
    category,
    buildHref,
  })

  return <FilterLinks label={t('news.filter.label')} options={options} className={className} />
}
