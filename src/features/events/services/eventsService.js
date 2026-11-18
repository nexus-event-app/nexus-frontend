import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const eventsService = {
  /** Próximos eventos; `forWomen`, `mode` (ONLINE/PRESENCIAL), `city` y `day` («AAAA-MM-DD») son opcionales. */
  upcoming: (params, config) =>
    http.get('/events', { params: compactParams(params), ...config }).then((response) => response.data),
  /** Días con eventos entre dos fechas («AAAA-MM-DD»), para el calendario. */
  calendar: (from, to, config) =>
    http.get('/events/calendar', { params: { from, to }, ...config }).then((response) => response.data),
  /** Ciudades con eventos presenciales próximos. */
  cities: (config) => http.get('/events/cities', config).then((response) => response.data),
  create: (payload) => http.post('/events', payload).then((response) => response.data),
  remove: (id) => http.delete(`/events/${id}`),
  /** «Me apunto»: lo marca o lo quita; devuelve `{ count, interested }`. */
  toggleInterest: (id) => http.post(`/events/${id}/interest`).then((response) => response.data),
}
