import { screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { learningService } from '@/features/learning/services/learningService'
import { renderWithProviders } from '@/test/render'
import HeroSection from './HeroSection'
import HomePathsSection from './HomePathsSection'

describe('HeroSection', () => {
  it('sin sesión invita a unirse y explica qué hay en la web sin enlaces repetidos', () => {
    renderWithProviders(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tu primer paso en tecnología')
    expect(screen.getByRole('link', { name: /Únete gratis a la comunidad/ })).toHaveAttribute('href', '/registro')
    expect(screen.getByRole('link', { name: 'Ya tengo cuenta' })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('list', { name: 'Por qué unirte' })).toHaveTextContent('Sin publicidad')

    // Los bloques de «Qué encontrarás» informan: no son enlaces.
    const features = screen.getByRole('region', { name: /Qué encontrarás/ })
    expect(within(features).getAllByRole('listitem')).toHaveLength(4)
    expect(within(features).queryByRole('link')).not.toBeInTheDocument()
  })

  it('con sesión saluda por el nombre y lleva a seguir con la ruta', () => {
    renderWithProviders(<HeroSection />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.getByText('Hola, Lucía. ¡Qué bien verte por aquí!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Sigue con tu ruta/ })).toHaveAttribute('href', '/rutas')
    expect(screen.queryByRole('link', { name: /Únete gratis/ })).not.toBeInTheDocument()
  })
})

describe('HomePathsSection', () => {
  it('muestra las cinco rutas y, sin sesión, lo que se gana al unirse', () => {
    renderWithProviders(<HomePathsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Elige tu camino' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Inteligencia artificial' })).toHaveAttribute('href', '/rutas/ia')
    const join = screen.getByRole('complementary', { name: 'Con tu cuenta, todo suma' })
    expect(within(join).getByRole('link', { name: /Crear mi cuenta gratis/ })).toHaveAttribute('href', '/registro')
  })

  it('con sesión muestra el progreso de cada ruta y no invita a registrarse', async () => {
    vi.spyOn(learningService, 'progress').mockResolvedValue([{ pathId: 'frontend', stepId: 'fundamentos' }])
    renderWithProviders(<HomePathsSection />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.getByRole('heading', { level: 2, name: 'Sigue tu camino' })).toBeInTheDocument()
    expect(await screen.findByText('1 de 6 etapas')).toBeInTheDocument()
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })
})
