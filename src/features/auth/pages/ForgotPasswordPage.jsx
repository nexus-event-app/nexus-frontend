import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import AuthCard from '../components/AuthCard'
import { authService } from '../services/authService'
import { normalizeEmail, validateForgotPassword } from '../utils/validators'

export default function ForgotPasswordPage() {
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
        title="Recuperar contraseña"
        description="Recibe un enlace para elegir una contraseña nueva."
        path={paths.forgotPassword}
        robots="noindex,nofollow"
      />
      <AuthCard
        title="Recuperar contraseña"
        subtitle="Escribe el email de tu cuenta y te enviaremos un enlace para elegir una contraseña nueva."
        footer={
          <>
            ¿La recuerdas?{' '}
            <Link to={paths.login} className="link">
              Inicia sesión
            </Link>
          </>
        }
      >
        {sentTo ? (
          <Alert variant="success" title="Revisa tu email">
            Si hay una cuenta con <strong>{sentTo}</strong>, te hemos enviado un enlace. Caduca en 1 hora. Si no lo ves,
            mira en la carpeta de spam.
          </Alert>
        ) : (
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
            <Button type="submit" className="w-full" loading={form.submitting}>
              {form.submitting ? 'Enviando…' : 'Enviar enlace'}
            </Button>
          </form>
        )}
      </AuthCard>
    </>
  )
}
