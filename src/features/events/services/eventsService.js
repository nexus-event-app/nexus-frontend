import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const eventsService = {
  /** Próximos eventos; `forWomen` (true/false) y `mode` (ONLINE/PRESENCIAL) son opcionales. */
  upcoming: (params, config) =>
    http.get('/events', { params: compactParams(params), ...config }).then((response) => response.data),
  create: (payload) => http.post('/events', payload).then((response) => response.data),
  remove: (id) => http.delete(`/events/${id}`),
}
