import { useAuth } from '@/features/auth/hooks/useAuth'
import { Link } from '@/shared/i18n/router'
import ActionMenu from '@/shared/components/ActionMenu'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import JsonLd from '@/shared/components/JsonLd'
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
/** Etapas de la historia, como un `git log`: cada una con un «hash» decorativo; la última aún está por llegar. */
const STORY = [
  { key: 'idea', hash: 'a1f3c2e' },
  { key: 'build', hash: '7b9d04f' },
  { key: 'launch', hash: 'e52c8a1' },
  { key: 'next', hash: 'HEAD', upcoming: true },
]
const PRINCIPLES = [
  { key: 'independent', icon: 'users' },
  { key: 'funding', icon: 'heart' },
  { key: 'privacy', icon: 'lock', to: paths.privacy },
  { key: 'community', icon: 'shield', to: `${paths.forum}#forum-rules-heading` },
]

/** Icono sobre el morado oscuro de la marca, el mismo en toda la página (como en las tarjetas de rutas). */
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

/** Cabecera de cada apartado: antetítulo que se escribe solo, título y, si la hay, una entradilla. */
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

/**
 * Terminal decorativa de la cabecera: el «primer commit» que da nombre al proyecto. Colores fijos (gris muy oscuro)
 * en los dos temas; el cursor parpadea y se queda quieto con «reducir movimiento». Oculta a los lectores de pantalla:
 * no añade información.
 */
function FirstCommitTerminal() {
  const { t } = useI18n()
  return (
    <figure
      aria-hidden="true"
      className="overflow-hidden rounded-2xl bg-gray-950 font-mono text-sm shadow-pop ring-1 ring-white/10 lg:rotate-1"
    >
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-gray-700" />
        <span className="h-3 w-3 rounded-full bg-gray-700" />
        <span className="h-3 w-3 rounded-full bg-gray-700" />
        <span className="ml-2 text-xs text-gray-400">~/mi-carrera-tech</span>
      </figcaption>
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-5 leading-7 text-gray-300">
        <code>
          <span className="text-brand-300">$</span> git init{'\n'}
          <span className="text-brand-300">$</span> git add curiosidad.txt ganas.txt{'\n'}
          <span className="text-brand-300">$</span> git commit -m &quot;{t('about.terminal.message')}&quot;{'\n'}
          <span className="text-gray-400">[main (root-commit) a1f3c2e]</span>{' '}
          <span className="text-white">{t('about.terminal.output')}</span>
          {'\n'}
          <span className="text-brand-300">$</span>{' '}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-caret bg-brand-300" />
        </code>
      </pre>
    </figure>
  )
}

/**
 * «Sobre el proyecto»: qué es Primer Commit, por qué existe, quién está detrás y cómo se financia. Sirve también como
 * carta de presentación para entidades y programas de ayudas. Sin datos personales: el email sale de la configuración.
 * Sobria y con un guiño a Git (la terminal de la cabecera y la historia como un `git log`), en grises y el morado de la
 * marca.
 */
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
      {/* Cuadrícula decorativa detrás de la cabecera, como en el resto de páginas. */}
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
        <FirstCommitTerminal />
      </header>

      {/* Por qué existe: el texto a la izquierda y lo que encontrarás a la derecha. */}
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

      {/* La historia como un `git log`: una línea que une los commits; el último, discontinuo, aún está por llegar. */}
      <section aria-labelledby="about-story" className="mt-24">
        <SectionTitle id="about-story" eyebrow={t('about.story.eyebrow')} title={t('about.story.title')} />
        <ol className="mt-10 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {STORY.map((step, index) => (
            <li
              key={step.key}
              className={cx(
                'relative grid grid-cols-[1.5rem_minmax(0,1fr)] content-start gap-x-4 lg:grid-cols-1 lg:gap-y-4',
                // Tramo de la línea hasta el siguiente commit (en vertical en móvil, en horizontal en pantallas grandes).
                index < STORY.length - 1 &&
                  'before:absolute before:-bottom-8 before:left-[0.6875rem] before:top-6 before:w-0.5 before:bg-slate-200 lg:before:-right-6 lg:before:bottom-auto lg:before:left-6 lg:before:top-[0.6875rem] lg:before:h-0.5 lg:before:w-auto',
              )}
            >
              <span
                aria-hidden="true"
                className={cx(
                  'relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-canvas',
                  step.upcoming ? 'border-dashed border-slate-400' : 'border-brand-600 dark:border-brand-400',
                )}
              >
                {!step.upcoming && <span className="h-2 w-2 rounded-full bg-brand-600 dark:bg-brand-400" />}
              </span>
              <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs">
                <span aria-hidden="true" className="rounded bg-slate-100 px-1.5 py-0.5 text-ink-soft">
                  {step.hash}
                </span>
                <span className="font-semibold uppercase tracking-wide text-accent">
                  {step.upcoming ? t('about.story.upcoming') : t('about.story.step', { number: index + 1 })}
                </span>
              </p>
              <h3 className="col-start-2 mt-2 text-lg font-bold text-ink lg:col-start-1 lg:mt-0">
                {t(`about.story.${step.key}.title`)}
              </h3>
              <p className="col-start-2 mt-1 leading-relaxed text-ink-soft lg:col-start-1 lg:mt-0">
                {t(`about.story.${step.key}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="about-team"
        className="relative isolate mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-10"
      >
        {/* Llaves de código gigantes en la esquina: decorativas, pintadas con CSS para que no cuenten como texto. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-10 -z-10 select-none font-mono text-[10rem] font-bold leading-none text-slate-100 before:content-['{_}']"
        />
        <SectionTitle id="about-team" eyebrow={t('about.team.eyebrow')} title={t('about.team.title')}>
          {t('about.team.text', { name })}
        </SectionTitle>
      </section>

      <section aria-labelledby="about-operate" className="mt-24">
        <SectionTitle id="about-operate" eyebrow={t('about.operate.eyebrow')} title={t('about.operate.title')}>
          {t('about.operate.intro')}
        </SectionTitle>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <li
              key={principle.key}
              className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-x-4 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card"
            >
              <IconTile name={principle.icon} className="row-span-3" />
              <h3 className="text-lg font-bold text-ink">{t(`about.operate.${principle.key}.title`)}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{t(`about.operate.${principle.key}.text`)}</p>
              {principle.to && (
                <p className="mt-2">
                  <Link to={principle.to} className="link inline-flex min-h-[2.75rem] items-center">
                    {t(`about.operate.${principle.key}.link`)}
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ul>
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
        <ActionMenu className="mt-8 flex-col items-center justify-center gap-3 sm:flex-row">
          {!isAuthenticated && (
            <ButtonLink to={paths.register} variant="inverse" className="rounded-full px-6">
              {t('about.cta.register')}
            </ButtonLink>
          )}
          <ButtonLink
            to={paths.forum}
            variant={isAuthenticated ? 'inverse' : 'outlineInverse'}
            className="rounded-full px-6"
          >
            {t('about.cta.forum')}
          </ButtonLink>
        </ActionMenu>
      </section>
    </PageMain>
  )
}
