import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { authService } from '../services/authService'
import GoogleSignIn from './GoogleSignIn'

vi.mock('../services/authService', () => ({ authService: { providers: vi.fn() } }))

describe('GoogleSignIn', () => {
  afterEach(() => sessionStorage.clear())

  it('no aparece si el backend no tiene Google configurado', async () => {
    authService.providers.mockResolvedValue({ google: false })
    renderWithProviders(<GoogleSignIn redirectTo="/" />)
    await expect.poll(() => authService.providers.mock.calls.length).toBeGreaterThan(0)
    expect(screen.queryByRole('link', { name: 'Continuar con Google' })).not.toBeInTheDocument()
  })

  it('lleva a Google en el idioma de la página y recuerda adónde volver', async () => {
    authService.providers.mockResolvedValue({ google: true })
    renderWithProviders(<GoogleSignIn redirectTo="/empleo/guardadas" />, { route: '/en/login' })

    const link = await screen.findByRole('link', { name: 'Continue with Google' })
    expect(link).toHaveAttribute('href', '/api/oauth2/authorize/google?lang=en')
    expect(screen.getByText('or with your email')).toBeInTheDocument()

    link.addEventListener('click', (event) => event.preventDefault())
    await userEvent.click(link)
    expect(sessionStorage.getItem('primercommit.googleRedirect')).toBe('/empleo/guardadas')
  })
})
