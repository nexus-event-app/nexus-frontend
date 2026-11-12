import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders, toastValue } from '@/test/render'
import CopyLinkButton from './CopyLinkButton'

const props = { label: 'Copiar enlace', copiedMessage: 'Enlace copiado', failedMessage: 'No se pudo copiar' }

describe('CopyLinkButton', () => {
  it('copia la dirección de la página y lo avisa', async () => {
    const toast = toastValue()
    const writeText = vi.fn().mockResolvedValue()
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    renderWithProviders(<CopyLinkButton {...props} />, { toast })
    await userEvent.click(screen.getByRole('button', { name: 'Copiar enlace' }))
    expect(writeText).toHaveBeenCalledWith(window.location.href)
    expect(toast.success).toHaveBeenCalledWith('Enlace copiado')
    vi.unstubAllGlobals()
  })

  it('si el navegador no deja copiar, avisa del error', async () => {
    const toast = toastValue()
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText: vi.fn().mockRejectedValue(new Error('no')) } })
    renderWithProviders(<CopyLinkButton {...props} />, { toast })
    await userEvent.click(screen.getByRole('button', { name: 'Copiar enlace' }))
    expect(toast.error).toHaveBeenCalledWith('No se pudo copiar')
    vi.unstubAllGlobals()
  })
})
