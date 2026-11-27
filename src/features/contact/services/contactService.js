import { http } from '@/shared/api/http'

export const contactService = {
  send: (message) => http.post('/contact', message).then(() => undefined),
}
