import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const adminNewsService = {
  list: (params, config) =>
    http.get('/admin/news', { params: compactParams(params), ...config }).then((response) => response.data),
  create: (payload) => http.post('/admin/news', payload).then((response) => response.data),
  update: (id, payload) => http.put(`/admin/news/${id}`, payload).then((response) => response.data),
  remove: (id) => http.delete(`/admin/news/${id}`),
}
