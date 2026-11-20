import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { adminEventsService } from '../services/adminEventsService'
import AdminEventsPage from './AdminEventsPage'

vi.mock('../services/adminEventsService', () => ({
  adminEventsService: { list: vi.fn(), remove: vi.fn(), update: vi.fn() },
}))

const base = {
  description: 'Descripción',
  url: 'https://www.meetup.com/x',
  host: 'meetup.com',
  date: '2099-03-01',
  time: null,
  mode: 'ONLINE',
  city: null,
  forWomen: false,
  active: true,
  past: false,
  authorName: 'Ana',
  createdAt: '2026-11-18T10:00:00',
}

describe('AdminEventsPage', () => {
  afterEach(() => vi.clearAllMocks())

  it('enseña quién compartió cada evento y su estado, y deja borrar los repetidos', async () => {
    adminEventsService.list.mockResolvedValue({
      content: [
        { ...base, id: 1, title: 'Meetup de React' },
        { ...base, id: 2, title: 'Meetup de React (repetido)', forWomen: true },
        { ...base, id: 3, title: 'Evento oculto', active: false },
      ],
      page: 0,
      totalPages: 1,
      totalElements: 3,
    })
    adminEventsService.remove.mockResolvedValue({})
    renderWithProviders(<AdminEventsPage />, { route: '/admin/eventos', auth: { user: { id: 1, role: 'ADMIN' } } })

    expect((await screen.findAllByText('Meetup de React (repetido)')).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Ana').length).toBeGreaterThan(0)
    expect(screen.getByText('Oculto')).toBeInTheDocument()
    expect(screen.getAllByText('Por y para mujeres').length).toBeGreaterThan(0)

    await userEvent.click(screen.getByRole('button', { name: 'Borrar Meetup de React (repetido)' }))
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Borrar evento' }))
    expect(adminEventsService.remove).toHaveBeenCalledWith(2)
  })

  it('deja corregir un evento: abre el formulario con sus datos y guarda los cambios', async () => {
    adminEventsService.list.mockResolvedValue({
      content: [
        {
          ...base,
          id: 4,
          title: 'Meetup de Reakt',
          mode: 'PRESENCIAL',
          city: 'Doofinder C. de Cronos, 63 · Madrid',
          time: '19:00:00',
        },
      ],
      page: 0,
      totalPages: 1,
      totalElements: 1,
    })
    adminEventsService.update.mockResolvedValue({})
    renderWithProviders(<AdminEventsPage />, { route: '/admin/eventos', auth: { user: { id: 1, role: 'ADMIN' } } })

    await userEvent.click(await screen.findByRole('button', { name: 'Editar Meetup de Reakt' }))
    const dialog = screen.getByRole('dialog', { name: 'Editar evento' })
    const title = within(dialog).getByLabelText(/^Título/)
    expect(title).toHaveValue('Meetup de Reakt')
    await userEvent.clear(title)
    await userEvent.type(title, 'Meetup de React')
    const city = within(dialog).getByLabelText(/^Ciudad/)
    await userEvent.clear(city)
    await userEvent.type(city, 'Madrid')
    await userEvent.type(within(dialog).getByLabelText(/Dirección/), 'C. de Cronos, 63')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Guardar cambios' }))

    expect(adminEventsService.update).toHaveBeenCalledWith(
      4,
      expect.objectContaining({ title: 'Meetup de React', city: 'Madrid', address: 'C. de Cronos, 63', time: '19:00' }),
    )
  })

  it('marca las descripciones que se quedaron cortadas en 280 caracteres para pegarlas completas', async () => {
    adminEventsService.list.mockResolvedValue({
      content: [
        { ...base, id: 1, title: 'Cortado', description: 'x'.repeat(280) },
        { ...base, id: 2, title: 'Completo', description: 'x'.repeat(500) },
      ],
      page: 0,
      totalPages: 1,
      totalElements: 2,
    })
    renderWithProviders(<AdminEventsPage />, { route: '/admin/eventos', auth: { user: { id: 1, role: 'ADMIN' } } })
    const marks = await screen.findAllByText('Descripción cortada: pega la completa con «Editar»')
    // Una por evento cortado (la tabla puede pintarla en escritorio y en móvil).
    expect(marks.length).toBeGreaterThan(0)
    expect(marks.every((mark) => !mark.closest('li, tr')?.textContent.includes('Completo'))).toBe(true)
  })

  it('la descripción sale en dos líneas y «Leer más» la abre entera', async () => {
    adminEventsService.list.mockResolvedValue({
      content: [{ ...base, id: 1, title: 'Largo', description: 'Una frase de la descripción. '.repeat(10).trim() }],
      page: 0,
      totalPages: 1,
      totalElements: 1,
    })
    renderWithProviders(<AdminEventsPage />, { route: '/admin/eventos', auth: { user: { id: 1, role: 'ADMIN' } } })
    const [more] = await screen.findAllByRole('button', { name: /Leer más la descripción de «Largo»/ })
    expect(more).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(more)
    expect(screen.getAllByRole('button', { name: /Leer menos/ })[0]).toHaveAttribute('aria-expanded', 'true')
  })
})
