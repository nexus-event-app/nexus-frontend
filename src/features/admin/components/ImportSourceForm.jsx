import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import CheckboxField from '@/shared/components/CheckboxField'
import FormField from '@/shared/components/FormField'
import { importSourceTypes, isNewsSourceType, newsCategories } from '@/shared/config/catalogs'
import { useForm } from '@/shared/hooks/useForm'
import { validateImportSource } from '../utils/validators'

const URL_HINTS = {
  RSS_NEWS: 'Dirección del feed RSS o Atom (suele terminar en /feed, /rss o .xml).',
  GETONBRD_JOBS: 'Categoría de Get on Board, p. ej. https://www.getonbrd.com/api/v0/categories/programming/jobs?per_page=100',
  REMOTIVE_JOBS: 'https://remotive.com/api/remote-jobs?category=software-dev',
  ARBEITNOW_JOBS: 'https://www.arbeitnow.com/api/job-board-api',
}

function toValues(source) {
  return {
    name: source?.name ?? '',
    type: source?.type ?? 'RSS_NEWS',
    url: source?.url ?? '',
    newsCategory: source?.newsCategory ?? 'GENERAL',
    keywords: source?.keywords ?? '',
    intervalMinutes: String(source?.intervalMinutes ?? ''),
    autoPublish: source?.autoPublish ?? true,
    remoteOnly: source?.remoteOnly ?? false,
    active: source?.active ?? true,
  }
}

export default function ImportSourceForm({ source, onSubmit, onCancel }) {
  const editing = Boolean(source)

  const form = useForm({
    initialValues: toValues(source),
    validate: validateImportSource,
    onSubmit: (values) =>
      onSubmit({
        name: values.name.trim(),
        type: values.type,
        url: values.url.trim(),
        newsCategory: isNewsSourceType(values.type) ? values.newsCategory : null,
        keywords: values.keywords.trim() || null,
        intervalMinutes: values.intervalMinutes ? Number(values.intervalMinutes) : null,
        autoPublish: values.autoPublish,
        remoteOnly: !isNewsSourceType(values.type) && values.remoteOnly,
        active: values.active,
      }),
  })

  const news = isNewsSourceType(form.values.type)

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          {...form.getFieldProps('name')}
          label="Nombre"
          hint="Se muestra como fuente en lo importado."
          maxLength={100}
          required
        />
        <FormField
          {...form.getFieldProps('type')}
          as="select"
          label="Tipo"
          disabled={editing}
          hint={editing ? 'El tipo no se puede cambiar.' : undefined}
        >
          {importSourceTypes.items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </FormField>
      </div>
      <FormField
        {...form.getFieldProps('url')}
        type="url"
        inputMode="url"
        label="URL"
        placeholder="https://…"
        hint={URL_HINTS[form.values.type]}
        maxLength={500}
        required
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {news && (
          <FormField {...form.getFieldProps('newsCategory')} as="select" label="Categoría de las noticias">
            {newsCategories.items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FormField>
        )}
        <FormField
          {...form.getFieldProps('intervalMinutes')}
          type="number"
          inputMode="numeric"
          min={30}
          max={10080}
          label="Cada cuántos minutos"
          hint={source ? `Mínimo para este tipo: ${source.minIntervalMinutes} min.` : 'Vacío: el mínimo del tipo.'}
        />
      </div>
      <FormField
        {...form.getFieldProps('keywords')}
        as="textarea"
        rows={3}
        label="Palabras clave (opcional)"
        hint="Separadas por comas. Si las indicas, solo se importa lo que contenga alguna. Útil para feeds generalistas."
        maxLength={500}
      />
      <div className="space-y-1 rounded-control bg-slate-50 p-3">
        <CheckboxField
          name="autoPublish"
          label="Publicar automáticamente"
          hint="Si lo desmarcas, lo importado queda oculto hasta que lo publiques tú."
          checked={form.values.autoPublish}
          onChange={form.handleChange}
        />
        {!news && (
          <CheckboxField
            name="remoteOnly"
            label="Solo ofertas en remoto"
            checked={form.values.remoteOnly}
            onChange={form.handleChange}
          />
        )}
        <CheckboxField
          name="active"
          label="Fuente activa"
          hint="Las fuentes pausadas no se consultan."
          checked={form.values.active}
          onChange={form.handleChange}
        />
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={form.submitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={form.submitting}>
          {editing ? 'Guardar cambios' : 'Crear fuente'}
        </Button>
      </div>
    </form>
  )
}
