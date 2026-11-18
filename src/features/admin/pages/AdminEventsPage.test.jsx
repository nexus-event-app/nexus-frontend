import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { adminEventsService } from '../services/adminEventsService'
import AdminEventsPage from './AdminEventsPage'

vi.mock('../services/adminEventsService', () => ({ adminEventsService: { list: vi.fn(), remove: vi.fn() } }))

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
})
