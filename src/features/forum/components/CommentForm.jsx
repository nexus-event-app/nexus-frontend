import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useForm } from '@/shared/hooks/useForm'
import { validateComment } from '../utils/validators'

const INITIAL_VALUES = { content: '' }

export default function CommentForm({ onSubmit }) {
  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateComment,
    onSubmit: async ({ content }) => {
      await onSubmit(content.trim())
      form.reset()
    },
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={4}
        label="Añade un comentario"
        hint="Texto plano. Para código, usa líneas con ```."
        maxLength={5000}
        required
      />
      <Button type="submit" loading={form.submitting}>
        {form.submitting ? 'Publicando…' : 'Publicar comentario'}
      </Button>
    </form>
  )
}
