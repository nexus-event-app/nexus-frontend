import { useCallback, useEffect, useRef, useState } from 'react'
import { getErrorMessage } from '@/shared/api/ApiError'
import ActionMenu from '@/shared/components/ActionMenu'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import Spinner from '@/shared/components/Spinner'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import AuthCard from '../components/AuthCard'
import TermsCheckbox from '../components/TermsCheckbox'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import { takeGoogleRedirect } from '../utils/googleRedirect'

const ERROR_MESSAGES = {
  cancelled: 'auth.google.errorCancelled',
  unverified: 'auth.google.errorUnverified',
  disabled: 'auth.google.errorDisabled',
  expired: 'auth.google.errorExpired',
}

/** Lee lo que el backend deja en el fragmento al volver de Google: «#code=…», «#signup=…» o «#error=…». */
function readReturn() {
  const params = new URLSearchParams(window.location.hash.slice(1))
  if (params.get('code')) return { kind: 'code', value: params.get('code') }
  if (params.get('signup')) return { kind: 'signup', value: params.get('signup') }
  return { kind: 'error', value: params.get('error') ?? 'failed' }
}

function Working() {
  const { t } = useI18n()
  return (
    <PageMain className="page-container page-section flex min-h-[50dvh] items-center justify-center">
      <Spinner size="lg" label={t('auth.google.working')} />
    </PageMain>
  )
}

function GoogleError({ reason }) {
  const { t } = useI18n()
  return (
    <AuthCard
      eyebrow={t('auth.google.seoTitle')}
      title={t('auth.google.errorTitle')}
      subtitle={t(ERROR_MESSAGES[reason] ?? 'auth.google.errorFailed')}
    >
      <ActionMenu className="flex-col gap-3 sm:flex-row sm:[&>li]:flex-1">
        <ButtonLink to={paths.login} size="lg" className="w-full">
          {t('auth.google.backToLogin')}
        </ButtonLink>
        <ButtonLink to={paths.register} variant="secondary" size="lg" className="w-full">
          {t('auth.login.createAccount')}
        </ButtonLink>
      </ActionMenu>
    </AuthCard>
  )
}

/** «Ya casi está»: los datos que da Google y la casilla de las condiciones antes de crear la cuenta. */
function FinishSignup({ token, onExpired }) {
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const { completeGoogleSignup } = useAuth()
  const pending = useRequest(`google-signup:${token}`, ({ signal }) => authService.googlePending(token, { signal }))
  const [accepted, setAccepted] = useState(false)
  const [termsError, setTermsError] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (pending.error) onExpired()
  }, [pending.error, onExpired])

  if (!pending.data) return <Working />

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!accepted) {
      setTermsError(t('auth.validation.termsRequired'))
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      await completeGoogleSignup(token)
      toast.success(t('auth.google.welcome'))
      navigate(takeGoogleRedirect(paths.home), { replace: true })
    } catch (error) {
      if (error.status === 401) onExpired()
      else setSubmitError(getErrorMessage(error))
      setSubmitting(false)
    }
  }

  return (
    <AuthCard eyebrow={t('auth.google.eyebrow')} title={t('auth.google.title')} subtitle={t('auth.google.subtitle')}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {submitError && <Alert variant="error">{submitError}</Alert>}
        <dl aria-label={t('auth.google.account')} className="grid gap-3 rounded-2xl bg-canvas p-4 text-sm">
          <dt className="sr-only">{t('auth.google.name')}</dt>
          <dd className="break-words text-base font-bold text-ink">{pending.data.name}</dd>
          <dt className="sr-only">{t('auth.google.email')}</dt>
          <dd className="-mt-2 break-words text-ink-muted">{pending.data.email}</dd>
        </dl>
        <p className="text-sm text-ink-muted">{t('auth.google.note')}</p>
        <TermsCheckbox
          checked={accepted}
          onChange={(event) => {
            setAccepted(event.target.checked)
            if (event.target.checked) setTermsError(null)
          }}
          error={termsError}
        />
        <ActionMenu className="flex-col gap-3">
          <Button type="submit" size="lg" className="w-full shadow-pop" loading={submitting}>
            {t('auth.google.submit')}
          </Button>
          <ButtonLink to={paths.home} variant="ghost" className="w-full">
            {t('auth.google.cancel')}
          </ButtonLink>
        </ActionMenu>
      </form>
    </AuthCard>
  )
}

/** Página a la que vuelve la persona desde Google: entra, termina el alta o ve qué ha pasado. */
export default function GoogleReturnPage() {
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()
  const [result, setResult] = useState(readReturn)
  // El código es de un solo uso: que el modo estricto de React (doble efecto) no lo gaste dos veces.
  const exchanged = useRef(false)

  // Se borra el fragmento de la barra de direcciones para que el código no quede en el historial ni se comparta.
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
    }
  }, [])

  useEffect(() => {
    if (result.kind !== 'code' || exchanged.current) return
    exchanged.current = true
    loginWithGoogle(result.value).then(
      () => {
        toast.success(t('auth.google.signedIn'))
        navigate(takeGoogleRedirect(paths.home), { replace: true })
      },
      () => setResult({ kind: 'error', value: 'expired' }),
    )
  }, [result, loginWithGoogle, navigate, toast, t])

  const handleExpired = useCallback(() => setResult({ kind: 'error', value: 'expired' }), [])

  return (
    <>
      <Seo title={t('auth.google.seoTitle')} path={paths.googleReturn} robots="noindex,nofollow" />
      {result.kind === 'code' && <Working />}
      {result.kind === 'signup' && <FinishSignup token={result.value} onExpired={handleExpired} />}
      {result.kind === 'error' && <GoogleError reason={result.value} />}
    </>
  )
}
