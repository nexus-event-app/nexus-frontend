import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ImportSourceForm from './ImportSourceForm'

describe('ImportSourceForm', () => {
  it('ofrece Adzuna (España) y explica que las claves van en el servidor, no en la URL', async () => {
    renderWithProviders(<ImportSourceForm onSubmit={vi.fn()} onCancel={vi.fn()} />)
    await userEvent.selectOptions(screen.getByLabelText(/Tipo/), 'ADZUNA_JOBS')
    expect(screen.getByRole('option', { name: 'Empleo · Adzuna (España)' }).selected).toBe(true)
    expect(screen.getByText(/Las claves van en el servidor \(ADZUNA_APP_ID y ADZUNA_APP_KEY\)/)).toBeInTheDocument()
  })
})
