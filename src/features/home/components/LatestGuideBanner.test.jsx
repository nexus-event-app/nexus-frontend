import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { guidesService } from '@/features/guides/services/guidesService'
import { renderWithProviders } from '@/test/render'
import LatestGuideBanner from './LatestGuideBanner'

vi.mock('@/features/guides/services/guidesService', () => ({
  guidesService: { list: vi.fn() },
}))

describe('LatestGuideBanner', () => {
  it('lleva a la última guía publicada con la pegatina de novedad', async () => {
    guidesService.list.mockResolvedValue([
      { slug: 'sindrome-del-impostor', title: 'El síndrome del impostor/a: por qué sientes que no sabes suficiente' },
      { slug: 'tu-primer-meetup-tech', title: 'Tu primer meetup tech' },
    ])
    renderWithProviders(<LatestGuideBanner />)
    const link = await screen.findByRole('link', { name: /Nueva guía.*El síndrome del impostor\/a/ })
    expect(link).toHaveAttribute('href', '/guias/sindrome-del-impostor')
    expect(link).not.toHaveTextContent('por qué sientes')
  })

  it('no enseña nada si todavía no hay guías', async () => {
    guidesService.list.mockResolvedValue([])
    renderWithProviders(<LatestGuideBanner />)
    await Promise.resolve()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
