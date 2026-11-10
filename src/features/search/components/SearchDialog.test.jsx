import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { searchService } from '../services/searchService'
import SearchDialog from './SearchDialog'

const empty = { items: [], total: 0 }
const RESULT = {
  news: { items: [{ id: 1, slug: 'react-19', title: 'Novedades de React 19', category: 'FRONTEND' }], total: 1 },
  jobs: {
    items: [{ id: 2, slug: 'junior-react', title: 'Junior React', company: 'Acme', location: 'Madrid' }],
    total: 1,
  },
  discussions: empty,
  people: { items: [{ id: 3, name: 'Ana García', headline: 'Frontend junior' }], total: 1 },
}

beforeEach(() => {
  vi.spyOn(searchService, 'search').mockResolvedValue(RESULT)
})

async function openAndType(text, options) {
  const view = renderWithProviders(<SearchDialog onClose={vi.fn()} />, options)
  const input = screen.getByRole('combobox')
  await userEvent.type(input, text)
  // «Ver todos» aparece al momento; se espera a que lleguen los resultados.
  await screen.findByRole('option', { name: /Novedades de React 19/ })
  return { ...view, input }
}

describe('SearchDialog', () => {
  it('abre con el foco en el campo y sin lista mientras no hay búsqueda', () => {
    renderWithProviders(<SearchDialog onClose={vi.fn()} />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveFocus()
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('no busca con menos de dos letras', async () => {
    renderWithProviders(<SearchDialog onClose={vi.fn()} />)
    await userEvent.type(screen.getByRole('combobox'), 'r')
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(searchService.search).not.toHaveBeenCalled()
  })

  it('agrupa los resultados y añade «ver todos»', async () => {
    const { input } = await openAndType('react')

    expect(searchService.search).toHaveBeenLastCalledWith('react', 4, expect.anything())
    expect(input).toHaveAttribute('aria-expanded', 'true')
    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getByRole('group', { name: 'Noticias' })).toBeInTheDocument()
    expect(within(listbox).getByRole('group', { name: 'Personas' })).toBeInTheDocument()
    expect(within(listbox).queryByRole('group', { name: 'Discusiones' })).not.toBeInTheDocument()
    expect(within(listbox).getAllByRole('option')).toHaveLength(4)
    expect(screen.getByRole('status')).toHaveTextContent('3')
  })

  it('se maneja con las flechas y abre la opción activa con Intro', async () => {
    const onClose = vi.fn()
    const view = renderWithProviders(<SearchDialog onClose={onClose} />, { route: '/en' })
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'react')
    await screen.findByRole('option', { name: /Novedades de React 19/ })

    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    const active = screen.getAllByRole('option')[1]
    expect(active).toHaveAttribute('aria-selected', 'true')
    expect(input).toHaveAttribute('aria-activedescendant', active.id)

    await userEvent.keyboard('{ArrowUp}{ArrowUp}')
    expect(screen.getAllByRole('option').at(-1)).toHaveAttribute('aria-selected', 'true')

    await userEvent.keyboard('{Home}{Enter}')
    expect(onClose).toHaveBeenCalled()
    expect(view.current.location.pathname).toBe('/en/news/1-react-19')
  })

  it('sin opción activa, Intro abre la página de resultados', async () => {
    const view = await openAndType('react')
    await userEvent.keyboard('{Enter}')
    expect(view.current.location.pathname).toBe('/buscar')
    expect(view.current.location.search).toBe('?q=react')
  })

  it('avisa cuando no hay resultados', async () => {
    searchService.search.mockResolvedValue({ news: empty, jobs: empty, discussions: empty, people: empty })
    renderWithProviders(<SearchDialog onClose={vi.fn()} />)
    await userEvent.type(screen.getByRole('combobox'), 'xyz')
    // Se ve en la ventana y se anuncia a los lectores de pantalla.
    expect(await screen.findByText('No hay resultados para «xyz».', { selector: 'strong' })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('No hay resultados para «xyz».')
  })
})
