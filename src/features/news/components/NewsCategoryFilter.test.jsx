import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { newsService } from '../services/newsService'
import NewsCategoryFilter from './NewsCategoryFilter'

vi.mock('../services/newsService', () => ({ newsService: { categories: vi.fn() } }))

const buildHref = (page, { categoria }) => (categoria ? `/noticias?categoria=${categoria}` : '/noticias')

describe('NewsCategoryFilter', () => {
  afterEach(() => vi.clearAllMocks())

  it('solo enseña los temas con noticias, en el orden de siempre', async () => {
    newsService.categories.mockResolvedValue(['IA', 'DATOS'])
    renderWithProviders(<NewsCategoryFilter category="" buildHref={buildHref} />)
    expect(await screen.findByRole('link', { name: 'Datos' })).toHaveAttribute('href', '/noticias?categoria=datos')
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['Todas', 'IA', 'Datos'])
    expect(screen.getByRole('link', { name: 'Todas' })).toHaveAttribute('aria-current', 'true')
  })

  it('el tema elegido se queda aunque ya no tenga noticias, para poder quitarlo', async () => {
    newsService.categories.mockResolvedValue(['IA'])
    renderWithProviders(<NewsCategoryFilter category="CARRERA" buildHref={buildHref} />)
    expect(await screen.findByRole('link', { name: 'Empleo y carrera' })).toHaveAttribute('aria-current', 'true')
    expect(screen.queryByRole('link', { name: 'Ciberseguridad' })).not.toBeInTheDocument()
  })

  it('pregunta por los temas del idioma elegido y está traducido', async () => {
    newsService.categories.mockResolvedValue(['IA', 'SISTEMAS'])
    renderWithProviders(<NewsCategoryFilter category="" language="en" buildHref={buildHref} />, { route: '/en/news' })
    expect(await screen.findByRole('link', { name: 'Systems & cloud' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'AI' })).toBeInTheDocument()
    expect(newsService.categories).toHaveBeenCalledWith('en', expect.anything())
  })

  it('si la lista de temas no llega, enseña todos', async () => {
    newsService.categories.mockRejectedValue(new Error('sin conexión'))
    renderWithProviders(<NewsCategoryFilter category="" buildHref={buildHref} />)
    expect(await screen.findByRole('link', { name: 'Ciberseguridad' })).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(8)
  })
})
