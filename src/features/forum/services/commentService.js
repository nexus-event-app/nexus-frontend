import { http } from '@/shared/api/http'

export const commentService = {
  listByDiscussion: (discussionId, config) =>
    http.get(`/comments/discussion/${discussionId}`, config).then((response) => response.data),
  create: (payload) => http.post('/comments', payload).then((response) => response.data),
  remove: (id) => http.delete(`/comments/${id}`),
  toggleLike: (id) => http.post(`/comments/${id}/like`).then((response) => response.data),
}
