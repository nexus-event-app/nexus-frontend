import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('la versión normal tiene campo con nombre y botón para enviar', () => {
    const onSearch = vi.fn()
    renderWithProviders(<SearchBar value="" onSearch={onSearch} label="Buscar noticias" />)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar noticias' }), { target: { value: ' react ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar noticias: enviar búsqueda' }))
    expect(onSearch).toHaveBeenCalledWith('react')
  })

  it('la versión compacta no lleva botón y busca al pulsar Intro', () => {
    const onSearch = vi.fn()
    renderWithProviders(<SearchBar compact value="" onSearch={onSearch} label="Buscar noticias" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const field = screen.getByRole('searchbox', { name: 'Buscar noticias' })
    fireEvent.change(field, { target: { value: 'docker' } })
    fireEvent.submit(field.closest('form'))
    expect(onSearch).toHaveBeenCalledWith('docker')
  })
})
