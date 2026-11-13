import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ForumRules from './ForumRules'

describe('ForumRules', () => {
  it('deja fuera solo el antetítulo; el título y las cinco normas van en el recuadro', () => {
    renderWithProviders(<ForumRules />)
    const aside = screen.getByRole('complementary', { name: 'Normas del foro' })
    const rules = screen.getByRole('list')
    expect(aside).toContainElement(rules)
    const card = screen.getByRole('article', { name: 'Normas del foro' })
    expect(card).toContainElement(screen.getByRole('heading', { name: 'Normas del foro' }))
    expect(card).not.toHaveTextContent('Convivencia')
    expect(aside).toHaveTextContent('Convivencia')
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Respeto absoluto')
  })
})
