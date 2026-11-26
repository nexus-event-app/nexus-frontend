import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import GuideKeywordBoard from './GuideKeywordBoard'

describe('GuideKeywordBoard', () => {
  it('pega cada palabra clave como una etiqueta decorativa, una detrás de otra', () => {
    renderWithProviders(<GuideKeywordBoard keywords={['Git', 'Commit', 'Rama']} />)
    const list = screen.getByRole('list', { hidden: true })
    expect(list).toHaveAttribute('aria-hidden', 'true')
    const tags = screen.getAllByRole('listitem', { hidden: true })
    expect(tags.map((tag) => tag.textContent)).toEqual(['Git', 'Commit', 'Rama'])
    expect(parseInt(tags[1].style.animationDelay)).toBeGreaterThan(parseInt(tags[0].style.animationDelay))
  })

  it('enseña como mucho diez etiquetas para que quepan', () => {
    const keywords = Array.from({ length: 13 }, (_, index) => `Palabra ${index + 1}`)
    renderWithProviders(<GuideKeywordBoard keywords={keywords} />)
    expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(10)
  })
})
