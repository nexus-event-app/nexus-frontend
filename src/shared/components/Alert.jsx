import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

const VARIANTS = {
  error: { classes: 'border-red-200 bg-red-50 text-red-900', icon: 'warning', role: 'alert' },
  warning: { classes: 'border-amber-200 bg-amber-50 text-amber-900', icon: 'warning', role: 'status' },
  info: { classes: 'border-brand-200 bg-brand-50 text-brand-900', icon: 'info', role: 'status' },
  success: { classes: 'border-green-200 bg-green-50 text-green-900', icon: 'check-circle', role: 'status' },
}

export default function Alert({ variant = 'info', title, className, children }) {
  const config = VARIANTS[variant]

  return (
    <div role={config.role} className={cx('flex gap-3 rounded-control border p-4 text-sm', config.classes, className)}>
      <Icon name={config.icon} className="mt-0.5 h-5 w-5" />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  )
}
