import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from '@/shared/i18n/router'
import { getErrorMessage } from '@/shared/api/ApiError'
import Alert from '@/shared/components/Alert'
import ButtonLink from '@/shared/components/ButtonLink'
import Seo from '@/shared/components/Seo'
import Spinner from '@/shared/components/Spinner'
import { paths } from '@/shared/config/paths'
import AuthCard from '../components/AuthCard'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import { useI18n } from '@/shared/i18n/useI18n'

export default function VerifyEmailPage() {
  const { t } = useI18n()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''
  const { isAuthenticated, refreshUser } = useAuth()
  const [state, setState] = useState(token ? { status: 'loading' } : { status: 'error', message: null })
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
      <Seo title={t('auth.verify.seoTitle')} path={paths.verifyEmail} robots="noindex,nofollow" />
      <AuthCard
        title={t('auth.verify.title')}
        subtitle={t('auth.verify.subtitle')}
        footer={
          <Link to={paths.home} className="link">
            {t('auth.verify.backHome')}
          </Link>
        }
      >
        {state.status === 'loading' && (
          <p role="status" className="flex items-center gap-3 text-ink-soft">
            <Spinner /> {t('auth.verify.loading')}
          </p>
        )}
        {state.status === 'success' && (
          <div className="space-y-5">
            <Alert variant="success" title={t('auth.verify.successTitle')}>
              {t('auth.verify.success')}
            </Alert>
            <ButtonLink to={isAuthenticated ? paths.forum : paths.login} className="w-full">
              {isAuthenticated ? t('auth.verify.goForum') : t('auth.login.submit')}
            </ButtonLink>
          </div>
        )}
        {state.status === 'error' && (
          <Alert variant="error" title={t('auth.verify.errorTitle')}>
            {state.message ?? t('auth.verify.missingToken')} {t('auth.verify.errorHint')}
          </Alert>
        )}
      </AuthCard>
    </>
  )
}
