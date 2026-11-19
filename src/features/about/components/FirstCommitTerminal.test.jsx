import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import FirstCommitTerminal from './FirstCommitTerminal'

describe('FirstCommitTerminal', () => {
  it('pinta el primer commit y es decorativa', () => {
    const { container } = renderWithProviders(<FirstCommitTerminal />)
    const figure = container.querySelector('figure')
    expect(figure).toHaveAttribute('aria-hidden', 'true')
    expect(figure).toHaveTextContent('git commit -m')
    expect(figure).toHaveTextContent('~/mi-carrera-tech')
  })
})
