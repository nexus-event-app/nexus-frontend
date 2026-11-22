import { http } from '@/shared/api/http'

export const adminReportsService = {
  list: (status, config) =>
    http.get('/admin/reports', { params: { status }, ...config }).then((response) => response.data),
  resolve: (payload) => http.post('/admin/reports/resolve', payload),
}
