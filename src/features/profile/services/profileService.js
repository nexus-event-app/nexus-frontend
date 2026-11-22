import { http } from '@/shared/api/http'

export const profileService = {
  getPublic: (id, config) => http.get(`/users/${id}`, config).then((response) => response.data),
  getOwn: (config) => http.get('/profile', config).then((response) => response.data),
  ownDiscussions: (params, config) =>
    http.get('/profile/discussions', { params, ...config }).then((response) => response.data),
  ownTestimonials: (config) => http.get('/profile/testimonials', config).then((response) => response.data),
  update: (payload) => http.put('/profile', payload).then((response) => response.data),
  uploadAvatar: (blob) => {
    const body = new FormData()
    body.append('file', blob, 'avatar.jpg')
    return http.post('/profile/avatar', body).then((response) => response.data)
  },
  removeAvatar: () => http.delete('/profile/avatar').then((response) => response.data),
  deleteAccount: (password) => http.delete('/profile', { data: password ? { password } : {} }),
}
