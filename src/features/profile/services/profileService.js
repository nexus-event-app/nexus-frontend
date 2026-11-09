import { http } from '@/shared/api/http'

export const profileService = {
  getPublic: (id, config) => http.get(`/users/${id}`, config).then((response) => response.data),
  discussions: (id, params, config) =>
    http.get(`/users/${id}/discussions`, { params, ...config }).then((response) => response.data),
  testimonials: (id, config) => http.get(`/users/${id}/testimonials`, config).then((response) => response.data),
  getOwn: (config) => http.get('/profile', config).then((response) => response.data),
  update: (payload) => http.put('/profile', payload).then((response) => response.data),
  uploadAvatar: (blob) => {
    const body = new FormData()
    body.append('file', blob, 'avatar.jpg')
    return http.post('/profile/avatar', body).then((response) => response.data)
  },
  removeAvatar: () => http.delete('/profile/avatar').then((response) => response.data),
}
