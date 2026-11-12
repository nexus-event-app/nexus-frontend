import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import JobFilters from './JobFilters'

const buildHref = (_, changes) => `/empleo?${new URLSearchParams(changes)}`
const EMPTY = { nivel: '', modalidad: '', contrato: '', q: '' }

describe('JobFilters', () => {
  it('nivel y modalidad son enlaces y marcan el elegido', () => {
    renderWithProviders(<JobFilters filters={{ ...EMPTY, nivel: 'junior' }} onChange={vi.fn()} buildHref={buildHref} />)
    const levels = screen.getByRole('navigation', { name: 'Filtrar ofertas por nivel' })
    expect(levels).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Junior' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('navigation', { name: 'Filtrar ofertas por modalidad' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Remoto' })).toHaveAttribute('href', '/empleo?modalidad=remote')
  })

  it('el tipo de contrato y el buscador avisan del cambio', () => {
    const onChange = vi.fn()
    renderWithProviders(<JobFilters filters={EMPTY} onChange={onChange} buildHref={buildHref} />)
    const select = screen.getByRole('combobox', { name: 'Tipo de contrato' })
    expect(select).toHaveDisplayValue('Cualquier contrato')
    fireEvent.change(select, { target: { value: select.options[1].value } })
    expect(onChange).toHaveBeenCalledWith({ contrato: select.options[1].value })
    const search = screen.getByRole('searchbox', { name: 'Buscar ofertas' })
    fireEvent.change(search, { target: { value: 'react' } })
    fireEvent.submit(search.closest('form'))
    expect(onChange).toHaveBeenCalledWith({ q: 'react' }, { replace: true })
  })
})
