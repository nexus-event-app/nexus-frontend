import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ProfileAbout from './ProfileAbout'

const base = {
  name: 'Lucía Prueba',
  bio: 'Aprendo React.',
  technologies: ['React', 'CSS'],
  githubUrl: 'https://github.com/ejemplo',
  linkedinUrl: null,
  discussionCount: 2,
  testimonialCount: 1,
}

describe('ProfileAbout', () => {
  it('pone el título fuera del recuadro y da nombre al apartado lateral', () => {
    renderWithProviders(<ProfileAbout profile={base} isOwn={false} />)
    const aside = screen.getByRole('complementary', { name: 'Sobre Lucía Prueba' })
    expect(aside).not.toContainElement(screen.getByRole('heading', { name: 'Sobre Lucía Prueba' }))
    expect(aside).toHaveTextContent('Aprendo React.')
    expect(screen.getByRole('list', { name: 'Tecnologías' })).toHaveTextContent('React')
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('target', '_blank')
    expect(screen.queryByRole('link', { name: /LinkedIn/ })).not.toBeInTheDocument()
  })

  it('dice «Sobre ti» en tu perfil y te anima a completarlo si está vacío', () => {
    renderWithProviders(<ProfileAbout profile={{ ...base, bio: '', technologies: [], githubUrl: null }} isOwn />)
    expect(screen.getByRole('heading', { name: 'Sobre ti' })).toBeInTheDocument()
    expect(screen.getByText(/Cuenta qué estás aprendiendo/)).toBeInTheDocument()
  })

  it('muestra la actividad como pares dato/valor', () => {
    renderWithProviders(<ProfileAbout profile={base} isOwn={false} />)
    const terms = screen.getAllByRole('term').map((term) => term.textContent)
    expect(terms).toEqual(['discusiones', 'testimonio'])
    expect(screen.getAllByRole('definition')[0]).toHaveTextContent('2')
  })
})
