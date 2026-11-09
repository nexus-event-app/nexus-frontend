import { useLocation } from 'react-router-dom'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { loginPath, registerPath } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

export default function SignInPrompt({ children }) {
  const { t } = useI18n()
  const { pathname, search } = useLocation()
  const redirectTo = `${pathname}${search}`

  return (
    <div className="card flex flex-col gap-4 border-accent-line bg-accent-soft p-5 sm:flex-row sm:items-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-accent">
        <Icon name="lock" className="h-6 w-6" />
      </span>
      <p className="flex-1 text-ink-soft">{children}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to={loginPath(redirectTo)} variant="secondary">
          {t('auth.login.submit')}
        </ButtonLink>
        <ButtonLink to={registerPath(redirectTo)}>{t('auth.register.submit')}</ButtonLink>
      </div>
    </div>
  )
}
