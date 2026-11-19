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

  it('las de Noticias, Foro, Eventos, Testimonios y el pie también están registradas con su tamaño', () => {
    expect(illustrations.news).toEqual({ src: '/images/noticias-ilustracion.webp', width: 800, height: 524 })
    expect(illustrations.forum).toEqual({ src: '/images/foro-ilustracion.webp', width: 800, height: 525 })
    expect(illustrations.about).toEqual({ src: '/images/sobre-ilustracion.webp', width: 800, height: 538 })
    expect(illustrations.footer).toEqual({ src: '/images/pie-ilustracion.webp', width: 800, height: 356 })
    expect(illustrations.events).toEqual({ src: '/images/eventos-ilustracion.webp', width: 800, height: 580 })
    expect(illustrations.women).toEqual({ src: '/images/mujeres-ilustracion.webp', width: 800, height: 537 })
    expect(illustrations.testimonials).toEqual({
      src: '/images/testimonios-ilustracion.webp',
      width: 800,
      height: 610,
    })
  })

  it('las de los consejos y las entrevistas laten como un corazón; las demás flotan', () => {
    const { container } = renderWithProviders(
      <>
        <Illustration {...illustrations.tips} />
        <Illustration {...illustrations.news} />
        <Illustration {...illustrations.interview} />
      </>,
    )
    const [tips, news, interview] = container.querySelectorAll('img')
    expect(tips).toHaveAttribute('src', '/images/consejos-ilustracion.webp')
    expect(tips.className).toContain('animate-heartbeat')
    expect(news.className).toContain('animate-float')
    expect(interview).toHaveAttribute('src', '/images/entrevistas-ilustracion.webp')
    expect(interview.className).toContain('animate-heartbeat')
  })
})
