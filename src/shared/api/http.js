import axios from 'axios'
import { ApiError } from './ApiError'
import { clearSession, getToken, notifyUnauthorized } from './session'

const AUTH_ENDPOINTS = ['/auth/login', '/auth/register']

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { Accept: 'application/json' },
  timeout: 20000,
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const apiError = ApiError.fromAxios(error)
    const hadToken = Boolean(error.config?.headers?.get?.('Authorization'))
    const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => error.config?.url?.startsWith(endpoint))

    if (apiError.status === 401 && hadToken && !isAuthEndpoint) {
      clearSession()
      notifyUnauthorized()
    }

    return Promise.reject(apiError)
  },
)
