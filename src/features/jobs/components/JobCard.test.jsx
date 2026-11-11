import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { SavedJobsContext } from '../hooks/savedJobsContext'
import JobCard from './JobCard'

const savedJobs = { ready: true, count: 0, isSaved: () => false, isPending: () => false, toggle: vi.fn() }

/** La tarjeta incluye el botón de guardar, que necesita las ofertas guardadas. */
function renderCard(job) {
  return renderWithProviders(
    <SavedJobsContext.Provider value={savedJobs}>
      <JobCard job={job} />
    </SavedJobsContext.Provider>,
  )
}

const day = (n) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 19)
const JOB = {
  id: 11,
  slug: 'frontend-junior',
  title: 'Desarrollador/a frontend junior',
  company: 'Acme Software',
  location: 'Barcelona',
  workMode: 'HYBRID',
  contractType: 'FULL_TIME',
  level: 'JUNIOR',
  tags: ['React', 'CSS'],
  imported: true,
  source: 'Arbeitnow',
  publishedAt: day(1),
}

describe('JobCard', () => {
  it('muestra empresa, nivel, modalidad, jornada, tecnologías y cuándo se publicó', () => {
    renderCard(JOB)
    expect(screen.getByRole('link', { name: JOB.title })).toHaveAttribute('href', '/empleo/11-frontend-junior')
    expect(screen.getByText('Acme Software')).toBeInTheDocument()
    expect(screen.getByText('Junior')).toBeInTheDocument()
    expect(screen.getByText('Híbrido')).toBeInTheDocument()
    expect(screen.getByText('Jornada completa')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Tecnologías' })).toHaveTextContent('#React#CSS')
    expect(screen.getByText('ayer')).toHaveAttribute('datetime', JOB.publishedAt)
  })

  it('marca como «Nueva» solo las ofertas de los últimos tres días', () => {
    const { unmount } = renderCard(JOB)
    expect(screen.getByText('Nueva')).toBeInTheDocument()
    unmount()
    renderCard({ ...JOB, publishedAt: day(5) })
    expect(screen.queryByText('Nueva')).not.toBeInTheDocument()
    expect(screen.getByText('hace 5 días')).toBeInTheDocument()
  })

  it('en prácticas no repite «Prácticas» como jornada', () => {
    renderCard({ ...JOB, level: 'INTERN', contractType: 'INTERNSHIP' })
    expect(screen.getAllByText('Prácticas')).toHaveLength(1)
  })
})
