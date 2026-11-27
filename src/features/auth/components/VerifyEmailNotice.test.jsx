import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import VerifyEmailNotice from './VerifyEmailNotice'

vi.mock('@/shared/config/legal', () => ({ legalConfig: { email: 'contacto@primercommit.test' } }))

describe('VerifyEmailNotice', () => {
  it('si no llega el correo, recuerda mirar en spam y dice a dónde escribir', () => {
    renderWithProviders(<VerifyEmailNotice>Confirma tu email.</VerifyEmailNotice>)
    expect(screen.getByText(/Mira en la carpeta de spam o escríbenos a/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'contacto@primercommit.test' })).toHaveAttribute(
      'href',
      'mailto:contacto@primercommit.test',
    )
    expect(screen.getByRole('button', { name: /Reenviar/ })).toBeInTheDocument()
  })
})
