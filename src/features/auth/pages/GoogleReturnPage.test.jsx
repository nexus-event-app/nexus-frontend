import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/shared/api/ApiError'
import { renderWithProviders } from '@/test/render'
import { authService } from '../services/authService'
import GoogleReturnPage from './GoogleReturnPage'

vi.mock('../services/authService', () => ({ authService: { googlePending: vi.fn() } }))

function returnFromGoogle(fragment) {
  window.history.replaceState(null, '', `/registro/google#${fragment}`)
  return '/registro/google'
}

describe('GoogleReturnPage', () => {
  afterEach(() => {
    sessionStorage.clear()
    window.history.replaceState(null, '', '/')
  })

  it('canjea el código, borra el fragmento de la dirección y vuelve adonde estaba', async () => {
    sessionStorage.setItem('primercommit.googleRedirect', '/empleo/guardadas')
    const loginWithGoogle = vi.fn().mockResolvedValue({ name: 'Ana' })
    const route = returnFromGoogle('code=codigo-de-prueba')
    const { toast, current } = renderWithProviders(<GoogleReturnPage />, { route, auth: { loginWithGoogle } })

    await expect.poll(() => current.location.pathname).toBe('/empleo/guardadas')
    expect(loginWithGoogle).toHaveBeenCalledTimes(1)
    expect(loginWithGoogle).toHaveBeenCalledWith('codigo-de-prueba')
    expect(toast.success).toHaveBeenCalledWith('Has entrado con Google.')
    expect(window.location.hash).toBe('')
  })

  it('«Ya casi está»: no crea la cuenta hasta aceptar las condiciones', async () => {
    authService.googlePending.mockResolvedValue({ name: 'Lucía Prueba', email: 'lucia@example.com' })
    const completeGoogleSignup = vi.fn().mockResolvedValue({ name: 'Lucía Prueba' })
    const route = returnFromGoogle('signup=alta-de-prueba')
    const { toast, current } = renderWithProviders(<GoogleReturnPage />, { route, auth: { completeGoogleSignup } })

    expect(await screen.findByRole('heading', { level: 1, name: 'Ya casi está' })).toBeInTheDocument()
    const account = screen.getAllByRole('definition')
    expect(account[0]).toHaveTextContent('Lucía Prueba')
    expect(account[1]).toHaveTextContent('lucia@example.com')

    await userEvent.click(screen.getByRole('button', { name: 'Crear mi cuenta' }))
    expect(completeGoogleSignup).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/condiciones/)

    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: 'Crear mi cuenta' }))
    expect(completeGoogleSignup).toHaveBeenCalledWith('alta-de-prueba')
    await expect.poll(() => current.location.pathname).toBe('/')
    expect(toast.success).toHaveBeenCalledWith('¡Te damos la bienvenida! Tu cuenta ya está creada.')
  })

  it('si el alta ha caducado lo explica y ofrece volver a intentarlo', async () => {
    authService.googlePending.mockRejectedValue(new ApiError({ status: 401, message: 'caducado' }))
    const route = returnFromGoogle('signup=caducado')
    renderWithProviders(<GoogleReturnPage />, { route })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'No hemos podido entrar con Google' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/ha caducado/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver a iniciar sesión' })).toHaveAttribute('href', '/login')
  })

  it('explica que se canceló el acceso en Google', async () => {
    const route = returnFromGoogle('error=cancelled')
    renderWithProviders(<GoogleReturnPage />, { route })

    expect(await screen.findByText(/Has cancelado el acceso en Google/)).toBeInTheDocument()
  })
})
