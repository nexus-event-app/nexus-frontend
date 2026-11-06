import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { discussionCategories } from '@/shared/config/catalogs'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { discussionService } from '../services/discussionService'

const FILTER_KEYS = ['categoria', 'q']

export function useDiscussionsList() {
  const query = useListQuery(FILTER_KEYS)
  const category = discussionCategories.fromSlug(query.filters.categoria)
  const search = query.filters.q

  const request = useRequest(`discussions:${query.page}:${category}:${search}`, ({ signal }) =>
    discussionService.list({ page: query.page - 1, size: DEFAULT_PAGE_SIZE, category, q: search }, { signal }),
  )

  return { ...query, category, search, ...request }
}
