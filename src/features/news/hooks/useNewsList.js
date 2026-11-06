import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { newsCategories } from '@/shared/config/catalogs'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { newsService } from '../services/newsService'

const FILTER_KEYS = ['categoria', 'q']

export function useNewsList() {
  const query = useListQuery(FILTER_KEYS)
  const category = newsCategories.fromSlug(query.filters.categoria)
  const search = query.filters.q

  const request = useRequest(`news:${query.page}:${category}:${search}`, ({ signal }) =>
    newsService.list({ page: query.page - 1, size: DEFAULT_PAGE_SIZE, category, q: search }, { signal }),
  )

  return { ...query, category, search, ...request }
}
