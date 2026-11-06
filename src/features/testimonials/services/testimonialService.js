import { http } from '@/shared/api/http'

export const testimonialService = {
  list: (config) => http.get('/testimonials', config).then((response) => response.data),
  latest: (config) => http.get('/testimonials/latest', config).then((response) => response.data),
  create: (payload) => http.post('/testimonials', payload).then((response) => response.data),
}
