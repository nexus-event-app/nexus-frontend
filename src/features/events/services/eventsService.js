import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const eventsService = {
  upcoming: (params, config) =>
    http.get('/events', { params: compactParams(params), ...config }).then((response) => response.data),
  calendar: (from, to, config) =>
    http.get('/events/calendar', { params: { from, to }, ...config }).then((response) => response.data),
  cities: (config) => http.get('/events/cities', config).then((response) => response.data),
  create: (payload) => http.post('/events', payload).then((response) => response.data),
  remove: (id) => http.delete(`/events/${id}`),
  toggleInterest: (id) => http.post(`/events/${id}/interest`).then((response) => response.data),
}
