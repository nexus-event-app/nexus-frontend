import { useState } from 'react'
import { Link } from '@/shared/i18n/router'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import AuthCard from '../components/AuthCard'
import { authService } from '../services/authService'
import { normalizeEmail, validateForgotPassword } from '../utils/validators'
import { useI18n } from '@/shared/i18n/useI18n'

export default function ForgotPasswordPage() {
  const { t } = useI18n()
  const [sentTo, setSentTo] = useState(null)

  const form = useForm({
    initialValues: { email: '' },
    validate: validateForgotPassword,
    onSubmit: async ({ email }) => {
      const normalized = normalizeEmail(email)
      await authService.forgotPassword(normalized)
      setSentTo(normalized)
    },
  })

  return (
    <>
      <Seo
        title={t('auth.forgot.seoTitle')}
        description={t('auth.forgot.seoDescription')}
        path={paths.forgotPassword}
        robots="noindex,nofollow"
      />
      <AuthCard
        title={t('auth.forgot.title')}
        subtitle={t('auth.forgot.subtitle')}
        footer={
          <>
            {t('auth.forgot.remember')}{' '}
            <Link to={paths.login} className="link">
              {t('auth.forgot.login')}
            </Link>
          </>
        }
      >
        {sentTo ? (
          <Alert variant="success" title={t('auth.forgot.sentTitle')}>
            {t('auth.forgot.sentStart')}
            <strong>{sentTo}</strong>
            {t('auth.forgot.sentEnd')}
          </Alert>
        ) : (
          <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
            {form.formError && <Alert variant="error">{form.formError}</Alert>}
            <FormField
              {...form.getFieldProps('email')}
              label={t('auth.login.email')}
              type="email"
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              required
            />
            <Button type="submit" className="w-full" loading={form.submitting}>
              {form.submitting ? t('auth.forgot.submitting') : t('auth.forgot.submit')}
            </Button>
          </form>
        )}
      </AuthCard>
    </>
  )
}
