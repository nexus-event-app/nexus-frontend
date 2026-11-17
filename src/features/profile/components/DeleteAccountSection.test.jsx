import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/shared/api/ApiError'
import { renderWithProviders } from '@/test/render'
import { profileService } from '../services/profileService'
import DeleteAccountSection from './DeleteAccountSection'

vi.mock('../services/profileService', () => ({ profileService: { deleteAccount: vi.fn() } }))

const USER = { id: 7, name: 'Ana', role: 'USER', hasPassword: true }

describe('DeleteAccountSection', () => {
  afterEach(() => vi.clearAllMocks())

  it('explica qué se borra y qué se queda antes de pedir nada', () => {
    renderWithProviders(<DeleteAccountSection />, { auth: { user: USER } })
    const section = screen.getByRole('region', { name: 'Eliminar tu cuenta' })
    expect(within(section).getByRole('heading', { level: 3, name: 'Se borra' })).toBeInTheDocument()
    expect(within(section).getByRole('heading', { level: 3, name: 'Se queda, sin tu nombre' })).toBeInTheDocument()
    expect(section).toHaveTextContent('firmadas como «Cuenta eliminada»')
    expect(profileService.deleteAccount).not.toHaveBeenCalled()
  })

  it('pide la contraseña, elimina la cuenta, cierra la sesión y vuelve a la portada', async () => {
    profileService.deleteAccount.mockResolvedValue({})
    const { auth, toast, current } = renderWithProviders(<DeleteAccountSection />, {
      route: '/perfil/editar',
      auth: { user: USER },
    })
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar mi cuenta' }))
    const dialog = screen.getByRole('dialog', { name: '¿Eliminar tu cuenta?' })

    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar definitivamente' }))
    expect(within(dialog).getByRole('alert')).toHaveTextContent('Escribe tu contraseña para confirmar.')
    expect(profileService.deleteAccount).not.toHaveBeenCalled()

    await userEvent.type(within(dialog).getByLabelText(/Tu contraseña actual/), 'Clave12345')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar definitivamente' }))
    expect(profileService.deleteAccount).toHaveBeenCalledWith('Clave12345')
    expect(auth.logout).toHaveBeenCalled()
    expect(current.location.pathname).toBe('/')
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Tu cuenta se ha eliminado'))
  })

  it('si la contraseña no es correcta, lo dice y no cierra la sesión', async () => {
    profileService.deleteAccount.mockRejectedValue(
      new ApiError({ status: 400, message: 'La contraseña no es correcta' }),
    )
    const { auth } = renderWithProviders(<DeleteAccountSection />, { auth: { user: USER } })
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar mi cuenta' }))
    const dialog = screen.getByRole('dialog')
    await userEvent.type(within(dialog).getByLabelText(/Tu contraseña actual/), 'otra')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar definitivamente' }))
    expect(await within(dialog).findByRole('alert')).toHaveTextContent('La contraseña no es correcta')
    expect(auth.logout).not.toHaveBeenCalled()
  })

  it('las cuentas creadas con Google sin contraseña se confirman sin ella', async () => {
    profileService.deleteAccount.mockResolvedValue({})
    renderWithProviders(<DeleteAccountSection />, { auth: { user: { ...USER, hasPassword: false } } })
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar mi cuenta' }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).queryByLabelText(/contraseña/)).not.toBeInTheDocument()
    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar definitivamente' }))
    expect(profileService.deleteAccount).toHaveBeenCalledWith(null)
  })

  it('a una cuenta de administración le explica por qué no puede eliminarla', () => {
    renderWithProviders(<DeleteAccountSection />, { auth: { user: { ...USER, role: 'ADMIN' } } })
    expect(screen.queryByRole('button', { name: 'Eliminar mi cuenta' })).not.toBeInTheDocument()
    expect(screen.getByText(/primero otra persona administradora tiene que quitarte el rol/)).toBeInTheDocument()
  })

  it('está traducido', () => {
    renderWithProviders(<DeleteAccountSection />, { route: '/en/profile/edit', auth: { user: USER } })
    expect(screen.getByRole('button', { name: 'Delete my account' })).toBeInTheDocument()
  })
})
