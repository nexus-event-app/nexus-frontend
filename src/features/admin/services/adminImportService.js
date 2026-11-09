import { http } from '@/shared/api/http'

export const adminImportService = {
  list: (config) => http.get('/admin/import-sources', config).then((response) => response.data),
  create: (payload) => http.post('/admin/import-sources', payload).then((response) => response.data),
  update: (id, payload) => http.put(`/admin/import-sources/${id}`, payload).then((response) => response.data),
  remove: (id) => http.delete(`/admin/import-sources/${id}`),
  addDefaults: () => http.post('/admin/import-sources/defaults').then((response) => response.data),
  run: (id) => http.post(`/admin/import-sources/${id}/run`).then((response) => response.data),
}
