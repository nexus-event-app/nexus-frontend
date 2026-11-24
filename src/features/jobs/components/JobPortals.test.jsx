import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import JobPortals from './JobPortals'

describe('JobPortals', () => {
  it('sin cuenta, cada portal lleva a crear la cuenta en vez de abrir la búsqueda', async () => {
    const { current, toast } = renderWithProviders(<JobPortals />, { route: '/empleo' })
    const infojobs = screen.getByRole('link', { name: /InfoJobs/ })
    expect(infojobs).not.toHaveAttribute('target')
    expect(infojobs).toHaveAccessibleName(expect.stringContaining('crea tu cuenta para abrir la búsqueda en InfoJobs'))
    await userEvent.click(infojobs)
    expect(current.location.pathname).toBe('/registro')
    expect(current.location.search).toBe('?redirect=%2Fempleo')
    expect(toast.info).toHaveBeenCalledWith('Crea tu cuenta gratis para abrir las búsquedas filtradas.')
  })

  it('con cuenta, cada portal abre su búsqueda filtrada en una pestaña nueva', () => {
    renderWithProviders(<JobPortals />, { auth: { user: { id: 7, name: 'Lucía' } } })
    const infojobs = screen.getByRole('link', { name: /InfoJobs/ })
    expect(infojobs).toHaveAttribute('href', expect.stringContaining('infojobs.net'))
    expect(infojobs).toHaveAttribute('target', '_blank')
  })
})
