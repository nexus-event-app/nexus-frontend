import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const newsService = {
  list: (params, config) =>
    http.get('/news', { params: compactParams(params), ...config }).then((response) => response.data),
  latest: (limit, config) =>
    http.get('/news/latest', { params: { limit }, ...config }).then((response) => response.data),
  get: (id, config) => http.get(`/news/${id}`, config).then((response) => response.data),
}
