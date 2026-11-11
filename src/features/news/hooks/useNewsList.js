import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { newsCategories } from '@/shared/config/catalogs'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { newsService } from '../services/newsService'

const FILTER_KEYS = ['categoria', 'q', 'idioma']
const LANGUAGES = ['es', 'en']

export function useNewsList() {
  const query = useListQuery(FILTER_KEYS)
  const category = newsCategories.fromSlug(query.filters.categoria)
  const search = query.filters.q
  // Idioma de las noticias («es» o «en»); cualquier otro valor se ignora y se muestran todas.
  const language = LANGUAGES.includes(query.filters.idioma) ? query.filters.idioma : ''

  const request = useRequest(`news:${query.page}:${category}:${search}:${language}`, ({ signal }) =>
    newsService.list(
      { page: query.page - 1, size: DEFAULT_PAGE_SIZE, category, q: search, language: language || undefined },
      { signal },
    ),
  )

  return { ...query, category, search, language, ...request }
}
