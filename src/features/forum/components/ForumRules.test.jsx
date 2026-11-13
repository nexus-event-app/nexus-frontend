import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ForumRules from './ForumRules'

describe('ForumRules', () => {
  it('pone el título fuera del recuadro y las cinco normas en orden dentro', () => {
    renderWithProviders(<ForumRules />)
    const aside = screen.getByRole('complementary', { name: 'Normas del foro' })
    const rules = screen.getByRole('list')
    expect(aside).toContainElement(rules)
    expect(rules).not.toContainElement(screen.getByRole('heading', { name: 'Normas del foro' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Respeto absoluto')
  })
})
