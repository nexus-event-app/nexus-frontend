import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/shared/api/ApiError'
import { renderWithProviders } from '@/test/render'
import LoginForm from './LoginForm'

async function fillAndSubmit(email, password) {
  if (email) await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), email)
  if (password) await userEvent.type(screen.getByLabelText(/^Contraseña/), password)
  await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
}

describe('LoginForm', () => {
  it('avisa de los campos vacíos sin llamar al servidor y lleva el foco al primero', async () => {
    const { auth } = renderWithProviders(<LoginForm />)
    await fillAndSubmit()

    expect(auth.login).not.toHaveBeenCalled()
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    await expect.poll(() => document.activeElement).toBe(screen.getByRole('textbox', { name: /Email/ }))
  })

  it('normaliza el email, inicia sesión y da la bienvenida', async () => {
    const login = vi.fn().mockResolvedValue({ name: 'Ana' })
    const { toast } = renderWithProviders(<LoginForm />, { auth: { login } })
    await fillAndSubmit('  Ana@Example.com ', 'clave1234')

    expect(login).toHaveBeenCalledWith({ email: 'ana@example.com', password: 'clave1234' })
    await expect.poll(() => toast.success.mock.calls.length).toBe(1)
    expect(toast.success.mock.calls[0][0]).toContain('Ana')
  })

  it('muestra el error del servidor si las credenciales no son válidas', async () => {
    renderWithProviders(<LoginForm />, {
      auth: {
        login: () => Promise.reject(new ApiError({ status: 401, message: 'Email o contraseña incorrectos' })),
      },
    })
    await fillAndSubmit('ana@example.com', 'mala1234')

    expect(await screen.findByText('Email o contraseña incorrectos')).toBeInTheDocument()
  })

  it('permite ver y ocultar la contraseña', async () => {
    renderWithProviders(<LoginForm />)
    const password = screen.getByLabelText(/^Contraseña/)
    const toggle = screen.getByRole('button', { pressed: false })

    expect(password).toHaveAttribute('type', 'password')
    await userEvent.click(toggle)
    expect(password).toHaveAttribute('type', 'text')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })
})
