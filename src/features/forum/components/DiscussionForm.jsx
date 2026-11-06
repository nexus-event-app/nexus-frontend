import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { discussionCategories } from '@/shared/config/catalogs'
import { useForm } from '@/shared/hooks/useForm'
import { validateDiscussion } from '../utils/validators'

export default function DiscussionForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const form = useForm({
    initialValues,
    validate: validateDiscussion,
    onSubmit: ({ title, content, category }) => onSubmit({ title: title.trim(), content: content.trim(), category }),
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('title')}
        label="Título"
        placeholder="Resume tu duda o tema en una frase"
        maxLength={200}
        required
      />
      <FormField {...form.getFieldProps('category')} as="select" label="Categoría" required>
        {discussionCategories.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </FormField>
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={9}
        label="Contenido"
        hint="Texto plano. Para compartir código, enciérralo entre líneas con ```."
        maxLength={10000}
        required
      />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={form.submitting}>
            Cancelar
          </Button>
        )}
        <Button type="submit" loading={form.submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
