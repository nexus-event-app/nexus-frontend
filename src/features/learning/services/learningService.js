import { http } from '@/shared/api/http'

/** Progreso de la persona con sesión iniciada en las rutas de aprendizaje. */
export const learningService = {
  progress: (config) => http.get('/learning/progress', config).then((response) => response.data),
  complete: (pathId, stepId) => http.put(`/learning/progress/${pathId}/${stepId}`),
  undo: (pathId, stepId) => http.delete(`/learning/progress/${pathId}/${stepId}`),
}
