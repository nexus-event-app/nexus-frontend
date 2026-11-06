import { useEffect } from 'react'
import { cx } from '@/shared/utils/classNames'
import Icon from '@/shared/components/Icon'

const TYPES = {
  success: { classes: 'border-green-300 bg-green-50 text-green-900', icon: 'check-circle', duration: 5000 },
  error: { classes: 'border-red-300 bg-red-50 text-red-900', icon: 'x-circle', duration: 8000 },
  info: { classes: 'border-brand-300 bg-brand-50 text-brand-900', icon: 'info', duration: 5000 },
}

export default function Toast({ id, type, message, onDismiss }) {
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
        aria-label="Cerrar notificación"
        className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-control hover:bg-black/5"
      >
        <Icon name="close" className="h-5 w-5" />
      </button>
    </div>
  )
}
