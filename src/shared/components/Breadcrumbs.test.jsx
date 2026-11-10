import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('empieza en Inicio y marca la página actual sin enlace', () => {
    renderWithProviders(
      <Breadcrumbs
        items={[
          { label: 'Foro', to: '/foro' },
          { label: '¿Por dónde empiezo?', to: '/foro/3-por-donde-empiezo' },
        ]}
      />,
      { route: '/ca/forum/3-por-donde-empiezo' },
    )
    expect(screen.getByRole('link', { name: 'Inici' })).toHaveAttribute('href', '/ca')
    expect(screen.getByRole('link', { name: 'Foro' })).toHaveAttribute('href', '/ca/forum')
    expect(screen.getByText('¿Por dónde empiezo?')).toHaveAttribute('aria-current', 'page')
  })
})
