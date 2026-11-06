import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import CheckboxField from '@/shared/components/CheckboxField'
import FormField from '@/shared/components/FormField'
import { newsCategories } from '@/shared/config/catalogs'
import { useForm } from '@/shared/hooks/useForm'
import { validateNews } from '../utils/validators'
import ImageUploadField from './ImageUploadField'

function toValues(news) {
  return {
    title: news?.title ?? '',
    category: news?.category ?? 'GENERAL',
    author: news?.author ?? '',
    sourceUrl: news?.sourceUrl ?? '',
    imageUrl: news?.imageUrl ?? '',
    content: news?.content ?? '',
    isActive: news?.isActive ?? true,
  }
}

export default function NewsForm({ news, onSubmit, onCancel }) {
  const editing = Boolean(news)

  const form = useForm({
    initialValues: toValues(news),
    validate: validateNews,
    onSubmit: (values) =>
      onSubmit({
        title: values.title.trim(),
        content: values.content.trim(),
        category: values.category,
        author: values.author.trim() || null,
        sourceUrl: values.sourceUrl.trim() || null,
        imageUrl: values.imageUrl || null,
        ...(editing && { isActive: values.isActive }),
      }),
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField {...form.getFieldProps('title')} label="Título" maxLength={200} required />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField {...form.getFieldProps('category')} as="select" label="Categoría">
          {newsCategories.items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </FormField>
        <FormField {...form.getFieldProps('author')} label="Autor" maxLength={100} />
      </div>
      <FormField
        {...form.getFieldProps('sourceUrl')}
        type="url"
        inputMode="url"
        label="Fuente (URL)"
        placeholder="https://…"
      />
      <ImageUploadField
        label="Imagen destacada"
        value={form.values.imageUrl}
        onChange={(url) => form.setValue('imageUrl', url)}
        error={form.errors.imageUrl}
      />
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={10}
        label="Contenido"
        hint="Texto plano. Los saltos de línea se respetan."
        maxLength={20000}
        required
      />
      {editing && (
        <CheckboxField
          name="isActive"
          label="Publicada"
          hint="Si la desmarcas, la noticia dejará de verse en el sitio."
          checked={form.values.isActive}
          onChange={form.handleChange}
        />
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={form.submitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={form.submitting}>
          {editing ? 'Guardar cambios' : 'Crear noticia'}
        </Button>
      </div>
    </form>
  )
}
