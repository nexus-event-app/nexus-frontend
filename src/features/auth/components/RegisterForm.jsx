import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useAuth } from '../hooks/useAuth'
import { normalizeEmail, validateRegister } from '../utils/validators'
import PasswordField from './PasswordField'
import TermsCheckbox from './TermsCheckbox'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'

const INITIAL_VALUES = { name: '', email: '', password: '', acceptTerms: false }

export default function RegisterForm() {
  const { t } = useI18n()
  const { register } = useAuth()
  const toast = useToast()

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateRegister,
    onSubmit: async ({ name, email, password, acceptTerms }) => {
      const user = await register({ name: name.trim(), email: normalizeEmail(email), password, acceptTerms })
      toast.success(t('auth.register.welcome', { site: siteConfig.name, name: user.name }))
    },
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('name')}
        label={t('auth.register.name')}
        autoComplete="name"
        maxLength={50}
        hint={t('auth.register.nameHint')}
        required
      />
      <FormField
        {...form.getFieldProps('email')}
        label={t('auth.login.email')}
        type="email"
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        required
      />
      <PasswordField
        {...form.getFieldProps('password')}
        autoComplete="new-password"
        maxLength={72}
        hint={t('auth.register.passwordHint')}
        required
      />
      <TermsCheckbox checked={form.values.acceptTerms} onChange={form.handleChange} error={form.errors.acceptTerms} />
      <Button type="submit" size="lg" className="w-full shadow-pop" loading={form.submitting}>
        {form.submitting ? t('auth.register.submitting') : t('auth.register.submit')}
      </Button>
    </form>
  )
}
