import { useEffect, useState } from 'react'
import Icon from '@/shared/components/Icon'
import { useTypewriter } from '@/shared/hooks/useTypewriter'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const PAUSE = 1800

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function ShareInvite({ className }) {
  const { t } = useI18n()
  const words = t('events.invite.words').split('|')
  const [index, setIndex] = useState(0)
  const word = words[index % words.length]
  const { typed, done } = useTypewriter(word, { speed: 70 })

  useEffect(() => {
    if (!done || prefersReducedMotion()) return undefined
    const timer = window.setTimeout(() => setIndex((current) => current + 1), PAUSE)
    return () => window.clearTimeout(timer)
  }, [done])

  return (
    <p
      className={cx(
        'grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 rounded-2xl border border-accent-line/60 bg-accent-soft/50 px-4 py-3',
        className,
      )}
    >
      <span className="sr-only">{t('events.invite.full')}</span>
      <span
        aria-hidden="true"
        className="row-span-2 flex h-10 w-10 animate-soft-pulse items-center justify-center rounded-full bg-surface text-accent shadow-card"
      >
        <Icon name="sparkles" className="h-5 w-5" />
      </span>
      <span aria-hidden="true" className="text-ink">
        {t('events.invite.before')}{' '}
        <strong className="font-semibold text-accent">
          {typed}
          <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-caret bg-accent" />
        </strong>{' '}
        {t('events.invite.after')}
      </span>
      <span aria-hidden="true" className="text-sm text-ink-muted">
        {t('events.invite.cta')}
      </span>
    </p>
  )
}
