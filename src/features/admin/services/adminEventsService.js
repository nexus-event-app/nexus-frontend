import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const adminEventsService = {
  list: (params, config) =>
    http.get('/admin/events', { params: compactParams(params), ...config }).then((response) => response.data),
  remove: (id) => http.delete(`/events/${id}`),
}
