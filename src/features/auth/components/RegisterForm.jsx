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

const INITIAL_VALUES = { name: '', email: '', password: '', acceptTerms: false }

export default function RegisterForm() {
  const { register } = useAuth()
  const toast = useToast()

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateRegister,
    onSubmit: async ({ name, email, password, acceptTerms }) => {
      const user = await register({ name: name.trim(), email: normalizeEmail(email), password, acceptTerms })
      toast.success(`Te damos la bienvenida a ${siteConfig.name}, ${user.name}. Revisa tu email para confirmar tu cuenta.`)
    },
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('name')}
        label="Nombre"
        autoComplete="name"
        maxLength={50}
        hint="Es el nombre que verán los demás en el foro."
        required
      />
      <FormField
        {...form.getFieldProps('email')}
        label="Email"
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
        hint="Entre 8 y 72 caracteres, con al menos una letra y un número."
        required
      />
      <TermsCheckbox
        checked={form.values.acceptTerms}
        onChange={form.handleChange}
        error={form.errors.acceptTerms}
      />
      <Button type="submit" className="w-full" loading={form.submitting}>
        {form.submitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </Button>
    </form>
  )
}
