import { screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { adminUsersService } from '../services/adminUsersService'
import AdminUsersPage from './AdminUsersPage'

vi.mock('../services/adminUsersService', () => ({ adminUsersService: { list: vi.fn() } }))

const ADMIN = { id: 1, name: 'Admin', role: 'ADMIN', emailVerified: true, enabled: true }
const base = { role: 'USER', enabled: true, emailVerified: true, createdAt: '2026-11-01T10:00:00' }

describe('AdminUsersPage', () => {
  afterEach(() => vi.clearAllMocks())

  it('muestra las cuentas eliminadas por su titular, sin acciones para editarlas ni reactivarlas', async () => {
    adminUsersService.list.mockResolvedValue({
      content: [
        { ...base, id: 2, name: 'Marta', email: 'marta@ejemplo.org' },
        {
          ...base,
          id: 3,
          name: 'Cuenta eliminada',
          email: 'eliminada-3@cuenta-eliminada.invalid',
          enabled: false,
          deleted: true,
        },
      ],
      page: 0,
      totalPages: 1,
      totalElements: 2,
    })
    renderWithProviders(<AdminUsersPage />, { route: '/admin/usuarios', auth: { user: ADMIN } })

    const deletedRow = (await screen.findByText('Eliminada por su titular')).closest('tr, li')
    expect(within(deletedRow).queryByRole('button')).not.toBeInTheDocument()
    expect(within(deletedRow).queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Desactivar a Marta' })).toBeInTheDocument()
  })
})
