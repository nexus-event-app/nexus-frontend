import { http } from '@/shared/api/http'

export const searchService = {
  search: (query, limit, config) =>
    http.get('/search', { params: { q: query, limit }, ...config }).then((response) => response.data),
}
