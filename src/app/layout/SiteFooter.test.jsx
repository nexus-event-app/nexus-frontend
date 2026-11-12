import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { testimonialService } from '@/features/testimonials/services/testimonialService'
import { renderWithProviders } from '@/test/render'
import SiteFooter from './SiteFooter'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marta Ejemplo',
    role: 'Desarrolladora junior',
    content: 'Encontré mi primer empleo.',
    isHighlighted: false,
  },
  { id: 2, name: 'Javier López', role: null, content: 'El foro me ayudó con Docker.', isHighlighted: true },
]

describe('SiteFooter', () => {
  beforeEach(() => {
    vi.spyOn(testimonialService, 'latest').mockResolvedValue(TESTIMONIALS)
  })

  it('enseña un testimonio pequeño y anónimo (el destacado), sin enlace', async () => {
    renderWithProviders(<SiteFooter />)
    const testimonial = await screen.findByRole('region', { name: 'Una historia de quien ya empezó' })
    expect(testimonial).toHaveTextContent('El foro me ayudó con Docker.')
    expect(testimonial).toHaveTextContent('Anónimo')
    expect(testimonial).not.toHaveTextContent('Javier López')
    expect(within(testimonial).queryByRole('link')).not.toBeInTheDocument()
  })

  it('sin testimonios publicados no enseña la tarjeta', async () => {
    testimonialService.latest.mockResolvedValue([])
    renderWithProviders(<SiteFooter />)
    await expect(
      screen.findByRole('region', { name: 'Una historia de quien ya empezó' }, { timeout: 300 }),
    ).rejects.toThrow()
  })

  it('enlaza a las secciones y a lo legal', () => {
    renderWithProviders(<SiteFooter />)
    expect(screen.getByRole('navigation', { name: 'Pie de página: explorar' })).toHaveTextContent('Sobre el proyecto')
    expect(screen.getByRole('link', { name: 'Privacidad' })).toHaveAttribute('href', '/privacidad')
    expect(screen.getByRole('link', { name: 'Crear cuenta' })).toBeInTheDocument()
  })

  it('con sesión muestra los enlaces de la cuenta', () => {
    renderWithProviders(<SiteFooter />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.getByRole('link', { name: 'Mi perfil' })).toHaveAttribute('href', '/perfil/7-lucia')
    expect(screen.getByRole('link', { name: 'Notificaciones' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Crear cuenta' })).not.toBeInTheDocument()
  })

  it('«Volver arriba» sube al principio de la página', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    renderWithProviders(<SiteFooter />)
    await userEvent.click(screen.getByRole('button', { name: 'Volver arriba' }))
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
  })
})
