import { http } from '@/shared/api/http'

export const adminGuidesService = {
  list: (_params, config) =>
    http.get('/admin/guides', config).then((response) => ({
      content: response.data,
      totalElements: response.data.length,
      totalPages: 1,
      number: 0,
    })),
  get: (id) => http.get(`/admin/guides/${id}`).then((response) => response.data),
  create: (payload) => http.post('/admin/guides', payload).then((response) => response.data),
  update: (id, payload) => http.put(`/admin/guides/${id}`, payload).then((response) => response.data),
  remove: (id) => http.delete(`/admin/guides/${id}`),
}
