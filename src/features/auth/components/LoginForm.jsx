import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useAuth } from '../hooks/useAuth'
import { normalizeEmail, validateLogin } from '../utils/validators'
import PasswordField from './PasswordField'
import { useI18n } from '@/shared/i18n/useI18n'

const INITIAL_VALUES = { email: '', password: '' }

export default function LoginForm() {
  const { t } = useI18n()
  const { login } = useAuth()
  const toast = useToast()

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateLogin,
    onSubmit: async ({ email, password }) => {
      const user = await login({ email: normalizeEmail(email), password })
      toast.success(t('auth.login.welcomeBack', { name: user.name }))
    },
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="flex flex-col gap-5">
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
      <PasswordField {...form.getFieldProps('password')} autoComplete="current-password" required />
      <p className="-mt-3 text-right text-sm">
        <Link to={paths.forgotPassword} className="link">
          {t('auth.login.forgot')}
        </Link>
      </p>
      <Button type="submit" size="lg" className="w-full shadow-pop" loading={form.submitting}>
        {form.submitting ? t('auth.login.submitting') : t('auth.login.submit')}
      </Button>
    </form>
  )
}
