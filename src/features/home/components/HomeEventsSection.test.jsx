import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { eventsService } from '@/features/events/services/eventsService'
import HomeEventsSection from './HomeEventsSection'

vi.mock('@/features/events/services/eventsService', () => ({ eventsService: { upcoming: vi.fn() } }))

const event = (id, title, forWomen) => ({
  id,
  title,
  description: 'Una charla para aprender.',
  url: 'https://www.meetup.com/x',
  host: 'meetup.com',
  date: '2099-03-12',
  time: '19:00:00',
  mode: 'ONLINE',
  city: null,
  address: null,
  forWomen,
  mine: false,
  interestedCount: 0,
  interested: false,
})

describe('HomeEventsSection', () => {
  afterEach(() => vi.clearAllMocks())

  it('enseña el próximo evento general y el próximo de mujeres, con el enlace a todos', async () => {
    eventsService.upcoming.mockImplementation(({ forWomen }) =>
      Promise.resolve({ content: [forWomen ? event(2, 'Café de mujeres', true) : event(1, 'Meetup de React', false)] }),
    )
    renderWithProviders(<HomeEventsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Próximos eventos' })).toBeInTheDocument()
    expect(await screen.findByRole('article', { name: 'Meetup de React' })).toBeInTheDocument()
    expect(await screen.findByRole('article', { name: 'Café de mujeres' })).toBeInTheDocument()
    expect(eventsService.upcoming).toHaveBeenCalledWith({ forWomen: true, page: 0, size: 1 }, expect.anything())
    expect(screen.getByRole('link', { name: /Ver todos los eventos/ })).toHaveAttribute('href', '/eventos')
  })

  it('si no hay eventos, invita a compartir uno', async () => {
    eventsService.upcoming.mockResolvedValue({ content: [] })
    renderWithProviders(<HomeEventsSection />)
    expect(await screen.findByText('Todavía no hay eventos próximos.')).toBeInTheDocument()
    expect(screen.getByText('Todavía no hay eventos de comunidades de mujeres.')).toBeInTheDocument()
  })
})
