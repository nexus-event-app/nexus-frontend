import { http } from '@/shared/api/http'

export const adminStatsService = {
  get: (config) => http.get('/admin/stats', config).then((response) => response.data),
}
