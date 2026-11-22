import { http } from '@/shared/api/http'

export const reportService = {
  create: (payload) => http.post('/reports', payload),
}

export const REPORT_REASONS = ['SPAM', 'OFFENSIVE', 'HARASSMENT', 'MISINFORMATION', 'PERSONAL_DATA', 'OTHER']
