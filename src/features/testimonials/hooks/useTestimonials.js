import { useRequest } from '@/shared/hooks/useRequest'
import { testimonialService } from '../services/testimonialService'

export function useTestimonials() {
  return useRequest('testimonials:all', ({ signal }) => testimonialService.list({ signal }))
}

export function useLatestTestimonials() {
  return useRequest('testimonials:latest', ({ signal }) => testimonialService.latest({ signal }))
}
