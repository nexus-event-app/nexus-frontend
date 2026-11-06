import { useRequest } from '@/shared/hooks/useRequest'
import { jobsService } from '../services/jobsService'

export function useJob(id) {
  return useRequest(`jobs:${id}`, ({ signal }) => jobsService.get(id, { signal }), { enabled: id !== null })
}
