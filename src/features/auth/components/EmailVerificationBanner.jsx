import { useAction } from '@/shared/hooks/useAction'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import { useI18n } from '@/shared/i18n/useI18n'

/** Aviso bajo la cabecera mientras el email de la cuenta no esté confirmado. */
export default function EmailVerificationBanner() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [resend, pending] = useAction(() => authService.resendVerification(), {
    successMessage: t('auth.resend.sent'),
  })

  if (!user || user.emailVerified !== false) return null

  return (
    <p
      role="status"
      className="page-gutter flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-amber-200 bg-amber-50 py-2.5 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200"
    >
      <span>
        {t('auth.banner.start')}
        <strong className="font-semibold">{user.email}</strong>
        {t('auth.banner.end')}
      </span>
      <button
        type="button"
        onClick={() => resend()}
        disabled={pending}
        className="font-semibold underline underline-offset-2 hover:no-underline disabled:opacity-60"
      >
        {pending ? t('auth.resend.sending') : t('auth.resend.button')}
      </button>
    </p>
  )
}
