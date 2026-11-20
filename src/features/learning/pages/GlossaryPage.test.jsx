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
    expect(screen.getByRole('status')).toHaveTextContent('58 términos')
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
    for (const link of screen.getAllByRole('link', { name: '¡Añádela a la lista!' })) {
      expect(link).toHaveAttribute('href', '/foro/1-que-palabra-le-falta-al-glosario-dejala-aqui#responder')
    }
  })

  it('arriba invita siempre a proponer palabras que falten, en el foro', () => {
    renderWithProviders(<GlossaryPage />, { route: '/glosario' })
    const callout = screen.getByRole('complementary', { name: '¿Echas en falta alguna palabra?' })
    expect(within(callout).getByRole('link', { name: '¡Añádela a la lista!' })).toHaveAttribute(
      'href',
      '/foro/1-que-palabra-le-falta-al-glosario-dejala-aqui#responder',
    )
  })

  it('está traducido', () => {
    renderWithProviders(<GlossaryPage />, { route: '/en/glossary' })
    expect(screen.getByRole('heading', { level: 1, name: 'The words you’ll hear' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Database' })).toBeInTheDocument()
  })
})

describe('GlossaryPage · comandos', () => {
  it('pinta los comandos de Git como código', () => {
    renderWithProviders(<GlossaryPage />)
    const card = screen.getByRole('article', { name: 'Preparar cambios (git add)' })
    expect(within(card).getByText('git add index.html').tagName).toBe('CODE')
    expect(card).not.toHaveTextContent('`')
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
