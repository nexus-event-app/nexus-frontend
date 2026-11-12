import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ApiError } from '@/shared/api/ApiError'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useForm } from '@/shared/hooks/useForm'
import { testimonialService } from '../services/testimonialService'
import { useI18n } from '@/shared/i18n/useI18n'
import { translate } from '@/shared/i18n/translate'
import { cx } from '@/shared/utils/classNames'

const CONTENT_MIN = 50
const CONTENT_MAX = 300

function validate({ name, role, location, content }) {
  const errors = {}
  const trimmedName = name.trim()
  if (trimmedName.length < 2 || trimmedName.length > 100) errors.name = translate('testimonials.form.nameLength')
  if (role.trim().length > 100) errors.role = translate('testimonials.form.roleLength')
  if (location.trim().length > 100) errors.location = translate('testimonials.form.locationLength')
  const length = content.trim().length
  if (length < CONTENT_MIN || length > CONTENT_MAX) {
    errors.content = translate('testimonials.form.contentLength', { min: CONTENT_MIN, max: CONTENT_MAX })
  }
  return errors
}

export default function TestimonialForm({ className }) {
  const { t } = useI18n()
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
          throw new ApiError({ status: 409, code: 'CONFLICT', message: translate('testimonials.form.dailyLimit') })
        }
        throw error
      }
      setSent(true)
      form.reset(initialValues)
    },
  })

  const length = form.values.content.trim().length

  return (
    // Rejilla (form-grid): nombre, puesto y ubicación comparten fila (así el formulario cabe en pantalla); el resto
    // ocupa todo el ancho. Sin caja propia: la pone la
    // página (el panel de «Escribe en el muro»).
    <form onSubmit={form.handleSubmit} noValidate className={cx('form-grid', className)}>
      {sent && (
        <Alert variant="success" title={t('testimonials.form.thanksTitle')}>
          {t('testimonials.form.thanks')}
        </Alert>
      )}
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        className="field-third"
        {...form.getFieldProps('name')}
        label={t('testimonials.form.name')}
        autoComplete="name"
        maxLength={100}
        required
      />
      <FormField
        className="field-third"
        {...form.getFieldProps('role')}
        label={t('testimonials.form.role')}
        placeholder={t('testimonials.form.rolePlaceholder')}
        maxLength={100}
      />
      <FormField
        className="field-third"
        {...form.getFieldProps('location')}
        label={t('testimonials.form.location')}
        placeholder={t('testimonials.form.locationPlaceholder')}
        autoComplete="address-level2"
        maxLength={100}
      />
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={4}
        placeholder={t('testimonials.form.contentPlaceholder')}
        label={t('testimonials.form.content')}
        hint={t('testimonials.form.hint', { length, max: CONTENT_MAX, min: CONTENT_MIN })}
        maxLength={CONTENT_MAX}
        required
      />
      {/* Qué se publica y cómo retirarlo, junto al botón: es lo que conviene saber justo antes de enviar. */}
      <p className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <small className="max-w-md text-sm leading-relaxed text-ink-muted">{t('testimonials.form.intro')}</small>
        <Button type="submit" size="lg" loading={form.submitting} className="shrink-0 shadow-pop">
          {form.submitting ? t('testimonials.form.submitting') : t('testimonials.form.submit')}
        </Button>
      </p>
    </form>
  )
}
