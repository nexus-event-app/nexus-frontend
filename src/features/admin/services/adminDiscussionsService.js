import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const adminDiscussionsService = {
  list: (params, config) =>
    http.get('/admin/discussions', { params: compactParams(params), ...config }).then((response) => response.data),
}
