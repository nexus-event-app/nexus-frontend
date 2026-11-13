import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import AuthCard from './AuthCard'

describe('AuthCard', () => {
  it('pone el antetítulo y el título fuera del formulario, que toma el nombre del título', () => {
    renderWithProviders(
      <AuthCard eyebrow="Hola de nuevo" title="Iniciar sesión" subtitle="Accede a tu cuenta." footer="Pie">
        <form aria-label="Formulario de prueba" />
      </AuthCard>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.getAllByText('Hola de nuevo').length).toBeGreaterThan(0)
    const card = screen.getByRole('region', { name: 'Iniciar sesión' })
    expect(card).toContainElement(screen.getByRole('form', { name: 'Formulario de prueba' }))
    expect(card).not.toContainElement(screen.getByRole('heading', { level: 1 }))
    expect(screen.getByText('Pie')).toBeInTheDocument()
  })

  it('el panel de la marca cuenta lo que se gana con la cuenta', () => {
    renderWithProviders(<AuthCard title="Crear cuenta" subtitle="Únete." footer="" />)
    const panel = screen.getByRole('complementary', { name: 'Lo que ganas con tu cuenta' })
    expect(panel).toHaveTextContent('Guarda tu progreso en las rutas')
  })
})
