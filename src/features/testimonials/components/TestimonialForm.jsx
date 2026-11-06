import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ApiError } from '@/shared/api/ApiError'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useForm } from '@/shared/hooks/useForm'
import { testimonialService } from '../services/testimonialService'

const CONTENT_MIN = 50
const CONTENT_MAX = 300

const DAILY_LIMIT_MESSAGE =
  'Ya has enviado un testimonio en las últimas 24 horas. Podrás enviar otro más tarde.'

function validate({ name, role, location, content }) {
  const errors = {}
  const trimmedName = name.trim()
  if (trimmedName.length < 2 || trimmedName.length > 100) errors.name = 'El nombre debe tener entre 2 y 100 caracteres.'
  if (role.trim().length > 100) errors.role = 'El puesto no puede superar los 100 caracteres.'
  if (location.trim().length > 100) errors.location = 'La ubicación no puede superar los 100 caracteres.'
  const length = content.trim().length
  if (length < CONTENT_MIN || length > CONTENT_MAX) {
    errors.content = `Tu testimonio debe tener entre ${CONTENT_MIN} y ${CONTENT_MAX} caracteres.`
  }
  return errors
}

export default function TestimonialForm() {
  const { user } = useAuth()
  const [sent, setSent] = useState(false)
  const initialValues = { name: user.name, role: '', location: '', content: '' }

  const form = useForm({
    initialValues,
    validate,
    onSubmit: async ({ name, role, location, content }) => {
      setSent(false)
      try {
        await testimonialService.create({
          name: name.trim(),
          role: role.trim() || null,
          location: location.trim() || null,
          content: content.trim(),
        })
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) {
          throw new ApiError({ status: 409, code: 'CONFLICT', message: DAILY_LIMIT_MESSAGE })
        }
        throw error
      }
      setSent(true)
      form.reset(initialValues)
    },
  })

  const length = form.values.content.trim().length

  return (
    <form onSubmit={form.handleSubmit} noValidate className="card space-y-5 p-6">
      <p className="text-ink-muted">
        Tu testimonio se publicará tras la revisión del equipo, junto con el nombre, el cargo y la ubicación que
        indiques. Puedes pedir que lo retiremos cuando quieras.
      </p>
      {sent && (
        <Alert variant="success" title="¡Gracias por compartir tu experiencia!">
          Hemos recibido tu testimonio. Lo publicaremos en cuanto el equipo lo revise.
        </Alert>
      )}
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField {...form.getFieldProps('name')} label="Nombre" autoComplete="name" maxLength={100} required />
        <FormField
          {...form.getFieldProps('role')}
          label="Puesto o situación"
          placeholder="Ej.: Desarrolladora junior"
          maxLength={100}
        />
      </div>
      <FormField
        {...form.getFieldProps('location')}
        label="Ubicación"
        placeholder="Ej.: Barcelona"
        autoComplete="address-level2"
        maxLength={100}
      />
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={5}
        label="Tu experiencia"
        hint={`${length}/${CONTENT_MAX} caracteres (mínimo ${CONTENT_MIN}).`}
        maxLength={CONTENT_MAX}
        required
      />
      <Button type="submit" loading={form.submitting}>
        {form.submitting ? 'Enviando…' : 'Enviar testimonio'}
      </Button>
    </form>
  )
}
