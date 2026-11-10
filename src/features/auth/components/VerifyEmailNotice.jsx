import { cx } from '@/shared/utils/classNames'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import { useAction } from '@/shared/hooks/useAction'
import { authService } from '../services/authService'
import { useI18n } from '@/shared/i18n/useI18n'

/** Sustituye a un formulario de participación mientras el email no esté verificado. */
export default function VerifyEmailNotice({ children, className }) {
  const { t } = useI18n()
  const [resend, pending] = useAction(() => authService.resendVerification(), {
    successMessage: t('auth.resend.sent'),
  })

  return (
    <p
      className={cx(
        'card flex flex-col gap-4 border-amber-200 bg-amber-50 p-5 dark:border-amber-400/30 dark:bg-amber-500/10 sm:flex-row sm:items-center',
        className,
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-amber-700 dark:text-amber-300">
        <Icon name="warning" className="h-6 w-6" />
      </span>
      <span className="flex-1 text-ink-soft">{children}</span>
      <Button variant="secondary" loading={pending} onClick={() => resend()}>
        {t('auth.resend.button')}
      </Button>
    </p>
  )
}
