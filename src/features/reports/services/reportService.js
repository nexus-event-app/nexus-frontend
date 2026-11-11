import { http } from '@/shared/api/http'

/** Reportes de la comunidad sobre contenido que incumple las normas. */
export const reportService = {
  create: (payload) => http.post('/reports', payload),
}

export const REPORT_REASONS = ['SPAM', 'OFFENSIVE', 'HARASSMENT', 'MISINFORMATION', 'PERSONAL_DATA', 'OTHER']
