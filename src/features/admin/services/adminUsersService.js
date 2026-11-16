import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const adminUsersService = {
  list: (params, config) =>
    http.get('/admin/users', { params: compactParams(params), ...config }).then((response) => response.data),
  setEnabled: (id, enabled) => http.put(`/admin/users/${id}/status`, { enabled }).then((response) => response.data),
  setRole: (id, role) => http.put(`/admin/users/${id}/role`, { role }).then((response) => response.data),
  getProfile: (id, config) => http.get(`/admin/users/${id}/profile`, config).then((response) => response.data),
  updateProfile: (id, payload) => http.put(`/admin/users/${id}/profile`, payload).then((response) => response.data),
  removeAvatar: (id) => http.delete(`/admin/users/${id}/avatar`).then((response) => response.data),
}
