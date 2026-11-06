import { http } from '@/shared/api/http'

export const authService = {
  login: (credentials) => http.post('/auth/login', credentials).then((response) => response.data),
  register: (payload) => http.post('/auth/register', payload).then((response) => response.data),
  me: (config) => http.get('/auth/me', config).then((response) => response.data),
  forgotPassword: (email) => http.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => http.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => http.post('/auth/verify-email', { token }),
  resendVerification: () => http.post('/auth/resend-verification'),
}
