import { http } from '@/shared/api/http'

export const guidesService = {
  list: (config) => http.get('/guides', config).then((response) => response.data),
  get: (slug, config) => http.get(`/guides/${encodeURIComponent(slug)}`, config).then((response) => response.data),
}
