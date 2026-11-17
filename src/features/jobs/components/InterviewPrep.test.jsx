import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import InterviewPrep from './InterviewPrep'

describe('InterviewPrep', () => {
  it('explica las tres fases en orden, cada una con cómo prepararla', () => {
    renderWithProviders(<InterviewPrep />)
    const phases = screen.getByRole('region', { name: 'Qué esperar en cada fase' })
    const cards = within(phases).getAllByRole('article')
    expect(cards.map((card) => within(card).getByRole('heading', { level: 4 }).textContent)).toEqual([
      'Llamada con selección',
      'Prueba técnica',
      'Entrevista con el equipo',
    ])
    expect(within(cards[0]).getByText('Fase 1')).toBeInTheDocument()
    for (const card of cards) expect(within(card).getAllByRole('listitem')).toHaveLength(3)
  })

  it('da consejos para la prueba en directo y preguntas para hacer a la empresa', () => {
    renderWithProviders(<InterviewPrep />)
    const live = screen.getByRole('region', { name: 'Si la prueba es en directo' })
    expect(within(live).getByText('Piensa en voz alta')).toBeInTheDocument()
    expect(within(live).getByText('Pregunta si no entiendes')).toBeInTheDocument()
    const questions = screen.getByRole('region', { name: 'Preguntas que puedes hacer tú' })
    expect(
      within(questions)
        .getAllByRole('heading', { level: 4 })
        .map((h) => h.textContent),
    ).toEqual(['Sobre el puesto', 'Sobre el equipo', 'Sobre tu aprendizaje'])
    expect(within(questions).getByText('¿Cómo es la incorporación de alguien junior?')).toBeInTheDocument()
  })

  it('deja el antetítulo y el título fuera de las tarjetas, y está traducido', () => {
    renderWithProviders(<InterviewPrep />, { route: '/en/jobs' })
    const title = screen.getByRole('heading', { level: 2, name: 'Get ready for technical interviews' })
    for (const card of screen.getAllByRole('article')) expect(card).not.toContainElement(title)
    expect(screen.getByRole('heading', { level: 3, name: 'If the test is live' })).toBeInTheDocument()
  })
})
