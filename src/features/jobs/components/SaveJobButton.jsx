import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRequireLogin } from '@/features/auth/hooks/useRequireLogin'
import { getErrorMessage } from '@/shared/api/ApiError'
import Icon from '@/shared/components/Icon'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { useSavedJobs } from '../hooks/useSavedJobs'

export default function SaveJobButton({ job, compact = false, className }) {
  const { t } = useI18n()
  const toast = useToast()
  const { isAuthenticated } = useAuth()
  const requireLogin = useRequireLogin()
  const { isSaved, isPending, toggle } = useSavedJobs()
  const saved = isAuthenticated && isSaved(job.id)

  const handleClick = async () => {
    if (requireLogin(t('jobs.saved.loginToSave'))) return
    try {
      const nowSaved = await toggle(job.id)
      if (nowSaved) toast.success(t('jobs.saved.added'))
      else toast.info(t('jobs.saved.removed'))
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const label = saved
    ? t('jobs.saved.removeLabel', { title: job.title })
    : t('jobs.saved.saveLabel', { title: job.title })

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={compact ? label : undefined}
      title={compact ? label : undefined}
      disabled={isPending(job.id)}
      className={cx(
        'relative z-10 inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-control border font-semibold transition-all hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none disabled:opacity-60',
        compact ? 'min-w-[2.75rem]' : 'w-full px-4',
        saved
          ? 'border-accent-line bg-accent-soft text-accent-strong shadow-[0_3px_0_theme(colors.brand.300)] hover:bg-accent-tint dark:shadow-[0_3px_0_rgba(129,140,248,0.4)]'
          : 'border-slate-300 bg-surface text-ink-soft shadow-[0_3px_0_theme(colors.slate.300)] hover:bg-slate-50 hover:text-ink',
        className,
      )}
    >
      <Icon name="bookmark" filled={saved} className="h-5 w-5" />
      {!compact && <span>{saved ? t('jobs.saved.savedButton') : t('jobs.saved.saveButton')}</span>}
    </button>
  )
}
