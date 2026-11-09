import { useEffect } from 'react'
import { cx } from '@/shared/utils/classNames'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const TYPES = {
  success: { classes: 'border-green-300 bg-green-50 text-green-900 dark:border-green-400/40 dark:bg-green-950 dark:text-green-100', icon: 'check-circle', duration: 5000 },
  error: { classes: 'border-red-300 bg-red-50 text-red-900 dark:border-red-400/40 dark:bg-red-950 dark:text-red-100', icon: 'x-circle', duration: 8000 },
  info: { classes: 'border-accent-line bg-accent-soft text-accent-strong', icon: 'info', duration: 5000 },
}

export default function Toast({ id, type, message, onDismiss }) {
  const { t } = useI18n()
  const config = TYPES[type]

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), config.duration)
    return () => clearTimeout(timer)
  }, [id, config.duration, onDismiss])

  return (
    <div
      className={cx(
        'pointer-events-auto flex animate-toast-in items-start gap-3 rounded-control border p-4 shadow-pop',
        config.classes,
      )}
    >
      <Icon name={config.icon} className="mt-0.5 h-5 w-5" />
      <p className="min-w-0 flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label={t('common.toast.dismiss')}
        className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-control hover:bg-ink/10"
      >
        <Icon name="close" className="h-5 w-5" />
      </button>
    </div>
  )
}
