import { useSearchParams } from 'react-router-dom'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { Link } from '@/shared/i18n/router'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import AuthCard from '../components/AuthCard'
import PasswordField from '../components/PasswordField'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import { validateResetPassword } from '../utils/validators'
import { useI18n } from '@/shared/i18n/useI18n'

export default function ResetPasswordPage() {
  const { t } = useI18n()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''
  const navigate = useNavigate()
  const toast = useToast()
  const { logout } = useAuth()

  const form = useForm({
    initialValues: { password: '', confirmPassword: '' },
    validate: validateResetPassword,
    onSubmit: async ({ password }) => {
      await authService.resetPassword(token, password)
      // Las sesiones abiertas dejan de valer al cambiar la contraseña.
      logout()
      toast.success(t('auth.reset.done'))
      navigate(paths.login, { replace: true })
    },
  })

  return (
    <>
      <Seo title={t('auth.reset.seoTitle')} path={paths.resetPassword} robots="noindex,nofollow" />
      <AuthCard
        title={t('auth.reset.title')}
        subtitle={t('auth.reset.subtitle')}
        footer={
          <Link to={paths.forgotPassword} className="link">
            {t('auth.reset.newLink')}
          </Link>
        }
      >
        {!token ? (
          <Alert variant="error" title={t('auth.reset.invalidTitle')}>
            {t('auth.reset.missingToken')}
          </Alert>
        ) : (
          <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
            {form.formError && <Alert variant="error">{form.formError}</Alert>}
            <PasswordField
              {...form.getFieldProps('password')}
              label={t('auth.reset.newPassword')}
              autoComplete="new-password"
              maxLength={72}
              hint={t('auth.register.passwordHint')}
              required
            />
            <PasswordField
              {...form.getFieldProps('confirmPassword')}
              label={t('auth.reset.repeat')}
              autoComplete="new-password"
              maxLength={72}
              required
            />
            <Button type="submit" className="w-full" loading={form.submitting}>
              {form.submitting ? t('auth.reset.submitting') : t('auth.reset.submit')}
            </Button>
          </form>
        )}
      </AuthCard>
    </>
  )
}
