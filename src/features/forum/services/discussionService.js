import { http } from '@/shared/api/http'
import { compactParams } from '@/shared/api/params'

export const discussionService = {
  list: (params, config) =>
    http.get('/discussions', { params: compactParams(params), ...config }).then((response) => response.data),
  get: (id, config) => http.get(`/discussions/${id}`, config).then((response) => response.data),
  create: (payload) => http.post('/discussions', payload).then((response) => response.data),
  update: (id, payload) => http.put(`/discussions/${id}`, payload).then((response) => response.data),
  remove: (id) => http.delete(`/discussions/${id}`),
  acceptAnswer: (id, commentId) =>
    http.put(`/discussions/${id}/accepted-answer`, { commentId }).then((response) => response.data),
  clearAcceptedAnswer: (id) => http.delete(`/discussions/${id}/accepted-answer`).then((response) => response.data),
  toggleLike: (id) => http.post(`/discussions/${id}/like`).then((response) => response.data),
}
