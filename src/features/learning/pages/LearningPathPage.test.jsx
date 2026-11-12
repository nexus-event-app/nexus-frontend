import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authValue, renderWithProviders } from '@/test/render'
import { learningService } from '../services/learningService'
import LearningPathPage from './LearningPathPage'
import LearningPathsPage from './LearningPathsPage'

function renderPath(route, options) {
  return renderWithProviders(
    <Routes>
      <Route path="/rutas/:pathSlug" element={<LearningPathPage />} />
      <Route path="/:lang/:segment/:pathSlug" element={<LearningPathPage />} />
    </Routes>,
    { route, ...options },
  )
}

beforeEach(() => {
  vi.spyOn(learningService, 'progress').mockResolvedValue([])
  vi.spyOn(learningService, 'complete').mockResolvedValue()
})

describe('LearningPathsPage', () => {
  it('muestra las cinco rutas con su enlace traducido y sin <div>', () => {
    const { container } = renderWithProviders(<LearningPathsPage />, { route: '/en/learning-paths' })
    const list = screen.getByRole('list', { name: 'Available paths' })
    // Las cinco rutas y la ayuda para elegir.
    expect(within(list).getAllByRole('listitem')).toHaveLength(6)
    expect(within(list).getByRole('link', { name: 'Ask in the forum' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Data analysis' })).toHaveAttribute('href', '/en/learning-paths/data')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(container.querySelectorAll('div')).toHaveLength(0)
  })

  it('explica cómo funcionan en tres pasos y, sin sesión, invita a crear cuenta', () => {
    renderWithProviders(<LearningPathsPage />, { route: '/rutas' })
    const how = screen.getByRole('region', { name: 'Cómo funcionan' })
    expect(within(how).getAllByRole('heading', { level: 3 })).toHaveLength(3)
    expect(within(how).getByRole('link', { name: 'Crear mi cuenta' })).toBeInTheDocument()
  })

  it('con sesión no invita a crear cuenta', () => {
    renderWithProviders(<LearningPathsPage />, { route: '/rutas', auth: authValue({ user: { id: 7, name: 'Lucía' } }) })
    expect(screen.queryByRole('link', { name: 'Crear mi cuenta' })).not.toBeInTheDocument()
  })
})

describe('LearningPathPage', () => {
  it('muestra las etapas con sus recursos y avisa del idioma y de la pestaña nueva', () => {
    renderPath('/rutas/frontend')
    expect(screen.getByRole('heading', { level: 1, name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2, name: /JavaScript|HTML y CSS|React/ }).length).toBeGreaterThan(2)

    const learnCss = screen.getByRole('link', { name: /Learn CSS/ })
    expect(learnCss).toHaveAttribute('href', 'https://web.dev/learn/css')
    expect(learnCss).toHaveAttribute('target', '_blank')
    expect(learnCss).toHaveAttribute('rel', 'noopener noreferrer')
    expect(learnCss).toHaveAccessibleName(/en inglés.*se abre en una pestaña nueva/)
  })

  it('sin sesión invita a iniciarla para guardar el progreso y no muestra casillas', () => {
    renderPath('/rutas/qa')
    expect(
      screen.getByText('Inicia sesión o crea una cuenta para guardar tu progreso en las rutas.'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(learningService.progress).not.toHaveBeenCalled()
  })

  it('con sesión, marcar una etapa la guarda y actualiza la barra de progreso', async () => {
    renderPath('/rutas/ia', { auth: { user: { id: 7, name: 'Lucía' } } })
    const checkbox = await screen.findByRole('checkbox', { name: /Hecha \(etapa Machine learning\)/ })
    await vi.waitFor(() => expect(checkbox).toBeEnabled())

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(learningService.complete).toHaveBeenCalledWith('ia', 'machine-learning')
    expect(screen.getByLabelText('Tu progreso')).toHaveAttribute('value', '1')
    expect(screen.getByText('1 de 6 etapas')).toBeInTheDocument()
  })

  it('enlaza a ofertas y discusiones relacionadas', () => {
    renderPath('/rutas/backend')
    expect(screen.getByRole('link', { name: 'Ofertas relacionadas' })).toHaveAttribute('href', '/empleo?q=backend')
    expect(screen.getByRole('link', { name: 'Preguntar en el foro' })).toHaveAttribute('href', '/foro?q=backend')
  })

  it('una ruta que no existe muestra la página 404', () => {
    renderPath('/rutas/no-existe')
    expect(screen.queryByRole('heading', { name: 'Frontend' })).not.toBeInTheDocument()
  })
})
