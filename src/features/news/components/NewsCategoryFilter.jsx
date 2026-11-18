import FilterLinks from '@/shared/components/FilterLinks'
import { newsCategories } from '@/shared/config/catalogs'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { newsService } from '../services/newsService'

/**
 * Filtros por tema. Solo salen los que tienen noticias publicadas (en el idioma elegido): un filtro que lleva a una
 * página vacía no ayuda. El tema elegido se queda siempre, aunque ya no tenga noticias, para poder quitarlo. Mientras
 * llega la lista (o si falla), se enseñan todos.
 */
export default function NewsCategoryFilter({ category, language = '', buildHref, className }) {
  const { t } = useI18n()
  const published = useRequest(`news:categories:${language}`, ({ signal }) =>
    newsService.categories(language || undefined, { signal }),
  )
  const visible = published.data ? new Set(published.data) : null

  const options = [
    { key: 'all', label: t('news.filter.all'), href: buildHref(1, { categoria: '' }), active: category === '' },
    ...newsCategories.items
      .filter((item) => !visible || visible.has(item.value) || item.value === category)
      .map((item) => ({
        key: item.value,
        label: item.label,
        href: buildHref(1, { categoria: item.slug }),
        active: category === item.value,
      })),
  ]

  return <FilterLinks label={t('news.filter.label')} options={options} className={className} />
}
