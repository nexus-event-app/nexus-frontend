import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import HeroIllustration from './HeroIllustration'

describe('HeroIllustration', () => {
  it('es decorativa: la ilustración de la comunidad y tres etiquetas, ocultas a los lectores de pantalla', () => {
    const { container } = renderWithProviders(<HeroIllustration />)
    const figure = container.querySelector('figure')
    expect(figure).toHaveAttribute('aria-hidden', 'true')
    const image = figure.querySelector('img')
    expect(image).toHaveAttribute('src', '/images/comunidad-portada.webp')
    expect(image).toHaveAttribute('alt', '')
    expect(figure).toHaveTextContent('Marta · foro')
    expect(figure).toHaveTextContent('Frontend junior')
    expect(figure).not.toHaveTextContent('Ruta Frontend')
  })
})
