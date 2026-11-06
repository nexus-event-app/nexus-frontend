import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRequest } from '@/shared/hooks/useRequest'
import { commentService } from '../services/commentService'

export function useComments(discussionId) {
  const { user } = useAuth()
  return useRequest(
    `comments:${discussionId}:${user?.id ?? 'anon'}`,
    ({ signal }) => commentService.listByDiscussion(discussionId, { signal }),
    { enabled: discussionId !== null },
  )
}
