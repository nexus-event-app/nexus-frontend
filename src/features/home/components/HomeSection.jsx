import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import Illustration from '@/shared/components/Illustration'
import { Link } from '@/shared/i18n/router'
import { cx } from '@/shared/utils/classNames'

export default function HomeSection({
  id,
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel,
  tinted = false,
  illustration,
  aside,
  children,
}) {
  return (
    <section
      aria-labelledby={id}
      className={cx(
        'page-gutter page-section relative isolate lg:min-h-[43rem]',
        tinted && 'bg-surface',
        illustration && 'xl:grid xl:grid-cols-[minmax(0,1fr)_23rem] xl:content-start xl:items-center xl:gap-x-10',
      )}
    >
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <header
        className={cx(
          'col-span-full mb-10 grid gap-6 lg:items-end',
          aside ? 'lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-x-10' : 'lg:grid-cols-[minmax(0,1fr)_auto]',
        )}
      >
        <hgroup>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={id} className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>
          {description && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">{description}</p>}
        </hgroup>
        {aside}
        {linkTo && (
          <Link
            to={linkTo}
            className="group inline-flex min-h-[3rem] items-center gap-3 justify-self-start rounded-full border border-slate-200 bg-surface py-1.5 pl-5 pr-1.5 font-medium text-ink shadow-card transition-all hover:-translate-y-0.5 hover:border-accent-line hover:shadow-pop lg:justify-self-end"
          >
            {linkLabel}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-0.5 dark:bg-brand-500">
              <Icon name="arrow-right" className="h-5 w-5" />
            </span>
          </Link>
        )}
      </header>
      {children}
      {illustration && <Illustration {...illustration} className="hidden xl:block" />}
    </section>
  )
}
