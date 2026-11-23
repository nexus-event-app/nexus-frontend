import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRequireLogin } from '@/features/auth/hooks/useRequireLogin'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import ReportDialog from './ReportDialog'

export default function ReportButton({ targetType, targetId, ownerId, srLabel, compact = false, className }) {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const requireLogin = useRequireLogin()
  const [open, setOpen] = useState(false)

  if (isAuthenticated && ownerId != null && user?.id === ownerId) return null

  const handleClick = () => {
    if (requireLogin(t('reports.loginToReport'))) return
    setOpen(true)
  }

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={handleClick}
          aria-label={srLabel}
          aria-haspopup="dialog"
          title={t('reports.button')}
          className={cx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-ink-muted hover:bg-slate-100 hover:text-ink',
            className,
          )}
        >
          <Icon name="flag" className="h-5 w-5" />
        </button>
      ) : (
        <Button variant="ghost" size="sm" onClick={handleClick} aria-haspopup="dialog" className={className}>
          <Icon name="flag" className="h-4 w-4" />
          {t('reports.button')}
          {srLabel && <span className="sr-only">{srLabel}</span>}
        </Button>
      )}
      {open && <ReportDialog targetType={targetType} targetId={targetId} onClose={() => setOpen(false)} />}
    </>
  )
}
