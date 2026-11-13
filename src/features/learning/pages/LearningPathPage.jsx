import { useParams } from 'react-router-dom'
import SignInPrompt from '@/features/auth/components/SignInPrompt'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths, withQuery } from '@/shared/config/paths'
import { routeSubsegment } from '@/shared/i18n/languages'
import { Link, Navigate } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import LearningPathCard from '../components/LearningPathCard'
import PathProgress from '../components/PathProgress'
import StepItem from '../components/StepItem'
import { findLearningPath, LEARNING_PATHS } from '../data/learningPaths'
import { useLearningProgress } from '../hooks/useLearningProgress'

const NEXT_LINK =
  'group flex min-h-[2.75rem] items-center gap-3 px-5 py-3 font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-accent'

/** Un dato del resumen: término y valor (la rejilla de <dl> los pone en fila, con una línea entre filas). */
function SummaryRow({ label, children }) {
  return (
    <>
      <dt className="border-b border-slate-200 py-3 text-sm text-ink-muted">{label}</dt>
      <dd className="border-b border-slate-200 py-3 pl-4 text-right text-sm font-medium text-ink">{children}</dd>
    </>
  )
}

export default function LearningPathPage() {
  const { t, lang } = useI18n()
  const { pathSlug } = useParams()
  const path = findLearningPath(pathSlug, lang)
  const progress = useLearningProgress()

  if (!path) return <NotFound />
  // Dirección con el identificador sin traducir: se lleva a la buena para que cada página tenga una sola URL.
  if (pathSlug !== routeSubsegment('rutas', path.id, lang)) return <Navigate to={paths.learningPath(path.id)} replace />

  const base = `learning.paths.${path.id}`
  const name = t(`${base}.name`)
  const total = path.steps.length

  // Como en los demás detalles: el antetítulo y el título encima; las etapas como un recorrido a la izquierda y, al
  // lado, el resumen (fijo al bajar en pantallas grandes). Detrás, la cuadrícula suave de la web.
  return (
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo title={t(`${base}.name`)} description={t(`${base}.description`)} path={paths.learningPath(path.id)} />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('learning.breadcrumb'), to: paths.learning },
          { label: name, to: paths.learningPath(path.id) },
        ]}
      />

      <header className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 lg:col-start-1">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-white shadow-md ring-1 ring-inset ring-white/10"
        >
          <Icon name={path.icon} className="h-7 w-7" />
        </span>
        <hgroup>
          <Eyebrow>{t('learning.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{name}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">{t(`${base}.description`)}</p>
        </hgroup>
      </header>

      {!progress.enabled && (
        <section aria-label={t('learning.progress.label')} className="mt-8 lg:col-start-1">
          <SignInPrompt>{t('learning.progress.signIn')}</SignInPrompt>
        </section>
      )}

      {/* Las etapas, como un recorrido: una línea vertical une los círculos con su número (pasa por detrás). */}
      <ol className="relative mt-10 space-y-8 before:absolute before:bottom-6 before:left-[1.3rem] before:top-6 before:w-0.5 before:bg-slate-200 lg:col-start-1">
        {path.steps.map((step, index) => (
          <li key={step.id} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 sm:gap-x-6">
            <StepItem path={path} step={step} number={index + 1} progress={progress} />
          </li>
        ))}
      </ol>

      {/* Resumen: antetítulo y título fuera, como siempre; los datos, el progreso y los siguientes pasos en recuadros. */}
      <aside
        aria-labelledby="learning-summary"
        className="mt-12 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-5 lg:row-start-2 lg:mt-6 lg:self-start"
      >
        <hgroup>
          <Eyebrow>{t('learning.detail.summaryEyebrow')}</Eyebrow>
          <h2 id="learning-summary" className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {t('learning.detail.summary')}
          </h2>
        </hgroup>
        <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] rounded-3xl border border-slate-200 bg-surface px-6 py-2 shadow-card [&>*:nth-last-child(-n+2)]:border-b-0">
          <SummaryRow label={t('learning.detail.duration')}>{t(`${base}.duration`)}</SummaryRow>
          <SummaryRow label={t('learning.detail.steps')}>{total}</SummaryRow>
          <dt className="col-span-full pt-3 text-sm text-ink-muted">{t('learning.detail.audience')}</dt>
          <dd className="col-span-full pb-4 pt-1 text-sm leading-relaxed text-ink-soft">{t(`${base}.audience`)}</dd>
        </dl>
        {progress.ready && (
          <PathProgress
            className="mt-4 rounded-3xl border border-slate-200 bg-surface p-5 shadow-card"
            done={progress.countDone(path)}
            total={total}
          />
        )}
        <h3 id="learning-next" className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          {t('learning.detail.next')}
        </h3>
        <nav aria-labelledby="learning-next">
          <ul className="mt-3 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card">
            <li>
              <Link to={withQuery(paths.jobs, path.search)} className={NEXT_LINK}>
                <Icon name="briefcase" className="h-5 w-5 text-accent" />
                <span className="flex-1">{t('learning.detail.jobs')}</span>
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
            <li>
              <Link to={withQuery(paths.forum, path.search)} className={NEXT_LINK}>
                <Icon name="chat" className="h-5 w-5 text-accent" />
                <span className="flex-1">{t('learning.detail.forum')}</span>
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <nav aria-labelledby="learning-others" className="mt-24 lg:col-start-1">
        <hgroup>
          <Eyebrow>{t('learning.detail.othersEyebrow')}</Eyebrow>
          <h2 id="learning-others" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('learning.detail.others')}
          </h2>
        </hgroup>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {LEARNING_PATHS.filter((other) => other.id !== path.id).map((other) => (
            <li key={other.id}>
              <LearningPathCard
                path={other}
                done={progress.ready ? progress.countDone(other) : null}
                headingLevel="h3"
              />
            </li>
          ))}
        </ul>
      </nav>
    </PageMain>
  )
}
