import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import OwnerDetails from './OwnerDetails'

describe('OwnerDetails', () => {
  it('sin NIF ni domicilio, no los muestra (ni como pendientes)', () => {
    renderWithProviders(<OwnerDetails config={{ ownerName: 'Titular', email: 'hola@ejemplo.org' }} />)
    expect(screen.getByText('Titular')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'hola@ejemplo.org' })).toHaveAttribute('href', 'mailto:hola@ejemplo.org')
    expect(screen.queryByText(/NIF/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Domicilio/)).not.toBeInTheDocument()
    expect(screen.queryByText('pendiente de configurar')).not.toBeInTheDocument()
  })

  it('con NIF y domicilio configurados, los muestra', () => {
    renderWithProviders(
      <OwnerDetails
        config={{ ownerName: 'Titular', ownerId: '00000000T', address: 'Calle Ejemplo 1', email: 'a@b.c' }}
      />,
    )
    expect(screen.getByText('00000000T')).toBeInTheDocument()
    expect(screen.getByText('Calle Ejemplo 1')).toBeInTheDocument()
  })

  it('avisa si falta el nombre o el email, que son imprescindibles', () => {
    renderWithProviders(<OwnerDetails config={{}} />)
    expect(screen.getAllByText('pendiente de configurar')).toHaveLength(2)
  })
})
