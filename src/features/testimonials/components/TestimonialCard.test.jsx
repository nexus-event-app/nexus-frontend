import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import TestimonialCard from './TestimonialCard'

const TESTIMONIAL = {
  id: 31,
  name: 'Marta Ejemplo',
  role: 'Desarrolladora junior',
  location: 'Valencia',
  content: 'Aquí encontré mi primer empleo.',
  authorId: 9,
  isHighlighted: true,
}

describe('TestimonialCard', () => {
  it('muestra la cita, quién la firma y si está destacada', () => {
    renderWithProviders(<TestimonialCard testimonial={TESTIMONIAL} />)
    const figure = screen.getByRole('figure')
    expect(figure).toHaveTextContent('Aquí encontré mi primer empleo.')
    expect(screen.getByRole('link', { name: 'Marta Ejemplo' })).toHaveAttribute('href', '/perfil/9-marta-ejemplo')
    expect(screen.getByText('Desarrolladora junior · Valencia')).toBeInTheDocument()
    expect(screen.getByText('Destacado')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reportar el testimonio de Marta Ejemplo' })).toBeInTheDocument()
  })

  it('«Leer más» despliega el texto y lo anuncia', async () => {
    renderWithProviders(<TestimonialCard testimonial={TESTIMONIAL} />)
    const toggle = screen.getByRole('button', { name: /Leer más/ })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: /Leer menos/ })).toHaveAttribute('aria-expanded', 'true')
  })

  it('sin enlazar al autor (en su propio perfil) muestra el nombre como texto', () => {
    renderWithProviders(<TestimonialCard testimonial={TESTIMONIAL} linkAuthor={false} />)
    expect(screen.queryByRole('link', { name: 'Marta Ejemplo' })).not.toBeInTheDocument()
    expect(screen.getByText('Marta Ejemplo')).toBeInTheDocument()
  })
})
