import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { glossaryThreadHref } from '@/shared/config/community'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const BUBBLES = [
  { text: '¿API?', className: '-top-4 right-24 [animation-delay:-1s]' },
  { text: '¿Merge?', className: '-top-3 right-3 rotate-6 [animation-delay:-3s]' },
  { text: '¿Docker?', className: '-bottom-3 left-6 -rotate-6 [animation-delay:-5s]' },
]

export default function MissingWordCallout({ id, headingLevel = 'h2', className }) {
  const { t } = useI18n()
  const Heading = headingLevel
  return (
    <aside
      aria-labelledby={id}
      className={cx(
        'relative isolate grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-5 text-white shadow-pop',
        className,
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <span className="absolute -right-10 -top-10 h-40 w-40 animate-drift rounded-full bg-brand-400/40 blur-2xl" />
      </span>
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.text}
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute hidden animate-float rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-700 shadow-card sm:block',
            bubble.className,
          )}
        >
          {bubble.text}
        </span>
      ))}
      <span
        aria-hidden="true"
        className="row-span-2 flex h-11 w-11 animate-nudge items-center justify-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/25"
      >
        <Icon name="chat" className="h-6 w-6" />
      </span>
      <Heading id={id} className="text-lg font-bold leading-snug">
        {t('glossary.missingTitle')}
      </Heading>
      <p className="mt-1 text-sm leading-relaxed text-brand-100">{t('glossary.missingText')}</p>
      <ButtonLink
        to={glossaryThreadHref()}
        variant="inverse"
        className="col-span-full mt-4 w-full justify-center rounded-full transition-transform hover:-translate-y-0.5"
      >
        <Icon name="chat" className="h-4 w-4" />
        {t('glossary.missingCta')}
      </ButtonLink>
    </aside>
  )
}
