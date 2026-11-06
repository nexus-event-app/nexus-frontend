import { useRequest } from '@/shared/hooks/useRequest'
import { jobsService } from '../services/jobsService'

export function useLatestJobs(limit = 3) {
  return useRequest(`jobs:latest:${limit}`, ({ signal }) => jobsService.latest(limit, { signal }))
}
