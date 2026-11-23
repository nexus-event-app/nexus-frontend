import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import I18nProvider from '@/shared/i18n/I18nProvider'
import { useToast } from '@/shared/hooks/useToast'
import ToastProvider from './ToastProvider'

function SaveButton() {
  const toast = useToast()
  return (
    <button type="button" onClick={() => toast.success('Guardado correctamente.')}>
      Guardar
    </button>
  )
}

function OnLoad() {
  const toast = useToast()
  useEffect(() => {
    toast.error('No hemos podido cargar los datos.')
  }, [toast])
  return null
}

function renderWith(ui) {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <ToastProvider>{ui}</ToastProvider>
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('ToastProvider', () => {
  it('el mensaje de una acción sale junto al botón pulsado, no en la lista general', async () => {
    renderWith(<SaveButton />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    const message = await screen.findByRole('status')
    expect(message).toHaveTextContent('Guardado correctamente.')
    expect(within(screen.getByRole('region', { name: 'Mensajes' })).queryByRole('status')).not.toBeInTheDocument()
  })

  it('un mensaje sin acción que lo provoque sale arriba, en la lista general, y se puede cerrar', async () => {
    renderWith(<OnLoad />)
    const region = screen.getByRole('region', { name: 'Mensajes' })
    const alert = await within(region).findByRole('alert')
    expect(alert).toHaveTextContent('No hemos podido cargar los datos.')
    await userEvent.click(within(alert).getByRole('button', { name: 'Cerrar mensaje' }))
    expect(within(region).queryByRole('alert')).not.toBeInTheDocument()
  })

  it('pulsar otra vez el mismo botón sustituye el mensaje anterior en lugar de apilarlos', async () => {
    renderWith(<SaveButton />)
    const button = screen.getByRole('button', { name: 'Guardar' })
    await userEvent.click(button)
    await userEvent.click(button)
    await act(async () => {})
    expect(screen.getAllByRole('status')).toHaveLength(1)
  })
})
