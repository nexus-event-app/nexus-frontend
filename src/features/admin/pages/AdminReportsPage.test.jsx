import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { adminReportsService } from '../services/adminReportsService'
import AdminReportsPage from './AdminReportsPage'

vi.mock('../services/adminReportsService', () => ({
  adminReportsService: { list: vi.fn(), resolve: vi.fn() },
}))

const target = {
  exists: true,
  visible: false,
  held: true,
  title: 'Qué mierda de error',
  excerpt: 'No me compila nada',
  authorId: 7,
  authorName: 'Ana',
  discussionId: 21,
  discussionSlug: 'que-mierda-de-error',
}

const heldCase = {
  targetType: 'DISCUSSION',
  targetId: 21,
  target,
  total: 1,
  reasons: { LANGUAGE: 1 },
  lastReportedAt: '2026-11-23T09:00:00',
  reports: [
    {
      id: 1,
      reason: 'LANGUAGE',
      details: 'Palabras retenidas por el filtro: mierda',
      reporterName: null,
      createdAt: '2026-11-23T09:00:00',
      status: 'PENDING',
      resolution: null,
    },
  ],
}

describe('AdminReportsPage', () => {
  afterEach(() => vi.clearAllMocks())

  it('lo retenido por el filtro se puede publicar desde el panel', async () => {
    adminReportsService.list.mockResolvedValue([heldCase])
    adminReportsService.resolve.mockResolvedValue({})
    const { toast } = renderWithProviders(<AdminReportsPage />)

    const card = await screen.findByRole('article', { name: 'Qué mierda de error' })
    expect(within(card).getByText('Retenido hasta que lo revises')).toBeInTheDocument()
    expect(within(card).getByText(/Automático/)).toBeInTheDocument()
    expect(within(card).getByText('Filtro de lenguaje · 1')).toBeInTheDocument()

    await userEvent.click(within(card).getByRole('button', { name: 'Publicar «Qué mierda de error»' }))
    const dialog = await screen.findByRole('dialog', { name: 'Publicar contenido' })
    await userEvent.click(within(dialog).getByRole('button', { name: 'Publicar' }))

    expect(adminReportsService.resolve).toHaveBeenCalledWith({
      targetType: 'DISCUSSION',
      targetId: 21,
      action: 'DISMISS',
    })
    await vi.waitFor(() => expect(toast.success).toHaveBeenCalledWith('Contenido publicado.'))
  })

  it('un contenido reportado y visible se puede descartar sin publicar nada nuevo', async () => {
    adminReportsService.list.mockResolvedValue([
      { ...heldCase, target: { ...target, held: false, visible: true }, reasons: { SPAM: 1 } },
    ])
    renderWithProviders(<AdminReportsPage />)

    const card = await screen.findByRole('article', { name: 'Qué mierda de error' })
    expect(within(card).getByRole('button', { name: /^Descartar/ })).toBeInTheDocument()
    expect(within(card).queryByRole('button', { name: /^Publicar/ })).not.toBeInTheDocument()
  })
})
