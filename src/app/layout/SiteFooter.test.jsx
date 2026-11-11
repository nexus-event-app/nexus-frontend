import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import SiteFooter from './SiteFooter'

describe('SiteFooter', () => {
  it('invita a empezar por las rutas y enlaza a las secciones y a lo legal', () => {
    renderWithProviders(<SiteFooter />)
    expect(screen.getByRole('link', { name: /Empieza tu ruta/ })).toHaveAttribute('href', '/rutas')
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
