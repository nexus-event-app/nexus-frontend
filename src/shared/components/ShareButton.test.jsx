import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ShareButton from './ShareButton'

describe('ShareButton', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('en el móvil abre el menú de compartir del teléfono con el título y el enlace', async () => {
    const share = vi.fn(() => Promise.resolve())
    vi.stubGlobal('navigator', { ...navigator, share })
    const { toast } = renderWithProviders(<ShareButton title="Mi guía" text="Resumen" />)
    await userEvent.click(screen.getByRole('button', { name: 'Compartir' }))
    expect(share).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Mi guía', text: 'Resumen', url: window.location.href }),
    )
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('si la persona cierra el menú de compartir, no pasa nada', async () => {
    const share = vi.fn(() => Promise.reject(Object.assign(new Error('cancelado'), { name: 'AbortError' })))
    const writeText = vi.fn()
    vi.stubGlobal('navigator', { ...navigator, share, clipboard: { writeText } })
    const { toast } = renderWithProviders(<ShareButton title="Mi guía" />)
    await userEvent.click(screen.getByRole('button', { name: 'Compartir' }))
    expect(writeText).not.toHaveBeenCalled()
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('en el ordenador copia el enlace y lo avisa', async () => {
    const writeText = vi.fn(() => Promise.resolve())
    vi.stubGlobal('navigator', { ...navigator, share: undefined, clipboard: { writeText } })
    const { toast } = renderWithProviders(<ShareButton title="Mi guía" />)
    await userEvent.click(screen.getByRole('button', { name: 'Compartir' }))
    expect(writeText).toHaveBeenCalledWith(window.location.href)
    expect(toast.success).toHaveBeenCalledWith('Enlace copiado: pégalo donde quieras compartirlo.')
  })
})
