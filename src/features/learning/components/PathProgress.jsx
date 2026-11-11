import { useId } from 'react'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

/** Barra de progreso de una ruta con su etiqueta y el número de etapas hechas, también en texto. */
export default function PathProgress({ done, total, className }) {
  const { t } = useI18n()
  const id = useId()
  const completed = done === total

  return (
    <p className={cx('grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 text-sm', className)}>
      <label htmlFor={id} className="font-semibold text-ink">
        {t('learning.progress.label')}
      </label>
      <span className={cx('text-ink-muted', completed && 'font-semibold text-green-800 dark:text-green-300')}>
        {completed ? t('learning.progress.completed') : t('learning.progress.value', { done, total })}
      </span>
      <progress
        id={id}
        value={done}
        max={total}
        className="col-span-full h-2.5 w-full overflow-hidden rounded-full bg-slate-200 accent-brand-600 [&::-moz-progress-bar]:bg-brand-600 [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-brand-600"
      />
    </p>
  )
}
