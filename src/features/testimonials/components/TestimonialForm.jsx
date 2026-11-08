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

export default function TestimonialForm() {
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
    <form onSubmit={form.handleSubmit} noValidate className="card space-y-5 p-6">
      <p className="text-ink-muted">
        {t('testimonials.form.intro')}
      </p>
      {sent && (
        <Alert variant="success" title={t('testimonials.form.thanksTitle')}>
          {t('testimonials.form.thanks')}
        </Alert>
      )}
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField {...form.getFieldProps('name')} label={t('testimonials.form.name')} autoComplete="name" maxLength={100} required />
        <FormField
          {...form.getFieldProps('role')}
          label={t('testimonials.form.role')}
          placeholder={t('testimonials.form.rolePlaceholder')}
          maxLength={100}
        />
      </div>
      <FormField
        {...form.getFieldProps('location')}
        label={t('testimonials.form.location')}
        placeholder={t('testimonials.form.locationPlaceholder')}
        autoComplete="address-level2"
        maxLength={100}
      />
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={5}
        label={t('testimonials.form.content')}
        hint={t('testimonials.form.hint', { length, max: CONTENT_MAX, min: CONTENT_MIN })}
        maxLength={CONTENT_MAX}
        required
      />
      <Button type="submit" loading={form.submitting}>
        {form.submitting ? t('testimonials.form.submitting') : t('testimonials.form.submit')}
      </Button>
    </form>
  )
}
