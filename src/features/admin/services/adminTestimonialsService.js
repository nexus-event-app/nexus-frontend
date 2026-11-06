import { http } from '@/shared/api/http'

export const adminTestimonialsService = {
  list: (config) => http.get('/admin/testimonials', config).then((response) => response.data),
  update: (id, payload) => http.put(`/admin/testimonials/${id}`, payload).then((response) => response.data),
  remove: (id) => http.delete(`/admin/testimonials/${id}`),
}
