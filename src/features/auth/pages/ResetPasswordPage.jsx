import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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

export default function ResetPasswordPage() {
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
      toast.success('Contraseña cambiada. Ya puedes iniciar sesión con la nueva.')
      navigate(paths.login, { replace: true })
    },
  })

  return (
    <>
      <Seo title="Elegir contraseña nueva" path={paths.resetPassword} robots="noindex,nofollow" />
      <AuthCard
        title="Elige una contraseña nueva"
        subtitle="Al cambiarla se cerrará la sesión en todos tus dispositivos."
        footer={
          <Link to={paths.forgotPassword} className="link">
            Pedir un enlace nuevo
          </Link>
        }
      >
        {!token ? (
          <Alert variant="error" title="Enlace no válido">
            Falta el código del enlace. Ábrelo de nuevo desde el email o pide uno nuevo.
          </Alert>
        ) : (
          <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
            {form.formError && <Alert variant="error">{form.formError}</Alert>}
            <PasswordField
              {...form.getFieldProps('password')}
              label="Contraseña nueva"
              autoComplete="new-password"
              maxLength={72}
              hint="Entre 8 y 72 caracteres, con al menos una letra y un número."
              required
            />
            <PasswordField
              {...form.getFieldProps('confirmPassword')}
              label="Repite la contraseña"
              autoComplete="new-password"
              maxLength={72}
              required
            />
            <Button type="submit" className="w-full" loading={form.submitting}>
              {form.submitting ? 'Guardando…' : 'Cambiar contraseña'}
            </Button>
          </form>
        )}
      </AuthCard>
    </>
  )
}
