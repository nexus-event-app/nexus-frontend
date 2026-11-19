import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { testimonialService } from '../services/testimonialService'
import TestimonialForm from './TestimonialForm'

vi.mock('../services/testimonialService', () => ({ testimonialService: { create: vi.fn() } }))

const TEXT = 'Tres meses peleándome con Docker y hoy, por fin, ha funcionado a la primera. ¡Seguimos!'

async function send() {
  await userEvent.type(screen.getByLabelText(/Tu experiencia/), TEXT)
  await userEvent.click(screen.getByRole('button', { name: /Enviar|Publicar|Compartir/ }))
}

describe('TestimonialForm', () => {
  afterEach(() => vi.clearAllMocks())

  it('avisa de que se publicará tras la revisión', async () => {
    testimonialService.create.mockResolvedValue({ id: 1, isActive: false, isPending: true })
    renderWithProviders(<TestimonialForm />, { auth: { user: { id: 7, name: 'Ana' } } })
    await send()
    expect(await screen.findByText('¡Tu nota va camino del muro!')).toBeInTheDocument()
  })

  it('a la administración le dice que ya está publicado', async () => {
    testimonialService.create.mockResolvedValue({ id: 2, isActive: true, isPending: false })
    renderWithProviders(<TestimonialForm />, { auth: { user: { id: 1, name: 'Admin', role: 'ADMIN' } } })
    await send()
    expect(await screen.findByText('¡Tu nota ya está en el muro!')).toBeInTheDocument()
  })
})
