import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import UserText from './UserText'

describe('UserText', () => {
  it('pinta párrafos y bloques de código', () => {
    render(<UserText>{'Hola.\n\n```\nconst a = 1\n```\n\nAdiós.'}</UserText>)
    expect(screen.getByText('Hola.')).toBeInTheDocument()
    expect(screen.getByText('const a = 1')).toBeInTheDocument()
    expect(screen.getByText('Adiós.')).toBeInTheDocument()
  })

  it('convierte las líneas que empiezan por «•» en una lista', () => {
    render(<UserText>{'Qué harás:\n• Pruebas de usabilidad.\n• Entrevistas.\n\nSobre nosotros.'}</UserText>)
    const list = screen.getByRole('list')
    expect(
      within(list)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(['Pruebas de usabilidad.', 'Entrevistas.'])
    expect(screen.getByText('Qué harás:')).toBeInTheDocument()
    expect(screen.getByText('Sobre nosotros.')).toBeInTheDocument()
  })

  it('junta una viñeta suelta con su texto (como llegaban algunas ofertas importadas)', () => {
    render(<UserText>{'Tareas:\n\n•\n\nPlanificar tests.\n\n•\n\nHacer entrevistas.'}</UserText>)
    expect(
      within(screen.getByRole('list'))
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(['Planificar tests.', 'Hacer entrevistas.'])
    expect(screen.queryByText('•')).not.toBeInTheDocument()
  })
})
