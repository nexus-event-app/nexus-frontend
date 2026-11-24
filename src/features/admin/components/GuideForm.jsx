import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import CheckboxField from '@/shared/components/CheckboxField'
import FormField from '@/shared/components/FormField'
import { useForm } from '@/shared/hooks/useForm'
import { GUIDE_CATEGORIES } from '@/features/guides/config/categories'
import { validateGuide } from '../utils/validators'

function toValues(guide) {
  return {
    title: guide?.title ?? '',
    slug: guide?.slug ?? '',
    description: guide?.description ?? '',
    content: guide?.content ?? '',
    category: guide?.category ?? 'PRIMEROS_PASOS',
    published: guide?.published ?? false,
  }
}

export default function GuideForm({ guide, onSubmit, onCancel }) {
  const editing = Boolean(guide)

  const form = useForm({
    initialValues: toValues(guide),
    validate: validateGuide,
    onSubmit: (values) =>
      onSubmit({
        title: values.title.trim(),
        slug: values.slug.trim() || null,
        description: values.description.trim(),
        content: values.content.trim(),
        category: values.category,
        published: values.published,
      }),
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="form-grid">
      <FormField {...form.getFieldProps('title')} label="Título" maxLength={200} required />
      <FormField
        {...form.getFieldProps('slug')}
        label="Dirección"
        hint="Lo que va después de /guias/. Si lo dejas vacío, se crea a partir del título. Cambiarla rompe los enlaces antiguos."
        maxLength={120}
        placeholder="que-hacer-despues-de-un-bootcamp"
      />
      <FormField {...form.getFieldProps('category')} as="select" label="Tema" required>
        {GUIDE_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.adminLabel}
          </option>
        ))}
      </FormField>
      <FormField
        {...form.getFieldProps('description')}
        as="textarea"
        rows={2}
        label="Descripción"
        hint={`La que sale en Google debajo del título. Mejor por debajo de 160 caracteres (ahora: ${form.values.description.trim().length}).`}
        maxLength={300}
        required
      />
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={18}
        label="Contenido"
        hint="Separa los párrafos con una línea en blanco. «## Título» para un apartado, «### Título» para un subapartado, «- » para listas, «1. » para listas numeradas, **negrita** y [texto](/eventos) para enlaces."
        maxLength={50000}
        required
      />
      <CheckboxField
        name="published"
        label="Publicada"
        hint="Mientras no la publiques, solo la verás aquí."
        checked={form.values.published}
        onChange={form.handleChange}
      />
      <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={form.submitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={form.submitting}>
          {editing ? 'Guardar cambios' : 'Crear guía'}
        </Button>
      </footer>
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
    </form>
  )
}
