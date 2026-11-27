import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { contactService } from '../services/contactService'
import ContactPage from './ContactPage'

vi.mock('../services/contactService', () => ({ contactService: { send: vi.fn(() => Promise.resolve()) } }))

describe('ContactPage', () => {
  it('elegir una tarjeta pone el motivo y el mensaje se envía sin el campo trampa relleno', async () => {
    renderWithProviders(<ContactPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Contáctanos' })).toBeInTheDocument()
    const reasons = screen.getByRole('region', { name: '¿En qué te podemos ayudar?' })
    expect(
      within(reasons)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(['Dudas o problemas', 'Ayudar a la comunidad', 'Colaborar con Primer Commit'])

    await userEvent.click(within(reasons).getByRole('button', { name: /Colaborar con Primer Commit/ }))
    expect(screen.getByRole('combobox', { name: /Motivo/ })).toHaveValue('PARTNERS')

    await userEvent.type(screen.getByRole('textbox', { name: 'Nombre' }), 'Lola')
    await userEvent.type(screen.getByRole('textbox', { name: /Tu email/ }), 'lola@test.com')
    await userEvent.type(screen.getByRole('textbox', { name: /^Mensaje/ }), 'Queremos colaborar con la comunidad.')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(contactService.send).toHaveBeenCalledWith({
      name: 'Lola',
      email: 'lola@test.com',
      reason: 'PARTNERS',
      message: 'Queremos colaborar con la comunidad.',
      website: '',
    })
    expect(await screen.findByText('¡Mensaje enviado!')).toBeInTheDocument()
  })

  it('no envía un mensaje incompleto y explica qué falta', async () => {
    contactService.send.mockClear()
    renderWithProviders(<ContactPage />)
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(contactService.send).not.toHaveBeenCalled()
    expect(screen.getByText('Elige el motivo de tu mensaje.')).toBeInTheDocument()
  })
})
