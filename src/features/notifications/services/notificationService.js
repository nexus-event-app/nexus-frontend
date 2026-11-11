import { http } from '@/shared/api/http'

/** Avisos de la persona con sesión iniciada. */
export const notificationService = {
  list: (params, config) => http.get('/notifications', { params, ...config }).then((response) => response.data),
  unreadCount: (config) => http.get('/notifications/unread-count', config).then((response) => response.data.count),
  markRead: (id) => http.put(`/notifications/${id}/read`),
  markAllRead: () => http.put('/notifications/read-all'),
}
