import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const adminJobsService = {
  list: (params, config) =>
    http.get('/admin/jobs', { params: compactParams(params), ...config }).then((response) => response.data),
  create: (payload) => http.post('/admin/jobs', payload).then((response) => response.data),
  update: (id, payload) => http.put(`/admin/jobs/${id}`, payload).then((response) => response.data),
  remove: (id) => http.delete(`/admin/jobs/${id}`),
}
