import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import HeroIllustration from './HeroIllustration'

describe('HeroIllustration', () => {
  it('es decorativa: la ilustración de la comunidad y tres tarjetas (foro, evento y empleo guardado), ocultas a los lectores de pantalla', () => {
    const { container } = renderWithProviders(<HeroIllustration />)
    const figure = container.querySelector('figure')
    expect(figure).toHaveAttribute('aria-hidden', 'true')
    const image = figure.querySelector('img')
    expect(image).toHaveAttribute('src', '/images/comunidad-portada.webp')
    expect(image).toHaveAttribute('alt', '')
    expect(figure).toHaveTextContent('Mio · foro')
    expect(figure).toHaveTextContent('¿Por dónde empezar a aprender IA?')
    expect(figure).toHaveTextContent('Meetup de IA en Madrid')
    expect(figure).toHaveTextContent('Voy')
    expect(figure).toHaveTextContent('Remoto · Guardada')
    expect(figure).not.toHaveTextContent('Ruta Frontend')
  })
})
