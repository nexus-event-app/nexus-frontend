import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const jobsService = {
  list: (params, config) =>
    http.get('/jobs', { params: compactParams(params), ...config }).then((response) => response.data),
  latest: (limit, config) =>
    http.get('/jobs/latest', { params: { limit }, ...config }).then((response) => response.data),
  get: (id, config) => http.get(`/jobs/${id}`, config).then((response) => response.data),
}
