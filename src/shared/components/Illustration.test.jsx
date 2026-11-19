import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { illustrations } from '@/shared/config/illustrations'
import Illustration from './Illustration'

describe('Illustration', () => {
  it('es decorativa: oculta a los lectores de pantalla, sin texto alternativo y con su tamaño para no mover la página', () => {
    const { container } = renderWithProviders(<Illustration {...illustrations.employment} />)
    const figure = container.querySelector('figure')
    expect(figure).toHaveAttribute('aria-hidden', 'true')
    const image = figure.querySelector('img')
    expect(image).toHaveAttribute('src', '/images/empleo-ilustracion.webp')
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '595')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('las de Noticias y Foro también están registradas con su tamaño', () => {
    expect(illustrations.news).toEqual({ src: '/images/noticias-ilustracion.webp', width: 800, height: 524 })
    expect(illustrations.forum).toEqual({ src: '/images/foro-ilustracion.webp', width: 800, height: 525 })
  })
})
