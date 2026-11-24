import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

export default function GuidesCallout({ id, headingLevel = 'h2', className }) {
  const { t } = useI18n()
  const Heading = headingLevel
  return (
    <aside
      aria-labelledby={id}
      className={cx(
        'grid items-center gap-5 rounded-3xl border-[3px] border-accent-line bg-surface p-6 shadow-card sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-8',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent"
      >
        <Icon name="document" className="h-6 w-6" />
      </span>
      <hgroup>
        <Heading id={id} className="text-xl font-bold text-ink">
          {t('guides.callout.title')}
        </Heading>
        <p className="mt-1 leading-relaxed text-ink-muted">{t('guides.callout.text')}</p>
      </hgroup>
      <ButtonLink to={paths.guides} className="justify-self-start rounded-full sm:justify-self-end">
        {t('guides.callout.cta')}
        <Icon name="arrow-right" className="h-4 w-4" />
      </ButtonLink>
    </aside>
  )
}
