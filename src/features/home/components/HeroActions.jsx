import Icon from '@/shared/components/Icon'
import { useRotatingTypewriter } from '@/shared/hooks/useTypewriter'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const ICONS = ['calendar', 'briefcase', 'chat', 'check-circle']

export default function HeroActions({ className }) {
  const { t } = useI18n()
  const actions = t('home.hero.actions').split('|')
  const { index, typed } = useRotatingTypewriter(actions, { speed: 95, pause: 2800 })

  return (
    <p className={cx('grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 text-left', className)}>
      <span className="sr-only">{t('home.hero.actionsFull')}</span>
      <span aria-hidden="true" className="text-brand-600 dark:text-brand-300">
        <Icon key={index} name={ICONS[index]} className="h-8 w-8 animate-fade-in sm:h-9 sm:w-9" />
      </span>
      <span aria-hidden="true" className="min-h-[3.75rem] text-xl font-semibold leading-snug sm:min-h-0 sm:text-2xl">
        <strong className="font-bold text-ink">
          {typed}
          <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] animate-caret rounded-full bg-brand-600 dark:bg-brand-300" />
        </strong>
      </span>
      <span aria-hidden="true" className="col-start-2 flex gap-1.5">
        {actions.map((action, position) => (
          <span
            key={action}
            className={cx(
              'h-1.5 rounded-full transition-all duration-700',
              position === index ? 'w-8 bg-brand-600 dark:bg-brand-300' : 'w-3 bg-brand-300 dark:bg-white/25',
            )}
          />
        ))}
      </span>
    </p>
  )
}
