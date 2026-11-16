import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ProfileCard from './ProfileCard'

const profile = {
  name: 'Lucía Prueba',
  headline: 'Estudiante de DAW',
  bio: 'Aprendo React.',
  technologies: ['React', 'CSS'],
  githubUrl: 'https://github.com/ejemplo',
  linkedinUrl: null,
  avatarUrl: null,
  memberSince: '2026-11-02T10:00:00',
  discussionCount: 3,
}

describe('ProfileCard', () => {
  it('muestra lo que la persona ha puesto en su perfil y nada de su actividad', () => {
    renderWithProviders(<ProfileCard profile={profile} headingId="nombre" />)
    const card = screen.getByRole('article', { name: 'Lucía Prueba' })
    expect(screen.getByRole('heading', { level: 1, name: 'Lucía Prueba' })).toBeInTheDocument()
    expect(card).toHaveTextContent('Estudiante de DAW')
    expect(card).toHaveTextContent('Aprendo React.')
    expect(card).toHaveTextContent(/En la comunidad desde/)
    expect(screen.getByRole('list', { name: 'Tecnologías' })).toHaveTextContent('React')
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('target', '_blank')
    expect(screen.queryByRole('link', { name: /LinkedIn/ })).not.toBeInTheDocument()
    expect(card).not.toHaveTextContent('3')
  })

  it('en la vista previa los enlaces no son clicables y el título baja de nivel', () => {
    renderWithProviders(<ProfileCard profile={profile} headingLevel="h3" headingId="vista" interactiveLinks={false} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Lucía Prueba' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('anima a completarlo si está vacío, y lo dice de otra forma si es de otra persona', () => {
    const empty = { ...profile, bio: '', technologies: [], githubUrl: null }
    const { unmount } = renderWithProviders(<ProfileCard profile={empty} isOwn />)
    expect(screen.getByText(/Cuenta qué estás aprendiendo/)).toBeInTheDocument()
    unmount()
    renderWithProviders(<ProfileCard profile={empty} />)
    expect(screen.getByText(/Todavía no ha contado nada/)).toBeInTheDocument()
  })
})
