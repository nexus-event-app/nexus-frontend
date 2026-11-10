import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/shared/api/ApiError'
import Icon from '@/shared/components/Icon'
import { loginPath } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { useSavedJobs } from '../hooks/useSavedJobs'

/**
 * Botón para guardar una oferta y verla luego en «Ofertas guardadas».
 * `compact`: solo icono (tarjetas); si no, botón con texto (ficha de la oferta).
 */
export default function SaveJobButton({ job, compact = false, className }) {
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { isSaved, isPending, toggle } = useSavedJobs()
  const saved = isAuthenticated && isSaved(job.id)

  const handleClick = async () => {
    if (!isAuthenticated) {
      toast.info(t('jobs.saved.loginToSave'))
      navigate(loginPath(`${location.pathname}${location.search}`))
      return
    }
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
        'relative z-10 inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-control border font-semibold transition-colors disabled:opacity-60',
        compact ? 'min-w-[2.75rem]' : 'w-full px-4',
        saved
          ? 'border-accent-line bg-accent-soft text-accent-strong hover:bg-accent-tint'
          : 'border-slate-300 bg-surface text-ink-soft hover:bg-slate-50 hover:text-ink',
        className,
      )}
    >
      <Icon name="bookmark" filled={saved} className="h-5 w-5" />
      {!compact && <span>{saved ? t('jobs.saved.savedButton') : t('jobs.saved.saveButton')}</span>}
    </button>
  )
}
