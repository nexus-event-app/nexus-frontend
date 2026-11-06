import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useAuth } from '../hooks/useAuth'
import { normalizeEmail, validateLogin } from '../utils/validators'
import PasswordField from './PasswordField'

const INITIAL_VALUES = { email: '', password: '' }

export default function LoginForm() {
  const { login } = useAuth()
  const toast = useToast()

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateLogin,
    onSubmit: async ({ email, password }) => {
      const user = await login({ email: normalizeEmail(email), password })
      toast.success(`Hola de nuevo, ${user.name}.`)
    },
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('email')}
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        required
      />
      <PasswordField {...form.getFieldProps('password')} autoComplete="current-password" required />
      <Button type="submit" className="w-full" loading={form.submitting}>
        {form.submitting ? 'Entrando…' : 'Iniciar sesión'}
      </Button>
    </form>
  )
}
