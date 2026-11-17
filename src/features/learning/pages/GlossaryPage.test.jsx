import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import GlossaryPage from './GlossaryPage'
import GlossaryTeaser from '../components/GlossaryTeaser'

describe('GlossaryPage', () => {
  it('muestra todos los términos por categorías, con su definición y su ejemplo', () => {
    renderWithProviders(<GlossaryPage />, { route: '/glosario' })
    expect(screen.getByRole('heading', { level: 1, name: 'Las palabras que vas a oír' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('45 términos')
    const api = screen.getByRole('article', { name: 'API' })
    expect(api).toHaveAttribute('id', 'termino-api')
    expect(api).toHaveTextContent(/camarero/)
    expect(api).toHaveTextContent(/Ejemplo:/)
  })

  it('filtra mientras escribes y por categoría', async () => {
    renderWithProviders(<GlossaryPage />, { route: '/glosario' })
    await userEvent.type(screen.getByRole('searchbox', { name: 'Buscar en el glosario' }), 'sprint')
    expect(screen.getByRole('article', { name: 'Sprint' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'API' })).not.toBeInTheDocument()

    await userEvent.clear(screen.getByRole('searchbox', { name: 'Buscar en el glosario' }))
    await userEvent.click(screen.getByRole('button', { name: /^Empleo/ }))
    expect(screen.getByRole('button', { name: /^Empleo/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('article', { name: 'Junior' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Commit' })).not.toBeInTheDocument()
  })

  it('si no encuentra la palabra, invita a preguntarla en el foro', async () => {
    renderWithProviders(<GlossaryPage />, { route: '/glosario?q=zzzz' })
    expect(screen.getByRole('heading', { name: 'No hemos encontrado esa palabra' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Preguntar en el foro' })).toHaveAttribute('href', '/foro/nueva')
  })

  it('está traducido', () => {
    renderWithProviders(<GlossaryPage />, { route: '/en/glossary' })
    expect(screen.getByRole('heading', { level: 1, name: 'The words you’ll hear' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Database' })).toBeInTheDocument()
  })
})

describe('GlossaryTeaser', () => {
  it('enseña unos términos que llevan a su explicación y el botón al glosario', () => {
    renderWithProviders(<GlossaryTeaser />)
    const nav = screen.getByRole('navigation', { name: 'Algunos términos del glosario' })
    expect(within(nav).getByRole('link', { name: 'API' })).toHaveAttribute('href', '/glosario#termino-api')
    expect(within(nav).getByRole('link', { name: /Ver el glosario/ })).toHaveAttribute('href', '/glosario')
  })
})
