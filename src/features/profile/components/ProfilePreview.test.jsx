import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ProfilePreview from './ProfilePreview'

const values = {
  name: '',
  headline: 'Estudiante de DAW',
  bio: 'Aprendo React.',
  technologies: ['React'],
  githubUrl: 'https://github.com/ejemplo',
  linkedinUrl: '',
}

describe('ProfilePreview', () => {
  it('es la misma tarjeta del perfil, con lo que se está escribiendo y el título fuera', () => {
    renderWithProviders(<ProfilePreview values={values} fallbackName="Lucía Prueba" />)
    const aside = screen.getByRole('complementary', { name: 'Así te verán' })
    const card = screen.getByRole('article', { name: 'Lucía Prueba' })
    expect(aside).toContainElement(card)
    expect(card).not.toContainElement(screen.getByRole('heading', { name: 'Así te verán' }))
    expect(card).toHaveTextContent('Estudiante de DAW')
    expect(card).toHaveTextContent('Aprendo React.')
    expect(screen.getByRole('list', { name: 'Tecnologías' })).toHaveTextContent('React')
    expect(card).toHaveTextContent('GitHub')
    expect(card).not.toHaveTextContent('LinkedIn')
  })

  it('usa el nombre escrito en el formulario si lo hay', () => {
    renderWithProviders(<ProfilePreview values={{ ...values, name: 'Lucía P.' }} fallbackName="Lucía Prueba" />)
    expect(screen.getByRole('heading', { name: 'Lucía P.' })).toBeInTheDocument()
  })
})
