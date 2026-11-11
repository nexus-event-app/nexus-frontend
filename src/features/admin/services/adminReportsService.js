import { http } from '@/shared/api/http'

/** Cola de moderación: contenidos reportados por la comunidad. */
export const adminReportsService = {
  list: (status, config) =>
    http.get('/admin/reports', { params: { status }, ...config }).then((response) => response.data),
  resolve: (payload) => http.post('/admin/reports/resolve', payload),
}
