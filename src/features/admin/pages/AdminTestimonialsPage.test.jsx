import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { adminTestimonialsService } from '../services/adminTestimonialsService'
import AdminTestimonialsPage from './AdminTestimonialsPage'

vi.mock('../services/adminTestimonialsService', () => ({
  adminTestimonialsService: { list: vi.fn(), update: vi.fn(), remove: vi.fn() },
}))

const pending = {
  id: 4,
  name: 'Marcos Ruiz',
  role: 'Desarrollador junior',
  location: 'Valencia',
  content: 'Gracias a la comunidad encontré mis primeras prácticas.',
  isActive: false,
  isPending: true,
  isHighlighted: false,
  createdAt: '2026-11-23T10:00:00',
}

describe('AdminTestimonialsPage', () => {
  afterEach(() => vi.clearAllMocks())

  it('al aprobar un testimonio confirma que ya se ve en el muro', async () => {
    adminTestimonialsService.list.mockResolvedValue([pending])
    adminTestimonialsService.update.mockResolvedValue({ ...pending, isActive: true, isPending: false })
    const { toast } = renderWithProviders(<AdminTestimonialsPage />)

    await userEvent.click(await screen.findByRole('button', { name: /Aprobar testimonio de Marcos Ruiz/ }))

    expect(adminTestimonialsService.update).toHaveBeenCalledWith(4, { isPending: false, isActive: true })
    await vi.waitFor(() => expect(toast.success).toHaveBeenCalledWith('Testimonio aprobado: ya se ve en el muro.'))
  })

  it('al ocultar uno publicado avisa de que ya no se ve', async () => {
    const published = { ...pending, isActive: true, isPending: false }
    adminTestimonialsService.list.mockResolvedValue([published])
    adminTestimonialsService.update.mockResolvedValue({ ...published, isActive: false })
    const { toast } = renderWithProviders(<AdminTestimonialsPage />)

    await userEvent.click(await screen.findByRole('button', { name: /^Ocultar/ }))

    await vi.waitFor(() => expect(toast.success).toHaveBeenCalledWith('Testimonio oculto: ya no se ve en el muro.'))
  })
})
