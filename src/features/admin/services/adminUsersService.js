import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const adminUsersService = {
  list: (params, config) =>
    http.get('/admin/users', { params: compactParams(params), ...config }).then((response) => response.data),
  setEnabled: (id, enabled) => http.put(`/admin/users/${id}/status`, { enabled }).then((response) => response.data),
}
