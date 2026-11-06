import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRequest } from '@/shared/hooks/useRequest'
import { discussionService } from '../services/discussionService'

export function useDiscussion(id) {
  const { user } = useAuth()
  return useRequest(`discussion:${id}:${user?.id ?? 'anon'}`, ({ signal }) => discussionService.get(id, { signal }), {
    enabled: id !== null,
  })
}
