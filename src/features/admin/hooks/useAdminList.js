import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'

const ADMIN_PAGE_SIZE = 20
const FILTER_KEYS = ['q']

export function useAdminList(name, fetchPage) {
  const query = useListQuery(FILTER_KEYS)
  const search = query.filters.q

  const request = useRequest(`admin:${name}:${query.page}:${search}`, ({ signal }) =>
    fetchPage({ page: query.page - 1, size: ADMIN_PAGE_SIZE, q: search }, { signal }),
  )

  return { ...query, search, ...request }
}
