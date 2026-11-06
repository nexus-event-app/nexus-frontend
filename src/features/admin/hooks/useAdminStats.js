import { useRequest } from '@/shared/hooks/useRequest'
import { adminStatsService } from '../services/adminStatsService'

export function useAdminStats() {
  return useRequest('admin:stats', ({ signal }) => adminStatsService.get({ signal }))
}
