import { useState } from 'react'
import Icon from '@/shared/components/Icon'
import { prefersReducedMotion, useRotatingTypewriter } from '@/shared/hooks/useTypewriter'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const ICONS = ['calendar', 'briefcase', 'chat', 'check-circle']

export default function HeroActions({ className }) {
  const { t } = useI18n()
  const actions = t('home.hero.actions').split('|')
  const [paused, setPaused] = useState(false)
  const [animated] = useState(() => !prefersReducedMotion())
  const { index, typed } = useRotatingTypewriter(actions, { speed: 95, pause: 2800, paused })

  return (
    <p className={cx('grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 text-left', className)}>
      <span className="sr-only">{t('home.hero.actionsFull')}</span>
      <span aria-hidden="true" className="text-brand-600 dark:text-brand-300">
        <Icon key={index} name={ICONS[index]} className="h-8 w-8 animate-fade-in sm:h-9 sm:w-9" />
      </span>
      <span aria-hidden="true" className="min-h-[3.75rem] text-xl font-semibold leading-snug sm:min-h-0 sm:text-2xl">
        <strong className="font-bold text-ink">
          {typed}
          <span
            className={cx(
              'ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] rounded-full bg-brand-600 dark:bg-brand-300',
              !paused && 'animate-caret',
            )}
          />
        </strong>
      </span>
      <span className="col-start-2 flex items-center gap-1.5">
        {actions.map((action, position) => (
          <span
            key={action}
            aria-hidden="true"
            className={cx(
              'h-1.5 rounded-full transition-all duration-700',
              position === index ? 'w-8 bg-brand-600 dark:bg-brand-300' : 'w-3 bg-brand-300 dark:bg-white/25',
            )}
          />
        ))}
        {animated && (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={t(paused ? 'home.hero.resumeActions' : 'home.hero.pauseActions')}
            className="relative ml-2 flex h-7 w-7 items-center justify-center rounded-full text-brand-700 ring-1 ring-inset ring-brand-300 transition-colors after:absolute after:-inset-2 after:content-[''] hover:bg-brand-600 hover:text-white dark:text-brand-200 dark:ring-white/30"
          >
            <Icon name={paused ? 'play' : 'pause'} className="h-3.5 w-3.5" />
          </button>
        )}
      </span>
    </p>
  )
}
