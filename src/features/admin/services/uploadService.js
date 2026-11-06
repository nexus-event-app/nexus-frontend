import { http } from '@/shared/api/http'

export const uploadService = {
  uploadImage: (file) => {
    const body = new FormData()
    body.append('file', file)
    return http.post('/admin/uploads/image', body).then((response) => response.data)
  },
  deleteImage: (fileName) => http.delete(`/admin/uploads/image/${encodeURIComponent(fileName)}`),
}
