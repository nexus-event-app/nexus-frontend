import { screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { learningService } from '@/features/learning/services/learningService'
import { renderWithProviders } from '@/test/render'
import HeroSection from './HeroSection'
import HomeFeatures from './HomeFeatures'
import HomePathsSection from './HomePathsSection'

describe('HeroSection', () => {
  it('sin sesión invita a unirse y explica qué hay en la web sin enlaces repetidos', () => {
    renderWithProviders(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Comunidad para quienes empiezan en tecnología')
    expect(screen.getByRole('link', { name: 'Únete a la comunidad' })).toHaveAttribute('href', '/registro')
    expect(screen.getByText('Regístrate gratis. ¡Te esperamos!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ya tengo cuenta' })).toHaveAttribute('href', '/login')
  })

  it('con sesión solo saluda por el nombre, sin botones que lleven a ningún sitio', () => {
    renderWithProviders(<HeroSection />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.getByText('Hola, Lucía. ¡Qué bien verte por aquí!')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByText(/Regístrate gratis/)).not.toBeInTheDocument()
  })
})

describe('HomeFeatures', () => {
  it('presenta eventos, empleo, foro y comunidad, y a su lado lo que se gana con una cuenta', () => {
    renderWithProviders(<HomeFeatures />)
    const features = screen.getByRole('region', { name: /Qué encontrarás/ })
    expect(
      within(features)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(['Eventos', 'Empleo', 'Foro', 'Comunidad'])
    expect(
      within(features).getByText('Tu primer paso en tecnología no tiene que darse en solitario.'),
    ).toBeInTheDocument()

    const join = screen.getByRole('complementary', { name: 'Con tu cuenta, todo suma' })
    expect(within(join).getAllByRole('listitem')).toHaveLength(4)
    expect(within(join).getByRole('link', { name: 'Crear mi cuenta' })).toHaveAttribute('href', '/registro')
  })

  it('con sesión no invita a crear cuenta', () => {
    renderWithProviders(<HomeFeatures />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.queryByRole('complementary', { name: 'Con tu cuenta, todo suma' })).not.toBeInTheDocument()
  })
})

describe('HomePathsSection', () => {
  it('muestra las cinco rutas, sin repetir las ventajas de crear cuenta', () => {
    renderWithProviders(<HomePathsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Elige tu camino' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Inteligencia artificial' })).toHaveAttribute('href', '/rutas/ia')
    expect(screen.queryByRole('heading', { name: 'Con tu cuenta, todo suma' })).not.toBeInTheDocument()
  })

  it('con sesión muestra el progreso de cada ruta y no invita a registrarse', async () => {
    vi.spyOn(learningService, 'progress').mockResolvedValue([{ pathId: 'frontend', stepId: 'fundamentos' }])
    renderWithProviders(<HomePathsSection />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.getByRole('heading', { level: 2, name: 'Sigue tu camino' })).toBeInTheDocument()
    expect(await screen.findByText('1 de 6 etapas')).toBeInTheDocument()
  })
})
