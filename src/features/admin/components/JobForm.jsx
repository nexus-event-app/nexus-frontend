import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import CheckboxField from '@/shared/components/CheckboxField'
import FormField from '@/shared/components/FormField'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { useForm } from '@/shared/hooks/useForm'
import { fromLocalDateTimeInput, toLocalDateTimeInput } from '@/shared/utils/date'
import { parseTags, validateJob } from '../utils/validators'

function toValues(job) {
  return {
    title: job?.title ?? '',
    company: job?.company ?? '',
    location: job?.location ?? '',
    workMode: job?.workMode ?? 'REMOTE',
    contractType: job?.contractType ?? 'FULL_TIME',
    level: job?.level ?? 'JUNIOR',
    tags: job?.tags?.join(', ') ?? '',
    applyUrl: job?.applyUrl ?? '',
    source: job?.source ?? '',
    expiresAt: toLocalDateTimeInput(job?.expiresAt),
    description: job?.description ?? '',
    isActive: job?.isActive ?? true,
  }
}

function SelectField({ form, name, label, catalog, className }) {
  return (
    <FormField {...form.getFieldProps(name)} as="select" label={label} className={className}>
      {catalog.items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </FormField>
  )
}

export default function JobForm({ job, onSubmit, onCancel }) {
  const editing = Boolean(job)

  const form = useForm({
    initialValues: toValues(job),
    validate: validateJob,
    onSubmit: (values) =>
      onSubmit({
        title: values.title.trim(),
        company: values.company.trim(),
        description: values.description.trim(),
        location: values.location.trim(),
        workMode: values.workMode,
        contractType: values.contractType,
        level: values.level,
        tags: parseTags(values.tags),
        applyUrl: values.applyUrl.trim(),
        source: values.source.trim() || null,
        expiresAt: fromLocalDateTimeInput(values.expiresAt),
        ...(editing && { isActive: values.isActive }),
      }),
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="form-grid">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField {...form.getFieldProps('title')} label="Puesto" maxLength={200} required />

      <FormField className="field-half" {...form.getFieldProps('company')} label="Empresa" maxLength={120} required />
      <FormField
        className="field-half"
        {...form.getFieldProps('location')}
        label="Ubicación"
        maxLength={120}
        required
      />

      <SelectField className="field-third" form={form} name="level" label="Nivel" catalog={jobLevels} />
      <SelectField className="field-third" form={form} name="workMode" label="Modalidad" catalog={workModes} />
      <SelectField
        className="field-third"
        form={form}
        name="contractType"
        label="Tipo de contrato"
        catalog={contractTypes}
      />

      <FormField
        {...form.getFieldProps('tags')}
        label="Etiquetas"
        hint="Separadas por comas, máximo 10. Ej.: React, Java, Spring Boot"
      />
      <FormField
        {...form.getFieldProps('applyUrl')}
        type="url"
        inputMode="url"
        label="Enlace para inscribirse"
        placeholder="https://…"
        required
      />

      <FormField className="field-half" {...form.getFieldProps('source')} label="Fuente" maxLength={100} />
      <FormField className="field-half" {...form.getFieldProps('expiresAt')} type="datetime-local" label="Caduca el" />

      <FormField
        {...form.getFieldProps('description')}
        as="textarea"
        rows={9}
        label="Descripción"
        hint="Texto plano. Los saltos de línea se respetan."
        maxLength={20000}
        required
      />
      {editing && (
        <CheckboxField
          name="isActive"
          label="Oferta activa"
          hint="Si la desmarcas, la oferta dejará de verse en el sitio."
          checked={form.values.isActive}
          onChange={form.handleChange}
        />
      )}
      <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={form.submitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={form.submitting}>
          {editing ? 'Guardar cambios' : 'Crear oferta'}
        </Button>
      </footer>
    </form>
  )
}
