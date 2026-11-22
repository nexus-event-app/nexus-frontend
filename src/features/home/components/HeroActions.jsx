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
    <p
      className={cx(
        'grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-3xl bg-white/[0.08] p-4 text-left ring-1 ring-inset ring-white/20 backdrop-blur sm:p-5',
        className,
      )}
    >
      <span className="sr-only">{t('home.hero.actionsFull')}</span>
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-lg shadow-brand-950/30 sm:h-14 sm:w-14"
      >
        <Icon key={index} name={ICONS[index]} className="h-6 w-6 animate-fade-in sm:h-7 sm:w-7" />
      </span>
      <span
        aria-hidden="true"
        className="min-h-[3.75rem] text-xl font-semibold leading-snug text-brand-100 sm:min-h-0 sm:text-2xl"
      >
        {t('home.hero.actionsLead')}{' '}
        <strong className="font-bold text-white">
          {typed}
          <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] animate-caret rounded-full bg-brand-200" />
        </strong>
      </span>
      <span aria-hidden="true" className="col-start-2 flex gap-1.5">
        {actions.map((action, position) => (
          <span
            key={action}
            className={cx(
              'h-1.5 rounded-full transition-all duration-700',
              position === index ? 'w-8 bg-white' : 'w-3 bg-white/30',
            )}
          />
        ))}
      </span>
    </p>
  )
}
