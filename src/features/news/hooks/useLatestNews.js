import { useRequest } from '@/shared/hooks/useRequest'
import { newsService } from '../services/newsService'

export function useLatestNews(limit = 3) {
  return useRequest(`news:latest:${limit}`, ({ signal }) => newsService.latest(limit, { signal }))
}
