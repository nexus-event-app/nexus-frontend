import { useState } from 'react'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { searchService } from '../services/searchService'
import SiteSearch from './SiteSearch'

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

function Harness() {
  const [open, setOpen] = useState(false)
  return <SiteSearch open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} />
}

beforeEach(() => {
  vi.spyOn(searchService, 'search').mockResolvedValue(RESULT)
})

async function openAndType(text, options) {
  const view = renderWithProviders(<Harness />, options)
  await userEvent.click(screen.getByRole('button', { name: /Buscar en toda la web|Search the whole site/ }))
  const input = screen.getByRole('combobox')
  await userEvent.type(input, text)
  await screen.findByRole('option', { name: /Novedades de React 19/ })
  return { ...view, input }
}

describe('SiteSearch', () => {
  it('la lupa abre el campo en la propia cabecera, con el foco en él y sin ventana aparte', async () => {
    renderWithProviders(<Harness />)
    const button = screen.getByRole('button', { name: 'Buscar en toda la web' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

    await userEvent.click(button)
    const input = screen.getByRole('combobox', { name: 'Buscar noticias, ofertas, discusiones y personas' })
    expect(input).toHaveFocus()
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('no busca con menos de dos letras y lo indica', async () => {
    renderWithProviders(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Buscar en toda la web' }))
    await userEvent.type(screen.getByRole('combobox'), 'r')
    expect(screen.getAllByText(/Escribe al menos 2 letras/)[0]).toBeInTheDocument()
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(searchService.search).not.toHaveBeenCalled()
  })

  it('agrupa los resultados debajo del campo y añade «ver todos»', async () => {
    const { input } = await openAndType('novedad')
    expect(searchService.search).toHaveBeenLastCalledWith('novedad', 4, expect.anything())
    expect(input).toHaveAttribute('aria-expanded', 'true')
    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getByRole('group', { name: 'Noticias' })).toBeInTheDocument()
    expect(within(listbox).getByRole('group', { name: 'Personas' })).toBeInTheDocument()
    expect(within(listbox).queryByRole('group', { name: 'Discusiones' })).not.toBeInTheDocument()
    expect(within(listbox).getAllByRole('option')).toHaveLength(4)
    expect(screen.getByRole('status')).toHaveTextContent('3')
  })

  it('el glosario va primero', async () => {
    await openAndType('api')
    const glossary = screen.getByRole('group', { name: 'Glosario' })
    const option = within(glossary).getAllByRole('option')[0]
    expect(option).toHaveTextContent('API')
    expect(screen.getAllByRole('option')[0]).toBe(option)
  })

  it('se maneja con las flechas, abre la opción activa con Intro y se cierra', async () => {
    const view = await openAndType('novedad', { route: '/en' })
    const input = view.input
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    const active = screen.getAllByRole('option')[1]
    expect(active).toHaveAttribute('aria-selected', 'true')
    expect(input).toHaveAttribute('aria-activedescendant', active.id)
    await userEvent.keyboard('{ArrowUp}{ArrowUp}')
    expect(screen.getAllByRole('option').at(-1)).toHaveAttribute('aria-selected', 'true')
    await userEvent.keyboard('{Home}{Enter}')
    expect(view.current.location.pathname).toBe('/en/news/1-react-19')
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('sin opción activa, Intro abre la página de resultados', async () => {
    const view = await openAndType('react')
    await userEvent.keyboard('{Enter}')
    expect(view.current.location.pathname).toBe('/buscar')
    expect(view.current.location.search).toBe('?q=react')
  })

  it('avisa cuando no hay resultados', async () => {
    searchService.search.mockResolvedValue({ news: empty, jobs: empty, discussions: empty, people: empty })
    renderWithProviders(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Buscar en toda la web' }))
    await userEvent.type(screen.getByRole('combobox'), 'xyz')
    expect(await screen.findByText('No hay resultados para «xyz».', { selector: 'strong' })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('No hay resultados para «xyz».')
  })

  it('Escape y el botón de cerrar la cierran y el foco vuelve a la lupa', async () => {
    renderWithProviders(<Harness />)
    const button = screen.getByRole('button', { name: 'Buscar en toda la web' })
    await userEvent.click(button)
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    await vi.waitFor(() => expect(button).toHaveFocus())

    await userEvent.click(button)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar la búsqueda' }))
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })
})
