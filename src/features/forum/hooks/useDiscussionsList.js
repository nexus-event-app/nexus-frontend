import { discussionCategories } from '@/shared/config/catalogs'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { discussionService } from '../services/discussionService'

const FILTER_KEYS = ['categoria', 'q']
/** Cuatro discusiones por página: caben de un vistazo junto a las normas, sin tener que bajar mucho. */
export const FORUM_PAGE_SIZE = 4

export function useDiscussionsList() {
  const query = useListQuery(FILTER_KEYS)
  const category = discussionCategories.fromSlug(query.filters.categoria)
  const search = query.filters.q

  const request = useRequest(`discussions:${query.page}:${category}:${search}`, ({ signal }) =>
    discussionService.list({ page: query.page - 1, size: FORUM_PAGE_SIZE, category, q: search }, { signal }),
  )

  return { ...query, category, search, ...request }
}
