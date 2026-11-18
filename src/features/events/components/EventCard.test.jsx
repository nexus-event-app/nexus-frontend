import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { eventsService } from '../services/eventsService'
import EventCard from './EventCard'

vi.mock('../services/eventsService', () => ({ eventsService: { remove: vi.fn(), toggleInterest: vi.fn() } }))

const EVENT = {
  id: 51,
  title: 'Meetup de React en Valencia',
  description: 'Charlas cortas para empezar con React.',
  url: 'https://www.meetup.com/react-valencia/events/1/',
  host: 'meetup.com',
  date: '2099-03-01',
  time: '19:00:00',
  mode: 'PRESENCIAL',
  city: 'Valencia',
  forWomen: false,
  mine: false,
  interestedCount: 3,
  interested: false,
}

describe('EventCard', () => {
  afterEach(() => vi.clearAllMocks())

  it('enseña fecha, hora, lugar y el enlace para apuntarse, que se abre aparte y dice adónde lleva', () => {
    renderWithProviders(<EventCard event={EVENT} />)
    const card = screen.getByRole('article', { name: 'Meetup de React en Valencia' })
    // El día 1 sale como 1 (sin desfase horario), con el día de la semana y la hora.
    expect(card).toHaveTextContent('1')
    expect(card).toHaveTextContent(/1 de marzo · 19:00/)
    expect(card).toHaveTextContent('Valencia')
    const join = within(card).getByRole('link', { name: /Apuntarme en meetup\.com/ })
    expect(join).toHaveAttribute('href', EVENT.url)
    expect(join).toHaveAttribute('target', '_blank')
    expect(join.getAttribute('rel')).toContain('noopener')
    expect(
      within(card).getByRole('button', { name: 'Reportar el evento «Meetup de React en Valencia»' }),
    ).toBeInTheDocument()
  })

  it('a quien lo compartió le deja borrarlo, con confirmación', async () => {
    eventsService.remove.mockResolvedValue({})
    const onDeleted = vi.fn()
    renderWithProviders(<EventCard event={{ ...EVENT, mine: true }} onDeleted={onDeleted} />, {
      auth: { user: { id: 7, name: 'Ana' } },
    })
    expect(screen.queryByRole('button', { name: /Reportar/ })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Borrar/ }))
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Borrar' }))
    expect(eventsService.remove).toHaveBeenCalledWith(51)
    expect(onDeleted).toHaveBeenCalled()
  })

  it('los online lo dicen y está traducido', () => {
    renderWithProviders(<EventCard event={{ ...EVENT, mode: 'ONLINE', city: null }} />, { route: '/en/events' })
    expect(screen.getByRole('article')).toHaveTextContent('Online')
    expect(screen.getByRole('link', { name: /Sign me up on meetup\.com/ })).toBeInTheDocument()
  })

  it('«Voy» enseña cuánta gente va a todo el mundo y, con sesión, se marca y se quita', async () => {
    eventsService.toggleInterest
      .mockResolvedValueOnce({ count: 4, interested: true })
      .mockResolvedValueOnce({ count: 3, interested: false })
    renderWithProviders(<EventCard event={EVENT} />, { auth: { user: { id: 7, name: 'Bea' } } })
    const going = screen.getByRole('button', { name: /^Voy a «Meetup de React en Valencia»\. 3 personas van/ })
    expect(going).toHaveAttribute('aria-pressed', 'false')
    expect(going).toHaveTextContent(/Voy\s*· 3/)
    await userEvent.click(going)
    expect(eventsService.toggleInterest).toHaveBeenCalledWith(51)
    expect(await screen.findByRole('button', { name: /4 personas van/, pressed: true })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Voy a/ }))
    expect(await screen.findByRole('button', { name: /3 personas van/, pressed: false })).toBeInTheDocument()
  })

  it('sin sesión, «Voy» pide iniciar sesión y no marca nada', async () => {
    const { toast } = renderWithProviders(<EventCard event={{ ...EVENT, interestedCount: 1 }} />)
    await userEvent.click(screen.getByRole('button', { name: /1 persona va/ }))
    expect(eventsService.toggleInterest).not.toHaveBeenCalled()
    expect(toast.info).toHaveBeenCalledWith('Inicia sesión para marcar que vas.')
  })
})
