import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import RequireAuth from './RequireAuth'

const privatePage = (
  <Routes>
    <Route
      path="/perfil/editar"
      element={
        <RequireAuth>
          <p>Página privada</p>
        </RequireAuth>
      }
    />
    <Route path="*" element={<p>Página pública</p>} />
  </Routes>
)

describe('RequireAuth', () => {
  it('con sesión, enseña la página', () => {
    renderWithProviders(privatePage, { route: '/perfil/editar', auth: { user: { id: 7, name: 'Ana' } } })
    expect(screen.getByText('Página privada')).toBeInTheDocument()
  })

  it('sin sesión, lleva a «Iniciar sesión» y después vuelve a la página', () => {
    const { current } = renderWithProviders(privatePage, { route: '/perfil/editar' })
    expect(current.location.pathname).toBe('/login')
    expect(current.location.search).toBe('?redirect=%2Fperfil%2Feditar')
  })

  it('si acaba de cerrar sesión (o de eliminar su cuenta) aquí, lleva a la portada', () => {
    const { current } = renderWithProviders(privatePage, { route: '/perfil/editar', auth: { signedOut: true } })
    expect(current.location.pathname).toBe('/')
  })

  it('si la página pide crear cuenta, lleva al registro, explica por qué y después vuelve', () => {
    const page = (
      <Routes>
        <Route
          path="/perfil/:idSlug"
          element={
            <RequireAuth signUpReason="profile.view.signUpToView">
              <p>Perfil</p>
            </RequireAuth>
          }
        />
        <Route path="*" element={<p>Registro</p>} />
      </Routes>
    )
    const { current, toast } = renderWithProviders(page, { route: '/perfil/9-marcos' })
    expect(current.location.pathname).toBe('/registro')
    expect(current.location.search).toBe('?redirect=%2Fperfil%2F9-marcos')
    expect(toast.info).toHaveBeenCalledWith('Crea tu cuenta gratis para ver los perfiles de la comunidad.')
  })
})
