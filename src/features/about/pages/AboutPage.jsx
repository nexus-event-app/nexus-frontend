import { useAuth } from '@/features/auth/hooks/useAuth'
import { Link } from '@/shared/i18n/router'
import ActionMenu from '@/shared/components/ActionMenu'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import JsonLd from '@/shared/components/JsonLd'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import Eyebrow from '@/shared/components/Eyebrow'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { legalConfig } from '@/shared/config/legal'
import { paths } from '@/shared/config/paths'
import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const OFFERS = [
  { key: 'news', icon: 'newspaper', to: paths.news },
  { key: 'jobs', icon: 'briefcase', to: paths.jobs },
  { key: 'forum', icon: 'chat', to: paths.forum },
  { key: 'testimonials', icon: 'star', to: paths.testimonials },
]
const STORY = [{ key: 'idea' }, { key: 'build' }, { key: 'launch' }, { key: 'next', upcoming: true }]

function IconTile({ name, className }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 text-white shadow-md ring-1 ring-inset ring-white/10',
        className,
      )}
    >
      <Icon name={name} className="h-5 w-5" />
    </span>
  )
}

function SectionTitle({ id, eyebrow, title, children, className }) {
  return (
    <header className={className}>
      <hgroup>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {children && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">{children}</p>}
      </hgroup>
    </header>
  )
}

export default function AboutPage() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const name = siteConfig.name

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo title={t('about.seoTitle')} description={t('about.seoDescription', { name })} path={paths.about} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: t('about.seoTitle'),
          description: t('about.seoDescription', { name }),
          url: absoluteUrl(paths.about),
          about: { '@type': 'Organization', name, url: siteConfig.url, nonprofitStatus: 'Nonprofit' },
        }}
      />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />
      <Breadcrumbs items={[{ label: t('about.breadcrumb'), to: paths.about }]} />

      <header className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <hgroup>
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            {t('about.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('about.intro', { name })}</p>
        </hgroup>
        <Illustration {...illustrations.about} className="mx-auto w-full max-w-sm lg:max-w-none" />
      </header>

      <section aria-labelledby="about-purpose" className="mt-24 grid gap-x-14 gap-y-8 lg:grid-cols-2 lg:items-center">
        <SectionTitle id="about-purpose" eyebrow={t('about.purpose.eyebrow')} title={t('about.purpose.title')} />
        <p className="text-lg leading-relaxed text-ink-soft lg:col-start-1">{t('about.purpose.problem')}</p>
        <p className="text-lg leading-relaxed text-ink-soft lg:col-start-1">{t('about.purpose.answer', { name })}</p>
        <ul
          aria-label={t('about.purpose.offerLabel')}
          className="grid gap-4 sm:grid-cols-2 lg:col-start-2 lg:row-span-3 lg:row-start-1"
        >
          {OFFERS.map((offer) => (
            <li
              key={offer.key}
              className="group relative rounded-3xl border border-slate-200 bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600"
            >
              <IconTile name={offer.icon} />
              <h3 className="mt-4 font-bold text-ink">
                <Link
                  to={offer.to}
                  className="after:absolute after:inset-0 after:rounded-3xl group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {t(`about.purpose.${offer.key}.title`)}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t(`about.purpose.${offer.key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-story" className="mt-24">
        <SectionTitle id="about-story" eyebrow={t('about.story.eyebrow')} title={t('about.story.title')} />
        <ol className="mt-10 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {STORY.map((step, index) => {
            const next = STORY[index + 1]
            return (
              <li
                key={step.key}
                className={cx(
                  'relative grid grid-cols-[2.5rem_minmax(0,1fr)] content-start gap-x-4 lg:grid-cols-1 lg:gap-y-4',
                  next &&
                    'before:absolute before:-bottom-8 before:left-[1.1875rem] before:top-12 lg:before:-right-4 lg:before:bottom-auto lg:before:left-12 lg:before:top-[1.1875rem]',
                  next &&
                    !next.upcoming &&
                    'before:w-0.5 before:rounded-full before:bg-accent-line lg:before:h-0.5 lg:before:w-auto',
                  next?.upcoming &&
                    'before:border-l-2 before:border-dashed before:border-slate-300 lg:before:border-l-0 lg:before:border-t-2',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'row-span-3 flex h-10 w-10 items-center justify-center rounded-full font-bold lg:row-span-1',
                    step.upcoming
                      ? 'border-2 border-dashed border-slate-300 text-ink-muted'
                      : 'bg-brand-600 text-white shadow-card',
                  )}
                >
                  {step.upcoming ? <Icon name="sparkles" className="h-5 w-5" /> : index + 1}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {step.upcoming ? t('about.story.upcoming') : t('about.story.step', { number: index + 1 })}
                </p>
                <h3 className="mt-1 text-lg font-bold text-ink lg:mt-0">{t(`about.story.${step.key}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft lg:mt-0">{t(`about.story.${step.key}.text`)}</p>
              </li>
            )
          })}
        </ol>
      </section>

      <section
        aria-labelledby="about-team"
        className="relative isolate mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-10 -z-10 select-none font-mono text-[10rem] font-bold leading-none text-slate-100 before:content-['{_}']"
        />
        <SectionTitle id="about-team" eyebrow={t('about.team.eyebrow')} title={t('about.team.title')}>
          {t('about.team.text', { name })}
        </SectionTitle>
      </section>

      <section
        aria-labelledby="about-support"
        className="mt-24 grid gap-6 rounded-3xl border-2 border-dashed border-slate-300 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
      >
        <SectionTitle id="about-support" eyebrow={t('about.support.eyebrow')} title={t('about.support.title')}>
          {t('about.support.text')}
        </SectionTitle>
        {legalConfig.email && (
          <p className="text-ink-soft lg:text-right">
            {t('about.support.contact')}{' '}
            <a href={`mailto:${legalConfig.email}`} className="link block text-lg font-semibold">
              {legalConfig.email}
            </a>
          </p>
        )}
      </section>

      {!isAuthenticated && (
        <section
          aria-labelledby="about-cta"
          className="relative isolate mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-14 text-center text-white shadow-pop"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-brand-400/25 blur-3xl"
          />
          <h2 id="about-cta" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('about.cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-brand-100">{t('about.cta.text')}</p>
          <ActionMenu className="mt-8 justify-center">
            <ButtonLink
              to={paths.register}
              variant="inverse"
              size="lg"
              className="transition-all hover:-translate-y-0.5"
            >
              {t('about.cta.register')}
            </ButtonLink>
          </ActionMenu>
        </section>
      )}
    </PageMain>
  )
}
