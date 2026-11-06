import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getErrorMessage } from '@/shared/api/ApiError'
import Alert from '@/shared/components/Alert'
import ButtonLink from '@/shared/components/ButtonLink'
import Seo from '@/shared/components/Seo'
import Spinner from '@/shared/components/Spinner'
import { paths } from '@/shared/config/paths'
import AuthCard from '../components/AuthCard'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''
  const { isAuthenticated, refreshUser } = useAuth()
  const [state, setState] = useState(token ? { status: 'loading' } : { status: 'error', message: 'Falta el código del enlace.' })
  // El token es de un solo uso: se envía una única vez aunque el efecto se ejecute dos veces en desarrollo.
  const requested = useRef(false)

  useEffect(() => {
    if (!token || requested.current) return
    requested.current = true
    authService
      .verifyEmail(token)
      .then(() => {
        setState({ status: 'success' })
        if (isAuthenticated) refreshUser().catch(() => {})
      })
      .catch((error) => setState({ status: 'error', message: getErrorMessage(error) }))
  }, [token, isAuthenticated, refreshUser])

  return (
    <>
      <Seo title="Confirmar email" path={paths.verifyEmail} robots="noindex,nofollow" />
      <AuthCard
        title="Confirmar email"
        subtitle="Comprobamos el enlace que te enviamos."
        footer={
          <Link to={paths.home} className="link">
            Volver al inicio
          </Link>
        }
      >
        {state.status === 'loading' && (
          <p role="status" className="flex items-center gap-3 text-ink-soft">
            <Spinner /> Confirmando tu email…
          </p>
        )}
        {state.status === 'success' && (
          <div className="space-y-5">
            <Alert variant="success" title="¡Email confirmado!">
              Ya puedes participar en el foro y compartir tu testimonio.
            </Alert>
            <ButtonLink to={isAuthenticated ? paths.forum : paths.login} className="w-full">
              {isAuthenticated ? 'Ir al foro' : 'Iniciar sesión'}
            </ButtonLink>
          </div>
        )}
        {state.status === 'error' && (
          <Alert variant="error" title="No hemos podido confirmar tu email">
            {state.message} Si ya has iniciado sesión, puedes pedir un enlace nuevo desde el aviso de la parte superior.
          </Alert>
        )}
      </AuthCard>
    </>
  )
}
