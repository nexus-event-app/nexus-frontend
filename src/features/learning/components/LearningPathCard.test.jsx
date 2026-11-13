import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { LEARNING_PATHS } from '../data/learningPaths'
import LearningPathCard from './LearningPathCard'

const frontend = LEARNING_PATHS.find((path) => path.id === 'frontend')

describe('LearningPathCard', () => {
  it('enlaza a la ruta y nombra la duración y las etapas para el lector de pantalla', () => {
    renderWithProviders(<LearningPathCard path={frontend} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Frontend' })).toHaveAttribute('href', '/rutas/frontend')
    expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual(['Duración orientativa', 'Etapas'])
    expect(screen.getByText(`${frontend.steps.length} etapas`)).toBeInTheDocument()
    // Sin número: las rutas no tienen un orden, cada persona empieza por la que quiera.
    expect(screen.queryByText(/^0\d$/)).not.toBeInTheDocument()
  })

  it('solo enseña el progreso si hay alguna etapa hecha', () => {
    const { unmount } = renderWithProviders(<LearningPathCard path={frontend} done={0} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    unmount()
    renderWithProviders(<LearningPathCard path={frontend} done={2} headingLevel="h3" />)
    expect(screen.getByRole('progressbar', { name: 'Tu progreso' })).toHaveAttribute('value', '2')
    expect(screen.getByRole('heading', { level: 3, name: 'Frontend' })).toBeInTheDocument()
  })
})
