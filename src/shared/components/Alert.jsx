import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

const VARIANTS = {
  error: {
    classes: 'border-red-200 bg-red-50 text-red-900 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200',
    icon: 'warning',
    role: 'alert',
  },
  warning: {
    classes:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200',
    icon: 'warning',
    role: 'status',
  },
  info: { classes: 'border-accent-line bg-accent-soft text-accent-strong', icon: 'info', role: 'status' },
  success: {
    classes:
      'border-green-200 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200',
    icon: 'check-circle',
    role: 'status',
  },
}

/** Aviso breve: un párrafo con su rol (alert o status) para que los lectores de pantalla lo anuncien. */
export default function Alert({ variant = 'info', title, className, children }) {
  const config = VARIANTS[variant]

  return (
    <p
      role={config.role}
      className={cx(
        'grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-control border p-4 text-sm',
        config.classes,
        className,
      )}
    >
      <Icon name={config.icon} className="row-span-2 mt-0.5 h-5 w-5" />
      {title && <strong className="block font-semibold">{title}</strong>}
      <span className="block">{children}</span>
    </p>
  )
}
