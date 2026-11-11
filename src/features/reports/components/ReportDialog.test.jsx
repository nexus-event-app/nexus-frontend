import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/shared/api/ApiError'
import { renderWithProviders } from '@/test/render'
import { reportService } from '../services/reportService'
import ReportButton from './ReportButton'
import ReportDialog from './ReportDialog'

beforeEach(() => {
  vi.spyOn(reportService, 'create').mockResolvedValue()
})

describe('ReportDialog', () => {
  it('pide un motivo antes de enviar', async () => {
    renderWithProviders(<ReportDialog targetType="COMMENT" targetId={5} onClose={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Enviar reporte' }))

    expect(reportService.create).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Elige un motivo.')
    expect(screen.getByRole('group', { name: /¿Qué ocurre\?/ })).toHaveAccessibleDescription('Elige un motivo.')
  })

  it('envía el motivo y los detalles, da las gracias y se cierra', async () => {
    const onClose = vi.fn()
    const { toast } = renderWithProviders(<ReportDialog targetType="COMMENT" targetId={5} onClose={onClose} />)
    await userEvent.click(screen.getByRole('radio', { name: /Datos personales/ }))
    await userEvent.type(screen.getByLabelText(/Detalles/), '  Ha publicado un teléfono  ')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar reporte' }))

    expect(reportService.create).toHaveBeenCalledWith({
      targetType: 'COMMENT',
      targetId: 5,
      reason: 'PERSONAL_DATA',
      details: 'Ha publicado un teléfono',
    })
    expect(toast.success).toHaveBeenCalledWith('Gracias por avisar. El equipo lo revisará lo antes posible.')
    expect(onClose).toHaveBeenCalled()
  })

  it('si ya lo había reportado lo dice sin mostrar un error', async () => {
    vi.spyOn(reportService, 'create').mockImplementation(async () => {
      throw new ApiError({ status: 409 })
    })
    const onClose = vi.fn()
    const { toast } = renderWithProviders(<ReportDialog targetType="DISCUSSION" targetId={1} onClose={onClose} />)
    await userEvent.click(screen.getByRole('radio', { name: /Spam/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Enviar reporte' }))

    expect(toast.info).toHaveBeenCalledWith('Ya habías reportado este contenido. El equipo lo revisará.')
    expect(onClose).toHaveBeenCalled()
  })
})

describe('ReportButton', () => {
  const props = { targetType: 'COMMENT', targetId: 5, ownerId: 9, srLabel: ' el comentario de Marta' }

  it('no aparece en el contenido propio', () => {
    renderWithProviders(<ReportButton {...props} />, { auth: { user: { id: 9, name: 'Marta' } } })
    expect(screen.queryByRole('button', { name: /Reportar/ })).not.toBeInTheDocument()
  })

  it('sin sesión lleva a iniciarla y vuelve a la página', async () => {
    const { current, toast } = renderWithProviders(<ReportButton {...props} />, { route: '/foro/21-hola' })
    await userEvent.click(screen.getByRole('button', { name: 'Reportar el comentario de Marta' }))
    expect(toast.info).toHaveBeenCalledWith('Inicia sesión para reportar contenido.')
    expect(current.location.pathname).toBe('/login')
    expect(current.location.search).toBe('?redirect=%2Fforo%2F21-hola')
  })

  it('con sesión abre la ventana de reporte', async () => {
    renderWithProviders(<ReportButton {...props} />, { auth: { user: { id: 7, name: 'Lucía' } } })
    await userEvent.click(screen.getByRole('button', { name: 'Reportar el comentario de Marta' }))
    expect(screen.getByRole('dialog', { name: 'Reportar contenido' })).toBeInTheDocument()
  })
})
