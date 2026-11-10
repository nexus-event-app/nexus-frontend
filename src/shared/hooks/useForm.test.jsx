import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/shared/api/ApiError'
import FormField from '@/shared/components/FormField'
import { renderWithProviders } from '@/test/render'
import { useForm } from './useForm'

function NameForm({ onSubmit }) {
  const form = useForm({
    initialValues: { name: '' },
    validate: ({ name }) => (name.trim() ? {} : { name: 'Escribe tu nombre' }),
    onSubmit,
  })
  return (
    <form onSubmit={form.handleSubmit} noValidate>
      {form.formError && <p role="status">{form.formError}</p>}
      <FormField label="Nombre" {...form.getFieldProps('name')} />
      <button type="submit" disabled={form.submitting}>
        Enviar
      </button>
    </form>
  )
}

describe('useForm', () => {
  it('valida antes de enviar y no llama al servidor si hay errores', async () => {
    const onSubmit = vi.fn()
    renderWithProviders(<NameForm onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Escribe tu nombre')
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('aria-invalid', 'true')
  })

  it('borra el error del campo al escribir y envía los valores', async () => {
    const onSubmit = vi.fn().mockResolvedValue()
    renderWithProviders(<NameForm onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Ana' })
  })

  it('muestra los errores por campo que devuelve el servidor, traducidos', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new ApiError({ status: 400, fieldErrors: { name: 'Ya existe' } }))
    renderWithProviders(<NameForm onSubmit={onSubmit} />, { route: '/en' })
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe')
    expect(screen.getByRole('status')).toHaveTextContent('Please check the highlighted fields.')
  })

  it('muestra el mensaje general cuando el error no es de un campo', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new ApiError({ status: 409, message: 'Conflicto' }))
    renderWithProviders(<NameForm onSubmit={onSubmit} />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(await screen.findByRole('status')).toHaveTextContent('Conflicto')
  })
})
