import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import MissingWordCallout from './MissingWordCallout'

describe('MissingWordCallout', () => {
  it('invita a proponer palabras en el foro, con el nivel de título que toque', () => {
    renderWithProviders(<MissingWordCallout id="falta" headingLevel="h3" />)
    const callout = screen.getByRole('complementary', { name: '¿Echas en falta alguna palabra?' })
    expect(within(callout).getByRole('heading', { level: 3 })).toHaveTextContent('¿Echas en falta alguna palabra?')
    expect(within(callout).getByRole('link', { name: '¡Añádela a la lista!' })).toHaveAttribute(
      'href',
      '/foro/1-que-palabra-le-falta-al-glosario-dejala-aqui#responder',
    )
  })
})

describe('glossaryThreadHref', () => {
  it('con el hilo creado, lleva directo a su caja de respuesta', async () => {
    const { glossaryThreadHref } = await import('@/shared/config/community')
    expect(glossaryThreadHref({ id: 57, slug: 'que-palabra-le-falta-al-glosario' })).toBe(
      '/foro/57-que-palabra-le-falta-al-glosario#responder',
    )
  })
})
