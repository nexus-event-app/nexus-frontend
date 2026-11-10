import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import Pagination from './Pagination'

const href = (page) => `/noticias?page=${page}`

describe('Pagination', () => {
  it('no aparece si solo hay una página', () => {
    renderWithProviders(<Pagination page={1} totalPages={1} buildHref={href} />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('muestra la primera, la última y las vecinas, con huecos entre medias', () => {
    renderWithProviders(<Pagination page={5} totalPages={10} buildHref={href} />)
    const nav = screen.getByRole('navigation')
    const pages = within(nav)
      .getAllByRole('link')
      .map((link) => link.textContent)
    expect(pages).toEqual(['Anterior', '1', '4', '5', '6', '10', 'Siguiente'])
    expect(within(nav).getByRole('link', { current: 'page' })).toHaveTextContent('5')
  })

  it('desactiva «Anterior» en la primera página y traduce los enlaces', () => {
    renderWithProviders(<Pagination page={1} totalPages={3} buildHref={href} />, { route: '/en/news' })
    expect(screen.queryByRole('link', { name: /Previous/ })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Next/ })).toHaveAttribute('href', '/en/news?page=2')
  })
})
