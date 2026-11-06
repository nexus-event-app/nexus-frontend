import { useRequest } from '@/shared/hooks/useRequest'
import { discussionService } from '../services/discussionService'

export function useLatestDiscussions(limit = 3) {
  return useRequest(`discussions:latest:${limit}`, ({ signal }) =>
    discussionService.list({ page: 0, size: limit }, { signal }).then((page) => page.content),
  )
}
