import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FormField from './FormField'

describe('FormField', () => {
  it('asocia la etiqueta, la ayuda y el error al campo', () => {
    render(<FormField label="Email" name="email" hint="Nunca lo mostraremos" error="Email no válido" required />)
    const input = screen.getByRole('textbox', { name: /Email/ })

    expect(input).toBeRequired()
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Nunca lo mostraremos Email no válido')
    expect(screen.getByRole('alert')).toHaveTextContent('Email no válido')
  })

  it('sin error no marca el campo ni anuncia nada', () => {
    render(<FormField label="Nombre" name="name" />)
    expect(screen.getByLabelText('Nombre')).not.toHaveAttribute('aria-invalid')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('va dentro de un párrafo y admite otros controles', () => {
    render(
      <FormField label="Categoría" name="category" as="select">
        <option value="HELP">Ayuda</option>
      </FormField>,
    )
    const select = screen.getByRole('combobox', { name: 'Categoría' })
    expect(select).not.toHaveAttribute('type')
    expect(select.closest('p')).not.toBeNull()
  })
})
