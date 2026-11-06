import { useRequest } from '@/shared/hooks/useRequest'
import { newsService } from '../services/newsService'

export function useNewsArticle(id) {
  return useRequest(`news:${id}`, ({ signal }) => newsService.get(id, { signal }), { enabled: id !== null })
}
