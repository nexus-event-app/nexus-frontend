import { http } from '@/shared/api/http'

export const savedJobsService = {
  list: (params, config) => http.get('/saved-jobs', { params, ...config }).then((response) => response.data),
  ids: (config) => http.get('/saved-jobs/ids', config).then((response) => response.data),
  save: (jobId) => http.put(`/saved-jobs/${jobId}`),
  remove: (jobId) => http.delete(`/saved-jobs/${jobId}`),
}
