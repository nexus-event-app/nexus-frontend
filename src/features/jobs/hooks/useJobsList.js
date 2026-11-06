import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { jobsService } from '../services/jobsService'

const FILTER_KEYS = ['nivel', 'modalidad', 'contrato', 'q']

export function useJobsList() {
  const query = useListQuery(FILTER_KEYS)
  const level = jobLevels.fromSlug(query.filters.nivel)
  const workMode = workModes.fromSlug(query.filters.modalidad)
  const contractType = contractTypes.fromSlug(query.filters.contrato)
  const search = query.filters.q

  const request = useRequest(`jobs:${query.page}:${level}:${workMode}:${contractType}:${search}`, ({ signal }) =>
    jobsService.list(
      { page: query.page - 1, size: DEFAULT_PAGE_SIZE, level, workMode, contractType, q: search },
      { signal },
    ),
  )

  return { ...query, search, ...request }
}
