import { http } from '@/shared/api/http'

export const learningService = {
  progress: (config) => http.get('/learning/progress', config).then((response) => response.data),
  complete: (pathId, stepId) => http.put(`/learning/progress/${pathId}/${stepId}`),
  undo: (pathId, stepId) => http.delete(`/learning/progress/${pathId}/${stepId}`),
}
