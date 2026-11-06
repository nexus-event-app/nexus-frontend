import { useLocation } from 'react-router-dom'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { loginPath, registerPath } from '@/shared/config/paths'

export default function SignInPrompt({ children }) {
  const { pathname, search } = useLocation()
  const redirectTo = `${pathname}${search}`

  return (
    <div className="card flex flex-col gap-4 border-brand-200 bg-brand-50 p-5 sm:flex-row sm:items-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-700">
        <Icon name="lock" className="h-6 w-6" />
      </span>
      <p className="flex-1 text-ink-soft">{children}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to={loginPath(redirectTo)} variant="secondary">
          Iniciar sesión
        </ButtonLink>
        <ButtonLink to={registerPath(redirectTo)}>Crear cuenta</ButtonLink>
      </div>
    </div>
  )
}
