import { useEffect, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useForm } from '@/shared/hooks/useForm'
import { translate } from '@/shared/i18n/translate'
import { useI18n } from '@/shared/i18n/useI18n'
import { CONTACT_REASONS } from '../config/reasons'
import { contactService } from '../services/contactService'

const MESSAGE_MAX = 3000

function validate({ name, email, reason, message }) {
  const errors = {}
  const trimmedName = name.trim()
  if (trimmedName.length < 2 || trimmedName.length > 80) errors.name = translate('contact.form.nameLength')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = translate('contact.form.emailInvalid')
  if (!reason) errors.reason = translate('contact.form.reasonRequired')
  const length = message.trim().length
  if (length < 10 || length > MESSAGE_MAX) errors.message = translate('contact.form.messageLength')
  return errors
}

export default function ContactForm({ reason, onReasonChange }) {
  const { t } = useI18n()
  const { user } = useAuth()
  const [sent, setSent] = useState(false)
  const initialValues = { name: user?.name ?? '', email: user?.email ?? '', reason: '', message: '', website: '' }
  const form = useForm({
    initialValues,
    validate,
    onSubmit: async (values) => {
      setSent(false)
      await contactService.send({
        name: values.name.trim(),
        email: values.email.trim(),
        reason: values.reason,
        message: values.message.trim(),
        website: values.website,
      })
      setSent(true)
      form.reset({ ...initialValues, reason: values.reason })
    },
  })
  const { setValue } = form

  useEffect(() => {
    if (reason) setValue('reason', reason)
  }, [reason, setValue])

  const reasonProps = form.getFieldProps('reason')

  return (
    <form onSubmit={form.handleSubmit} noValidate className="form-grid">
      <FormField
        className="field-half"
        {...form.getFieldProps('name')}
        label={t('contact.form.name')}
        autoComplete="name"
        maxLength={80}
        required
      />
      <FormField
        className="field-half"
        {...form.getFieldProps('email')}
        type="email"
        label={t('contact.form.email')}
        hint={t('contact.form.emailHint')}
        autoComplete="email"
        maxLength={100}
        required
      />
      <FormField
        {...reasonProps}
        onChange={(event) => {
          reasonProps.onChange(event)
          onReasonChange?.(event.target.value)
        }}
        as="select"
        label={t('contact.form.reason')}
        required
      >
        <option value="">{t('contact.form.reasonPlaceholder')}</option>
        {CONTACT_REASONS.map((item) => (
          <option key={item.value} value={item.value}>
            {t(`contact.reasons.${item.key}.title`)}
          </option>
        ))}
      </FormField>
      <FormField
        {...form.getFieldProps('message')}
        as="textarea"
        rows={6}
        label={t('contact.form.message')}
        placeholder={t('contact.form.messagePlaceholder')}
        hint={t('contact.form.messageHint', { length: form.values.message.trim().length })}
        maxLength={MESSAGE_MAX}
        required
      />
      <p className="sr-only" aria-hidden="true">
        <label>
          {t('contact.form.website')}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.values.website}
            onChange={form.handleChange}
          />
        </label>
      </p>
      <p className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          loading={form.submitting}
          className="rounded-full shadow-[0_4px_0_#312e81,0_12px_20px_-8px_rgba(49,46,129,0.6)] transition-all hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none"
        >
          {form.submitting ? t('contact.form.submitting') : t('contact.form.submit')}
        </Button>
      </p>
      {sent && (
        <Alert variant="success" title={t('contact.form.sentTitle')}>
          {t('contact.form.sent')}
        </Alert>
      )}
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
    </form>
  )
}
