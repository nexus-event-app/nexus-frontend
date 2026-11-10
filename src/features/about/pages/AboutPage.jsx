import { useAuth } from '@/features/auth/hooks/useAuth'
import { Link } from '@/shared/i18n/router'
import ActionMenu from '@/shared/components/ActionMenu'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import JsonLd from '@/shared/components/JsonLd'
import PageHeader from '@/shared/components/PageHeader'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { legalConfig } from '@/shared/config/legal'
import { paths } from '@/shared/config/paths'
import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'

const OFFERS = [
  { key: 'news', icon: 'newspaper', to: paths.news },
  { key: 'jobs', icon: 'briefcase', to: paths.jobs },
  { key: 'forum', icon: 'chat', to: paths.forum },
  { key: 'testimonials', icon: 'star', to: paths.testimonials },
]
const STORY = ['idea', 'build', 'launch', 'next']
const PRINCIPLES = [
  { key: 'independent', icon: 'users' },
  { key: 'funding', icon: 'heart' },
  { key: 'privacy', icon: 'lock', to: paths.privacy },
  { key: 'community', icon: 'shield', to: `${paths.forum}#forum-rules-heading` },
]

/**
 * «Sobre el proyecto»: qué es Primer Commit, por qué existe, quién está detrás y cómo se financia. Sirve también como
 * carta de presentación para entidades y programas de ayudas. Sin datos personales: el email sale de la configuración.
 */
export default function AboutPage() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const name = siteConfig.name

  return (
    <PageMain className="page-container page-section">
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
      <Breadcrumbs items={[{ label: t('about.breadcrumb'), to: paths.about }]} />
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')} description={t('about.intro', { name })} />

      {/* Por qué existe: el texto a la izquierda y, en pantallas grandes, lo que ofrecemos a la derecha. */}
      <section aria-labelledby="about-purpose" className="mt-14 grid gap-x-12 lg:grid-cols-2">
        <h2 id="about-purpose" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('about.purpose.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:col-start-1">{t('about.purpose.problem')}</p>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:col-start-1">
          {t('about.purpose.answer', { name })}
        </p>
        <ul
          aria-label={t('about.purpose.offerLabel')}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center"
        >
          {OFFERS.map((offer) => (
            <li key={offer.key} className="card relative p-5 transition-shadow hover:shadow-pop">
              <Icon name={offer.icon} className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-bold text-ink">
                <Link to={offer.to} className="after:absolute after:inset-0 hover:text-accent">
                  {t(`about.purpose.${offer.key}.title`)}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{t(`about.purpose.${offer.key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-story" className="mt-16">
        <h2 id="about-story" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('about.story.title')}
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STORY.map((step, index) => (
            <li key={step} className="border-l-4 border-accent-line pl-5">
              <p className="text-sm font-bold uppercase tracking-wide text-accent">
                {t('about.story.step', { number: index + 1 })}
              </p>
              <h3 className="mt-1 text-lg font-bold text-ink">{t(`about.story.${step}.title`)}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{t(`about.story.${step}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about-team" className="mt-16 rounded-card bg-accent-soft p-6 sm:p-10">
        <h2 id="about-team" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('about.team.title')}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">{t('about.team.text', { name })}</p>
      </section>

      <section aria-labelledby="about-operate" className="mt-16">
        <h2 id="about-operate" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('about.operate.title')}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink-soft">{t('about.operate.intro')}</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <li key={principle.key} className="card grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 p-6">
              <span className="row-span-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon name={principle.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold text-ink">{t(`about.operate.${principle.key}.title`)}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{t(`about.operate.${principle.key}.text`)}</p>
              {principle.to && (
                <p className="mt-3">
                  <Link to={principle.to} className="link inline-flex min-h-[2.75rem] items-center">
                    {t(`about.operate.${principle.key}.link`)}
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-support" className="card mt-16 p-6 sm:p-10">
        <h2 id="about-support" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('about.support.title')}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">{t('about.support.text')}</p>
        {legalConfig.email && (
          <p className="mt-6 text-lg text-ink-soft">
            {t('about.support.contact')}{' '}
            <a href={`mailto:${legalConfig.email}`} className="link font-semibold">
              {legalConfig.email}
            </a>
          </p>
        )}
      </section>

      <section
        aria-labelledby="about-cta"
        className="mt-16 rounded-card bg-gradient-to-br from-brand-700 to-brand-950 px-6 py-12 text-center text-white"
      >
        <h2 id="about-cta" className="text-3xl font-extrabold tracking-tight">
          {t('about.cta.title')}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-brand-100">{t('about.cta.text')}</p>
        <ActionMenu className="mt-8 flex-col items-center justify-center gap-3 sm:flex-row">
          {!isAuthenticated && (
            <ButtonLink to={paths.register} variant="inverse">
              {t('about.cta.register')}
            </ButtonLink>
          )}
          <ButtonLink to={paths.forum} variant={isAuthenticated ? 'inverse' : 'outlineInverse'}>
            {t('about.cta.forum')}
          </ButtonLink>
        </ActionMenu>
      </section>
    </PageMain>
  )
}
